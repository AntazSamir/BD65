import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Users, MapPin, CreditCard, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { TripPlanner, Bus, PrivateCar } from '@shared/schema';

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  passengers: z.string().min(1, 'Number of passengers is required'),
  specialRequests: z.string().optional(),
  travelDate: z.string().min(1, 'Travel date is required'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: TripPlanner | Bus | PrivateCar | null;
  type: 'flight' | 'bus' | 'car';
}

export default function BookingDialog({ isOpen, onClose, item, type }: BookingDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: '',
      email: '',
      phone: '',
      passengers: '1',
      specialRequests: '',
      travelDate: '',
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const bookingData = {
        itemId: item?.id,
        itemType: type,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        passengers: parseInt(data.passengers),
        specialRequests: data.specialRequests || '',
        travelDate: data.travelDate,
        totalAmount: item ? getItemPrice() : 0,
        status: 'confirmed',
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Booking Confirmed!',
        description: 'Your transportation has been successfully booked.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      form.reset();
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: 'Booking Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await bookingMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getItemName = () => {
    if (!item) return '';
    
    switch (type) {
      case 'flight':
        const flight = item as TripPlanner;
        return `${flight.origin} → ${flight.destination}`;
      case 'bus':
        const bus = item as Bus;
        return `${bus.operator} - ${bus.type}`;
      case 'car':
        const car = item as PrivateCar;
        return `${car.type} (${car.category})`;
      default:
        return '';
    }
  };

  const getItemPrice = () => {
    if (!item) return 0;
    return item.price;
  };

  const getItemDetails = () => {
    if (!item) return [];

    switch (type) {
      case 'flight':
        const flight = item as TripPlanner;
        return [
          { label: 'Duration', value: flight.duration, icon: Clock },
          { label: 'Stops', value: flight.stops, icon: MapPin },
          { label: 'Deal Type', value: flight.dealType, icon: Badge },
        ];
      case 'bus':
        const bus = item as Bus;
        return [
          { label: 'Departure', value: bus.departure, icon: Clock },
          { label: 'Arrival', value: bus.arrival, icon: Clock },
          { label: 'Duration', value: bus.duration, icon: Clock },
          { label: 'Available Seats', value: `${bus.seats} seats`, icon: Users },
        ];
      case 'car':
        const car = item as PrivateCar;
        return [
          { label: 'Capacity', value: `${car.capacity} passengers`, icon: Users },
          { label: 'Duration', value: car.duration, icon: Clock },
          { label: 'Driver', value: car.driver, icon: User },
        ];
      default:
        return [];
    }
  };

  const getAmenities = () => {
    if (!item) return [];

    switch (type) {
      case 'bus':
        const bus = item as Bus;
        return bus.amenities || [];
      case 'car':
        const car = item as PrivateCar;
        return car.features || [];
      default:
        return [];
    }
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Complete Your Booking
          </DialogTitle>
          <DialogDescription>
            Please provide your details to confirm your {type} booking.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">{getItemName()}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {getItemDetails().map((detail, index) => {
                const IconComponent = detail.icon;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{detail.label}:</span>
                    <span className="text-sm">{detail.value}</span>
                  </div>
                );
              })}
            </div>

            {getAmenities().length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">
                  {type === 'car' ? 'Features' : 'Amenities'}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {getAmenities().map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-4" />
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-green-600">
                ৳{getItemPrice().toLocaleString()}
              </span>
            </div>
          </div>

          {/* Booking Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Full Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
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
                      <FormLabel className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email Address</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
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
                      <FormLabel className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Phone Number</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+880 1XX XXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Number of Passengers</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Travel Date</span>
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
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requirements or requests..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}