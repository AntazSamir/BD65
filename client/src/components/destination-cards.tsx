import { useQuery } from '@tanstack/react-query';
import type { Destination } from '@shared/schema';

interface DestinationCardsProps {
  selectedDestination: Destination | null;
  setSelectedDestination: (destination: Destination) => void;
}

export default function DestinationCards({ selectedDestination, setSelectedDestination }: DestinationCardsProps) {
  const { data: destinations = [], isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-32 md:h-48 bg-gray-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <div className="p-3 md:p-4 w-full">
                    <div className="h-4 bg-gray-400 rounded w-2/3 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-gray-600">No destinations available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 section-bg-cool">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {destinations.slice(0, 4).map((destination) => (
            <div 
              key={destination.id}
              className={`relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedDestination?.id === destination.id 
                  ? 'ring-4 ring-primary/50 scale-105' 
                  : 'hover:shadow-2xl'
              }`}
              onClick={() => setSelectedDestination(destination)}
              data-testid={`card-destination-${destination.id}`}
            >
              <img 
                src={destination.imageUrl} 
                alt={destination.name} 
                className="w-full h-32 md:h-48 object-cover transition-transform duration-500"
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
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full shadow-lg"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}