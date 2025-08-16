import { Star, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type { Destination } from '@shared/schema';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Destinations() {
  const { data: destinations = [], isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Explore Bangladesh</h1>
              <p className="text-xl text-gray-600">Discover amazing destinations across Bangladesh</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="w-full h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Explore Bangladesh</h1>
              <p className="text-xl text-red-600">Failed to load destinations. Please try again later.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Explore Bangladesh
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover the natural beauty, rich culture, and historic treasures of Bangladesh. 
            From pristine beaches to ancient ruins, adventure awaits at every corner.
          </p>
          <div className="flex items-center justify-center text-white/80">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">{destinations.length} Amazing Destinations</span>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div 
                key={destination.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                data-testid={`card-destination-${destination.id}`}
              >
                <div className="relative">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className="w-full h-64 object-cover"
                    data-testid={`img-destination-${destination.id}`}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-800" data-testid={`text-destination-rating-${destination.id}`}>
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{destination.country}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800" data-testid={`text-destination-name-${destination.id}`}>
                    {destination.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2" data-testid={`text-destination-description-${destination.id}`}>
                    {destination.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Starting from</p>
                      <p className="text-2xl font-bold text-primary" data-testid={`text-destination-price-${destination.id}`}>
                        ৳{destination.priceFrom}
                      </p>
                    </div>
                    <button 
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                      data-testid={`button-explore-destination-${destination.id}`}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}