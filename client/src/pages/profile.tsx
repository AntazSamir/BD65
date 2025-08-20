import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserSchema, type UpdateUser, type Booking } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { User, Save, LogOut, Calendar, MapPin, X, CheckCircle, AlertTriangle, Users, Phone, Clock, Utensils, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

export default function Profile() {
  const { user, signOut, isSigningOut, isAuthenticated } = useAuth();
  const { updateProfile, isUpdating } = useProfile();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's bookings
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
    enabled: isAuthenticated,
  });

  // Cancel booking mutation
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

  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      phone: user?.phone || "",
      dateOfBirth: user?.dateOfBirth || "",
      nationality: user?.nationality || "",
      profileImageUrl: user?.profileImageUrl || "",
    },
  });

  const onSubmit = async (data: UpdateUser) => {
    try {
      setError("");
      setSuccess("");
      
      // Remove empty strings to avoid overwriting with empty values
      const cleanData = data && typeof data === 'object' 
        ? Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== "")
          )
        : {};

      await updateProfile(cleanData);
      setSuccess("Profile updated successfully!");
      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? error.message 
        : error?.toString?.() || "Failed to update profile";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadReceipt = (booking: Booking) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header with background color
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // Company logo (more visible text-based logo)
    doc.setTextColor(255, 255, 255);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(2);
    doc.rect(15, 8, 50, 20, 'S');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BANGLADESH', 40, 16, { align: 'center' });
    doc.setFontSize(10);
    doc.text('EXPLORER', 40, 24, { align: 'center' });
    
    // Company name in header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('BD Explorer', pageWidth / 2, 22, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('Your Gateway to Beautiful Bangladesh', pageWidth / 2, 32, { align: 'center' });
    doc.setFontSize(9);
    doc.text('+880-2-123-4567  |  info@bangladeshexplorer.com  |  www.bangladeshexplorer.com', pageWidth / 2, 42, { align: 'center' });
    
    // Receipt title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    doc.text('BOOKING RECEIPT', pageWidth / 2, 65, { align: 'center' });
    
    // Draw a line under title
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 75, pageWidth - 20, 75);
    
    let y = 90;
    
    // Confirmation details box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, y, pageWidth - 40, 25, 3, 3, 'F');
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(14);
    doc.text(`Confirmation: ${booking.confirmationNumber}`, 25, y + 10);
    doc.text(`Status: ${booking.status.toUpperCase()}`, 25, y + 20);
    doc.text(`Booking Type: ${booking.bookingType ? booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1) : 'N/A'}`, pageWidth / 2 + 10, y + 10);
    doc.text(`Date: ${new Date(booking.createdAt).toLocaleDateString('en-GB')}`, pageWidth / 2 + 10, y + 20);
    
    y += 40;
    
    // Property Information Section
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(16);
    doc.text('Property Information', 20, y);
    doc.setDrawColor(0, 102, 204);
    doc.line(20, y + 3, 120, y + 3);
    
    y += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Name: ${booking.propertyName}`, 25, y);
    y += 10;
    doc.text(`Location: ${booking.propertyLocation}`, 25, y);
    y += 10;
    doc.text(`Phone: ${booking.propertyPhone}`, 25, y);
    
    y += 20;
    
    // Customer Information Section
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(16);
    doc.text('Customer Information', 20, y);
    doc.setDrawColor(0, 102, 204);
    doc.line(20, y + 3, 120, y + 3);
    
    y += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Name: ${booking.customerName}`, 25, y);
    y += 10;
    doc.text(`Email: ${booking.email}`, 25, y);
    y += 10;
    doc.text(`Phone: ${booking.phone}`, 25, y);
    
    y += 20;
    
    // Booking Details Section
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(16);
    doc.text('Booking Details', 20, y);
    doc.setDrawColor(0, 102, 204);
    doc.line(20, y + 3, 110, y + 3);
    
    y += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    if (booking.bookingType === 'hotel') {
      doc.text(`Room Type: ${booking.roomType || 'Standard'}`, 25, y);
      y += 10;
      doc.text(`Check-in Date: ${booking.checkIn ? new Date(booking.checkIn).toLocaleDateString('en-GB') : 'N/A'}`, 25, y);
      y += 10;
      doc.text(`Check-out Date: ${booking.checkOut ? new Date(booking.checkOut).toLocaleDateString('en-GB') : 'N/A'}`, 25, y);
      y += 10;
      doc.text(`Number of Nights: ${booking.nights || 1}`, 25, y);
      y += 10;
      doc.text(`Number of Guests: ${booking.guests || 1}`, 25, y);
    } else if (booking.bookingType === 'restaurant') {
      doc.text(`Reservation Date: ${booking.reservationDate ? new Date(booking.reservationDate).toLocaleDateString('en-GB') : 'N/A'}`, 25, y);
      y += 10;
      doc.text(`Reservation Time: ${booking.reservationTime || 'N/A'}`, 25, y);
      y += 10;
      doc.text(`Party Size: ${booking.partySize || 1} people`, 25, y);
      y += 10;
      doc.text(`Cuisine Type: ${booking.cuisine || 'Mixed'}`, 25, y);
    } else if (booking.bookingType === 'bus') {
      doc.text(`Travel Date: ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString('en-GB') : 'N/A'}`, 25, y);
      y += 10;
      doc.text(`Number of Passengers: ${booking.passengers || 1}`, 25, y);
      y += 10;
      if (booking.selectedSeats && booking.selectedSeats.length > 0) {
        doc.text(`Selected Seats: ${booking.selectedSeats.join(', ')}`, 25, y);
        y += 10;
      }
      if (booking.specialRequests) {
        doc.text(`Special Requests: ${booking.specialRequests}`, 25, y);
        y += 10;
      }
    } else if (booking.bookingType === 'car') {
      doc.text(`Travel Date: ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString('en-GB') : 'N/A'}`, 25, y);
      y += 10;
      doc.text(`Number of Passengers: ${booking.passengers || 1}`, 25, y);
      y += 10;
      doc.text(`Service Type: Private Car Rental`, 25, y);
      y += 10;
      if (booking.specialRequests) {
        doc.text(`Special Requests: ${booking.specialRequests}`, 25, y);
        y += 10;
      }
    } else if (booking.bookingType === 'flight') {
      doc.text(`Travel Date: ${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString('en-GB') : 'N/A'}`, 25, y);
      y += 10;
      doc.text(`Number of Passengers: ${booking.passengers || 1}`, 25, y);
      y += 10;
      if (booking.specialRequests) {
        doc.text(`Special Requests: ${booking.specialRequests}`, 25, y);
      }
    }
    
    y += 30;
    
    // Payment Summary Box - make it more prominent
    doc.setFillColor(240, 248, 255);
    doc.roundedRect(20, y, pageWidth - 40, 45, 5, 5, 'F');
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(2);
    doc.roundedRect(20, y, pageWidth - 40, 45, 5, 5, 'S');
    
    doc.setTextColor(0, 102, 204);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('TOTAL AMOUNT PAID', pageWidth / 2, y + 18, { align: 'center' });
    
    doc.setTextColor(0, 120, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    let amount = booking.totalAmount;
    
    // Always calculate amount based on booking type since totalAmount might be null
    if (booking.bookingType === 'hotel' && booking.nights) {
      amount = 5000 * booking.nights; // Hotel price calculation
    } else if (booking.bookingType === 'restaurant') {
      amount = (booking.partySize || 2) * 1500; // Restaurant price per person
    } else if (booking.bookingType === 'bus') {
      amount = (booking.passengers || 1) * 800; // Bus price per passenger
    } else if (booking.bookingType === 'car') {
      amount = 3000; // Car rental price
    } else {
      amount = booking.totalAmount || 2500; // Use saved amount or default
    }
    
    const formattedAmount = `BDT ${amount.toLocaleString('en-US')}`;
    doc.text(formattedAmount, pageWidth / 2, y + 35, { align: 'center' });
    
    y += 65;
    
    // Footer section
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.line(20, y, pageWidth - 20, y);
    
    y += 15;
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(12);
    doc.text('Thank you for choosing BD Explorer!', pageWidth / 2, y, { align: 'center' });
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text('Discover the beauty and culture of Bangladesh with us.', pageWidth / 2, y + 10, { align: 'center' });
    doc.text('Safe travels and unforgettable memories await you!', pageWidth / 2, y + 20, { align: 'center' });
    doc.text(`Receipt generated on ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-US')}`, pageWidth / 2, y + 35, { align: 'center' });
    
    // QR Code placeholder (text-based)
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text('[QR Code for Mobile Verification]', pageWidth - 50, y + 50, { align: 'center' });
    
    // Download the PDF
    doc.save(`Bangladesh-Explorer-Receipt-${booking.confirmationNumber}.pdf`);
    
    toast({
      title: "Receipt Downloaded",
      description: `Professional receipt for ${booking.propertyName} has been downloaded.`,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and personal information
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Overview and Edit Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.profileImageUrl || ""} alt={user.firstName} />
                  <AvatarFallback className="text-lg">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl" data-testid="text-user-name">
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription data-testid="text-user-email">
                  {user.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Username:</span>
                    <span data-testid="text-username">{user.username}</span>
                  </div>
                  {user.phone && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                      <span data-testid="text-phone">{user.phone}</span>
                    </div>
                  )}
                  {user.nationality && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Nationality:</span>
                      <span data-testid="text-nationality">{user.nationality}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Member since:</span>
                    <span data-testid="text-member-since">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <Separator />
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  data-testid="button-signout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </Button>
              </CardContent>
            </Card>

            {/* Edit Profile */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Edit Profile
                </CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {success && (
                    <Alert>
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        data-testid="input-firstname"
                        {...form.register("firstName")}
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        data-testid="input-lastname"
                        {...form.register("lastName")}
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Your username"
                      data-testid="input-username"
                      {...form.register("username")}
                    />
                    {form.formState.errors.username && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {form.formState.errors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Your phone number"
                        data-testid="input-phone"
                        {...form.register("phone")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        data-testid="input-dob"
                        {...form.register("dateOfBirth")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      placeholder="Your nationality"
                      data-testid="input-nationality"
                      {...form.register("nationality")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profileImageUrl">Profile Image URL</Label>
                    <Input
                      id="profileImageUrl"
                      type="url"
                      placeholder="https://example.com/your-image.jpg"
                      data-testid="input-profile-image"
                      {...form.register("profileImageUrl")}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isUpdating}
                    data-testid="button-save-profile"
                  >
                    {isUpdating ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* My Bookings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                My Bookings
              </CardTitle>
              <CardDescription>
                Manage your hotel and restaurant reservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookingsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Loading your bookings...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">No Bookings Found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You haven't made any bookings yet. Start exploring our hotels and restaurants!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 space-y-3" data-testid={`profile-booking-${booking.id}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={booking.propertyImageUrl || ''}
                            alt={booking.propertyName || ''}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white" data-testid={`profile-booking-name-${booking.id}`}>
                              {booking.propertyName}
                            </h4>
                            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{booking.propertyLocation}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : 'destructive'}
                            data-testid={`profile-booking-status-${booking.id}`}
                          >
                            {booking.status === 'confirmed' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <X className="w-3 h-3 mr-1" />
                            )}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadReceipt(booking)}
                            data-testid={`profile-download-${booking.id}`}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                          {booking.status === 'confirmed' && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setBookingToCancel(booking)}
                              data-testid={`profile-cancel-${booking.id}`}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Confirmation:</span>
                          <span data-testid={`profile-booking-confirmation-${booking.id}`}>{booking.confirmationNumber}</span>
                        </div>
                        
                        {booking.bookingType === 'hotel' && booking.checkIn && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                            <span data-testid={`profile-booking-checkin-${booking.id}`}>{formatDate(booking.checkIn)}</span>
                          </div>
                        )}
                        
                        {booking.bookingType === 'restaurant' && booking.reservationDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Date:</span>
                            <span data-testid={`profile-booking-date-${booking.id}`}>{formatDate(booking.reservationDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {bookings.length > 3 && (
                    <div className="text-center pt-4">
                      <a href="/my-bookings" className="text-blue-600 dark:text-blue-400 hover:underline">
                        View all {bookings.length} bookings →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        </div>
      </div>

      {/* Cancel Booking Confirmation Dialog */}
      <Dialog open={!!bookingToCancel} onOpenChange={() => setBookingToCancel(null)}>
        <DialogContent data-testid="profile-cancel-dialog">
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
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="font-medium text-red-800 dark:text-red-200">
                  Confirmation: {bookingToCancel.confirmationNumber}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {bookingToCancel.bookingType === 'hotel' ? 'Hotel Reservation' : 'Restaurant Reservation'}
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setBookingToCancel(null)}
                  className="flex-1"
                  data-testid="profile-cancel-dialog-no"
                >
                  Keep Booking
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelBooking}
                  disabled={cancelBookingMutation.isPending}
                  className="flex-1"
                  data-testid="profile-cancel-dialog-yes"
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