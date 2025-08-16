import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { flights } from '../data/travel-data';

export default function FlightDeals() {
  const handleViewDeal = () => {
    alert('This would navigate to the booking page in a real application.');
  };

  const getDealTypeStyle = (dealType: string) => {
    switch (dealType) {
      case 'Save 25%':
        return 'bg-green-100 text-green-800';
      case 'Hot Deal':
        return 'bg-orange-100 text-orange-800';
      case 'Limited':
        return 'bg-blue-100 text-blue-800';
      case 'Last Seats':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-primary">${flight.price}</div>
                <div className={`text-sm px-3 py-1 rounded-full ${getDealTypeStyle(flight.dealType)}`}>
                  {flight.dealType}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{flight.origin}</span>
                  <Plane className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{flight.destination}</span>
                </div>
                <div className="text-sm text-gray-500">{flight.duration}</div>
                <div className="text-sm text-gray-500">{flight.departureDate}</div>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors"
                onClick={handleViewDeal}
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
