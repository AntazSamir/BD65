import Navigation from '../components/navigation';
import HeroSection from '../components/hero-section';
import PopularDestinations from '../components/popular-destinations';
import DestinationCards from '../components/destination-cards';
import RecommendedHotels from '../components/recommended-hotels';
import FlightDeals from '../components/flight-deals';
import WhyChooseUs from '../components/why-choose-us';
import Testimonials from '../components/testimonials';
import FAQ from '../components/faq';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type { Destination } from '@shared/schema';

export default function Home() {
  const { data: destinations = [] } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Set first destination as default when data loads
  useEffect(() => {
    if (destinations.length > 0 && !selectedDestination) {
      setSelectedDestination(destinations[0]);
    }
  }, [destinations, selectedDestination]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600 mb-8">Explore the world's most breathtaking locations</p>
          {selectedDestination && (
            <p className="text-lg text-gray-700 font-medium mb-4">
              Currently viewing: {selectedDestination.name}
            </p>
          )}
          <div className="mt-6">
            <Link href="/destinations">
              <button className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium">
                View All Destinations
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <PopularDestinations selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
      <DestinationCards selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
      
      {/* Expanded Image Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Discover Bangladesh</h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.1s' }}>Experience the beauty and culture of our homeland</p>
          </div>
          
          {/* Main Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src="/assets/sundarbans.jpg" 
                alt="Sundarbans Mangrove Forest" 
                className="w-full h-64 object-cover rounded-2xl shadow-xl hover-lift transition-butter cursor-pointer"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">Sundarbans</h3>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <img 
                src="/assets/coxs-bazar.jpg" 
                alt="Cox's Bazar Beach" 
                className="w-full h-64 object-cover rounded-2xl shadow-xl hover-lift transition-butter cursor-pointer"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">Cox's Bazar</h3>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <img 
                src="/assets/sylhet-tea-gardens.jpg" 
                alt="Sylhet Tea Gardens" 
                className="w-full h-64 object-cover rounded-2xl shadow-xl hover-lift transition-butter cursor-pointer"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">Sylhet Tea Gardens</h3>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <img 
                src="/assets/paharpur-buddhist-vihara.jpg" 
                alt="Paharpur Buddhist Vihara" 
                className="w-full h-64 object-cover rounded-2xl shadow-xl hover-lift transition-butter cursor-pointer"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">Paharpur Vihara</h3>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <img 
                src="/assets/saint-martin-island.jpg" 
                alt="Saint Martin Island" 
                className="w-full h-64 object-cover rounded-2xl shadow-xl hover-lift transition-butter cursor-pointer"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">Saint Martin Island</h3>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <img 
                src="/assets/rangamati.jpg" 
                alt="Rangamati Hills" 
                className="w-full h-64 object-cover rounded-2xl shadow-xl hover-lift transition-butter cursor-pointer"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">Rangamati Hills</h3>
            </div>
          </div>
          
          {/* Secondary Gallery Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <img 
                src="/assets/kuakata-beach.jpg" 
                alt="Kuakata Beach" 
                className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift transition-butter cursor-pointer"
              />
              <h4 className="text-md font-medium text-gray-700 mt-3 text-center">Kuakata Beach</h4>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <img 
                src="/assets/lalbagh-fort.jpg" 
                alt="Lalbagh Fort" 
                className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift transition-butter cursor-pointer"
              />
              <h4 className="text-md font-medium text-gray-700 mt-3 text-center">Lalbagh Fort</h4>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
              <img 
                src="/assets/chittagong-hill-tracts.jpg" 
                alt="Chittagong Hill Tracts" 
                className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift transition-butter cursor-pointer"
              />
              <h4 className="text-md font-medium text-gray-700 mt-3 text-center">Hill Tracts</h4>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '1.1s' }}>
              <img 
                src="/assets/rangamati-bridge.jpg" 
                alt="Rangamati Hanging Bridge" 
                className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift transition-butter cursor-pointer"
              />
              <h4 className="text-md font-medium text-gray-700 mt-3 text-center">Hanging Bridge</h4>
            </div>
          </div>
        </div>
      </section>
      
      <RecommendedHotels />
      <FlightDeals />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  );
}
