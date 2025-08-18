import { Star, MapPin, Search, Filter, ArrowRight, Globe, Camera, Heart, Users, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type { Destination } from '@shared/schema';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import sundarbansImage from '@assets/বিষ্ময়কর_সুন্দরবন_1755535540494.jpg';
import valleyImage from '@assets/Tourist-Places-in-Bangladesh_1755535540494.jpg';
import boatsImage from '@assets/penedo3_1755535540495.png';
import aerialImage from '@assets/2_1755535540495.jpg';
import sajekImage from '@assets/Sajek_Valley_1755535989228.jpg';

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  
  const { data: destinations = [], isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || destination.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  // Get unique districts for filter dropdown
  const uniqueDistricts = Array.from(new Set(destinations.map(d => d.district))).sort();

  // Hero background carousel with authentic Bangladesh images
  const heroBackgrounds = [
    sundarbansImage, // Sundarbans wildlife - spotted deer in mangrove forest
    valleyImage,     // Scenic valley with mountains and lake reflection
    boatsImage,      // Traditional boats in crystal clear water
    aerialImage,     // Aerial view of winding rivers through mangroves
    sajekImage       // Sajek Valley sunset with mountains and grass
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroBackgrounds.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Explore Bangladesh</h1>
              <p className="text-xl text-gray-600">Discover amazing destinations across Bangladesh</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="w-full h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Explore Bangladesh</h1>
              <p className="text-xl text-red-600">Failed to load destinations. Please try again later.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Carousel */}
        <div className="absolute inset-0">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === activeHeroIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          

          {/* Main Title with Animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Explore
            </span>
            <br />
            <span className="text-yellow-400">Bangladesh</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover the natural beauty, rich culture, and historic treasures of Bangladesh. 
            From pristine beaches to ancient ruins, adventure awaits at every corner.
          </p>

          {/* Interactive Search and Filter */}
          <div className="max-w-4xl mx-auto mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/60" />
              </div>
              <Input
                type="text"
                placeholder="Search destinations, experiences, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent !text-white"
                style={{ 
                  color: 'white',
                  '--tw-placeholder-color': 'rgba(255, 255, 255, 0.8)'
                } as React.CSSProperties}
              />
            </div>
            
            {/* District Filter */}
            <div className="flex justify-center">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-64 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full focus:ring-2 focus:ring-blue-400">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-white/60" />
                    <SelectValue placeholder="Filter by District" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border border-gray-200">
                  <SelectItem value="all">All Districts</SelectItem>
                  {uniqueDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{destinations.length}</div>
              <div className="text-sm text-gray-300">Destinations</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-gray-300">Happy Travelers</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Camera className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-300">Experiences</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">4.8/5</div>
              <div className="text-sm text-gray-300">Rating</div>
            </div>
          </div>

          
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeHeroIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setActiveHeroIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {searchQuery ? 'Search Results' : 'All Destinations'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {searchQuery 
                ? `Discover amazing places that match your search`
                : 'Explore our curated collection of amazing destinations across Bangladesh'
              }
            </p>
          </div>
          {/* Search Results Info */}
          {(searchQuery || selectedDistrict !== 'all') && (
            <div className="mb-8">
              <p className="text-lg text-gray-600">
                Found <span className="font-semibold text-primary">{filteredDestinations.length}</span> destinations
                {searchQuery && (
                  <>
                    {' '}matching "<span className="font-medium">{searchQuery}</span>"
                  </>
                )}
                {selectedDistrict !== 'all' && (
                  <>
                    {searchQuery ? ' and' : ''} in <span className="font-medium">{selectedDistrict}</span> district
                  </>
                )}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <div 
                key={destination.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                data-testid={`card-destination-${destination.id}`}
              >
                <div className="relative">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className="w-full h-64 object-cover"
                    data-testid={`img-destination-${destination.id}`}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-800" data-testid={`text-destination-rating-${destination.id}`}>
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{destination.district}, {destination.country}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800" data-testid={`text-destination-name-${destination.id}`}>
                    {destination.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2" data-testid={`text-destination-description-${destination.id}`}>
                    {destination.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Starting from</p>
                      <p className="text-2xl font-bold text-primary" data-testid={`text-destination-price-${destination.id}`}>
                        ৳{destination.priceFrom}
                      </p>
                    </div>
                    <button 
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                      data-testid={`button-explore-destination-${destination.id}`}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}