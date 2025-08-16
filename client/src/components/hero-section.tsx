import { useState } from 'react';
import { Plane, Hotel, Car, MapPin, Search, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroImage from '@assets/1781002652_1755358586408.jpg';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('flights');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert('This is a demo form. In a real application, this would submit the data.');
  };

  return (
    <section className="relative bg-black text-white py-32 min-h-screen flex items-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70" 
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Beautiful <br />
              <span className="text-accent">Bangladesh</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Explore Bangladesh's stunning natural beauty, rich culture, and heritage sites with our authentic travel experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-6 py-3">
                <Users className="w-5 h-5 text-green-400 mr-2" />
                <span>50K+ Happy Travelers</span>
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-white border border-white border-opacity-30">
            <div className="flex space-x-2 mb-6">
              <Button
                type="button"
                variant={activeTab === 'flights' ? 'default' : 'outline'}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  activeTab === 'flights' 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 border border-white border-opacity-30'
                }`}
                onClick={() => setActiveTab('flights')}
              >
                <Plane className="w-4 h-4 mr-2" />
                Flights
              </Button>
              <Button
                type="button"
                variant={activeTab === 'hotels' ? 'default' : 'outline'}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  activeTab === 'hotels' 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 border border-white border-opacity-30'
                }`}
                onClick={() => setActiveTab('hotels')}
              >
                <Hotel className="w-4 h-4 mr-2" />
                Hotels
              </Button>
              <Button
                type="button"
                variant={activeTab === 'cars' ? 'default' : 'outline'}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  activeTab === 'cars' 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 border border-white border-opacity-30'
                }`}
                onClick={() => setActiveTab('cars')}
              >
                <Car className="w-4 h-4 mr-2" />
                Cars
              </Button>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input 
                      type="text" 
                      placeholder="Dhaka" 
                      className="pl-10 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input 
                      type="text" 
                      placeholder="Cox's Bazar" 
                      className="pl-10 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Departure</label>
                  <Input 
                    type="date" 
                    className="focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Return</label>
                  <Input 
                    type="date" 
                    className="focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Passengers</label>
                <Select>
                  <SelectTrigger className="focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue placeholder="1 Adult" />
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
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Flights
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
