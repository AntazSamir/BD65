import { Star } from 'lucide-react';
import { destinations } from '../data/travel-data';

export default function PopularDestinations() {
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
            >
              <img 
                src={destination.imageUrl} 
                alt={destination.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                  <div className="text-primary font-semibold">From ৳{destination.priceFrom}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
