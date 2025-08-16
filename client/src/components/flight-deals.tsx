import logoImage from '@assets/ChatGPT Image Aug 14, 2025, 10_54_35 PM_1755361280936.png';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { Flight } from '@shared/schema';

export default function FlightDeals() {
  const { data: flights = [], isLoading, error } = useQuery<Flight[]>({
    queryKey: ['/api/flights'],
  });

  const handleViewDeal = () => {
    alert('This would navigate to the booking page in a real application.');
  };

  const getDealTypeStyle = (dealType: string | null) => {
    if (!dealType) return 'bg-gray-100 text-gray-800';
    
    switch (dealType) {
      case 'Save 25%':
      case 'Save 20%':
        return 'bg-green-100 text-green-800';
      case 'Hot Deal':
        return 'bg-orange-100 text-orange-800';
      case 'Limited':
        return 'bg-blue-100 text-blue-800';
      case 'Last Seats':
        return 'bg-red-100 text-red-800';
      case 'Best Price':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <section id="flights" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Flight Deals</h2>
            <p className="text-xl text-gray-600">Discover amazing flight offers for your next journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="flights" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Flight Deals</h2>
            <p className="text-xl text-red-600">Failed to load flight deals. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="flights" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Flight Deals</h2>
          <p className="text-xl text-gray-600">Discover amazing flight offers for your next journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flights.map((flight) => (
            <div 
              key={flight.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid={`card-flight-${flight.id}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-primary" data-testid={`text-flight-price-${flight.id}`}>৳{flight.price}</div>
                <div className={`text-sm px-3 py-1 rounded-full ${getDealTypeStyle(flight.dealType)}`} data-testid={`tag-flight-deal-${flight.id}`}>
                  {flight.dealType || 'Special Deal'}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" data-testid={`text-flight-origin-${flight.id}`}>{flight.origin}</span>
                  <img src={logoImage} alt="Flight" className="w-4 h-4" />
                  <span className="text-gray-600" data-testid={`text-flight-destination-${flight.id}`}>{flight.destination}</span>
                </div>
                <div className="text-sm text-gray-500" data-testid={`text-flight-duration-${flight.id}`}>{flight.duration}</div>
                <div className="text-sm text-gray-500" data-testid={`text-flight-dates-${flight.id}`}>{flight.departureDate}</div>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors"
                onClick={handleViewDeal}
                data-testid={`button-view-flight-${flight.id}`}
              >
                View Deal
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
