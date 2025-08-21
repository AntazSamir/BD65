import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoute, useLocation } from 'wouter';
import { Plane, Bus, Car, Calendar, Clock, Users, MapPin, Star, CreditCard, ArrowLeft, Check, Phone, Download, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import type { TripPlanner, Bus as BusType, PrivateCar } from '@shared/schema';

export default function TransportBooking() {
  const [, params] = useRoute('/transport-booking/:type/:id');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  // Booking form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNid, setCustomerNid] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [travelDate, setTravelDate] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const transportType = params?.type as 'flight' | 'bus' | 'car';
  const transportId = params?.id;

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to make a booking. You'll be redirected to the login page.",
        variant: "destructive",
      });
      setTimeout(() => {
        navigate('/sign-in');
      }, 1000);
      return;
    }
  }, [isAuthenticated, navigate, toast]);

  // Pre-fill user data when available
  useEffect(() => {
    if (user) {
      setCustomerName(user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '');
      setCustomerEmail(user.email || '');
    }
  }, [user]);

  // Fetch transport data based on type
  const { data: flights = [] } = useQuery<TripPlanner[]>({
    queryKey: ['/api/trip-planners'],
    enabled: transportType === 'flight',
  });

  const { data: buses = [] } = useQuery<BusType[]>({
    queryKey: ['/api/buses'],
    enabled: transportType === 'bus',
  });

  const { data: cars = [] } = useQuery<PrivateCar[]>({
    queryKey: ['/api/private-cars'],
    enabled: transportType === 'car',
  });

  // Get selected transport item
  const selectedTransport = transportType === 'flight' 
    ? flights.find(f => f.id === transportId)
    : transportType === 'bus'
    ? buses.find(b => b.id === transportId)
    : cars.find(c => c.id === transportId);

  // Fetch booked seats for buses
  const { data: bookedSeats = [] } = useQuery<string[]>({
    queryKey: ['/api/bookings/seats', transportId, travelDate],
    enabled: transportType === 'bus' && !!transportId && !!travelDate,
    queryFn: async () => {
      const response = await fetch(`/api/bookings/seats?busId=${transportId}&travelDate=${travelDate}`);
      if (!response.ok) return [];
      const data = await response.json();
      return data.bookedSeats || [];
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      return await apiRequest('POST', '/api/bookings', bookingData);
    },
    onSuccess: (result) => {
      setBookingDetails(result);
      setShowSuccessDialog(true);
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: "Booking Confirmed!",
        description: `Your ${transportType} booking has been confirmed. Confirmation number: ${(result as any)?.confirmationNumber || 'N/A'}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransport) return;

    setIsSubmitting(true);
    try {
      const bookingData = {
        itemId: selectedTransport.id,
        itemType: transportType,
        customerName,
        email: customerEmail,
        phone: customerPhone,
        nid: customerNid,
        passengers: parseInt(passengers),
        travelDate,
        specialRequests,
        confirmationNumber: `BD${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
        ...(transportType === 'bus' && { selectedSeats }),
      };

      await bookingMutation.mutateAsync(bookingData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadReceipt = () => {
    if (!bookingDetails) return;
    
    const receiptText = `
BD EXPLORER BOOKING RECEIPT
==========================

Confirmation Number: ${bookingDetails.confirmationNumber}
Transport: ${transportType.charAt(0).toUpperCase() + transportType.slice(1)}
Customer: ${bookingDetails.customerName}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}
National ID: ${bookingDetails.nid}

Travel Date: ${bookingDetails.travelDate}
Passengers: ${bookingDetails.passengers}
${transportType === 'bus' && bookingDetails.selectedSeats ? `Selected Seats: ${bookingDetails.selectedSeats.join(', ')}` : ''}

Booked on: ${new Date().toLocaleDateString()}
Status: Confirmed

Thank you for choosing BD Explorer!
Contact: +880-2-123-4567
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BD-Explorer-Receipt-${bookingDetails.confirmationNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate seat layout for buses
  const generateSeatLayout = () => {
    const totalSeats = 40; // Typical bus seat count
    const seatsPerRow = 4;
    const seats = [];
    
    for (let i = 1; i <= totalSeats; i++) {
      const seatNumber = `${Math.ceil(i / seatsPerRow)}${String.fromCharCode(64 + ((i - 1) % seatsPerRow) + 1)}`;
      seats.push(seatNumber);
    }
    
    return seats;
  };

  const toggleSeat = (seatNumber: string) => {
    if (bookedSeats.includes(seatNumber)) return; // Can't select booked seats
    
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatNumber));
    } else {
      if (selectedSeats.length < parseInt(passengers)) {
        setSelectedSeats(prev => [...prev, seatNumber]);
      } else {
        toast({
          title: "Seat Selection Limit",
          description: `You can only select ${passengers} seat(s) for ${passengers} passenger(s).`,
          variant: "destructive",
        });
      }
    }
  };

  const getTransportIcon = () => {
    switch (transportType) {
      case 'flight':
        return <Plane className="w-6 h-6" />;
      case 'bus':
        return <Bus className="w-6 h-6" />;
      case 'car':
        return <Car className="w-6 h-6" />;
      default:
        return <Car className="w-6 h-6" />;
    }
  };

  const getTransportTitle = () => {
    switch (transportType) {
      case 'flight':
        return 'Book Flight';
      case 'bus':
        return 'Book Bus Ticket';
      case 'car':
        return 'Book Private Car';
      default:
        return 'Book Transport';
    }
  };

  if (!selectedTransport) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Transport Not Found</h1>
            <p className="text-gray-600 mb-8">The transport option you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/trip-planner')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Trip Planner
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showSuccessDialog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Your {transportType} booking has been confirmed. You'll receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold mb-4 text-center">Booking Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Confirmation Number:</span>
                    <span className="font-mono font-semibold">{bookingDetails?.confirmationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport:</span>
                    <span>{transportType.charAt(0).toUpperCase() + transportType.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel Date:</span>
                    <span>{bookingDetails?.travelDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passengers:</span>
                    <span>{bookingDetails?.passengers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>National ID:</span>
                    <span>{bookingDetails?.nid}</span>
                  </div>
                  {transportType === 'bus' && bookingDetails?.selectedSeats && (
                    <div className="flex justify-between">
                      <span>Selected Seats:</span>
                      <span>{bookingDetails.selectedSeats.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={downloadReceipt} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button onClick={() => navigate('/trip-planner')}>
                  Back to Trip Planner
                </Button>
                <Button onClick={() => navigate('/my-bookings')} variant="outline">
                  View My Bookings
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => navigate('/trip-planner')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="icon-bg-blue">
                {getTransportIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{getTransportTitle()}</h1>
                <p className="text-gray-600">Complete your booking</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Transport Information */}
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getTransportIcon()}
                  {transportType === 'flight' 
                    ? `${(selectedTransport as TripPlanner).origin} → ${(selectedTransport as TripPlanner).destination}`
                    : transportType === 'bus'
                    ? `${(selectedTransport as BusType).operator} - ${(selectedTransport as BusType).type}`
                    : `${(selectedTransport as PrivateCar).type} - ${(selectedTransport as PrivateCar).category}`
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {transportType === 'flight' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route:</span>
                        <span className="font-semibold">{(selectedTransport as TripPlanner).origin} → {(selectedTransport as TripPlanner).destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>{(selectedTransport as TripPlanner).duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-lg">৳{(selectedTransport as TripPlanner).price}</span>
                      </div>
                    </>
                  )}
                  
                  {transportType === 'bus' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Operator:</span>
                        <span className="font-semibold">{(selectedTransport as BusType).operator}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bus Type:</span>
                        <span>{(selectedTransport as BusType).type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route:</span>
                        <span>{(selectedTransport as BusType).origin} → {(selectedTransport as BusType).destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departure:</span>
                        <span>{(selectedTransport as BusType).departure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per seat:</span>
                        <span className="font-semibold text-lg">৳{(selectedTransport as BusType).price}</span>
                      </div>
                    </>
                  )}
                  
                  {transportType === 'car' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Car Type:</span>
                        <span className="font-semibold">{(selectedTransport as PrivateCar).type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span>{(selectedTransport as PrivateCar).category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span>{(selectedTransport as PrivateCar).capacity} passengers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per day:</span>
                        <span className="font-semibold text-lg">৳{(selectedTransport as PrivateCar).price}</span>
                      </div>
                    </>
                  )}
                </div>

                {transportType === 'bus' && travelDate && (
                  <div>
                    <h4 className="font-semibold mb-3">Select Seats</h4>
                    <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                      {generateSeatLayout().slice(0, 32).map((seatNumber) => {
                        const isBooked = bookedSeats.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);
                        
                        return (
                          <button
                            key={seatNumber}
                            type="button"
                            onClick={() => toggleSeat(seatNumber)}
                            disabled={isBooked}
                            className={`
                              w-8 h-8 text-xs font-semibold rounded border transition-colors
                              ${isBooked 
                                ? 'bg-red-200 border-red-300 text-red-700 cursor-not-allowed' 
                                : isSelected
                                ? 'bg-blue-500 border-blue-600 text-white'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                              }
                            `}
                          >
                            {seatNumber}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-4 text-xs mt-3 justify-center">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-200 rounded"></div>
                        <span>Booked</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerPhone">Phone Number</Label>
                      <Input
                        id="customerPhone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customerNid">National ID (NID) *</Label>
                    <Input
                      id="customerNid"
                      value={customerNid}
                      onChange={(e) => setCustomerNid(e.target.value)}
                      placeholder="Enter your National ID number"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="travelDate">Travel Date</Label>
                    <Input
                      id="travelDate"
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="passengers">Number of Passengers</Label>
                    <Select value={passengers} onValueChange={(value) => {
                      setPassengers(value);
                      setSelectedSeats([]); // Reset seat selection when passenger count changes
                    }} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4 Passengers</SelectItem>
                        <SelectItem value="5">5+ Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
                    <Input
                      id="couponCode"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter discount code"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <Textarea
                      id="specialRequests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any special requests or notes"
                      rows={3}
                    />
                  </div>

                  {transportType === 'bus' && selectedSeats.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <h5 className="font-semibold mb-1">Selected Seats:</h5>
                      <p className="text-sm text-blue-700">{selectedSeats.join(', ')}</p>
                    </div>
                  )}

                  <Separator />

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Transport:</span>
                        <span>{transportType.charAt(0).toUpperCase() + transportType.slice(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Travel Date:</span>
                        <span>{travelDate || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passengers:</span>
                        <span>{passengers}</span>
                      </div>
                      {transportType === 'bus' && selectedSeats.length > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span>Price per seat:</span>
                            <span>৳{(selectedTransport as BusType).price}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Total Amount:</span>
                            <span>৳{selectedSeats.length * (selectedTransport as BusType).price}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting || (transportType === 'bus' && selectedSeats.length === 0)} 
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <CreditCard className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                  
                  {transportType === 'bus' && selectedSeats.length === 0 && travelDate && (
                    <p className="text-sm text-gray-500 text-center">
                      Please select {passengers} seat(s) to continue
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}