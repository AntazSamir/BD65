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
      
      {/* Image Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <img 
                src="/assets/sundarbans.jpg" 
                alt="Sundarbans Mangrove Forest" 
                className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg hover-lift transition-butter cursor-pointer"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src="/assets/coxs-bazar.jpg" 
                alt="Cox's Bazar Beach" 
                className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg hover-lift transition-butter cursor-pointer"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <img 
                src="/assets/sylhet-tea-gardens.jpg" 
                alt="Sylhet Tea Gardens" 
                className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg hover-lift transition-butter cursor-pointer"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <img 
                src="/assets/paharpur-buddhist-vihara.jpg" 
                alt="Paharpur Buddhist Vihara" 
                className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg hover-lift transition-butter cursor-pointer"
              />
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
