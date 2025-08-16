import Navigation from '../components/navigation';
import HeroSection from '../components/hero-section';
import PopularDestinations from '../components/popular-destinations';
import RecommendedHotels from '../components/recommended-hotels';
import FlightDeals from '../components/flight-deals';
import WhyChooseUs from '../components/why-choose-us';
import Testimonials from '../components/testimonials';
import FAQ from '../components/faq';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600 mb-8">Explore the world's most breathtaking locations</p>
        </div>
      </div>
      <PopularDestinations />
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
