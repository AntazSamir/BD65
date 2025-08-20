import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logoImage from '@assets/ChatGPT Image Aug 14, 2025, 10_54_35 PM_1755361280936.png';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center text-2xl font-bold mb-4">
              <img 
                src={logoImage} 
                alt="BD Explorer Logo" 
                className="w-8 h-8 mr-3"
              />
              BD Explorer
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for discovering Bangladesh's hidden gems and authentic travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">Popular Destinations</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Beach Vacations</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">City Breaks</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Adventure Travel</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">Flight Booking</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Hotel Reservations</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Car Rentals</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Travel Insurance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 BD Explorer. All rights reserved.</p>
          
          {/* Mountain landscape design */}
          <div className="mt-8 relative overflow-hidden">
            <svg 
              viewBox="0 0 1200 200" 
              className="w-full h-32 opacity-60"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Background mountains */}
              <path 
                d="M0,200 L0,120 C100,80 200,90 300,70 C400,50 500,60 600,40 C700,20 800,30 900,50 C1000,70 1100,60 1200,80 L1200,200 Z" 
                fill="#4ade80" 
                opacity="0.3"
              />
              <path 
                d="M0,200 L0,140 C120,100 220,110 320,90 C420,70 520,80 620,60 C720,40 820,50 920,70 C1020,90 1120,80 1200,100 L1200,200 Z" 
                fill="#22c55e" 
                opacity="0.4"
              />
              
              {/* Middle layer mountains */}
              <path 
                d="M0,200 L0,160 C80,130 180,140 280,120 C380,100 480,110 580,90 C680,70 780,80 880,100 C980,120 1080,110 1200,130 L1200,200 Z" 
                fill="#16a34a" 
                opacity="0.6"
              />
              
              {/* Foreground mountains */}
              <path 
                d="M0,200 L0,180 C100,150 200,160 300,140 C400,120 500,130 600,110 C700,90 800,100 900,120 C1000,140 1100,130 1200,150 L1200,200 Z" 
                fill="#15803d" 
                opacity="0.8"
              />
              
              {/* Trees silhouettes */}
              <g fill="#166534" opacity="0.9">
                {/* Tree 1 */}
                <path d="M50,200 L50,160 L45,160 L50,140 L55,160 L50,160 L50,200 Z" />
                <path d="M50,165 L42,165 L50,145 L58,165 Z" />
                
                {/* Tree 2 */}
                <path d="M150,200 L150,170 L145,170 L150,150 L155,170 L150,170 L150,200 Z" />
                <path d="M150,175 L140,175 L150,155 L160,175 Z" />
                
                {/* Tree 3 */}
                <path d="M250,200 L250,165 L245,165 L250,145 L255,165 L250,165 L250,200 Z" />
                <path d="M250,170 L240,170 L250,150 L260,170 Z" />
                
                {/* Tree 4 */}
                <path d="M800,200 L800,155 L795,155 L800,135 L805,155 L800,155 L800,200 Z" />
                <path d="M800,160 L790,160 L800,140 L810,160 Z" />
                
                {/* Tree 5 */}
                <path d="M950,200 L950,175 L945,175 L950,155 L955,175 L950,175 L950,200 Z" />
                <path d="M950,180 L940,180 L950,160 L960,180 Z" />
                
                {/* Tree 6 */}
                <path d="M1100,200 L1100,160 L1095,160 L1100,140 L1105,160 L1100,160 L1100,200 Z" />
                <path d="M1100,165 L1090,165 L1100,145 L1110,165 Z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
