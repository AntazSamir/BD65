import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type { Destination } from '@shared/schema';

export default function PopularDestinations() {
  const { data: destinations = [], isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  if (isLoading) {
    return (
      <section id="destinations" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Destinations</h2>
            <p className="text-xl text-gray-600">Explore the world's most breathtaking locations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
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
      </section>
    );
  }

  if (error) {
    return (
      <section id="destinations" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Destinations</h2>
            <p className="text-xl text-red-600">Failed to load destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600">Explore the world's most breathtaking locations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-testid={`card-destination-${destination.id}`}
            >
              <img 
                src={destination.imageUrl} 
                alt={destination.name} 
                className="w-full h-48 object-cover"
                data-testid={`img-destination-${destination.id}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" data-testid={`text-destination-name-${destination.id}`}>{destination.name}</h3>
                <p className="text-gray-600 mb-4" data-testid={`text-destination-description-${destination.id}`}>{destination.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium" data-testid={`text-destination-rating-${destination.id}`}>{destination.rating}</span>
                  </div>
                  <div className="text-primary font-semibold" data-testid={`text-destination-price-${destination.id}`}>From ৳{destination.priceFrom}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
