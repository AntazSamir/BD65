import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import buddhaImage from '/assets/Buddha_Dhatu_Jadi_06_1755534311265.jpg';

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submitted successfully - in production, this would be sent to a backend
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 section-bg-warm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="elegant-card bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl sm:rounded-3xl overflow-hidden relative hover-lift transition-butter">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[300px] sm:min-h-[400px]">
            {/* Left Content */}
            <div className="p-6 sm:p-8 lg:p-12 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="icon-bg-yellow mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-semibold">
                  Join our newsletter
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Subscribe to see secret deals prices drop the moment you sign up!
              </h2>
              
              <form className="space-y-3 sm:space-y-4 max-w-md mx-auto lg:mx-0" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    className="flex-1 px-4 py-3 rounded-full bg-white border-0 focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
              
              <p className="text-sm text-gray-600 mt-4">
                No ads. No trails. No commitments
              </p>
            </div>
            
            {/* Right Image */}
            <div className="relative h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-r-3xl lg:rounded-r-3xl"
                style={{
                  backgroundImage: `url(${buddhaImage})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-100/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
