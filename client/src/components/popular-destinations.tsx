import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { Destination } from '@shared/schema';

export default function PopularDestinations() {
  const { data: destinations = [], isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Set first destination as default background when data loads
  useEffect(() => {
    if (destinations.length > 0 && !selectedDestination) {
      setSelectedDestination(destinations[0]);
    }
  }, [destinations, selectedDestination]);

  if (isLoading) {
    return (
      <section id="destinations" className="relative py-24 min-h-[600px] bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Destinations</h2>
            <p className="text-xl text-white/90">Explore the world's most breathtaking locations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-64 bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="destinations" className="relative py-24 min-h-[600px] bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Destinations</h2>
            <p className="text-xl text-red-300">Failed to load destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Set default background if none selected
  const backgroundImage = selectedDestination?.imageUrl || destinations[0]?.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080';

  return (
    <section 
      id="destinations" 
      className="relative py-24 min-h-[600px] bg-gray-900"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {selectedDestination && (
            <p className="text-lg text-white/80 font-medium mb-4">
              Currently viewing: {selectedDestination.name}
            </p>
          )}
          <div className="mt-6">
            <Link href="/destinations">
              <button className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 font-medium border border-white/30">
                View All Destinations
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {destinations.slice(0, 4).map((destination) => (
            <div 
              key={destination.id}
              className={`relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedDestination?.id === destination.id 
                  ? 'ring-4 ring-white/50 scale-105' 
                  : 'hover:shadow-2xl'
              }`}
              onClick={() => setSelectedDestination(destination)}
              data-testid={`card-destination-${destination.id}`}
            >
              <img 
                src={destination.imageUrl} 
                alt={destination.name} 
                className="w-full h-40 md:h-64 object-cover transition-transform duration-500"
                data-testid={`img-destination-${destination.id}`}
              />
              {/* Overlay with destination name */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-3 md:p-4 w-full">
                  <h3 className="text-white font-semibold text-sm md:text-lg text-center" data-testid={`text-destination-name-${destination.id}`}>
                    {destination.name}
                  </h3>
                </div>
              </div>
              {/* Selected indicator */}
              {selectedDestination?.id === destination.id && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
