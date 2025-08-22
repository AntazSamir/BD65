import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import type { Destination } from '@shared/schema';

// Embedded sample data as fallback
const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: "Cox's Bazar",
    country: 'Bangladesh',
    district: "Cox's Bazar",
    description: "World's longest natural sandy sea beach",
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    priceFrom: 3500,
  },
  {
    id: '2',
    name: 'Sundarbans',
    country: 'Bangladesh',
    district: 'Khulna',
    description: 'Largest mangrove forest and Royal Bengal Tiger habitat',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.9',
    priceFrom: 4500,
  },
  {
    id: '3',
    name: 'Sylhet Tea Gardens',
    country: 'Bangladesh',
    district: 'Sylhet',
    description: 'Rolling green hills covered with tea plantations',
    imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    priceFrom: 2800,
  },
  {
    id: '4',
    name: 'Bandarban',
    country: 'Bangladesh',
    district: 'Bandarban',
    description: 'Hill district with tribal culture, natural beauty and adventure activities',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    priceFrom: 3500,
  },
  {
    id: '5',
    name: 'Saint Martin Island',
    country: 'Bangladesh',
    district: "Cox's Bazar",
    description: 'Small coral island with pristine beaches and clear blue waters',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    priceFrom: 5200,
  },
  {
    id: '6',
    name: 'Srimangal',
    country: 'Bangladesh',
    district: 'Moulvibazar',
    description: 'Tea capital of Bangladesh with seven-layer tea and rainforest',
    imageUrl: 'https://images.unsplash.com/photo-1627813303514-4e6a628b3bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    priceFrom: 2600,
  }
];

interface PopularDestinationsProps {
  selectedDestination: Destination | null;
  setSelectedDestination: React.Dispatch<React.SetStateAction<Destination | null>>;
}

export default function PopularDestinations({ selectedDestination, setSelectedDestination }: PopularDestinationsProps) {
  const [, setLocation] = useLocation();
  const destinations = FALLBACK_DESTINATIONS; // Use embedded data directly

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-sliding functionality
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isAutoSliding && destinations.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (destinations.length === 0) return 0;
          return (prevIndex + 1) % destinations.length;
        });
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoSliding, destinations.length]);

  // Cleanup function for component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update background when current index changes
  useEffect(() => {
    if (destinations.length > 0 && currentIndex >= 0 && currentIndex < destinations.length) {
      setSelectedDestination(destinations[currentIndex]);
    }
  }, [currentIndex, destinations, setSelectedDestination]);

  // Manual navigation functions
  const goToPrevious = () => {
    setIsAutoSliding(false);
    setCurrentIndex((prevIndex) => {
      if (destinations.length === 0) return 0;
      return prevIndex === 0 ? destinations.length - 1 : prevIndex - 1;
    });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsAutoSliding(true), 10000);
  };

  const goToNext = () => {
    setIsAutoSliding(false);
    setCurrentIndex((prevIndex) => {
      if (destinations.length === 0) return 0;
      return (prevIndex + 1) % destinations.length;
    });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsAutoSliding(true), 6000);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < destinations.length && destinations[index]) {
      setIsAutoSliding(false);
      setCurrentIndex(index);
      setSelectedDestination(destinations[index]);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setIsAutoSliding(true), 10000);
    }
  };

  // Get visible cards (7 cards with center one highlighted)
  const getVisibleCards = () => {
    if (destinations.length === 0) return [];
    
    const visibleCards = [];
    const totalCards = Math.min(7, destinations.length);
    const startOffset = Math.floor(totalCards / 2);
    
    for (let i = 0; i < totalCards; i++) {
      const index = (currentIndex - startOffset + i + destinations.length) % destinations.length;
      
      if (index >= 0 && index < destinations.length && destinations[index]) {
        visibleCards.push({
          destination: destinations[index],
          position: i - startOffset, // -3, -2, -1, 0, 1, 2, 3
          index: index
        });
      }
    }
    
    return visibleCards;
  };

  // Set background image from the center card
  const backgroundImage = selectedDestination?.imageUrl || destinations[0]?.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080';
  const visibleCards = getVisibleCards();

  return (
    <section 
      id="destinations" 
      className="relative py-24 min-h-[800px] bg-gray-900 flex flex-col will-change-transform transition-all duration-700 ease-out"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      
      {/* Currently viewing text in top left */}
      {visibleCards.find(card => card.position === 0) && (
        <div className="absolute top-6 left-6 z-20">
          <p className="text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded-lg">
            Currently viewing: {visibleCards.find(card => card.position === 0)?.destination.name}
          </p>
        </div>
      )}
      
      {/* Spacer to push cards to bottom */}
      <div className="flex-1"></div>
      
      {/* Carousel section */}
      <div className="relative z-10 mt-[-134px] mb-[-134px] pt-[34px] pb-[34px] pl-[0px] pr-[0px] ml-[-13px] mr-[-13px]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {/* Cards container */}
          <div className="flex justify-center items-end space-x-1 sm:space-x-2 px-4 sm:px-8 lg:px-16 perspective-1000 overflow-x-auto">
            {visibleCards.map(({ destination, position, index }) => {
              const isCenterCard = position === 0;
              const cardScale = isCenterCard ? 'scale-110' : Math.abs(position) === 1 ? 'scale-95' : Math.abs(position) === 2 ? 'scale-85' : 'scale-75';
              const cardOpacity = isCenterCard ? 'opacity-100' : Math.abs(position) === 1 ? 'opacity-85' : Math.abs(position) === 2 ? 'opacity-70' : 'opacity-50';
              const cardHeight = isCenterCard 
                ? 'h-48' 
                : Math.abs(position) === 1 
                  ? 'h-40' 
                  : Math.abs(position) === 2 
                    ? 'h-32' 
                    : 'h-24';
              const cardWidth = isCenterCard 
                ? 'w-36' 
                : Math.abs(position) === 1 
                  ? 'w-28' 
                  : Math.abs(position) === 2 
                    ? 'w-24' 
                    : 'w-20';
              const cardBlur = Math.abs(position) > 1 ? 'blur-[1px]' : '';
              const cardBrightness = isCenterCard ? 'brightness-100' : Math.abs(position) === 1 ? 'brightness-95' : 'brightness-90';
              
              return (
                <div
                  key={destination.id}
                  className={`relative rounded-2xl overflow-hidden shadow-2xl carousel-card-fast cursor-pointer hover:scale-105 transition-transform ${cardScale} ${cardOpacity} ${cardHeight} ${cardWidth} ${cardBlur} ${cardBrightness} ${
                    isCenterCard ? 'ring-4 ring-white/50 z-10' : ''
                  }`}
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                  }}
                  onClick={() => goToSlide(index)}
                  data-testid={`card-destination-${destination.id}`}
                >
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className="w-full h-full object-cover smooth-gpu"
                    data-testid={`img-destination-${destination.id}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('placeholder')) {
                        target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';
                      }
                    }}
                  />
                  
                  {/* Overlay with destination name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end carousel-card-fast">
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
                    <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full shadow-lg carousel-card-fast"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
