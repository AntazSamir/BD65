import { Heart, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { TripPlanner } from '@shared/schema';

export default function TripPlannerDeals() {
  const { data: tripPlanners = [], isLoading, error } = useQuery<TripPlanner[]>({
    queryKey: ['/api/trip-planners'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <section id="trip-planners" className="py-8 sm:py-12 lg:py-16 section-bg-warm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="icon-bg-orange">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Trip Planner Deals</h2>
            <p className="text-base sm:text-lg text-gray-600">Plan your perfect journey with our curated travel packages.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto mb-6 md:mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm md:shadow-lg animate-pulse">
                <div className="w-full h-32 md:h-40 bg-gray-200"></div>
                <div className="p-3 md:p-4">
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
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
      <section id="trip-planners" className="py-8 sm:py-12 lg:py-16 section-bg-warm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="icon-bg-orange">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Trip Planner Deals</h2>
            <p className="text-base sm:text-lg text-red-600">Failed to load trip planner deals. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const handleBookNow = () => {
    // Navigate to trip planner page for booking
    window.location.href = '/trip-planner';
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

  return (
    <section id="trip-planners" className="py-8 sm:py-12 lg:py-16 section-bg-warm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="icon-bg-orange">
              <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Trip Planner Deals</h2>
          <p className="text-base sm:text-lg text-gray-600">Plan your perfect journey with our curated travel packages.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto mb-6 md:mb-8">
          {tripPlanners.slice(0, 4).map((tripPlanner, index) => (
            <div 
              key={tripPlanner.id}
              className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm md:shadow-lg transition-shadow duration-300 hover:shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-trip-planner-${tripPlanner.id}`}
            >
              {/* Image Section */}
              <div className="relative">
                <img 
                  src={getDestinationImage(tripPlanner.destination)} 
                  alt={tripPlanner.destination}
                  className="w-full h-32 md:h-40 object-cover"
                />
              </div>
              
              {/* Content Section */}
              <div className="p-3 md:p-4">
                {/* Route with arrow */}
                <div className="mb-3">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-900">{tripPlanner.origin} → {tripPlanner.destination}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{tripPlanner.duration || '2h 30m'}</p>
                </div>
                
                {/* Flight Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-gray-500">Departure</span>
                    <span className="font-medium">{tripPlanner.departureDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-gray-500">Flight</span>
                    <span className="text-blue-600 font-medium">{tripPlanner.stops || 'Non-stop'}</span>
                  </div>
                </div>
                
                {/* Pricing and Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg md:text-xl font-bold text-primary">৳{tripPlanner.price}</div>
                    <div className="text-xs text-gray-500">per person</div>
                  </div>
                  <Button 
                    onClick={handleBookNow}
                    className="bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors hover:bg-primary/90"
                    data-testid={`button-book-trip-planner-${tripPlanner.id}`}
                  >
                    Select Flight
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
