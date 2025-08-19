import { useState } from 'react';
import { Link } from 'wouter';
import { User, Menu, X, LogOut, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import logoImage from '@assets/ChatGPT Image Aug 14, 2025, 10_54_35 PM_1755361280936.png';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut, isSigningOut } = useAuth();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
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
            <Link href="/" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Home</Link>
            <Link href="/destinations" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Destinations</Link>
            <Link href="/hotels" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Hotels</Link>
            <a 
              href="#flights" 
              className="relative text-neutral hover:text-primary cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('flights');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Flights
            </a>
            <Link href="/about" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">About</Link>
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
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
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
              <Link href="/" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Home</Link>
              <Link href="/destinations" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">Destinations</Link>
              <Link 
                href="/hotels" 
                className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Hotels
              </Link>
              <a 
                href="#flights" 
                className="relative text-neutral hover:text-primary cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const element = document.getElementById('flights');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Flights
              </a>
              <Link href="/about" className="relative text-neutral hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300">About</Link>
              
              {isAuthenticated ? (
                <>
                  <Link href="/profile" className="text-neutral hover:text-primary">Profile</Link>
                  <button 
                    onClick={() => signOut()}
                    disabled={isSigningOut}
                    className="text-left text-neutral hover:text-primary"
                  >
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="text-neutral hover:text-primary">Sign In</Link>
                  <Link href="/sign-up" className="text-neutral hover:text-primary">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
