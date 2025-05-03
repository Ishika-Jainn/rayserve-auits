
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Home, LayoutDashboard, Image, User, HeadphonesIcon, Share2, CreditCard, Globe, ShoppingBag } from 'lucide-react';
import Footer from './Footer';
import { Badge } from '@/components/ui/badge';
import { useDB } from '@/lib/db';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { getCart } = useDB();

  const isActive = (path: string) => location.pathname === path;
  const { count: cartCount } = getCart();
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5 mr-2" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5 mr-2" /> },
    { name: 'AR Preview', path: '/ar-preview', icon: <Image className="w-5 h-5 mr-2" /> },
    { name: 'Shop', path: '/shop', icon: <ShoppingBag className="w-5 h-5 mr-2" /> },
    { name: 'Account', path: '/account', icon: <User className="w-5 h-5 mr-2" /> },
    { name: 'Support', path: '/support', icon: <HeadphonesIcon className="w-5 h-5 mr-2" /> },
    { name: 'Referrals', path: '/referrals', icon: <Share2 className="w-5 h-5 mr-2" /> },
    { name: 'Payment', path: '/payment', icon: <CreditCard className="w-5 h-5 mr-2" /> },
    { name: 'Solutions', path: '/solutions', icon: <Globe className="w-5 h-5 mr-2" /> },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-solar-background">
      {/* Header/Navigation */}
      <header className="bg-solar-primary text-white shadow-md animate-fade-in">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden mr-3">
              <img src="/lovable-uploads/12e22b72-26c4-40e4-9629-eae75662a2c6.png" alt="AUITS SOLAR" className="w-10 h-10 object-cover rounded-full" />
            </div>
            <span className="text-xl font-bold">AUITS SOLAR</span>
          </Link>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-3 py-2 rounded transition-colors hover-scale ${
                  isActive(link.path) 
                    ? 'font-medium underline underline-offset-4' 
                    : 'hover:text-yellow-300'
                }`}
              >
                {link.name}
                {link.path === '/shop' && cartCount > 0 && (
                  <Badge variant="destructive" className="ml-2">{cartCount}</Badge>
                )}
              </Link>
            ))}
          </nav>
          
          {/* User Info & Logout */}
          {user ? (
            <div className="flex items-center">
              <span className="mr-2 hidden md:inline-block text-sm">
                {user.role === 'admin' ? 'Admin' : ''} {user.name}
              </span>
              <Button 
                variant="destructive"
                size="sm"
                onClick={logout}
                className="flex items-center hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="outline" className="bg-yellow-400 hover:bg-yellow-500 text-solar-primary transition-colors">
                <LogOut className="w-4 h-4 mr-1" /> Login
              </Button>
            </Link>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Cart Widget */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 right-6 z-40">
          <Link to="/cart">
            <div className="w-14 h-14 rounded-full bg-yellow-400 text-solar-primary flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all animate-bounce hover:scale-110">
              <div className="relative">
                <ShoppingBag className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
              </div>
            </div>
          </Link>
        </div>
      )}
      
      {/* Chat Widget */}
      {user && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link to="/support/chat">
            <div className="w-12 h-12 rounded-full bg-solar-primary text-white flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all chat-animation hover:scale-110 pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </Link>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
