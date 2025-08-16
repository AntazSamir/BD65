import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logoImage from '@assets/ChatGPT Image Aug 14, 2025, 10_54_35 PM_1755361280936.png';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center text-2xl font-bold mb-4">
              <img 
                src={logoImage} 
                alt="Bangladesh Explorer Logo" 
                className="w-8 h-8 mr-3"
              />
              Bangladesh Explorer
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
          <p>&copy; 2024 Bangladesh Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
