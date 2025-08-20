import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Users, MapPin, CreditCard, User, Mail, Phone, Star, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import type { Hotel, Restaurant } from '@shared/schema';

const hotelBookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  roomType: z.string().min(1, 'Please select a room type'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.string().min(1, 'Number of guests is required'),
});

const restaurantBookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  reservationDate: z.string().min(1, 'Reservation date is required'),
  reservationTime: z.string().min(1, 'Reservation time is required'),
  partySize: z.string().min(1, 'Party size is required'),
});

type HotelBookingFormData = z.infer<typeof hotelBookingSchema>;
type RestaurantBookingFormData = z.infer<typeof restaurantBookingSchema>;

interface PropertyBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: Hotel | Restaurant | null;
  type: 'hotel' | 'restaurant';
}

export default function PropertyBookingDialog({ isOpen, onClose, item, type }: PropertyBookingDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const isHotel = type === 'hotel';
  const schema = isHotel ? hotelBookingSchema : restaurantBookingSchema;

  const form = useForm<HotelBookingFormData | RestaurantBookingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
      email: user?.email || '',
      phone: '',
      ...(isHotel
        ? {
            roomType: '',
            checkIn: '',
            checkOut: '',
            guests: '2',
          }
        : {
            reservationDate: '',
            reservationTime: '',
            partySize: '2',
          }),
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: HotelBookingFormData | RestaurantBookingFormData) => {
      if (!item) throw new Error('No item selected');

      const bookingData = {
        itemId: item.id,
        itemType: type,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        propertyName: item.name,
        propertyLocation: item.location,
        propertyImageUrl: item.imageUrl,
        propertyPhone: item.phone || '',
        bookingType: type,
        confirmationNumber: `BD${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
        ...(isHotel && 'roomType' in data
          ? {
              roomType: data.roomType,
              checkIn: data.checkIn,
              checkOut: data.checkOut,
              guests: parseInt(data.guests),
              nights: Math.ceil((new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / (1000 * 60 * 60 * 24)),
              totalAmount: Math.ceil(Math.random() * 10000) + 5000, // Random amount between 5000-15000 Taka
            }
          : {
              reservationDate: (data as RestaurantBookingFormData).reservationDate,
              reservationTime: (data as RestaurantBookingFormData).reservationTime,
              partySize: parseInt((data as RestaurantBookingFormData).partySize),
              cuisine: (item as Restaurant).cuisine,
              priceRange: (item as Restaurant).priceRange,
            }),
      };

      return await apiRequest('POST', '/api/bookings', bookingData);
    },
    onSuccess: (result) => {
      setBookingDetails(result);
      setShowSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: "Booking Confirmed!",
        description: `Your ${type} booking has been confirmed. Confirmation number: ${(result as any)?.confirmationNumber || 'N/A'}`,
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

  const handleSubmit = async (data: HotelBookingFormData | RestaurantBookingFormData) => {
    setIsSubmitting(true);
    try {
      await bookingMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setShowSuccess(false);
      setBookingDetails(null);
      form.reset();
      onClose();
    }
  };

  const downloadReceipt = () => {
    if (!bookingDetails) return;
    
    // Simple receipt download implementation
    const receiptText = `
BD EXPLORER BOOKING RECEIPT
==========================

Confirmation Number: ${bookingDetails.confirmationNumber}
Property: ${bookingDetails.propertyName}
Location: ${bookingDetails.propertyLocation}
Customer: ${bookingDetails.customerName}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}

${isHotel ? `
Room Type: ${bookingDetails.roomType}
Check-in: ${bookingDetails.checkIn}
Check-out: ${bookingDetails.checkOut}
Guests: ${bookingDetails.guests}
Nights: ${bookingDetails.nights}
Total Amount: ৳${bookingDetails.totalAmount}
` : `
Reservation Date: ${bookingDetails.reservationDate}
Reservation Time: ${bookingDetails.reservationTime}
Party Size: ${bookingDetails.partySize}
Cuisine: ${bookingDetails.cuisine}
`}

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

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your {type} booking has been confirmed. You'll receive a confirmation email shortly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h4 className="font-semibold mb-3">Booking Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Confirmation Number:</span>
                  <span className="font-mono font-semibold">{bookingDetails?.confirmationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Property:</span>
                  <span>{bookingDetails?.propertyName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{bookingDetails?.propertyLocation}</span>
                </div>
                {isHotel && (
                  <>
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
                      <span className="font-semibold">৳{bookingDetails?.totalAmount}</span>
                    </div>
                  </>
                )}
                {!isHotel && (
                  <>
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
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={downloadReceipt} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {isHotel ? <MapPin className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                Book {isHotel ? 'Hotel' : 'Restaurant'}: {item.name}
              </DialogTitle>
              <DialogDescription>
                Complete your booking for {item.name} in {item.location}
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{item.rating}</span>
                      {isHotel && (
                        <>
                          <span className="text-gray-300 mx-2">•</span>
                          <span className="text-sm font-semibold">৳{(item as Hotel).pricePerNight}/night</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isHotel ? (
                    <>
                      <FormField
                        control={form.control}
                        name="roomType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select room type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="standard">Standard Room</SelectItem>
                                <SelectItem value="deluxe">Deluxe Room</SelectItem>
                                <SelectItem value="suite">Suite</SelectItem>
                                <SelectItem value="family">Family Room</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="checkIn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Check-in
                              </FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="checkOut"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Check-out
                              </FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Number of Guests
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 Guest</SelectItem>
                                <SelectItem value="2">2 Guests</SelectItem>
                                <SelectItem value="3">3 Guests</SelectItem>
                                <SelectItem value="4">4 Guests</SelectItem>
                                <SelectItem value="5">5+ Guests</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  ) : (
                    <>
                      <FormField
                        control={form.control}
                        name="reservationDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Reservation Date
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="reservationTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Reservation Time
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="partySize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Party Size
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 Person</SelectItem>
                                <SelectItem value="2">2 People</SelectItem>
                                <SelectItem value="3">3 People</SelectItem>
                                <SelectItem value="4">4 People</SelectItem>
                                <SelectItem value="5">5 People</SelectItem>
                                <SelectItem value="6">6+ People</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <Separator />

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
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
                  </div>
                </form>
              </Form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}