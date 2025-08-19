import { Star, MapPin, ArrowLeft, Users, Calendar, DollarSign, Utensils, Building2, MessageCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { Link } from 'wouter';
import type { Destination, Hotel, Restaurant } from '@shared/schema';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { Button } from '@/components/ui/button';

export default function DestinationDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: destination, isLoading: destinationLoading, error: destinationError } = useQuery<Destination>({
    queryKey: ['/api/destinations', id],
  });

  const { data: hotels = [], isLoading: hotelsLoading } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
  });

  const { data: restaurants = [], isLoading: restaurantsLoading } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
  });

  if (destinationLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
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
  const relevantHotels = hotels.filter(hotel => 
    hotel.location.toLowerCase().includes(destination.district.toLowerCase()) ||
    hotel.location.toLowerCase().includes(destination.name.toLowerCase())
  ).slice(0, 6);

  const relevantRestaurants = restaurants.filter(restaurant => 
    restaurant.location.toLowerCase().includes(destination.district.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(destination.name.toLowerCase())
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-96 pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${destination.imageUrl})` 
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <div className="flex items-center justify-center mb-4">
                <Link href="/destinations">
                  <Button variant="ghost" className="text-white hover:bg-white/20 mr-4" data-testid="button-back-destinations">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Destinations
                  </Button>
                </Link>
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
        {/* Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About {destination.name}</h2>
          <p className="text-lg text-gray-600 leading-relaxed" data-testid="text-destination-description">
            {destination.description}
          </p>
        </div>

        {/* Hotels Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Building2 className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Hotels & Accommodations</h2>
          </div>
          
          {hotelsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="w-full h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-8 bg-gray-200 rounded w-24"></div>
                      <div className="h-10 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : relevantHotels.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-500">No hotels available for this destination</p>
            </div>
          )}
        </section>

        {/* Restaurants Section */}
        <section>
          <div className="flex items-center mb-8">
            <Utensils className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Restaurants & Dining</h2>
          </div>
          
          {restaurantsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="w-full h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
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