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
      {/* Hero Section */}
      <div className="relative py-24 sm:py-32 lg:py-40 flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={`hero-bg-${index}`}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === activeHeroIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Discover Bangladesh
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto">
            Find your perfect destination from thousands of places
          </p>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto mb-6 px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-md text-gray-900 text-sm placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="w-full sm:w-40 bg-white border border-gray-200 text-gray-900 text-sm">
                    <SelectValue placeholder="All Districts" />
                  </SelectTrigger>
                  <SelectContent>
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
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{destinations.length}</div>
              <div className="text-sm text-white/70">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-white/70">Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white/70">Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-sm text-white/70">Rating</div>
            </div>
          </div>

        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={`hero-indicator-${index}`}
              className={`transition-all duration-300 ${
                index === activeHeroIndex 
                  ? 'w-6 h-2 bg-white rounded-full' 
                  : 'w-2 h-2 bg-white/60 hover:bg-white/80 rounded-full'
              }`}
              onClick={() => setActiveHeroIndex(index)}
              data-testid={`button-hero-indicator-${index}`}
            />
          ))}
        </div>
      </div>
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
              <p className="text-lg text-gray-600 text-center">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredDestinations.map((destination, index) => (
              <div 
                key={destination.id}
                className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm md:shadow-lg hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-destination-${destination.id}`}
                onClick={() => setLocation(`/destinations/${destination.id}`)}
              >
                <div className="relative">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className="w-full h-40 md:h-56 object-cover"
                    data-testid={`img-destination-${destination.id}`}
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-sm">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-xs font-medium text-gray-800" data-testid={`text-destination-rating-${destination.id}`}>
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 md:p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{destination.district}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-gray-900 line-clamp-1" data-testid={`text-destination-name-${destination.id}`}>
                    {destination.name}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2" data-testid={`text-destination-description-${destination.id}`}>
                    {destination.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Starting from
                    </div>
                    <button 
                      className="bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors hover:bg-primary/90"
                      data-testid={`button-explore-destination-${destination.id}`}
                    >
                      View Details
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