import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing! This is a demo form.');
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss a Deal</h2>
        <p className="text-xl mb-8 opacity-90">
          Subscribe to our newsletter and get exclusive travel offers delivered to your inbox
        </p>
        
        <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
          <Input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent border-0"
            required
          />
          <Button 
            type="submit" 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Subscribe
          </Button>
        </form>
        
        <p className="text-sm opacity-80 mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  );
}
