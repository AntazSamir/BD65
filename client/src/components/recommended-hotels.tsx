import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { Hotel } from '@shared/schema';

export default function RecommendedHotels() {
  const { data: hotels = [], isLoading, error } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <section id="hotels" className="py-8 sm:py-12 lg:py-16 section-bg-soft">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="icon-bg-blue">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Recommended Hotels</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Stay at the world's finest accommodations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm md:shadow-lg animate-pulse">
                <div className="w-full h-40 md:h-48 bg-gray-200"></div>
                <div className="p-3 md:p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
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
      <section id="hotels" className="py-8 sm:py-12 lg:py-16 section-bg-soft">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="icon-bg-blue">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Recommended Hotels</h2>
            <p className="text-base sm:text-lg lg:text-xl text-red-600">Failed to load hotels. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const handleBooking = (hotelId: string) => {
    window.location.href = `/hotel-booking/${hotelId}`;
  };

  return (
    <section id="hotels" className="py-8 sm:py-12 lg:py-16 section-bg-soft">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="icon-bg-blue">
              <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Recommended Hotels</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">Stay at the world's finest accommodations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {hotels.slice(0, 6).map((hotel, index) => (
            <div 
              key={hotel.id}
              className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm md:shadow-lg transition-shadow duration-300 hover:shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-hotel-${hotel.id}`}
            >
              <div className="relative">
                <img 
                  src={hotel.imageUrl} 
                  alt={hotel.name} 
                  className="w-full h-40 md:h-48 object-cover"
                  data-testid={`img-hotel-${hotel.id}`}
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-sm">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium text-gray-800" data-testid={`text-hotel-rating-${hotel.id}`}>{hotel.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-lg font-semibold mb-1 text-gray-900 line-clamp-1" data-testid={`text-hotel-name-${hotel.id}`}>{hotel.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-1" data-testid={`text-hotel-location-${hotel.id}`}>{hotel.location}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg md:text-xl font-bold text-primary" data-testid={`text-hotel-price-${hotel.id}`}>
                      ৳{hotel.pricePerNight}
                    </div>
                    <div className="text-xs text-gray-500">per night</div>
                  </div>
                  <Button 
                    className="bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors hover:bg-primary/90"
                    onClick={() => handleBooking(hotel.id)}
                    data-testid={`button-book-hotel-${hotel.id}`}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Hotels Button */}
        {hotels.length > 6 && (
          <div className="text-center mt-12">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg font-semibold hover-lift"
              onClick={() => window.location.href = '/hotels'}
            >
              View All Hotels
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
