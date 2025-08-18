import { Heart, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { Flight } from '@shared/schema';

export default function FlightDeals() {
  const { data: flights = [], isLoading, error } = useQuery<Flight[]>({
    queryKey: ['/api/flights'],
  });

  const handleBookNow = () => {
    alert('This would navigate to the booking page in a real application.');
  };

  // Map flights to destination images
  const getDestinationImage = (destination: string) => {
    const imageMap: { [key: string]: string } = {
      "Cox's Bazar": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "Sylhet": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "Chittagong": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "Jessore": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    };
    return imageMap[destination] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
  };

  if (isLoading) {
    return (
      <section id="flights" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Flight Offer Deals</h2>
            <p className="text-gray-600">Competitive fares for your route-specific searches.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
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
      <section id="flights" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Flight Offer Deals</h2>
            <p className="text-red-600">Failed to load flight deals. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="flights" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-168px] mb-[-168px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Flight Offer Deals</h2>
          <p className="text-gray-600">Competitive fares for your route-specific searches.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {flights.slice(0, 4).map((flight, index) => (
            <div 
              key={flight.id}
              className="bg-white rounded-xl shadow-md hover-lift transition-butter overflow-hidden animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-flight-${flight.id}`}
            >
              {/* Image Section */}
              <div className="relative">
                <img 
                  src={getDestinationImage(flight.destination)} 
                  alt={flight.destination}
                  className="w-full h-48 object-cover transition-butter group-hover:scale-110"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-butter hover-glow">
                  <Heart className="w-4 h-4 text-gray-600 transition-elastic hover:scale-110 hover:text-red-500" />
                </button>
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                {/* Date and Route Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>📅 {flight.departureDate}</span>
                  <span>📅 {flight.returnDate || '16 Jun 2024'}</span>
                </div>
                
                {/* Route */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-semibold text-gray-900">{flight.origin}</div>
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  <div className="text-lg font-semibold text-gray-900">{flight.destination}</div>
                </div>
                
                {/* Class and Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Business</div>
                    <div className="text-lg font-bold text-gray-900">৳{flight.price}</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="text-xs text-gray-500">Business</div>
                    <div className="text-lg font-bold text-gray-900">৳{flight.price}</div>
                  </div>
                </div>
                
                {/* Seats Left and Book Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">18 Seats left</span>
                  <Button 
                    onClick={handleBookNow}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    data-testid={`button-book-flight-${flight.id}`}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex justify-center space-x-4">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
