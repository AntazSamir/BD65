import { Star, MapPin, Search, Filter, ArrowRight, Globe, Camera, Heart, Users, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type { Destination } from '@shared/schema';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocation } from 'wouter';
import sundarbansImage from '@assets/বিষ্ময়কর_সুন্দরবন_1755535540494.jpg';
import valleyImage from '@assets/Tourist-Places-in-Bangladesh_1755535540494.jpg';
import boatsImage from '@assets/penedo3_1755535540495.png';
import aerialImage from '@assets/2_1755535540495.jpg';
import sajekImage from '@assets/Sajek_Valley_1755535989228.jpg';

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [, setLocation] = useLocation();
  
  const { data: destinations = [], isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const filteredDestinations = destinations.filter(destination => {
    if (!destination?.name || !destination?.description || !destination?.district) return false;
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || destination.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  // Get unique districts for filter dropdown
  const uniqueDistricts = Array.from(new Set(destinations.filter(d => d?.district).map(d => d.district))).sort();

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
        <div className="py-16 section-bg-cool">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="icon-bg-blue">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Explore Bangladesh</h1>
              <p className="text-xl text-gray-600">Discover amazing destinations across Bangladesh</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="elegant-card overflow-hidden animate-pulse">
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
      
      {/* Enhanced Animated Hero Section */}
      <section className="relative bg-black text-white py-32 min-h-screen flex items-center overflow-hidden">
        {/* Dynamic Background Carousel */}
        <div className="absolute inset-0">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={`hero-bg-${index}`}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                index === activeHeroIndex ? 'opacity-70 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              {/* Main Title with Animation */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-slide-up">
                Explore Beautiful <br />
                <span className="text-accent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent animate-bounce-subtle">Bangladesh</span>
              </h1>
              
              <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{animationDelay: '0.2s'}}>
                Discover the natural beauty, rich culture, and historic treasures of Bangladesh. 
                From pristine beaches to ancient ruins, adventure awaits at every corner.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 hover-glow transition-butter border border-white/20">
                  <Star className="w-5 h-5 text-yellow-400 mr-2 animate-bounce-subtle" />
                  <span className="font-medium">{destinations.length}+ Destinations</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 hover-glow transition-butter border border-white/20">
                  <MapPin className="w-5 h-5 text-green-400 mr-2 animate-bounce-subtle" style={{animationDelay: '1s'}} />
                  <span className="font-medium">All Districts Covered</span>
                </div>
              </div>
            </div>
            
            {/* Search & Filter Form */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-white border border-white/30 glass-form animate-scale-in transition-all duration-300 hover:shadow-3xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Destination</h3>

              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-white/60" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white placeholder-opacity-70 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 focus:scale-[1.02] hover:bg-white/25 rounded-xl"
                    data-testid="input-search-destinations"
                  />
                </div>
                
                {/* District Filter */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Filter by District</label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger 
                      className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white focus:ring-2 focus:ring-primary py-3 rounded-xl transition-all duration-300 hover:bg-white/25"
                      data-testid="select-district-filter"
                    >
                      <SelectValue placeholder="All Districts" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl">
                      <SelectItem value="all" className="text-gray-800 hover:bg-gray-100">All Districts</SelectItem>
                      {uniqueDistricts.map(district => (
                        <SelectItem key={district} value={district} className="text-gray-800 hover:bg-gray-100">
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Explore Button */}
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                  onClick={() => {
                    const firstDestination = filteredDestinations[0];
                    if (firstDestination) {
                      setLocation(`/destinations/${firstDestination.id}`);
                    }
                  }}
                  data-testid="button-explore-destinations"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Explore Destinations
                </Button>
              </div>
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

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroBackgrounds.map((_, index) => (
              <button
                key={`hero-indicator-${index}`}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-out hover:scale-110 ${
                  index === activeHeroIndex ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setActiveHeroIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <div className="py-16 section-bg-warm">
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
            {filteredDestinations.map((destination, index) => (
              <div 
                key={destination.id}
                className="elegant-card overflow-hidden hover-lift transition-butter group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-destination-${destination.id}`}
              >
                <div className="relative">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className="w-full h-64 object-cover transition-butter group-hover:scale-110"
                    data-testid={`img-destination-${destination.id}`}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 transition-butter group-hover:bg-white group-hover:shadow-lg hover-glow">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1 transition-elastic group-hover:scale-110 group-hover:rotate-12" />
                      <span className="text-sm font-medium text-gray-800 transition-butter" data-testid={`text-destination-rating-${destination.id}`}>
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
                  
                  <div className="flex justify-end items-center pt-4 border-t border-gray-100">
                    <button 
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-elastic font-medium hover:shadow-xl hover:scale-110 transform hover-glow"
                      data-testid={`button-explore-destination-${destination.id}`}
                      onClick={() => setLocation(`/destinations/${destination.id}`)}
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