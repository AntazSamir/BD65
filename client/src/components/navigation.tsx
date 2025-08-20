import { Link } from 'wouter';
import { LogOut, UserIcon, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import logoImage from '@assets/ChatGPT Image Aug 14, 2025, 10_54_35 PM_1755361280936.png';

export default function Navigation() {
  const { user, isAuthenticated, signOut, isSigningOut } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="BD Explorer Logo" 
                className="w-8 sm:w-10 h-8 sm:h-10 mr-2 sm:mr-3"
                data-testid="logo-image"
              />
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                <span className="hidden sm:inline">BD Explorer</span>
                <span className="sm:hidden">BD</span>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            <Link href="/" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 text-sm lg:text-base">Home</Link>
            <Link href="/destinations" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 text-sm lg:text-base">Destinations</Link>
            <Link href="/hotels" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 text-sm lg:text-base">Hotels</Link>
            <Link 
              href="/trip-planner" 
              className="relative text-neutral hover:text-primary cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 text-sm lg:text-base"
            >
              Flights
            </Link>
            <Link href="/about" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 text-sm lg:text-base">About</Link>
            <Link href="/support" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 text-sm lg:text-base">Support</Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                      <AvatarImage src={user?.profileImageUrl || ""} alt={user?.firstName || "User"} />
                      <AvatarFallback className="text-xs sm:text-sm">
                        {(user?.firstName?.[0] || "U").toUpperCase()}{(user?.lastName?.[0] || "N").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user?.firstName || ""} {user?.lastName || ""}</p>
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-bookings" className="cursor-pointer" data-testid="nav-my-bookings">
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => signOut()}
                    disabled={isSigningOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
              data-testid="button-mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-5 w-5" />
              ) : (
                <Menu className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="px-3 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/destinations" 
              className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              href="/hotels" 
              className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link 
              href="/trip-planner" 
              className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Flights
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/support" 
              className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            
            {!isAuthenticated && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link href="/sign-in" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-base font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-start text-base font-medium">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
