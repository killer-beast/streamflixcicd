import { useState } from 'react';
import { Search, User, Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface NavigationProps {
  onAuthClick?: () => void;
}

export const Navigation = ({ onAuthClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-glass">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold gradient-text">StreamFlix</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`transition-colors ${location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-primary'}`}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`transition-colors ${location.pathname === '/movies' ? 'text-foreground' : 'text-muted-foreground hover:text-primary'}`}
              >
                Movies
              </Link>
              <Link 
                to="/tv-shows" 
                className={`transition-colors ${location.pathname === '/tv-shows' ? 'text-foreground' : 'text-muted-foreground hover:text-primary'}`}
              >
                TV Shows
              </Link>
              <Link 
                to="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                My List
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    placeholder="Search movies, shows..."
                    className="w-64 bg-background-secondary border-border-glass"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:bg-background-secondary"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass border-border-glass">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="hidden md:flex glass border-border-glass"
                onClick={onAuthClick}
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-background-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-up">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`transition-colors py-2 ${location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`transition-colors py-2 ${location.pathname === '/movies' ? 'text-foreground' : 'text-muted-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/tv-shows" 
                className={`transition-colors py-2 ${location.pathname === '/tv-shows' ? 'text-foreground' : 'text-muted-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                TV Shows
              </Link>
              <Link 
                to="#" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My List
              </Link>
              {!isAuthenticated ? (
                <Button
                  variant="outline"
                  className="glass border-border-glass mt-4"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onAuthClick?.();
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="glass border-border-glass mt-4"
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};