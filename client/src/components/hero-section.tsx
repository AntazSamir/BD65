import { useState } from 'react';
import { Hotel, Car, MapPin, Search, Star, Users, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroImage from '@assets/1781002652_1755358586408.jpg';
import logoImage from '@assets/ChatGPT Image Aug 14, 2025, 10_54_35 PM_1755361280936.png';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('flights');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert('This is a demo form. In a real application, this would submit the data.');
  };

  return (
    <section className="relative bg-black text-white py-32 min-h-screen flex items-center overflow-hidden">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70" 
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-slide-up">
              Discover Beautiful <br />
              <span className="text-accent bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent animate-bounce-subtle">Bangladesh</span>
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Explore Bangladesh's stunning natural beauty, rich culture, and heritage sites with our authentic travel experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 hover-glow transition-butter border border-white/20">
                <Star className="w-5 h-5 text-yellow-400 mr-2 animate-bounce-subtle" />
                <span className="font-medium">4.8/5 Rating</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 hover-glow transition-butter border border-white/20">
                <Users className="w-5 h-5 text-green-400 mr-2 animate-bounce-subtle" style={{animationDelay: '1s'}} />
                <span className="font-medium">50K+ Happy Travelers</span>
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-white border border-white/30 glass-form animate-scale-in transition-all duration-300 hover:shadow-3xl">
            <div className="flex space-x-2 mb-6">
              <Button
                type="button"
                variant={activeTab === 'flights' ? 'default' : 'outline'}
                className={`group flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === 'flights' 
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:shadow-lg'
                }`}
                onClick={() => setActiveTab('flights')}
                data-testid="button-flights-tab"
              >
                <Plane className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
                Flights
              </Button>
              <Button
                type="button"
                variant={activeTab === 'hotels' ? 'default' : 'outline'}
                className={`group flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === 'hotels' 
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:shadow-lg'
                }`}
                onClick={() => setActiveTab('hotels')}
                data-testid="button-hotels-tab"
              >
                <Hotel className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Hotels
              </Button>
              <Button
                type="button"
                variant={activeTab === 'cars' ? 'default' : 'outline'}
                className={`group flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === 'cars' 
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:shadow-lg'
                }`}
                onClick={() => setActiveTab('cars')}
                data-testid="button-cars-tab"
              >
                <Car className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                Cars
              </Button>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-white text-opacity-70" />
                    <Input 
                      type="text" 
                      placeholder="Dhaka" 
                      className="pl-10 bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white placeholder-opacity-70 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 focus:scale-[1.02] hover:bg-white/25"
                      data-testid="input-from-location"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-white text-opacity-70" />
                    <Input 
                      type="text" 
                      placeholder="Cox's Bazar" 
                      className="pl-10 bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white placeholder-opacity-70 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 focus:scale-[1.02] hover:bg-white/25"
                      data-testid="input-to-location"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Departure</label>
                  <Input 
                    type="date" 
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 focus:scale-[1.02] hover:bg-white/25"
                    data-testid="input-departure-date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Return</label>
                  <Input 
                    type="date" 
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 focus:scale-[1.02] hover:bg-white/25"
                    data-testid="input-return-date"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Passengers</label>
                <Select>
                  <SelectTrigger 
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 focus:scale-[1.02] hover:bg-white/25"
                    data-testid="select-passengers"
                  >
                    <SelectValue placeholder="1 Adult" className="text-white placeholder:text-white placeholder:opacity-70" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-adult">1 Adult</SelectItem>
                    <SelectItem value="2-adults">2 Adults</SelectItem>
                    <SelectItem value="2-adults-1-child">2 Adults, 1 Child</SelectItem>
                    <SelectItem value="2-adults-2-children">2 Adults, 2 Children</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                data-testid="button-search-flights"
              >
                <Search className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
                Search {activeTab === 'flights' ? 'Flights' : activeTab === 'hotels' ? 'Hotels' : 'Cars'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
