
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGetDetails = () => {
    // In a real application, you would send this data to a backend
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill out all fields", {
        description: "We need your information to provide accurate details",
      });
      return;
    }
    
    toast.success("Request received!", {
      description: "Our team will contact you shortly with more details.",
    });
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: ''
    });
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-solar-primary">
            Solar Energy Solutions for a Sustainable Future
          </h1>
          <p className="text-lg text-gray-700">
            AUITS Solar helps you harness the power of the sun with innovative solar
            solutions that save money and protect our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/solutions">
              <Button className="bg-solar-primary hover:bg-opacity-90 text-white">
                Explore Solutions
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" className="border-solar-primary text-solar-primary">
                Book a consultant
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-solar-primary p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Get a Free Solar Quote</h2>
          <form className="space-y-4">
            <div>
              <Input 
                placeholder="Full Name" 
                className="bg-white"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input 
                type="tel" 
                placeholder="Phone Number" 
                className="bg-white" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input 
                placeholder="Address" 
                className="bg-white"
                name="address" 
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <Button 
              type="button" 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-solar-primary font-bold"
              onClick={handleGetDetails}
            >
              Get more details
            </Button>
          </form>
        </div>
      </div>
      
      {!isAuthenticated && (
        <div className="text-center p-6 bg-blue-50 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-2">Already a customer?</h3>
          <p className="mb-4">Log in to access your dashboard, support tickets, and more.</p>
          <Link to="/login">
            <Button className="bg-solar-primary hover:bg-opacity-90">
              Log In Now
            </Button>
          </Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Energy Freedom</h3>
          <p className="text-gray-600">Take control of your energy production and reduce dependence on the grid.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Save Money</h3>
          <p className="text-gray-600">Reduce or eliminate your electricity bills with clean, renewable energy.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Protect Our Planet</h3>
          <p className="text-gray-600">Reduce your carbon footprint and contribute to a sustainable future.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
