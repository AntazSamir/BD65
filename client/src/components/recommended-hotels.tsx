import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hotels } from '../data/travel-data';

export default function RecommendedHotels() {
  const handleBooking = () => {
    alert('This would navigate to the booking page in a real application.');
  };

  return (
    <section id="hotels" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Recommended Hotels</h2>
          <p className="text-xl text-gray-600">Stay at the world's finest accommodations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div 
              key={hotel.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img 
                src={hotel.imageUrl} 
                alt={hotel.name} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{hotel.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{hotel.location}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ${hotel.pricePerNight}
                    <span className="text-sm text-gray-600 font-normal">/night</span>
                  </div>
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={handleBooking}
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
