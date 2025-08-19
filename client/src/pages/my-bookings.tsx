import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Calendar, MapPin, Star, Phone, Users, Clock, Utensils, AlertTriangle, CheckCircle, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import type { Booking } from '@shared/schema';
import jsPDF from 'jspdf';

export default function MyBookings() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  const { data: bookings = [], isLoading, error } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
    enabled: isAuthenticated,
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      return await apiRequest('PUT', `/api/bookings/${bookingId}/cancel`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
      setBookingToCancel(null);
    },
    onError: (error: any) => {
      toast({
        title: "Cancellation Failed",
        description: error.message || "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const downloadReceipt = (booking: Booking) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 204);
    doc.text('Bangladesh Explorer', 20, 20);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Booking Receipt', 20, 35);
    
    // Booking details
    doc.setFontSize(12);
    doc.text(`Confirmation Number: ${booking.confirmationNumber}`, 20, 55);
    doc.text(`Booking Type: ${booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1)}`, 20, 70);
    doc.text(`Property: ${booking.propertyName}`, 20, 85);
    doc.text(`Location: ${booking.propertyLocation}`, 20, 100);
    doc.text(`Customer: ${booking.customerName}`, 20, 115);
    doc.text(`Email: ${booking.email}`, 20, 130);
    doc.text(`Phone: ${booking.phone}`, 20, 145);
    doc.text(`Status: ${booking.status.toUpperCase()}`, 20, 160);
    
    // Type-specific details
    let yPosition = 180;
    
    if (booking.bookingType === 'hotel') {
      doc.text(`Room Type: ${booking.roomType || 'N/A'}`, 20, yPosition);
      doc.text(`Check-in: ${booking.checkIn || 'N/A'}`, 20, yPosition + 15);
      doc.text(`Check-out: ${booking.checkOut || 'N/A'}`, 20, yPosition + 30);
      doc.text(`Nights: ${booking.nights || 'N/A'}`, 20, yPosition + 45);
      doc.text(`Guests: ${booking.guests || 'N/A'}`, 20, yPosition + 60);
      yPosition += 75;
    } else if (booking.bookingType === 'restaurant') {
      doc.text(`Date: ${booking.reservationDate || 'N/A'}`, 20, yPosition);
      doc.text(`Time: ${booking.reservationTime || 'N/A'}`, 20, yPosition + 15);
      doc.text(`Party Size: ${booking.partySize || 'N/A'}`, 20, yPosition + 30);
      doc.text(`Cuisine: ${booking.cuisine || 'N/A'}`, 20, yPosition + 45);
      yPosition += 60;
    } else if (booking.bookingType === 'car' || booking.bookingType === 'bus') {
      doc.text(`Travel Date: ${booking.travelDate || 'N/A'}`, 20, yPosition);
      doc.text(`Passengers: ${booking.passengers || 'N/A'}`, 20, yPosition + 15);
      yPosition += 30;
    }
    
    // Total amount
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 0);
    doc.text(`Total Amount: ৳${booking.totalAmount?.toLocaleString() || '0'}`, 20, yPosition + 15);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Thank you for choosing Bangladesh Explorer!', 20, yPosition + 40);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-GB')}`, 20, yPosition + 55);
    
    // Download the PDF
    doc.save(`Bangladesh-Explorer-Receipt-${booking.confirmationNumber}.pdf`);
    
    toast({
      title: "Receipt Downloaded",
      description: `Receipt for ${booking.propertyName} has been downloaded.`,
    });
  };

  const handleCancelBooking = async () => {
    if (bookingToCancel) {
      await cancelBookingMutation.mutateAsync(bookingToCancel.id);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return '';
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-8">
              You need to be signed in to view your bookings.
            </p>
            <Link href="/sign-in">
              <Button size="lg" data-testid="button-sign-in">
                Sign In
              </Button>
            </Link>
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
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              My Bookings
            </h1>
            <p className="text-xl text-gray-600">
              Manage your hotel and restaurant reservations
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Failed to load your bookings. Please refresh the page.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
              <p className="text-gray-600 mb-8">
                You haven't made any bookings yet. Start exploring our hotels and restaurants!
              </p>
              <Link href="/hotels">
                <Button size="lg" data-testid="button-browse-hotels">
                  Browse Hotels & Restaurants
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden" data-testid={`booking-card-${booking.id}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={booking.propertyImageUrl || ''}
                          alt={booking.propertyName || ''}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg" data-testid={`booking-name-${booking.id}`}>
                            {booking.propertyName}
                          </CardTitle>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{booking.propertyLocation}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={booking.status === 'confirmed' ? 'default' : 'destructive'}
                        data-testid={`booking-status-${booking.id}`}
                      >
                        {booking.status === 'confirmed' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <X className="w-3 h-3 mr-1" />
                        )}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Confirmation Number */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800">
                        Confirmation: <span data-testid={`booking-confirmation-${booking.id}`}>{booking.confirmationNumber}</span>
                      </p>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-3">
                      {booking.bookingType === 'hotel' && (
                        <>
                          {booking.roomType && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Room Type:</span>
                              <span className="font-medium" data-testid={`booking-room-type-${booking.id}`}>
                                {booking.roomType}
                              </span>
                            </div>
                          )}
                          {booking.checkIn && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Check-in:</span>
                              <span className="font-medium" data-testid={`booking-checkin-${booking.id}`}>
                                {formatDate(booking.checkIn)}
                              </span>
                            </div>
                          )}
                          {booking.checkOut && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Check-out:</span>
                              <span className="font-medium" data-testid={`booking-checkout-${booking.id}`}>
                                {formatDate(booking.checkOut)}
                              </span>
                            </div>
                          )}
                          {booking.guests && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Guests:</span>
                              <span className="font-medium flex items-center" data-testid={`booking-guests-${booking.id}`}>
                                <Users className="w-4 h-4 mr-1" />
                                {booking.guests}
                              </span>
                            </div>
                          )}
                          {booking.totalAmount && (
                            <div className="flex justify-between text-lg font-semibold text-green-600">
                              <span>Total:</span>
                              <span data-testid={`booking-total-${booking.id}`}>৳{booking.totalAmount.toLocaleString()}</span>
                            </div>
                          )}
                        </>
                      )}

                      {booking.bookingType === 'restaurant' && (
                        <>
                          {booking.reservationDate && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Date:</span>
                              <span className="font-medium flex items-center" data-testid={`booking-date-${booking.id}`}>
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(booking.reservationDate)}
                              </span>
                            </div>
                          )}
                          {booking.reservationTime && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Time:</span>
                              <span className="font-medium flex items-center" data-testid={`booking-time-${booking.id}`}>
                                <Clock className="w-4 h-4 mr-1" />
                                {formatTime(booking.reservationTime)}
                              </span>
                            </div>
                          )}
                          {booking.partySize && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Party Size:</span>
                              <span className="font-medium flex items-center" data-testid={`booking-party-size-${booking.id}`}>
                                <Users className="w-4 h-4 mr-1" />
                                {booking.partySize} people
                              </span>
                            </div>
                          )}
                          {booking.cuisine && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Cuisine:</span>
                              <span className="font-medium flex items-center" data-testid={`booking-cuisine-${booking.id}`}>
                                <Utensils className="w-4 h-4 mr-1" />
                                {booking.cuisine}
                              </span>
                            </div>
                          )}
                        </>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium flex items-center" data-testid={`booking-phone-${booking.id}`}>
                          <Phone className="w-4 h-4 mr-1" />
                          {booking.propertyPhone}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadReceipt(booking)}
                        data-testid={`button-download-${booking.id}`}
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setBookingToCancel(booking)}
                          data-testid={`button-cancel-${booking.id}`}
                          className="flex-1"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel Booking
                        </Button>
                      )}
                    </div>

                    {booking.status === 'cancelled' && (
                      <p className="text-sm text-gray-500 text-center py-2">
                        This booking has been cancelled
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={!!bookingToCancel} onOpenChange={() => setBookingToCancel(null)}>
        <DialogContent data-testid="cancel-dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Cancel Booking
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your booking at {bookingToCancel?.propertyName}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {bookingToCancel && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-medium text-red-800">
                  Confirmation: {bookingToCancel.confirmationNumber}
                </p>
                <p className="text-sm text-red-600 mt-1">
                  {bookingToCancel.bookingType === 'hotel' ? 'Hotel Reservation' : 'Restaurant Reservation'}
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setBookingToCancel(null)}
                  className="flex-1"
                  data-testid="button-cancel-dialog-no"
                >
                  Keep Booking
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelBooking}
                  disabled={cancelBookingMutation.isPending}
                  className="flex-1"
                  data-testid="button-cancel-dialog-yes"
                >
                  {cancelBookingMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}