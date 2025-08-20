import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Search, MapPin, Star, Wifi, Car, Coffee, Users, X, Calendar, CreditCard, Utensils, Building2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Hotel, Restaurant } from '@shared/schema';

export default function Hotels() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState('all');
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMainImage, setCurrentMainImage] = useState<string>('');


  const { data: hotels = [], isLoading: hotelsLoading, error: hotelsError } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
  });

  const { data: restaurants = [], isLoading: restaurantsLoading, error: restaurantsError } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
    enabled: showRestaurants,
  });

  const isLoading = showRestaurants ? restaurantsLoading : hotelsLoading;
  const error = showRestaurants ? restaurantsError : hotelsError;

  // Filter and sort hotels based on search criteria
  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      if (!hotel?.name || !hotel?.location || !hotel?.description) return false;
      
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

  // Filter and sort restaurants based on search criteria
  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = restaurants.filter(restaurant => {
      if (!restaurant?.name || !restaurant?.location || !restaurant?.description || !restaurant?.cuisine) return false;
      
      const matchesSearch = 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const price = restaurant.priceRange.toLowerCase();
        switch (priceRange) {
          case 'budget':
            matchesPrice = price.includes('$') && !price.includes('$$');
            break;
          case 'mid':
            matchesPrice = price.includes('$$') && !price.includes('$$$');
            break;
          case 'luxury':
            matchesPrice = price.includes('$$$');
            break;
        }
      }
      
      return matchesSearch && matchesPrice;
    });

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
        case 'price-high':
          // For restaurants, sort by price range string
          const getPriceLevel = (priceRange: string) => {
            if (priceRange.includes('$$$')) return 3;
            if (priceRange.includes('$$')) return 2;
            return 1;
          };
          const aLevel = getPriceLevel(a.priceRange);
          const bLevel = getPriceLevel(b.priceRange);
          return sortBy === 'price-low' ? aLevel - bLevel : bLevel - aLevel;
        default:
          return 0;
      }
    });

    return filtered;
  }, [restaurants, searchQuery, sortBy, priceRange]);

  const handleBooking = (itemId: string, type: 'hotel' | 'restaurant') => {
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

    // Navigate to booking page instead of opening dialog
    if (type === 'hotel') {
      navigate(`/hotel-booking/${itemId}`);
    } else {
      navigate(`/restaurant-booking/${itemId}`);
    }
  };

  const handleHotelClick = (hotel: Hotel) => {

    setSelectedHotel(hotel);
    setSelectedRestaurant(null);
    setCurrentMainImage(hotel.imageUrl); // Initialize with main hotel image
    setIsDialogOpen(true);
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {

    setSelectedRestaurant(restaurant);
    setSelectedHotel(null);
    setCurrentMainImage(restaurant.imageUrl); // Initialize with main restaurant image
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedHotel(null);
    setSelectedRestaurant(null);
  };

  const handleGalleryImageClick = (imageUrl: string) => {
    setCurrentMainImage(imageUrl);
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

  // Generate additional hotel images including the original hotel image
  const getHotelGalleryImages = (hotel: Hotel) => {
    // Use simpler, more reliable URLs
    const baseImages = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", 
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ];
    
    // Use hotel ID to get consistent images (deterministic selection)
    const seed = hotel.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const selectedIndex = seed % baseImages.length;
    
    // Include the original hotel image first, then additional gallery images
    const result = [
      hotel.imageUrl, // Original hotel image as first option
      baseImages[selectedIndex],
      baseImages[(selectedIndex + 1) % baseImages.length], 
      baseImages[(selectedIndex + 2) % baseImages.length]
    ];
    

    return result;
  };

  // Generate restaurant gallery images
  const getRestaurantGalleryImages = (restaurant: Restaurant) => {
    // Restaurant-specific images
    const baseImages = [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1552566618-dcd3ec399fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ];
    
    // Use restaurant ID to get consistent images
    const seed = restaurant.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const selectedIndex = seed % baseImages.length;
    
    // Include the original restaurant image first, then additional gallery images
    const result = [
      restaurant.imageUrl, // Original restaurant image as first option
      baseImages[selectedIndex],
      baseImages[(selectedIndex + 1) % baseImages.length], 
      baseImages[(selectedIndex + 2) % baseImages.length]
    ];
    

    return result;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-48 h-36 md:w-56 md:h-40 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="flex justify-between items-center pt-2">
                          <div className="h-8 bg-gray-200 rounded w-24"></div>
                          <div className="h-10 bg-gray-200 rounded w-20"></div>
                        </div>
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {showRestaurants ? 'Error Loading Restaurants' : 'Error Loading Hotels'}
            </h1>
            <p className="text-gray-600 mb-8">Failed to load data. Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg-soft">
      <Navigation />
      
      {/* Hero Section with Dynamic Background */}
      <div 
        className="relative pt-24 pb-8 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: showRestaurants 
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/restaurant-hero.jpg')`
            : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/hotel-hero.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="icon-bg-blue">
                {showRestaurants ? <Utensils className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {showRestaurants ? 'Find Amazing Restaurants' : 'Find Your Perfect Stay'}
            </h1>
            <p className="text-xl text-gray-200">
              {showRestaurants 
                ? 'Discover delicious dining experiences and local cuisine'
                : 'Discover amazing hotels and accommodations for your next trip'
              }
            </p>
            
            {/* Toggle between Hotels and Restaurants */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Label className="flex items-center space-x-2 cursor-pointer">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span className={`font-medium ${!showRestaurants ? 'text-blue-400' : 'text-gray-300'}`}>Hotels</span>
              </Label>
              <Switch 
                checked={showRestaurants}
                onCheckedChange={setShowRestaurants}
                data-testid="toggle-restaurants"
                className="data-[state=checked]:bg-orange-400/70 data-[state=unchecked]:bg-blue-400/50 border border-white/30"
              />
              <Label className="flex items-center space-x-2 cursor-pointer">
                <Utensils className="w-5 h-5 text-orange-400" />
                <span className={`font-medium ${showRestaurants ? 'text-orange-400' : 'text-gray-300'}`}>Restaurants</span>
              </Label>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="backdrop-blur-sm bg-white/30 border border-white/40 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Search Input */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-2">
                  {showRestaurants ? 'Search Restaurants' : 'Search Hotels'}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={showRestaurants 
                      ? "Search by name, location, cuisine, or description..."
                      : "Search by name, location, or description..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid={showRestaurants ? "input-restaurant-search" : "input-hotel-search"}
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
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
                <label className="block text-sm font-medium text-white mb-2">
                  Price Range
                </label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger data-testid="select-price-range">
                    <SelectValue placeholder="All prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    {showRestaurants ? (
                      <>
                        <SelectItem value="budget">Budget ($)</SelectItem>
                        <SelectItem value="mid">Mid-range ($$)</SelectItem>
                        <SelectItem value="luxury">Fine Dining ($$$)</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="budget">Budget (Under ৳3,000)</SelectItem>
                        <SelectItem value="mid">Mid-range (৳3,000-6,000)</SelectItem>
                        <SelectItem value="luxury">Luxury (Above ৳6,000)</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          

          {/* Hotels/Restaurants List */}
          {(showRestaurants ? filteredAndSortedRestaurants.length > 0 : filteredAndSortedHotels.length > 0) ? (
            <div className="space-y-4">
              {showRestaurants ? (
                filteredAndSortedRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="elegant-card p-6 cursor-pointer"
                    onClick={() => handleRestaurantClick(restaurant)}
                    data-testid={`card-restaurant-${restaurant.id}`}
                  >
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={restaurant.imageUrl}
                          alt={restaurant.name}
                          className="w-48 h-36 md:w-56 md:h-40 object-cover rounded-lg"
                          data-testid={`img-restaurant-${restaurant.id}`}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid={`text-restaurant-name-${restaurant.id}`}>
                              {restaurant.name}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span data-testid={`text-restaurant-location-${restaurant.id}`}>{restaurant.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Utensils className="w-4 h-4 mr-1" />
                                <span data-testid={`text-restaurant-cuisine-${restaurant.id}`}>{restaurant.cuisine}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                <span data-testid={`text-restaurant-phone-${restaurant.id}`}>{restaurant.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                                <span data-testid={`text-rating-${restaurant.id}`}>{restaurant.rating}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 text-sm mb-3 line-clamp-2" data-testid={`text-restaurant-description-${restaurant.id}`}>
                              {restaurant.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <span className="text-lg font-bold text-gray-900" data-testid={`text-price-${restaurant.id}`}>
                              {restaurant.priceRange}
                            </span>
                            <span className="text-gray-600 text-sm ml-1">per person</span>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBooking(restaurant.id, 'restaurant');
                            }}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
                            data-testid={`button-book-${restaurant.id}`}
                          >
                            Book Table
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                filteredAndSortedHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="elegant-card p-6 cursor-pointer"
                    onClick={() => handleHotelClick(hotel)}
                    data-testid={`card-hotel-${hotel.id}`}
                  >
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={hotel.imageUrl}
                          alt={hotel.name}
                          className="w-48 h-36 md:w-56 md:h-40 object-cover rounded-lg"
                          data-testid={`img-hotel-${hotel.id}`}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid={`text-hotel-name-${hotel.id}`}>
                              {hotel.name}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span data-testid={`text-hotel-location-${hotel.id}`}>{hotel.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                <span data-testid={`text-hotel-phone-${hotel.id}`}>{hotel.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                                <span data-testid={`text-rating-${hotel.id}`}>{hotel.rating}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 text-sm mb-3 line-clamp-2" data-testid={`text-hotel-description-${hotel.id}`}>
                              {hotel.description}
                            </p>
                            
                            {/* Amenities */}
                            {hotel.amenities && hotel.amenities.length > 0 && (
                              <div className="mb-3">
                                <div className="flex flex-wrap gap-2">
                                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
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
                                  {hotel.amenities.length > 4 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{hotel.amenities.length - 4} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <span className="text-2xl font-bold text-gray-900" data-testid={`text-price-${hotel.id}`}>
                              ৳{hotel.pricePerNight.toLocaleString()}
                            </span>
                            <span className="text-gray-600 text-sm">/night</span>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBooking(hotel.id, 'hotel');
                            }}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
                            data-testid={`button-book-${hotel.id}`}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                {showRestaurants ? (
                  <Utensils className="w-8 h-8 text-gray-400" />
                ) : (
                  <Search className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                {showRestaurants ? 'No Restaurants Found' : 'No Hotels Found'}
              </h3>
              <p className="text-gray-500">
                {showRestaurants 
                  ? 'Try adjusting your search criteria or filters to find more restaurants.'
                  : 'Try adjusting your search criteria or filters to find more hotels.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hotel/Restaurant Details Dialog */}
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
                <DialogDescription>
                  View detailed information about {selectedHotel.name}, including room types, amenities, and special offers.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {/* Hotel Image and Info */}
                <div className="space-y-4">
                  <img
                    src={currentMainImage || selectedHotel.imageUrl}
                    alt={selectedHotel.name}
                    className="w-full h-64 object-cover rounded-lg"
                    data-testid={`dialog-img-${selectedHotel.id}`}
                  />

                  {/* Hotel Gallery */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Photo Gallery</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {getHotelGalleryImages(selectedHotel).map((imageUrl, index) => (
                        <img
                          key={`${selectedHotel.id}-gallery-${index}`}
                          src={imageUrl}
                          alt={`${selectedHotel.name} - Interior view ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                          data-testid={`dialog-gallery-${selectedHotel.id}-${index}`}
                          onClick={() => handleGalleryImageClick(imageUrl)}
                          onError={(e) => {
                            e.currentTarget.src = selectedHotel.imageUrl;
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Hotel</h3>
                    <p className="text-gray-700 mb-4" data-testid={`dialog-description-${selectedHotel.id}`}>
                      {selectedHotel.description}
                    </p>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="font-medium mr-2">Phone:</span>
                      <span data-testid={`dialog-phone-${selectedHotel.id}`}>{selectedHotel.phone}</span>
                    </div>
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
                                handleBooking(selectedHotel.id, 'hotel');
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
                        onClick={() => handleBooking(selectedHotel.id, 'hotel')}
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
          
          {selectedRestaurant && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedRestaurant.name}</h2>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedRestaurant.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Utensils className="w-4 h-4 mr-1" />
                      <span>{selectedRestaurant.cuisine}</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{selectedRestaurant.rating}</span>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  View detailed information about {selectedRestaurant.name}, including cuisine type, reviews, and booking options.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {/* Restaurant Image and Info */}
                <div className="space-y-4">
                  <img
                    src={currentMainImage || selectedRestaurant.imageUrl}
                    alt={selectedRestaurant.name}
                    className="w-full h-64 object-cover rounded-lg"
                    data-testid={`dialog-img-${selectedRestaurant.id}`}
                  />

                  {/* Restaurant Gallery */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Photo Gallery</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {getRestaurantGalleryImages(selectedRestaurant).map((imageUrl, index) => (
                        <img
                          key={`${selectedRestaurant.id}-gallery-${index}`}
                          src={imageUrl}
                          alt={`${selectedRestaurant.name} - Interior view ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                          data-testid={`dialog-gallery-${selectedRestaurant.id}-${index}`}
                          onClick={() => handleGalleryImageClick(imageUrl)}
                          onError={(e) => {
                            e.currentTarget.src = selectedRestaurant.imageUrl;
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Restaurant</h3>
                    <p className="text-gray-700 mb-4" data-testid={`dialog-description-${selectedRestaurant.id}`}>
                      {selectedRestaurant.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Cuisine:</span>
                        <p className="text-gray-600">{selectedRestaurant.cuisine}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Price Range:</span>
                        <p className="text-gray-600">{selectedRestaurant.priceRange}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <p className="text-gray-600" data-testid={`dialog-phone-${selectedRestaurant.id}`}>{selectedRestaurant.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu and Features */}
                <div className="space-y-6">
                  {/* Menu Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Utensils className="w-5 h-5 mr-2 text-orange-600" />
                      Menu & Prices
                    </h3>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Popular Dishes */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            Popular Dishes
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Hilsha Fish Curry</span>
                              <span className="font-medium text-gray-900">৳450</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Beef Bhuna</span>
                              <span className="font-medium text-gray-900">৳380</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Chicken Biryani</span>
                              <span className="font-medium text-gray-900">৳320</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Prawn Malaikari</span>
                              <span className="font-medium text-gray-900">৳520</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Mutton Rezala</span>
                              <span className="font-medium text-gray-900">৳420</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Fish Fry (Rui)</span>
                              <span className="font-medium text-gray-900">৳280</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Chicken Roast</span>
                              <span className="font-medium text-gray-900">৳350</span>
                            </div>
                          </div>
                        </div>

                        {/* Traditional Items */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Coffee className="w-4 h-4 mr-1 text-orange-500" />
                            Traditional Items
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Dal with Rice</span>
                              <span className="font-medium text-gray-900">৳180</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Shutki Bhorta</span>
                              <span className="font-medium text-gray-900">৳220</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Panta Ilish</span>
                              <span className="font-medium text-gray-900">৳580</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Mixed Vegetable</span>
                              <span className="font-medium text-gray-900">৳150</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Begun Bhaja</span>
                              <span className="font-medium text-gray-900">৳120</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Aloo Posto</span>
                              <span className="font-medium text-gray-900">৳140</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Shorshe Maach</span>
                              <span className="font-medium text-gray-900">৳390</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Categories */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-4 border-t border-orange-200">
                        {/* Rice & Bread */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Coffee className="w-4 h-4 mr-1 text-green-500" />
                            Rice & Bread
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Kacchi Biryani</span>
                              <span className="font-medium text-gray-900">৳450</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Polao with Chicken</span>
                              <span className="font-medium text-gray-900">৳280</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Plain Rice</span>
                              <span className="font-medium text-gray-900">৳60</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Naan</span>
                              <span className="font-medium text-gray-900">৳45</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Paratha</span>
                              <span className="font-medium text-gray-900">৳35</span>
                            </div>
                          </div>
                        </div>

                        {/* Desserts & Drinks */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Star className="w-4 h-4 mr-1 text-pink-500" />
                            Desserts & Drinks
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Mishti Doi</span>
                              <span className="font-medium text-gray-900">৳80</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Rasgulla</span>
                              <span className="font-medium text-gray-900">৳90</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Kheer</span>
                              <span className="font-medium text-gray-900">৳70</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Cha (Tea)</span>
                              <span className="font-medium text-gray-900">৳25</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Lassi</span>
                              <span className="font-medium text-gray-900">৳65</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Special Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Coffee className="w-5 h-5 mr-2 text-orange-600" />
                      Restaurant Features
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">Authentic Local Cuisine</h4>
                          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                            Featured
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Experience traditional flavors prepared by expert chefs</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">Fresh Ingredients</h4>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Quality
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Daily sourced local ingredients for maximum freshness</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Reviews */}
                  {selectedRestaurant.reviews && selectedRestaurant.reviews.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedRestaurant.reviews.map((review, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-50 rounded-lg p-3"
                            data-testid={`dialog-review-${selectedRestaurant.id}-${index}`}
                          >
                            <p className="text-sm text-gray-700 italic">"{review}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Booking Actions */}
                  <div className="pt-4 border-t">
                    <div className="flex space-x-3">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleBooking(selectedRestaurant.id, 'restaurant')}
                        data-testid={`dialog-book-now-${selectedRestaurant.id}`}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Table
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCloseDialog}
                        data-testid={`dialog-close-${selectedRestaurant.id}`}
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