import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { Hotel } from '@shared/schema';

export default function RecommendedHotels() {
  const { data: hotels = [], isLoading, error } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
  });

  const handleBooking = () => {
    alert('This would navigate to the booking page in a real application.');
  };

  if (isLoading) {
    return (
      <section id="hotels" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Recommended Hotels</h2>
            <p className="text-xl text-gray-600">Stay at the world's finest accommodations</p>
          </div>
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
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="hotels" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Recommended Hotels</h2>
            <p className="text-xl text-red-600">Failed to load hotels. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hotels" className="py-16 section-bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="icon-bg-blue">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Recommended Hotels</h2>
          <p className="text-xl text-gray-600">Stay at the world's finest accommodations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div 
              key={hotel.id}
              className="elegant-card overflow-hidden animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-hotel-${hotel.id}`}
            >
              <img 
                src={hotel.imageUrl} 
                alt={hotel.name} 
                className="w-full h-56 object-cover transition-butter group-hover:scale-110"
                data-testid={`img-hotel-${hotel.id}`}
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold" data-testid={`text-hotel-name-${hotel.id}`}>{hotel.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium" data-testid={`text-hotel-rating-${hotel.id}`}>{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4" data-testid={`text-hotel-location-${hotel.id}`}>{hotel.location}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary" data-testid={`text-hotel-price-${hotel.id}`}>
                    ৳{hotel.pricePerNight}
                    <span className="text-sm text-gray-600 font-normal">/night</span>
                  </div>
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={handleBooking}
                    data-testid={`button-book-hotel-${hotel.id}`}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
