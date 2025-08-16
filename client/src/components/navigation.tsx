import { useState } from 'react';
import { Link } from 'wouter';
import { User, Menu, X } from 'lucide-react';
import logoImage from '@assets/ChatGPT Image Aug 14, 2025, 10_54_35 PM_1755361280936.png';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="Bangladesh Explorer Logo" 
                className="w-10 h-10 mr-3"
                data-testid="logo-image"
              />
              <div className="text-2xl font-bold text-primary">
                Bangladesh Explorer
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-neutral hover:text-primary transition-colors">Home</Link>
            <Link href="/destinations" className="text-neutral hover:text-primary transition-colors">Destinations</Link>
            <a href="#hotels" className="text-neutral hover:text-primary transition-colors">Hotels</a>
            <a href="#flights" className="text-neutral hover:text-primary transition-colors">Flights</a>
            <Link href="/about" className="text-neutral hover:text-primary transition-colors">About</Link>
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
              <Link href="/" className="text-neutral hover:text-primary transition-colors">Home</Link>
              <Link href="/destinations" className="text-neutral hover:text-primary transition-colors">Destinations</Link>
              <a href="#hotels" className="text-neutral hover:text-primary transition-colors">Hotels</a>
              <a href="#flights" className="text-neutral hover:text-primary transition-colors">Flights</a>
              <Link href="/about" className="text-neutral hover:text-primary transition-colors">About</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
