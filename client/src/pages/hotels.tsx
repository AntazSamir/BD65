import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, Star, Wifi, Car, Coffee, Users, X, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import type { Hotel } from '@shared/schema';

export default function Hotels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: hotels = [], isLoading, error } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
  });

  // Filter and sort hotels based on search criteria
  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      const matchesSearch = 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const price = hotel.pricePerNight;
        switch (priceRange) {
          case 'budget':
            matchesPrice = price < 3000;
            break;
          case 'mid':
            matchesPrice = price >= 3000 && price <= 6000;
            break;
          case 'luxury':
            matchesPrice = price > 6000;
            break;
        }
      }
      
      return matchesSearch && matchesPrice;
    });

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'price-low':
          return a.pricePerNight - b.pricePerNight;
        case 'price-high':
          return b.pricePerNight - a.pricePerNight;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [hotels, searchQuery, sortBy, priceRange]);

  const handleBooking = (hotelId: string) => {
    alert(`Booking hotel ${hotelId} - This would navigate to booking page in a real application.`);
  };

  const handleHotelClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedHotel(null);
  };

  // Generate room types for the selected hotel
  const getRoomTypes = (hotel: Hotel) => {
    const basePrice = hotel.pricePerNight;
    return [
      {
        type: 'Standard Room',
        price: basePrice,
        features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'TV'],
        available: Math.floor(Math.random() * 5) + 3,
      },
      {
        type: 'Deluxe Room', 
        price: Math.floor(basePrice * 1.3),
        features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Bar', 'City View'],
        available: Math.floor(Math.random() * 4) + 2,
      },
      {
        type: 'Suite',
        price: Math.floor(basePrice * 1.8),
        features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Bar', 'Ocean View', 'Living Area', 'Balcony'],
        available: Math.floor(Math.random() * 3) + 1,
      },
    ];
  };

  // Generate special offers
  const getSpecialOffers = () => {
    const offers = [
      { title: 'Early Bird Special', discount: '15% off', description: 'Book 30 days in advance' },
      { title: 'Weekend Getaway', discount: '20% off', description: 'Stay 2 nights, get 3rd night free' },
      { title: 'Extended Stay', discount: '25% off', description: 'Stay 7+ nights' },
      { title: 'Family Package', discount: '10% off', description: 'Book for 4+ guests' },
    ];
    // Return 2-3 random offers
    return offers.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2);
  };

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) {
      return <Wifi className="w-4 h-4" />;
    } else if (amenityLower.includes('parking')) {
      return <Car className="w-4 h-4" />;
    } else if (amenityLower.includes('restaurant') || amenityLower.includes('dining')) {
      return <Coffee className="w-4 h-4" />;
    } else {
      return <Users className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                        <div className="h-10 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Hotels</h1>
            <p className="text-gray-600 mb-8">Failed to load hotels. Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="pt-24 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl text-gray-600">
              Discover amazing hotels and accommodations for your next trip
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Search Input */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Hotels
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by name, location, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-hotel-search"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger data-testid="select-sort-by">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger data-testid="select-price-range">
                    <SelectValue placeholder="All prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="budget">Budget (Under ৳3,000)</SelectItem>
                    <SelectItem value="mid">Mid-range (৳3,000-6,000)</SelectItem>
                    <SelectItem value="luxury">Luxury (Above ৳6,000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600" data-testid="text-results-count">
              Showing {filteredAndSortedHotels.length} of {hotels.length} hotels
            </p>
          </div>

          {/* Hotels Grid */}
          {filteredAndSortedHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleHotelClick(hotel)}
                  data-testid={`card-hotel-${hotel.id}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      data-testid={`img-hotel-${hotel.id}`}
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700" data-testid={`text-rating-${hotel.id}`}>
                          {hotel.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1" data-testid={`text-hotel-name-${hotel.id}`}>
                        {hotel.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span data-testid={`text-hotel-location-${hotel.id}`}>{hotel.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2" data-testid={`text-hotel-description-${hotel.id}`}>
                      {hotel.description}
                    </p>

                    {/* Amenities */}
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="flex items-center space-x-1 text-xs"
                              data-testid={`badge-amenity-${hotel.id}-${index}`}
                            >
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </Badge>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{hotel.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-gray-900" data-testid={`text-price-${hotel.id}`}>
                          ৳{hotel.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-gray-600 text-sm">/night</span>
                      </div>
                      <Button
                        onClick={() => handleBooking(hotel.id)}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
                        data-testid={`button-book-${hotel.id}`}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Hotels Found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or filters to find more hotels.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hotel Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedHotel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedHotel.name}</h2>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedHotel.location}</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{selectedHotel.rating}</span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {/* Hotel Image and Info */}
                <div className="space-y-4">
                  <img
                    src={selectedHotel.imageUrl}
                    alt={selectedHotel.name}
                    className="w-full h-64 object-cover rounded-lg"
                    data-testid={`dialog-img-${selectedHotel.id}`}
                  />
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Hotel</h3>
                    <p className="text-gray-700" data-testid={`dialog-description-${selectedHotel.id}`}>
                      {selectedHotel.description}
                    </p>
                  </div>

                  {/* Amenities */}
                  {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Amenities</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedHotel.amenities.map((amenity, index) => (
                          <div 
                            key={index} 
                            className="flex items-center space-x-2 text-sm text-gray-600"
                            data-testid={`dialog-amenity-${selectedHotel.id}-${index}`}
                          >
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Room Types and Offers */}
                <div className="space-y-6">
                  {/* Room Types */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Rooms</h3>
                    <div className="space-y-4">
                      {getRoomTypes(selectedHotel).map((room, index) => (
                        <div 
                          key={index} 
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          data-testid={`dialog-room-${selectedHotel.id}-${index}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{room.type}</h4>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">৳{room.price.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">/night</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {room.features.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-green-600">
                              {room.available} rooms available
                            </span>
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBooking(selectedHotel.id);
                              }}
                              data-testid={`dialog-book-room-${selectedHotel.id}-${index}`}
                            >
                              Select Room
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Special Offers */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                      Special Offers
                    </h3>
                    <div className="space-y-3">
                      {getSpecialOffers().map((offer, index) => (
                        <div 
                          key={index} 
                          className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4"
                          data-testid={`dialog-offer-${selectedHotel.id}-${index}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{offer.title}</h4>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              {offer.discount}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{offer.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Actions */}
                  <div className="pt-4 border-t">
                    <div className="flex space-x-3">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleBooking(selectedHotel.id)}
                        data-testid={`dialog-book-now-${selectedHotel.id}`}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCloseDialog}
                        data-testid={`dialog-close-${selectedHotel.id}`}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}