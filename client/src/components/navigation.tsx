import { useState } from 'react';
import { Link } from 'wouter';
import { Plane, User, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              <Plane className="inline w-6 h-6 text-accent mr-2" />
              TravelHub
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <a href="#destinations" className="text-neutral hover:text-primary transition-colors">Destinations</a>
            <a href="#hotels" className="text-neutral hover:text-primary transition-colors">Hotels</a>
            <a href="#flights" className="text-neutral hover:text-primary transition-colors">Flights</a>
            <a href="#packages" className="text-neutral hover:text-primary transition-colors">Packages</a>
            <a href="#about" className="text-neutral hover:text-primary transition-colors">About</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-neutral hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden text-neutral"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#destinations" className="text-neutral hover:text-primary transition-colors">Destinations</a>
              <a href="#hotels" className="text-neutral hover:text-primary transition-colors">Hotels</a>
              <a href="#flights" className="text-neutral hover:text-primary transition-colors">Flights</a>
              <a href="#packages" className="text-neutral hover:text-primary transition-colors">Packages</a>
              <a href="#about" className="text-neutral hover:text-primary transition-colors">About</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
