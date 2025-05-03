
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LogOut, LayoutDashboard, ShoppingBag, Package2, Users, 
  Settings, FileText, BarChart2, Bell, Menu, X
} from 'lucide-react';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { useDB } from '@/lib/db';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const { orders } = useDB();
  
  const isActive = (path: string) => location.pathname === path;
  
  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Products', path: '/admin/products', icon: <Package2 className="w-5 h-5" /> },
    { name: 'Support Tickets', path: '/admin/support', icon: <FileText className="w-5 h-5" /> },
    { name: 'Users', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart2 className="w-5 h-5" /> },
  ];
  
  // Check for pending orders
  useEffect(() => {
    const pendingOrders = orders.filter(order => order.status === 'pending');
    if (pendingOrders.length > 0) {
      setUnreadNotifications(pendingOrders.length);
    }
  }, [orders]);
  
  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 1000);
  };
  
  const markNotificationsAsRead = () => {
    setUnreadNotifications(0);
    toast.success("Notifications marked as read");
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMobileMenu} 
          className="bg-white"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex md:w-64 flex-col bg-solar-primary text-white p-4 fixed h-screen"
      >
        {/* Logo */}
        <Link to="/admin/dashboard" className="flex items-center mb-8 p-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden mr-3">
            <img src="/lovable-uploads/12e22b72-26c4-40e4-9629-eae75662a2c6.png" alt="AUITS SOLAR" className="w-10 h-10 object-cover rounded-full" />
          </div>
          <div>
            <span className="text-lg font-bold">AUITS SOLAR</span>
            <p className="text-xs text-white/70">Admin Dashboard</p>
          </div>
        </Link>
        
        {/* Admin Navigation */}
        <div className="flex-1 space-y-1">
          {adminNavLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive(link.path)
                  ? 'bg-white/20 text-white font-medium'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
              {link.name === 'Orders' && unreadNotifications > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {unreadNotifications}
                </Badge>
              )}
            </Link>
          ))}
        </div>
        
        {/* User Info & Logout */}
        <div className="pt-4 mt-auto border-t border-white/20">
          {user && (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center p-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2 text-white">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-white/70">Administrator</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="justify-start hover:bg-white/10 text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </motion.aside>
      
      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <div className="absolute inset-0 bg-black/50" onClick={toggleMobileMenu}></div>
          <div className="absolute inset-y-0 left-0 w-64 bg-solar-primary text-white p-4 flex flex-col">
            {/* Mobile Logo */}
            <Link to="/admin/dashboard" className="flex items-center mb-8 p-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden mr-3">
                <img src="/lovable-uploads/12e22b72-26c4-40e4-9629-eae75662a2c6.png" alt="AUITS SOLAR" className="w-10 h-10 object-cover rounded-full" />
              </div>
              <div>
                <span className="text-lg font-bold">AUITS SOLAR</span>
                <p className="text-xs text-white/70">Admin Dashboard</p>
              </div>
            </Link>
            
            {/* Mobile Navigation */}
            <div className="flex-1 space-y-1">
              {adminNavLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-white/20 text-white font-medium'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                  {link.name === 'Orders' && unreadNotifications > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Mobile User Info & Logout */}
            <div className="pt-4 mt-auto border-t border-white/20">
              {user && (
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center p-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2 text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-white/70">Administrator</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="justify-start hover:bg-white/10 text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      )}
      
      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Portal</h2>
          
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="end">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={markNotificationsAsRead}
                    >
                      Mark all as read
                    </Button>
                  </div>
                  
                  <div className="border-t"></div>
                  
                  {unreadNotifications > 0 ? (
                    <>
                      <div className="py-2 px-1">
                        <p className="font-medium">New Orders</p>
                        <p className="text-sm text-gray-600">
                          You have {unreadNotifications} new orders waiting for approval.
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2 w-full"
                          onClick={() => navigate('/admin/orders')}
                        >
                          View Orders
                        </Button>
                      </div>
                      
                      <div className="py-2 px-1 border-t">
                        <p className="font-medium">Inventory Alert</p>
                        <p className="text-sm text-gray-600">
                          Some products are running low on stock.
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2 w-full"
                          onClick={() => navigate('/admin/products')}
                        >
                          View Inventory
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      <p>No new notifications</p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            <Link to="/" className="text-gray-600 hover:text-solar-primary text-sm">
              View Frontend
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="md:hidden"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>
        
        <main className="p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
        
        <footer className="p-4 md:p-8 border-t text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AUITS SOLAR Admin Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
