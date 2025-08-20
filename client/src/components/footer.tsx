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
              viewBox="0 0 1200 150" 
              className="w-full h-24 opacity-60"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Simple mountain silhouette */}
              <path 
                d="M0,150 L0,80 C100,60 200,70 300,50 C400,30 500,40 600,20 C700,10 800,20 900,40 C1000,60 1100,50 1200,70 L1200,150 Z" 
                fill="#22c55e" 
              />
              
              {/* Trees silhouettes */}
              <g fill="#166534">
                {/* Tree 1 */}
                <path d="M80,150 L80,110 L75,110 L80,90 L85,110 L80,110 L80,150 Z" />
                <path d="M80,115 L72,115 L80,95 L88,115 Z" />
                
                {/* Tree 2 */}
                <path d="M180,150 L180,120 L175,120 L180,100 L185,120 L180,120 L180,150 Z" />
                <path d="M180,125 L170,125 L180,105 L190,125 Z" />
                
                {/* Tree 3 */}
                <path d="M320,150 L320,115 L315,115 L320,95 L325,115 L320,115 L320,150 Z" />
                <path d="M320,120 L310,120 L320,100 L330,120 Z" />
                
                {/* Tree 4 */}
                <path d="M720,150 L720,105 L715,105 L720,85 L725,105 L720,105 L720,150 Z" />
                <path d="M720,110 L710,110 L720,90 L730,110 Z" />
                
                {/* Tree 5 */}
                <path d="M920,150 L920,125 L915,125 L920,105 L925,125 L920,125 L920,150 Z" />
                <path d="M920,130 L910,130 L920,110 L930,130 Z" />
                
                {/* Tree 6 */}
                <path d="M1050,150 L1050,110 L1045,110 L1050,90 L1055,110 L1050,110 L1050,150 Z" />
                <path d="M1050,115 L1040,115 L1050,95 L1060,115 Z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
