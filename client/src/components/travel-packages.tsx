import { Star, Plane, Hotel, Utensils, MapPin, Train, Camera, Mountain, TreePine, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { travelPackages } from '../data/travel-data';

export default function TravelPackages() {
  const handleBooking = () => {
    alert('This would navigate to the booking page in a real application.');
  };

  const getIncludeIcon = (include: string) => {
    if (include.includes('flight')) return Plane;
    if (include.includes('resort') || include.includes('hotel')) return Hotel;
    if (include.includes('meal') || include.includes('drink')) return Utensils;
    if (include.includes('countries') || include.includes('cities')) return MapPin;
    if (include.includes('rail')) return Train;
    if (include.includes('tour')) return Camera;
    if (include.includes('mountain') || include.includes('Himalayan')) return Mountain;
    if (include.includes('guide')) return TreePine;
    if (include.includes('lodge') || include.includes('camping')) return Tent;
    return MapPin; // Default icon
  };

  return (
    <section id="packages" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Travel Packages</h2>
          <p className="text-xl text-gray-600">Complete vacation packages designed for every traveler</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={pkg.imageUrl} 
                alt={pkg.name} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm bg-accent text-white px-3 py-1 rounded-full">{pkg.duration}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                
                <div className="space-y-2 mb-4">
                  {pkg.includes.map((include, index) => {
                    const IconComponent = getIncludeIcon(include);
                    return (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <IconComponent className="w-4 h-4 mr-2" />
                        <span>{include}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ${pkg.price}
                    <span className="text-sm text-gray-600 font-normal">/person</span>
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
