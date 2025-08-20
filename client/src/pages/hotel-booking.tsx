import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoute, useLocation } from 'wouter';
import { Calendar, Clock, Users, MapPin, Star, CreditCard, ArrowLeft, Check, Phone, Download, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import type { Hotel } from '@shared/schema';

export default function HotelBooking() {
  const [, params] = useRoute('/hotel-booking/:id');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  // Booking form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [roomType, setRoomType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const hotelId = params?.id;

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

  // Fetch hotel data
  const { data: hotels = [] } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
  });

  const selectedHotel = hotels.find(h => h.id === hotelId);

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
        description: `Your hotel booking has been confirmed. Confirmation number: ${(result as any)?.confirmationNumber || 'N/A'}`,
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
    if (!selectedHotel) return;

    setIsSubmitting(true);
    try {
      const bookingData = {
        itemId: selectedHotel.id,
        itemType: 'hotel',
        customerName,
        email: customerEmail,
        phone: customerPhone,
        propertyName: selectedHotel.name,
        propertyLocation: selectedHotel.location,
        propertyImageUrl: selectedHotel.imageUrl,
        propertyPhone: selectedHotel.phone || '',
        bookingType: 'hotel',
        confirmationNumber: `BD${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
        roomType,
        checkIn,
        checkOut,
        guests: parseInt(guests),
        nights: Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)),
        totalAmount: Math.ceil(Math.random() * 10000) + 5000, // Random amount between 5000-15000 Taka
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
Property: ${bookingDetails.propertyName}
Location: ${bookingDetails.propertyLocation}
Customer: ${bookingDetails.customerName}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}

Room Type: ${bookingDetails.roomType}
Check-in: ${bookingDetails.checkIn}
Check-out: ${bookingDetails.checkOut}
Guests: ${bookingDetails.guests}
Nights: ${bookingDetails.nights}
Total Amount: ৳${bookingDetails.totalAmount}

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

  if (!selectedHotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Hotel Not Found</h1>
            <p className="text-gray-600 mb-8">The hotel you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/hotels')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hotels
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
                Your hotel booking has been confirmed. You'll receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold mb-4 text-center">Booking Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Confirmation Number:</span>
                    <span className="font-mono font-semibold">{bookingDetails?.confirmationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hotel:</span>
                    <span>{bookingDetails?.propertyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{bookingDetails?.propertyLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Type:</span>
                    <span>{bookingDetails?.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{bookingDetails?.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{bookingDetails?.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold text-lg">৳{bookingDetails?.totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={downloadReceipt} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button onClick={() => navigate('/hotels')}>
                  Back to Hotels
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
            <Button variant="outline" onClick={() => navigate('/hotels')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="icon-bg-blue">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Book Hotel</h1>
                <p className="text-gray-600">Complete your reservation</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Hotel Information */}
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {selectedHotel.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <img 
                  src={selectedHotel.imageUrl} 
                  alt={selectedHotel.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {selectedHotel.location}
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedHotel.rating}</span>
                    <span className="text-gray-600">• ৳{selectedHotel.pricePerNight}/night</span>
                  </div>
                  <p className="text-gray-600">{selectedHotel.description}</p>
                  
                  {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedHotel.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
                    <Label htmlFor="roomType">Room Type</Label>
                    <Select value={roomType} onValueChange={setRoomType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Room</SelectItem>
                        <SelectItem value="deluxe">Deluxe Room</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="family">Family Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={guests} onValueChange={setGuests} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Hotel:</span>
                        <span>{selectedHotel.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Room:</span>
                        <span>{roomType || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span>{guests}</span>
                      </div>
                      {checkIn && checkOut && (
                        <>
                          <div className="flex justify-between">
                            <span>Nights:</span>
                            <span>{Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Estimated Total:</span>
                            <span>৳{Math.ceil((Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) * selectedHotel.pricePerNight)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
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