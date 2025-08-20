import { Star, MapPin, ArrowLeft, Users, Calendar, DollarSign, Utensils, Building2, MessageCircle, Camera, Clock, Map, Info, ShoppingBag, UtensilsCrossed, Landmark, Camera as CameraIcon, Heart, Music } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, useLocation, Link } from 'wouter';
import type { Destination, Hotel, Restaurant } from '@shared/schema';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { Button } from '@/components/ui/button';

export default function DestinationDetail() {
  const [, params] = useRoute('/destinations/:id');
  const id = params?.id;
  const [, setLocation] = useLocation();

  const { data: destination, isLoading: destinationLoading, error: destinationError } = useQuery<Destination>({
    queryKey: ['/api/destinations', id],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: hotels = [], isLoading: hotelsLoading } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!destination, // Only fetch when destination is loaded
  });

  const { data: restaurants = [], isLoading: restaurantsLoading } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!destination, // Only fetch when destination is loaded
  });

  if (destinationLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-48 bg-gray-200 rounded-xl"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (destinationError || !destination) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Destination not found</h1>
            <p className="text-gray-600 mb-8">The destination you're looking for doesn't exist.</p>
            <Link href="/destinations">
              <Button>Back to Destinations</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter hotels and restaurants relevant to this destination
  const relevantHotels = hotels.filter(hotel => {
    const hotelLocation = hotel.location.toLowerCase();
    const destinationDistrict = destination.district.toLowerCase();
    const destinationName = destination.name.toLowerCase();
    
    return hotelLocation.includes(destinationDistrict) ||
           hotelLocation.includes(destinationName) ||
           destinationDistrict.includes(hotelLocation.split(' •')[0]?.toLowerCase() || '') ||
           destinationName.includes(hotelLocation.split(' •')[0]?.toLowerCase() || '');
  }).slice(0, 6);

  const relevantRestaurants = restaurants.filter(restaurant => {
    const restaurantLocation = restaurant.location.toLowerCase();
    const destinationDistrict = destination.district.toLowerCase();
    const destinationName = destination.name.toLowerCase();
    
    return restaurantLocation.includes(destinationDistrict) ||
           restaurantLocation.includes(destinationName) ||
           destinationDistrict.includes(restaurantLocation.split(' •')[0]?.toLowerCase() || '') ||
           destinationName.includes(restaurantLocation.split(' •')[0]?.toLowerCase() || '');
  }).slice(0, 6);

  // Generate additional images for gallery based on destination type
  const getDestinationImages = (destination: Destination) => {
    const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';
    
    // Special case for Cox's Bazar - use authentic images
    if (destination.name === "Cox's Bazar") {
      return [
        '/assets/coxs-bazar-main.jpg?v=2',
        '/assets/coxs-bazar-sunset.jpg',
        '/assets/coxs-bazar-aerial.jpg',
        '/assets/coxs-bazar-coastline.webp',
        '/assets/coxs-bazar-crabs.jpg'
      ];
    }
    
    // Special case for Lalbagh Fort - use authentic images
    if (destination.name === 'Lalbagh Fort') {
      return [
        destination.imageUrl || fallbackImage,
        '/assets/lalbagh-fort-sunset.webp',
        '/assets/lalbagh-fort-archway.webp',
        '/assets/lalbagh-fort-aerial.jpg'
      ];
    }
    
    // Special case for Sundarbans - use authentic images
    if (destination.name === 'Sundarbans') {
      return [
        destination.imageUrl || fallbackImage, // Main image with deer
        '/attached_assets/photo-1549300461-11c5b94e8855_1755679381010.jpg', // Peaceful water reflection
        '/attached_assets/5f0ef1e0eb333-Sundarbans_Travel_1755679381011.jpg', // Mangrove waterway
        '/attached_assets/tiger-sundarbans_1755679417997.jpg' // Royal Bengal Tiger
      ];
    }
    
    // Special case for Sylhet Tea Gardens - use authentic images
    if (destination.name === 'Sylhet Tea Gardens') {
      return [
        destination.imageUrl || fallbackImage, // Main image with tea workers
        '/attached_assets/maxresdefault_1755680607560.jpg', // Close-up tea plants with trees
        '/attached_assets/283-2834105_sylhet-tea-garden-bangladesh_1755680607560.jpg', // Aerial view with small house
        '/attached_assets/sylhet-a-tranquil-oasis-of-tea-gardens-waterfalls-and-spiritual-serenity-in-northeast-bangladesh_1755680607561.jpg' // Path through tea garden
      ];
    }
    
    // Special case for Saint Martin Island - use authentic images
    if (destination.name === 'Saint Martin Island') {
      return [
        destination.imageUrl || fallbackImage, // Main image with palm tree and boats
        '/attached_assets/Saint-Martin-Island-Bangladesh-5_1755681418236.jpg', // Single boat on beach
        '/attached_assets/Saint_Martins_Island_with_boats_in_foreground_1755681418237.jpg', // Multiple boats with beach
        '/attached_assets/sunset-naf-river-2048x1152_1755681418238.jpg' // Golden sunset over water
      ];
    }
    
    const baseImages = [
      destination.imageUrl || fallbackImage,
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    ];
    return baseImages;
  };

  // Get detailed information based on destination
  const getDestinationDetails = (destination: Destination) => {
    const details = {
      history: `${destination.name} has a rich history spanning centuries. This magnificent destination showcases the cultural heritage and natural beauty that Bangladesh is renowned for. From ancient architectural marvels to pristine natural landscapes, this location offers visitors a glimpse into the country's diverse cultural tapestry.`,
      
      bestTime: destination.name.toLowerCase().includes('beach') || destination.name.toLowerCase().includes('sea') 
        ? "October to March is the ideal time to visit, with pleasant weather and calm seas perfect for beach activities."
        : destination.name.toLowerCase().includes('hill') || destination.name.toLowerCase().includes('valley')
        ? "November to February offers the best weather with clear skies and comfortable temperatures for trekking."
        : "October to April provides the most comfortable weather conditions for sightseeing and outdoor activities.",
      
      thingsToDo: [
        { activity: 'Explore local markets and traditional crafts', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600' },
        { activity: 'Experience authentic Bengali cuisine', icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-600' },
        { activity: 'Visit historical landmarks and monuments', icon: Landmark, color: 'bg-blue-100 text-blue-600' },
        { activity: 'Take scenic photographs of the landscape', icon: CameraIcon, color: 'bg-green-100 text-green-600' },
        { activity: 'Interact with friendly local communities', icon: Heart, color: 'bg-red-100 text-red-600' },
        { activity: 'Enjoy cultural performances and festivals', icon: Music, color: 'bg-yellow-100 text-yellow-600' }
      ],
      
      travelTips: [
        'Carry local currency (Bangladeshi Taka) for small purchases',
        'Respect local customs and dress modestly',
        'Try local street food from reputable vendors',
        'Learn basic Bengali phrases for better interaction',
        'Book accommodations in advance during peak season',
        'Keep emergency contacts and travel documents handy'
      ],
      
      quickFacts: {
        district: destination.district,
        country: destination.country,
        rating: destination.rating,
        priceFrom: destination.priceFrom,
        bestMonths: destination.name.toLowerCase().includes('beach') ? 'Nov-Mar' : 'Oct-Apr',
        duration: '2-3 days recommended'
      }
    };
    return details;
  };

  const destinationImages = getDestinationImages(destination);
  const destinationDetails = getDestinationDetails(destination);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-96 pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${destinationImages[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080'})` 
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <div className="flex items-center justify-center mb-4">
              </div>
              <h1 className="text-5xl font-bold mb-4" data-testid="text-destination-title">{destination.name}</h1>
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-xl">{destination.district}, {destination.country}</span>
              </div>
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-lg">{destination.rating}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-1" />
                  <span className="text-lg">From ৳{destination.priceFrom}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <Camera className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Photo Gallery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinationImages.map((image, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-xl aspect-video group cursor-pointer"
                data-testid={`img-gallery-${index}`}
              >
                <img 
                  src={image} 
                  alt={`${destination.name} view ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About {destination.name}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6" data-testid="text-destination-description">
                {destination.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {destinationDetails.history}
              </p>
            </div>

            {/* Things to Do */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <Map className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Things to Do</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destinationDetails.thingsToDo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-gray-100">
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mr-4 shadow-sm`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-gray-700 font-medium leading-relaxed">{item.activity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Info className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Travel Tips</h3>
              </div>
              <div className="space-y-3">
                {destinationDetails.travelTips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold">{destinationDetails.quickFacts.district}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-semibold">{destinationDetails.quickFacts.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Starting Price</span>
                  <span className="font-semibold text-primary">৳{destinationDetails.quickFacts.priceFrom}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Time</span>
                  <span className="font-semibold">{destinationDetails.quickFacts.bestMonths}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{destinationDetails.quickFacts.duration}</span>
                </div>
              </div>
            </div>

            {/* Best Time to Visit */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-primary mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Best Time to Visit</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{destinationDetails.bestTime}</p>
            </div>
          </div>
        </div>

        {/* Hotels Section - Only show if there are relevant hotels */}
        {(hotelsLoading || relevantHotels.length > 0) && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Building2 className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Hotels & Accommodations in {destination.district}</h2>
            </div>
            
            {hotelsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                    <div className="w-full h-32 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relevantHotels.map((hotel) => (
                  <div 
                    key={hotel.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    data-testid={`card-hotel-${hotel.id}`}
                  >
                    <div className="relative">
                      <img 
                        src={hotel.imageUrl} 
                        alt={hotel.name} 
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-semibold">{hotel.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800" data-testid={`text-hotel-name-${hotel.id}`}>
                        {hotel.name}
                      </h3>
                      
                      <div className="flex items-center mb-3">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{hotel.location}</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2" data-testid={`text-hotel-description-${hotel.id}`}>
                        {hotel.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 3).map((amenity, index) => (
                          <span 
                            key={index} 
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">Per night</p>
                          <p className="text-2xl font-bold text-primary" data-testid={`text-hotel-price-${hotel.id}`}>
                            ৳{hotel.pricePerNight}
                          </p>
                        </div>
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          data-testid={`button-book-hotel-${hotel.id}`}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Restaurants Section */}
        <section>
          <div className="flex items-center mb-8">
            <Utensils className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Restaurants & Dining in {destination.district}</h2>
          </div>
          
          {restaurantsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="w-full h-32 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : relevantRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relevantRestaurants.map((restaurant) => (
                <div 
                  key={restaurant.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  data-testid={`card-restaurant-${restaurant.id}`}
                >
                  <div className="relative">
                    <img 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name} 
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800" data-testid={`text-restaurant-name-${restaurant.id}`}>
                      {restaurant.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{restaurant.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2" data-testid={`text-restaurant-description-${restaurant.id}`}>
                      {restaurant.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-gray-500 block">Cuisine</span>
                        <span className="font-semibold text-primary">{restaurant.cuisine}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Price Range</span>
                        <span className="font-semibold text-green-600">{restaurant.priceRange}</span>
                      </div>
                    </div>
                    
                    {/* Reviews */}
                    {restaurant.reviews.length > 0 && (
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center mb-3">
                          <MessageCircle className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-semibold text-gray-700">Reviews</span>
                        </div>
                        <div className="space-y-2 max-h-24 overflow-y-auto">
                          {restaurant.reviews.slice(0, 2).map((review, index) => (
                            <p 
                              key={index} 
                              className="text-sm text-gray-600 italic"
                              data-testid={`text-restaurant-review-${restaurant.id}-${index}`}
                            >
                              "{review}"
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-500">No restaurants available for this destination</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}