import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plane, Bus, Car, Clock, MapPin, Star, DollarSign, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import BookingDialog from '@/components/booking-dialog';
import type { TripPlanner, Bus as BusType, PrivateCar } from '@shared/schema';

export default function TripPlannerPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  
  // Flight-specific state
  const [tripType, setTripType] = useState('oneWay');
  const [flightFrom, setFlightFrom] = useState('Dhaka');
  const [flightTo, setFlightTo] = useState('Cox\'s Bazar');
  const [flightDepartureDate, setFlightDepartureDate] = useState('');
  const [flightReturnDate, setFlightReturnDate] = useState('');
  const [flightTravelers, setFlightTravelers] = useState('1');
  const [flightClass, setFlightClass] = useState('Economy');

  // Bus-specific state
  const [busFrom, setBusFrom] = useState('Dhaka');
  const [busTo, setBusTo] = useState('Cox\'s Bazar');
  const [busTravelDate, setBusTravelDate] = useState('');
  const [busPassengers, setBusPassengers] = useState('1');
  const [busType, setBusType] = useState('AC Bus');
  const [busDepartureTime, setBusDepartureTime] = useState('anytime');

  // Car-specific state
  const [carPickup, setCarPickup] = useState('Dhaka');
  const [carDropoff, setCarDropoff] = useState('Cox\'s Bazar');
  const [carDate, setCarDate] = useState('');
  const [carTime, setCarTime] = useState('');
  const [carPassengers, setCarPassengers] = useState('1');
  const [carType, setCarType] = useState('Sedan');
  const [carTripType, setCarTripType] = useState('oneWay');
  
  // Booking dialog state
  const [bookingDialog, setBookingDialog] = useState<{
    isOpen: boolean;
    item: TripPlanner | BusType | PrivateCar | null;
    type: 'flight' | 'bus' | 'car';
  }>({
    isOpen: false,
    item: null,
    type: 'flight',
  });

  const { data: tripPlanners = [], isLoading } = useQuery<TripPlanner[]>({
    queryKey: ['/api/trip-planners'],
  });

  const { data: buses = [] } = useQuery<BusType[]>({
    queryKey: ['/api/buses'],
  });

  const { data: privateCars = [] } = useQuery<PrivateCar[]>({
    queryKey: ['/api/private-cars'],
  });

  const handleSearch = () => {
    console.log('Searching for:', { origin, destination, departureDate, passengers });
  };

  const openBookingDialog = (item: TripPlanner | BusType | PrivateCar, type: 'flight' | 'bus' | 'car') => {
    setBookingDialog({
      isOpen: true,
      item,
      type,
    });
  };

  const closeBookingDialog = () => {
    setBookingDialog({
      isOpen: false,
      item: null,
      type: 'flight',
    });
  };

  return (
    <div className="min-h-screen section-bg-soft">
      <Navigation />
      
      {/* Hero Section */}
      <div 
        className="relative text-white py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/attached_assets/penedo3_1755684327033.png')`
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl w-12 h-12 flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Trip Planner</h1>
            <p className="text-xl opacity-90 drop-shadow-lg">Compare and choose the best transportation option for your journey</p>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <Input
                  placeholder="From"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="text-gray-900"
                />
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <Input
                  placeholder="To"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="text-gray-900"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="text-gray-900"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-400" />
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4+ Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="flights" className="flex items-center space-x-2">
              <Plane className="w-4 h-4" />
              <span>Flights</span>
            </TabsTrigger>
            <TabsTrigger value="buses" className="flex items-center space-x-2">
              <Bus className="w-4 h-4" />
              <span>Buses</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center space-x-2">
              <Car className="w-4 h-4" />
              <span>Private Cars</span>
            </TabsTrigger>
          </TabsList>

          {/* Flights Tab */}
          <TabsContent value="flights">
            {/* Flight Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mb-6">
                <RadioGroup value={tripType} onValueChange={setTripType} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oneWay" id="oneWay" />
                    <Label htmlFor="oneWay" className="font-medium">One Way</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="roundTrip" id="roundTrip" />
                    <Label htmlFor="roundTrip" className="font-medium">Round Trip</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multiCity" id="multiCity" />
                    <Label htmlFor="multiCity" className="font-medium">Multi City</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${tripType === 'roundTrip' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">FROM</Label>
                  <Select value={flightFrom} onValueChange={setFlightFrom}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dhaka">Dhaka - DAC, Hazrat Shahjalal International Airport</SelectItem>
                      <SelectItem value="Chittagong">Chittagong - CGP, Shah Amanat International Airport</SelectItem>
                      <SelectItem value="Cox's Bazar">Cox's Bazar - CXB, Cox's Bazar Airport</SelectItem>
                      <SelectItem value="Sylhet">Sylhet - ZYL, Osmani International Airport</SelectItem>
                      <SelectItem value="Jessore">Jessore - JSR, Jessore Airport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">TO</Label>
                  <Select value={flightTo} onValueChange={setFlightTo}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cox's Bazar">Cox's Bazar - CXB, Cox's Bazar Airport</SelectItem>
                      <SelectItem value="Dhaka">Dhaka - DAC, Hazrat Shahjalal International Airport</SelectItem>
                      <SelectItem value="Chittagong">Chittagong - CGP, Shah Amanat International Airport</SelectItem>
                      <SelectItem value="Sylhet">Sylhet - ZYL, Osmani International Airport</SelectItem>
                      <SelectItem value="Jessore">Jessore - JSR, Jessore Airport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">DEPARTURE DATE</Label>
                  <Input
                    type="date"
                    value={flightDepartureDate}
                    onChange={(e) => setFlightDepartureDate(e.target.value)}
                    className="h-12"
                  />
                </div>

                {tripType === 'roundTrip' && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600 mb-1 block">RETURN DATE</Label>
                    <Input
                      type="date"
                      value={flightReturnDate}
                      onChange={(e) => setFlightReturnDate(e.target.value)}
                      className="h-12"
                      placeholder="Save more on return flight"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">TRAVELERS</Label>
                  <Select value={flightTravelers} onValueChange={setFlightTravelers}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Traveler</SelectItem>
                      <SelectItem value="2">2 Travelers</SelectItem>
                      <SelectItem value="3">3 Travelers</SelectItem>
                      <SelectItem value="4">4 Travelers</SelectItem>
                      <SelectItem value="5">5+ Travelers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">CLASS</Label>
                  <Select value={flightClass} onValueChange={setFlightClass}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="First">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleSearch} 
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              >
                Search Flights
              </Button>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Flight Options</h2>
              <p className="text-gray-600">Choose from available flights for your journey</p>
            </div>

            {isLoading ? (
              <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="elegant-card animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {tripPlanners.map((flight) => (
                  <Card key={flight.id} className="elegant-card hover-lift transition-butter">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Plane className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{flight.origin} → {flight.destination}</h3>
                            <p className="text-gray-600">{flight.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">৳{flight.price}</div>
                          <p className="text-sm text-gray-600">per person</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{flight.departureDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{flight.stops}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{flight.dealType}</Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm">4.5</span>
                        </div>
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => openBookingDialog(flight, 'flight')}
                        >
                          Select Flight
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Buses Tab */}
          <TabsContent value="buses">
            {/* Bus Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">FROM</Label>
                  <Select value={busFrom} onValueChange={setBusFrom}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dhaka">Dhaka</SelectItem>
                      <SelectItem value="Chittagong">Chittagong</SelectItem>
                      <SelectItem value="Cox's Bazar">Cox's Bazar</SelectItem>
                      <SelectItem value="Sylhet">Sylhet</SelectItem>
                      <SelectItem value="Rangpur">Rangpur</SelectItem>
                      <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                      <SelectItem value="Khulna">Khulna</SelectItem>
                      <SelectItem value="Barisal">Barisal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">TO</Label>
                  <Select value={busTo} onValueChange={setBusTo}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cox's Bazar">Cox's Bazar</SelectItem>
                      <SelectItem value="Dhaka">Dhaka</SelectItem>
                      <SelectItem value="Chittagong">Chittagong</SelectItem>
                      <SelectItem value="Sylhet">Sylhet</SelectItem>
                      <SelectItem value="Rangpur">Rangpur</SelectItem>
                      <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                      <SelectItem value="Khulna">Khulna</SelectItem>
                      <SelectItem value="Barisal">Barisal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">TRAVEL DATE</Label>
                  <Input
                    type="date"
                    value={busTravelDate}
                    onChange={(e) => setBusTravelDate(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">PASSENGERS</Label>
                  <Select value={busPassengers} onValueChange={setBusPassengers}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                      <SelectItem value="5">5+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">BUS TYPE</Label>
                  <Select value={busType} onValueChange={setBusType}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC Bus">AC Bus</SelectItem>
                      <SelectItem value="Non-AC Bus">Non-AC Bus</SelectItem>
                      <SelectItem value="Sleeper Coach">Sleeper Coach</SelectItem>
                      <SelectItem value="Double Decker">Double Decker</SelectItem>
                      <SelectItem value="Luxury Coach">Luxury Coach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">PREFERRED TIME</Label>
                  <Select value={busDepartureTime} onValueChange={setBusDepartureTime}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anytime">Any time</SelectItem>
                      <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                      <SelectItem value="night">Night (10PM - 6AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleSearch} 
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
              >
                Search Buses
              </Button>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bus Options</h2>
              <p className="text-gray-600">Comfortable and affordable bus services</p>
            </div>

            <div className="grid gap-4">
              {buses.map((bus) => (
                <Card key={bus.id} className="elegant-card hover-lift transition-butter">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Bus className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{bus.operator}</h3>
                          <p className="text-gray-600">{bus.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">৳{bus.price}</div>
                        <p className="text-sm text-gray-600">per seat</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{bus.departure} - {bus.arrival}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{bus.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{bus.seats} seats</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{bus.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {bus.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline">{amenity}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => openBookingDialog(bus, 'bus')}
                      >
                        Select Bus
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Private Cars Tab */}
          <TabsContent value="cars">
            {/* Car Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mb-6">
                <RadioGroup value={carTripType} onValueChange={setCarTripType} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oneWay" id="carOneWay" />
                    <Label htmlFor="carOneWay" className="font-medium">One Way</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="roundTrip" id="carRoundTrip" />
                    <Label htmlFor="carRoundTrip" className="font-medium">Round Trip</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">PICKUP LOCATION</Label>
                  <Select value={carPickup} onValueChange={setCarPickup}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dhaka">Dhaka City</SelectItem>
                      <SelectItem value="Dhaka Airport">Dhaka Airport</SelectItem>
                      <SelectItem value="Chittagong">Chittagong City</SelectItem>
                      <SelectItem value="Cox's Bazar">Cox's Bazar</SelectItem>
                      <SelectItem value="Sylhet">Sylhet City</SelectItem>
                      <SelectItem value="Rangpur">Rangpur</SelectItem>
                      <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                      <SelectItem value="Khulna">Khulna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">DROP-OFF LOCATION</Label>
                  <Select value={carDropoff} onValueChange={setCarDropoff}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cox's Bazar">Cox's Bazar</SelectItem>
                      <SelectItem value="Dhaka">Dhaka City</SelectItem>
                      <SelectItem value="Dhaka Airport">Dhaka Airport</SelectItem>
                      <SelectItem value="Chittagong">Chittagong City</SelectItem>
                      <SelectItem value="Sylhet">Sylhet City</SelectItem>
                      <SelectItem value="Rangpur">Rangpur</SelectItem>
                      <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                      <SelectItem value="Khulna">Khulna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">PICKUP DATE</Label>
                  <Input
                    type="date"
                    value={carDate}
                    onChange={(e) => setCarDate(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">PICKUP TIME</Label>
                  <Input
                    type="time"
                    value={carTime}
                    onChange={(e) => setCarTime(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">PASSENGERS</Label>
                  <Select value={carPassengers} onValueChange={setCarPassengers}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                      <SelectItem value="5">5 Passengers</SelectItem>
                      <SelectItem value="6">6+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-1 block">CAR TYPE</Label>
                  <Select value={carType} onValueChange={setCarType}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sedan">Sedan (4 seats)</SelectItem>
                      <SelectItem value="SUV">SUV (6-7 seats)</SelectItem>
                      <SelectItem value="Microbus">Microbus (8-12 seats)</SelectItem>
                      <SelectItem value="Luxury">Luxury Car</SelectItem>
                      <SelectItem value="Mini Van">Mini Van (10+ seats)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleSearch} 
                className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg"
              >
                Search Private Cars
              </Button>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Private Car Options</h2>
              <p className="text-gray-600">Comfortable private transportation with professional drivers</p>
            </div>

            <div className="grid gap-4">
              {privateCars.map((car) => (
                <Card key={car.id} className="elegant-card hover-lift transition-butter">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Car className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{car.type}</h3>
                          <p className="text-gray-600">{car.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">৳{car.price}</div>
                        <p className="text-sm text-gray-600">total trip</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Up to {car.capacity} passengers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{car.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{car.driver}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{car.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature) => (
                          <Badge key={feature} variant="outline">{feature}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => openBookingDialog(car, 'car')}
                      >
                        Select Car
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
      
      {/* Booking Dialog */}
      <BookingDialog
        isOpen={bookingDialog.isOpen}
        onClose={closeBookingDialog}
        item={bookingDialog.item}
        type={bookingDialog.type}
      />
    </div>
  );
}