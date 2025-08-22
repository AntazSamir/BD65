import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Hotel } from '@shared/schema';

// Embedded sample data as fallback
const FALLBACK_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Sea Palace Hotel',
    location: "Cox's Bazar • Sea View • Premium Resort",
    description: 'Luxury beachfront hotel overlooking the Bay of Bengal',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.7',
    pricePerNight: 8500,
    phone: '+880-341-64521',
    amenities: ['Sea View', 'Pool', 'Spa', 'Restaurant'],
  },
  {
    id: '2',
    name: 'Pan Pacific Sonargaon',
    location: 'Dhaka • Business District • 5-Star',
    description: 'Premier luxury hotel in the heart of Dhaka',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.8',
    pricePerNight: 12500,
    phone: '+880-2-8833221',
    amenities: ['Business Center', 'Gym', 'Pool', 'Multiple Restaurants'],
  },
  {
    id: '3',
    name: 'Tea Resort Sreemangal',
    location: 'Sreemangal • Tea Garden • Eco Resort',
    description: 'Eco-friendly resort surrounded by lush tea gardens',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.5',
    pricePerNight: 6500,
    phone: '+880-861-71234',
    amenities: ['Garden View', 'Organic Restaurant', 'Nature Walks', 'Tea Tasting'],
  },
  {
    id: '4',
    name: 'Dhaka Regency Hotel',
    location: 'Dhaka • Gulshan • 5-Star',
    description: 'Modern luxury hotel in diplomatic zone',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.6',
    pricePerNight: 9500,
    phone: '+880-2-8881234',
    amenities: ['City View', 'Business Center', 'Spa', 'Fine Dining'],
  },
  {
    id: '5',
    name: 'Hill View Resort Bandarban',
    location: 'Bandarban • Hilltop • Mountain Resort',
    description: 'Mountain resort with panoramic hill views',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    rating: '4.4',
    pricePerNight: 5500,
    phone: '+880-361-62345',
    amenities: ['Mountain View', 'Hiking Trails', 'Tribal Culture', 'Adventure Sports'],
  }
];

export default function RecommendedHotels() {
  const hotels = FALLBACK_HOTELS; // Use embedded data directly

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
