import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoute, useLocation } from 'wouter';
import { Calendar, Clock, Users, MapPin, Star, CreditCard, ArrowLeft, Check, Phone, Download, Utensils } from 'lucide-react';
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
import type { Restaurant } from '@shared/schema';

export default function RestaurantBooking() {
  const [, params] = useRoute('/restaurant-booking/:id');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  // Booking form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const restaurantId = params?.id;

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

  // Fetch restaurant data
  const { data: restaurants = [] } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
  });

  const selectedRestaurant = restaurants.find(r => r.id === restaurantId);

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
        description: `Your restaurant booking has been confirmed. Confirmation number: ${(result as any)?.confirmationNumber || 'N/A'}`,
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
    if (!selectedRestaurant) return;

    setIsSubmitting(true);
    try {
      const bookingData = {
        itemId: selectedRestaurant.id,
        itemType: 'restaurant',
        customerName,
        email: customerEmail,
        phone: customerPhone,
        propertyName: selectedRestaurant.name,
        propertyLocation: selectedRestaurant.location,
        propertyImageUrl: selectedRestaurant.imageUrl,
        propertyPhone: selectedRestaurant.phone || '',
        bookingType: 'restaurant',
        confirmationNumber: `BD${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
        reservationDate,
        reservationTime,
        partySize: parseInt(partySize),
        cuisine: selectedRestaurant.cuisine,
        priceRange: selectedRestaurant.priceRange,
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
Restaurant: ${bookingDetails.propertyName}
Location: ${bookingDetails.propertyLocation}
Customer: ${bookingDetails.customerName}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}

Reservation Date: ${bookingDetails.reservationDate}
Reservation Time: ${bookingDetails.reservationTime}
Party Size: ${bookingDetails.partySize}
Cuisine: ${bookingDetails.cuisine}

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

  if (!selectedRestaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Restaurant Not Found</h1>
            <p className="text-gray-600 mb-8">The restaurant you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/hotels')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Restaurants
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
              <h1 className="text-3xl font-bold text-green-600 mb-4">Reservation Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Your restaurant reservation has been confirmed. You'll receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold mb-4 text-center">Reservation Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Confirmation Number:</span>
                    <span className="font-mono font-semibold">{bookingDetails?.confirmationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Restaurant:</span>
                    <span>{bookingDetails?.propertyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{bookingDetails?.propertyLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{bookingDetails?.reservationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{bookingDetails?.reservationTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Party Size:</span>
                    <span>{bookingDetails?.partySize} people</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={downloadReceipt} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button onClick={() => navigate('/hotels')}>
                  Back to Restaurants
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
              <div className="icon-bg-orange">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Book Table</h1>
                <p className="text-gray-600">Make your reservation</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Restaurant Information */}
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  {selectedRestaurant.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <img 
                  src={selectedRestaurant.imageUrl} 
                  alt={selectedRestaurant.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {selectedRestaurant.location}
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedRestaurant.rating}</span>
                    <span className="text-gray-600">• {selectedRestaurant.cuisine}</span>
                  </div>
                  <p className="text-gray-600">{selectedRestaurant.description}</p>
                  
                  <div className="flex gap-2">
                    <Badge variant="secondary">{selectedRestaurant.cuisine}</Badge>
                    <Badge variant="outline">{selectedRestaurant.priceRange}</Badge>
                  </div>

                  {selectedRestaurant.specialties && selectedRestaurant.specialties.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRestaurant.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
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
                <CardTitle>Reservation Details</CardTitle>
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
                    <Label htmlFor="reservationDate">Reservation Date</Label>
                    <Input
                      id="reservationDate"
                      type="date"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reservationTime">Reservation Time</Label>
                    <Select value={reservationTime} onValueChange={setReservationTime} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="12:30">12:30 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="13:30">1:30 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="18:30">6:30 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="19:30">7:30 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="partySize">Party Size</Label>
                    <Select value={partySize} onValueChange={setPartySize} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4 People</SelectItem>
                        <SelectItem value="5">5 People</SelectItem>
                        <SelectItem value="6">6+ People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Reservation Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Restaurant:</span>
                        <span>{selectedRestaurant.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{reservationDate || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{reservationTime || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Party Size:</span>
                        <span>{partySize} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cuisine:</span>
                        <span>{selectedRestaurant.cuisine}</span>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Confirm Reservation
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