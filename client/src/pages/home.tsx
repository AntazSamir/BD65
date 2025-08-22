import Navigation from '../components/navigation';
import HeroSection from '../components/hero-section';
import PopularDestinations from '../components/popular-destinations-original';
import RecommendedHotels from '../components/recommended-hotels';
import TripPlannerDeals from '../components/trip-planner-deals';
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
      <div className="py-12 sm:py-16 lg:py-24 section-bg-cool relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Popular Destinations</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">Explore the world's most breathtaking locations</p>
          <div className="mt-4 sm:mt-6">
            <Link href="/destinations">
              <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-xl sm:rounded-2xl hover:bg-primary/90 transition-butter font-medium shadow-lg hover-lift text-sm sm:text-base">
                View All Destinations
                <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <PopularDestinations selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
      <RecommendedHotels />
      <TripPlannerDeals />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  );
}
