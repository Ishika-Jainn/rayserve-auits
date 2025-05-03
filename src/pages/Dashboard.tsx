import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EnergyChart from '@/components/dashboard/EnergyChart';
import { useDB } from '@/lib/db';
import RaiseTicket from '@/components/dashboard/RaiseTicket';
import { Sun, Battery, BarChart2, Zap, Cloud, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { energyData } = useDB();

  // Get user specific energy data
  const userEnergyData = user ? energyData[user.id] || [] : [];
  
  // Calculate total energy production
  const totalEnergy = userEnergyData.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate month-over-month percentage change
  // For demo purposes, assuming 8% increase
  const energyChangePercentage = 8;
  
  const currentEnergy = {
    production: 3.8, // kW
    consumption: 2.1, // kW
    battery: 85, // %
    savings: 27.4, // ₹ per day
  };
  
  const performanceStats = {
    efficiency: 96, // %
    co2Saved: 327, // kg
    treesEquivalent: 15,
    dailyAvg: 28.4, // kWh
  };
  
  const weatherInfo = {
    condition: 'Mostly sunny',
    temperature: 28,
    sunHours: 12.5,
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}</h1>
          <p className="text-gray-600">Here's an overview of your solar performance</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-md text-sm">
          <Sun className="h-4 w-4 text-yellow-600" />
          <span>Today: {weatherInfo.condition}, {weatherInfo.temperature}°C</span>
        </div>
      </div>
      
      {/* Live Energy Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-md bg-gradient-to-br from-sky-50 to-blue-100 card-hover-effect animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Production</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{currentEnergy.production}</h3>
                  <span className="text-sm ml-1">kW</span>
                </div>
              </div>
              <div className="h-10 w-10 bg-sky-200 rounded-full flex items-center justify-center text-sky-700">
                <Sun className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12% above average</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 card-hover-effect animate-fade-in" style={{animationDelay: "0.1s"}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Consumption</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{currentEnergy.consumption}</h3>
                  <span className="text-sm ml-1">kW</span>
                </div>
              </div>
              <div className="h-10 w-10 bg-green-200 rounded-full flex items-center justify-center text-green-700">
                <Zap className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-blue-600">
              <ArrowUpRight className="h-3 w-3 mr-1 transform rotate-90" />
              <span>Stable consumption</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 card-hover-effect animate-fade-in" style={{animationDelay: "0.2s"}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Battery Status</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{currentEnergy.battery}%</h3>
                </div>
              </div>
              <div className="h-10 w-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-700">
                <Battery className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-purple-600">
              <span>Estimated 8.5 hours backup</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100 card-hover-effect animate-fade-in" style={{animationDelay: "0.3s"}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Savings</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">₹{currentEnergy.savings}</h3>
                </div>
              </div>
              <div className="h-10 w-10 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700">
                <BarChart2 className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>₹822 this month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Energy chart and performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 border-0 shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle>Energy Production & Consumption</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <EnergyChart 
                data={userEnergyData} 
                total={totalEnergy}
                change={energyChangePercentage}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Sun className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">System Efficiency</p>
                    <p className="font-medium">{performanceStats.efficiency}%</p>
                  </div>
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${performanceStats.efficiency}%` }}></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Cloud className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CO₂ Saved</p>
                    <p className="font-medium">{performanceStats.co2Saved} kg</p>
                  </div>
                </div>
                <p className="text-sm text-green-600">{performanceStats.treesEquivalent} trees</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <Zap className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Daily Average</p>
                    <p className="font-medium">{performanceStats.dailyAvg} kWh</p>
                  </div>
                </div>
                <p className="text-sm text-blue-600">+2.1 kWh</p>
              </div>
              
              <div className="pt-2">
                <Link to="/account">
                  <Button variant="outline" className="w-full">View Detailed Reports</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions and Raise Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/ar-preview">
                <Button variant="outline" className="w-full h-20 text-left flex items-center justify-between hover-scale">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">AR Preview</p>
                      <p className="text-xs text-gray-500">Visualize panels on your roof</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Button>
              </Link>
              
              <Link to="/payment">
                <Button variant="outline" className="w-full h-20 text-left flex items-center justify-between hover-scale">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Payment</p>
                      <p className="text-xs text-gray-500">Manage your payments</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Button>
              </Link>
              
              <Link to="/support">
                <Button variant="outline" className="w-full h-20 text-left flex items-center justify-between hover-scale">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Support</p>
                      <p className="text-xs text-gray-500">Get help with your system</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Button>
              </Link>
              
              <Link to="/support/chat">
                <Button variant="outline" className="w-full h-20 text-left flex items-center justify-between hover-scale">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-xs text-gray-500">Talk to our AI assistant</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Raise Ticket Component */}
        <RaiseTicket />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
