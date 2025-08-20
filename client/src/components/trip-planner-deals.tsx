import { Heart, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { TripPlanner } from '@shared/schema';

export default function TripPlannerDeals() {
  const { data: tripPlanners = [], isLoading, error } = useQuery<TripPlanner[]>({
    queryKey: ['/api/trip-planners'],
  });

  const handleBookNow = () => {
    alert('This would navigate to the booking page in a real application.');
  };

  // Map trip planners to destination images
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
      <section id="trip-planners" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trip Planner Deals</h2>
            <p className="text-gray-600">Plan your perfect journey with our curated travel packages.</p>
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
      <section id="trip-planners" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trip Planner Deals</h2>
            <p className="text-red-600">Failed to load trip planner deals. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="trip-planners" className="py-16 section-bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="icon-bg-orange">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trip Planner Deals</h2>
          <p className="text-gray-600">Plan your perfect journey with our curated travel packages.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {tripPlanners.slice(0, 4).map((tripPlanner, index) => (
            <div 
              key={tripPlanner.id}
              className="elegant-card overflow-hidden animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-trip-planner-${tripPlanner.id}`}
            >
              {/* Image Section */}
              <div className="relative">
                <img 
                  src={getDestinationImage(tripPlanner.destination)} 
                  alt={tripPlanner.destination}
                  className="w-full h-36 object-cover transition-butter group-hover:scale-110"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-butter hover-glow">
                  <Heart className="w-4 h-4 text-gray-600 transition-elastic hover:scale-110 hover:text-red-500" />
                </button>
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                {/* Route with arrow */}
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{tripPlanner.origin} → {tripPlanner.destination}</h3>
                  <p className="text-gray-600 text-sm">{tripPlanner.duration || '2h 30m'}</p>
                </div>
                
                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">📅</span>
                    <span className="text-gray-600">{tripPlanner.departureDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">⏱️</span>
                    <span className="text-gray-600">{tripPlanner.stops || 'Non-stop'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{tripPlanner.dealType || 'Best Deal'}</span>
                  </div>
                </div>
                
                {/* Pricing and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">৳{tripPlanner.price}</div>
                    <p className="text-xs text-gray-600">per person</p>
                  </div>
                </div>
                
                {/* Book Button - matching trip planner page */}
                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid={`button-book-trip-planner-${tripPlanner.id}`}
                >
                  Select Flight
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
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
