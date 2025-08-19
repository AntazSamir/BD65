import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useRoute, Link } from 'wouter';
import { Calendar, Clock, Users, MapPin, Star, CreditCard, ArrowLeft, Check, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import type { Hotel, Restaurant } from '@shared/schema';

export default function Booking() {
  const [, params] = useRoute('/booking/:type/:id');
  const { toast } = useToast();
  
  // Booking form state
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bookingType = params?.type; // 'hotel' or 'restaurant'
  const itemId = params?.id;

  // Fetch hotel data if booking type is hotel
  const { data: hotels = [] } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
    enabled: bookingType === 'hotel',
  });

  // Fetch restaurant data if booking type is restaurant
  const { data: restaurants = [] } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
    enabled: bookingType === 'restaurant',
  });

  const selectedHotel = bookingType === 'hotel' ? hotels.find(h => h.id === itemId) : null;
  const selectedRestaurant = bookingType === 'restaurant' ? restaurants.find(r => r.id === itemId) : null;

  // Generate room types for hotels
  const getRoomTypes = (hotel: Hotel) => {
    const basePrice = hotel.pricePerNight;
    return [
      {
        id: 'standard',
        type: 'Standard Room',
        price: basePrice,
        features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'TV'],
        available: Math.floor(Math.random() * 5) + 3,
      },
      {
        id: 'deluxe',
        type: 'Deluxe Room', 
        price: Math.floor(basePrice * 1.3),
        features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Bar', 'City View'],
        available: Math.floor(Math.random() * 4) + 2,
      },
      {
        id: 'suite',
        type: 'Suite',
        price: Math.floor(basePrice * 1.8),
        features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Bar', 'Ocean View', 'Living Area', 'Balcony'],
        available: Math.floor(Math.random() * 3) + 1,
      },
    ];
  };

  // Generate time slots for restaurants
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: timeString, label: displayTime });
      }
    }
    return slots;
  };

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (bookingType === 'hotel') {
      setCheckIn(tomorrowStr);
      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
      setCheckOut(dayAfterTomorrow.toISOString().split('T')[0]);
    } else {
      setBookingDate(todayStr);
    }
  }, [bookingType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Booking Confirmed!",
        description: bookingType === 'hotel' 
          ? `Your hotel reservation at ${selectedHotel?.name} has been confirmed.`
          : `Your table reservation at ${selectedRestaurant?.name} has been confirmed.`,
      });

      // Reset form after successful booking
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total for hotel bookings
  const calculateTotal = () => {
    if (bookingType === 'hotel' && selectedHotel && selectedRoom && checkIn && checkOut) {
      const roomTypes = getRoomTypes(selectedHotel);
      const room = roomTypes.find(r => r.id === selectedRoom);
      if (room) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        return room.price * nights;
      }
    }
    return 0;
  };

  const getNights = () => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  if (!bookingType || !itemId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Invalid Booking Request</h1>
            <p className="text-gray-600 mb-8">The booking information is missing or invalid.</p>
            <Link href="/hotels">
              <Button>Return to Hotels</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (bookingType === 'hotel' && !selectedHotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Hotel Not Found</h1>
            <p className="text-gray-600 mb-8">The hotel you're trying to book doesn't exist.</p>
            <Link href="/hotels">
              <Button>Return to Hotels</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (bookingType === 'restaurant' && !selectedRestaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Restaurant Not Found</h1>
            <p className="text-gray-600 mb-8">The restaurant you're trying to book doesn't exist.</p>
            <Link href="/hotels">
              <Button>Return to Hotels</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentItem = selectedHotel || selectedRestaurant;
  if (!currentItem) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/hotels" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {bookingType === 'hotel' ? 'Hotels' : 'Restaurants'}
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {bookingType === 'hotel' ? 'Book Your Stay' : 'Reserve Your Table'}
                </h1>
                <p className="text-xl text-gray-600">
                  Complete your booking at {currentItem.name}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit}>
                    {bookingType === 'hotel' && selectedHotel && (
                      <>
                        {/* Room Selection */}
                        <div>
                          <Label className="text-base font-medium mb-3 block">Select Room Type</Label>
                          <div className="space-y-3">
                            {getRoomTypes(selectedHotel).map((room) => (
                              <div
                                key={room.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                  selectedRoom === room.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setSelectedRoom(room.id)}
                                data-testid={`room-option-${room.id}`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-semibold text-gray-900">{room.type}</h3>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-gray-900">৳{room.price.toLocaleString()}</div>
                                    <div className="text-sm text-gray-500">/night</div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {room.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                                <p className="text-sm text-green-600">{room.available} rooms available</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="checkin">Check-in Date</Label>
                            <Input
                              id="checkin"
                              type="date"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              required
                              data-testid="input-checkin"
                            />
                          </div>
                          <div>
                            <Label htmlFor="checkout">Check-out Date</Label>
                            <Input
                              id="checkout"
                              type="date"
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              min={checkIn}
                              required
                              data-testid="input-checkout"
                            />
                          </div>
                        </div>

                        {/* Guests */}
                        <div>
                          <Label htmlFor="guests">Number of Guests</Label>
                          <Select value={guests} onValueChange={setGuests}>
                            <SelectTrigger data-testid="select-guests">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'Guest' : 'Guests'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {bookingType === 'restaurant' && selectedRestaurant && (
                      <>
                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="booking-date">Reservation Date</Label>
                            <Input
                              id="booking-date"
                              type="date"
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              required
                              data-testid="input-booking-date"
                            />
                          </div>
                          <div>
                            <Label htmlFor="booking-time">Reservation Time</Label>
                            <Select value={bookingTime} onValueChange={setBookingTime}>
                              <SelectTrigger data-testid="select-booking-time">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {getTimeSlots().map((slot) => (
                                  <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Party Size */}
                        <div>
                          <Label htmlFor="party-size">Party Size</Label>
                          <Select value={partySize} onValueChange={setPartySize}>
                            <SelectTrigger data-testid="select-party-size">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'Person' : 'People'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    <Separator />

                    {/* Customer Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                      
                      <div>
                        <Label htmlFor="customer-name">Full Name</Label>
                        <Input
                          id="customer-name"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter your full name"
                          required
                          data-testid="input-customer-name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="customer-email">Email Address</Label>
                        <Input
                          id="customer-email"
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          data-testid="input-customer-email"
                        />
                      </div>

                      <div>
                        <Label htmlFor="customer-phone">Phone Number</Label>
                        <Input
                          id="customer-phone"
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          required
                          data-testid="input-customer-phone"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || (bookingType === 'hotel' && !selectedRoom) || (bookingType === 'restaurant' && !bookingTime)}
                      data-testid="button-submit-booking"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          {bookingType === 'hotel' ? 'Book Hotel' : 'Reserve Table'}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Property/Restaurant Info */}
                  <div className="flex space-x-3">
                    <img
                      src={currentItem.imageUrl}
                      alt={currentItem.name}
                      className="w-16 h-16 rounded-lg object-cover"
                      data-testid="summary-image"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900" data-testid="summary-name">
                        {currentItem.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span data-testid="summary-location">{currentItem.location}</span>
                      </div>
                      <div className="flex items-center text-yellow-600 text-sm mt-1">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span data-testid="summary-rating">{currentItem.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Phone className="w-4 h-4 mr-1" />
                        <span data-testid="summary-phone">{currentItem.phone}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Booking Details */}
                  <div className="space-y-3">
                    {bookingType === 'hotel' && selectedHotel && selectedRoom && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Room Type:</span>
                          <span className="font-medium" data-testid="summary-room-type">
                            {getRoomTypes(selectedHotel).find(r => r.id === selectedRoom)?.type}
                          </span>
                        </div>
                        {checkIn && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Check-in:</span>
                            <span className="font-medium" data-testid="summary-checkin">
                              {new Date(checkIn).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {checkOut && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Check-out:</span>
                            <span className="font-medium" data-testid="summary-checkout">
                              {new Date(checkOut).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {getNights() > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Nights:</span>
                            <span className="font-medium" data-testid="summary-nights">
                              {getNights()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Guests:</span>
                          <span className="font-medium" data-testid="summary-guests">{guests}</span>
                        </div>
                      </>
                    )}

                    {bookingType === 'restaurant' && (
                      <>
                        {bookingDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium" data-testid="summary-booking-date">
                              {new Date(bookingDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {bookingTime && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Time:</span>
                            <span className="font-medium" data-testid="summary-booking-time">
                              {new Date(`2000-01-01T${bookingTime}`).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Party Size:</span>
                          <span className="font-medium" data-testid="summary-party-size">{partySize}</span>
                        </div>
                        {selectedRestaurant && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Cuisine:</span>
                            <span className="font-medium" data-testid="summary-cuisine">{selectedRestaurant.cuisine}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {bookingType === 'hotel' && calculateTotal() > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total:</span>
                          <span data-testid="summary-total">৳{calculateTotal().toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500">Includes all taxes and fees</p>
                      </div>
                    </>
                  )}

                  {bookingType === 'restaurant' && selectedRestaurant && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Price Range:</span>
                          <span data-testid="summary-price-range">{selectedRestaurant.priceRange}</span>
                        </div>
                        <p className="text-xs text-gray-500">Per person estimate</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}