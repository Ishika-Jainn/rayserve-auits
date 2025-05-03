
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDB, User, UserRole } from '@/lib/db';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { login: dbLogin, logout: dbLogout, currentUser } = useDB();

  useEffect(() => {
    // Check if user is already logged in
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, [currentUser]);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      // In a real app, we would validate password here
      const loggedInUser = dbLogin(email, password, role);
      
      if (loggedInUser) {
        setUser(loggedInUser);
        toast.success(`Welcome back, ${loggedInUser.name}`);
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    dbLogout();
    setUser(null);
    toast.info('You have been logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
