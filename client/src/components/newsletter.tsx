import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import buddhaImage from '@assets/Buddha_Dhatu_Jadi_06_1755534311265.jpg';

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing! This is a demo form.');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[400px]">
            {/* Left Content */}
            <div className="p-8 lg:p-12">
              <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-semibold mb-6">
                Join our newsletter
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Subscribe to see secret deals prices drop the moment you sign up!
              </h2>
              
              <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    className="flex-1 px-4 py-3 rounded-full bg-white border-0 focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-colors"
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
