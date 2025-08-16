import { useQuery } from '@tanstack/react-query';
import type { Destination } from '@shared/schema';

interface PopularDestinationsProps {
  selectedDestination: Destination | null;
  setSelectedDestination: React.Dispatch<React.SetStateAction<Destination | null>>;
}

export default function PopularDestinations({ selectedDestination, setSelectedDestination }: PopularDestinationsProps) {
  const { data: destinations = [], isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

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
      className="relative py-24 min-h-[800px] bg-gray-900 flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      
      {/* Empty space for just the background image */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
      </div>
    </section>
  );
}
