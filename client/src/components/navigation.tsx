import { useState } from 'react';
import { Link } from 'wouter';
import { User, Menu, X, LogOut, UserIcon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import logoImage from '@assets/ChatGPT Image Aug 14, 2025, 10_54_35 PM_1755361280936.png';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut, isSigningOut } = useAuth();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="BD Explorer Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3"
                data-testid="logo-image"
              />
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                BD Explorer
              </div>
            </div>
          </Link>
          
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            <Link href="/" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Home</Link>
            <Link href="/destinations" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Destinations</Link>
            <Link href="/hotels" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Hotels</Link>
            <Link 
              href="/trip-planner" 
              className="relative text-neutral hover:text-primary cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
            >
              Trip Planner
            </Link>
            <Link href="/about" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">About</Link>
            <Link href="/support" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Support</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl || ""} alt={user?.firstName || "User"} />
                      <AvatarFallback>
                        {(user?.firstName?.[0] || "U").toUpperCase()}{(user?.lastName?.[0] || "N").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.firstName || ""} {user?.lastName || ""}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
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
              <div className="hidden lg:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
            <button 
              className="lg:hidden text-neutral p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-3 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="px-3 py-2 text-sm font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/destinations" 
                className="px-3 py-2 text-sm font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                href="/hotels" 
                className="px-3 py-2 text-sm font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Hotels
              </Link>
              <Link 
                href="/trip-planner" 
                className="px-3 py-2 text-sm font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Trip Planner
              </Link>
              <Link 
                href="/about" 
                className="px-3 py-2 text-sm font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/support" 
                className="px-3 py-2 text-sm font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              
              <div className="border-t border-gray-200 mt-3 pt-3">
                {isAuthenticated ? (
                  <>
                    <Link 
                      href="/profile" 
                      className="flex items-center px-3 py-2 text-sm font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link 
                      href="/my-bookings" 
                      className="flex items-center px-3 py-2 text-sm font-medium text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      My Bookings
                    </Link>
                    <button 
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      disabled={isSigningOut}
                      className="flex items-center w-full px-3 py-2 text-sm font-medium text-left text-neutral hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {isSigningOut ? "Signing out..." : "Sign out"}
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start" 
                      asChild
                    >
                      <Link 
                        href="/sign-in"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      className="justify-start"
                      asChild
                    >
                      <Link 
                        href="/sign-up"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
