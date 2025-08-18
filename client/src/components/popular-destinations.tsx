import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import type { Destination } from '@shared/schema';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PopularDestinationsProps {
  selectedDestination: Destination | null;
  setSelectedDestination: React.Dispatch<React.SetStateAction<Destination | null>>;
}

export default function PopularDestinations({ selectedDestination, setSelectedDestination }: PopularDestinationsProps) {
  const { data: destinations = [], isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const [currentIndex, setCurrentIndex] = useState(7); // Start with Kuakata Beach (index 7)
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-sliding functionality
  useEffect(() => {
    if (isAutoSliding && destinations.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoSliding, destinations.length]);

  // Update background when current index changes
  useEffect(() => {
    if (destinations.length > 0) {
      setSelectedDestination(destinations[currentIndex]);
    }
  }, [currentIndex, destinations, setSelectedDestination]);

  // Manual navigation functions
  const goToPrevious = () => {
    setIsAutoSliding(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
    // Resume auto-sliding after 10 seconds
    setTimeout(() => setIsAutoSliding(true), 10000);
  };

  const goToNext = () => {
    setIsAutoSliding(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
    // Resume auto-sliding after 10 seconds
    setTimeout(() => setIsAutoSliding(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoSliding(false);
    setCurrentIndex(index);
    setSelectedDestination(destinations[index]);
    // Resume auto-sliding after 10 seconds
    setTimeout(() => setIsAutoSliding(true), 10000);
  };

  // Get visible cards (7 cards with center one highlighted)
  const getVisibleCards = () => {
    if (destinations.length === 0) return [];
    
    const visibleCards = [];
    const totalCards = Math.min(7, destinations.length);
    const startOffset = Math.floor(totalCards / 2);
    
    for (let i = 0; i < totalCards; i++) {
      const index = (currentIndex - startOffset + i + destinations.length) % destinations.length;
      visibleCards.push({
        destination: destinations[index],
        position: i - startOffset, // -3, -2, -1, 0, 1, 2, 3
        index: index
      });
    }
    
    return visibleCards;
  };

  if (isLoading) {
    return (
      <section id="destinations" className="relative py-24 min-h-[800px] bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Destinations</h2>
            <p className="text-xl text-white/90">Explore the world's most breathtaking locations</p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-48 h-64 bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="destinations" className="relative py-24 min-h-[800px] bg-gray-50">
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

  // Set background image from the center card
  const backgroundImage = selectedDestination?.imageUrl || destinations[0]?.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080';
  const visibleCards = getVisibleCards();

  return (
    <section 
      id="destinations" 
      className="relative py-24 min-h-[800px] bg-gray-900 flex flex-col transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      {/* Title section */}
      <div className="relative z-10 text-center mb-16 pt-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="title-popular-destinations">
          Popular Destinations
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto" data-testid="subtitle-popular-destinations">
          Discover Bangladesh's most breathtaking locations and hidden gems
        </p>
      </div>
      {/* Spacer to push cards to bottom */}
      <div className="flex-1"></div>
      {/* Carousel section */}
      <div className="relative z-10 mt-[-134px] mb-[-134px] pt-[34px] pb-[34px] pl-[0px] pr-[0px] ml-[-13px] mr-[-13px]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Cards container */}
          <div className="flex justify-center items-end space-x-2 px-16">
            {visibleCards.map(({ destination, position, index }) => {
              const isCenterCard = position === 0;
              const cardScale = isCenterCard ? 'scale-110' : Math.abs(position) === 1 ? 'scale-95' : Math.abs(position) === 2 ? 'scale-85' : 'scale-75';
              const cardOpacity = isCenterCard ? 'opacity-100' : Math.abs(position) === 1 ? 'opacity-80' : Math.abs(position) === 2 ? 'opacity-60' : 'opacity-40';
              const cardHeight = isCenterCard ? 'h-56' : Math.abs(position) === 1 ? 'h-48' : Math.abs(position) === 2 ? 'h-40' : 'h-32';
              const cardWidth = isCenterCard ? 'w-40' : Math.abs(position) === 1 ? 'w-32' : Math.abs(position) === 2 ? 'w-28' : 'w-24';
              
              return (
                <div
                  key={destination.id}
                  className={`relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-700 transform ${cardScale} ${cardOpacity} ${cardHeight} ${cardWidth} ${
                    isCenterCard ? 'ring-4 ring-white/50 z-10' : 'hover:scale-100 hover:opacity-90'
                  }`}
                  onClick={() => goToSlide(index)}
                  data-testid={`card-destination-${destination.id}`}
                >
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform duration-700"
                    data-testid={`img-destination-${destination.id}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080';
                    }}
                  />
                  
                  {/* Overlay with destination name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-semibold text-lg text-center" data-testid={`text-destination-name-${destination.id}`}>
                        {destination.name}
                      </h3>
                      {isCenterCard && (
                        <p className="text-white/80 text-sm text-center mt-1">{destination.district}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Center card indicator */}
                  {isCenterCard && (
                    <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {destinations.slice(0, Math.min(10, destinations.length)).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                data-testid={`dot-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
