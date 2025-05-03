
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';

const Account = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  
  if (!user) {
    // Redirect to login if not authenticated
    navigate('/login');
    return null;
  }
  
  const handleEditProfile = () => {
    setIsEditMode(true);
  };
  
  const handleSaveProfile = () => {
    setIsEditMode(false);
    toast.success('Profile updated successfully');
  };
  
  const handleChangePassword = () => {
    toast.success('Password reset link has been sent to your email');
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">User Account Management</h1>
      
      <Card className="mb-8">
        <CardHeader className="bg-solar-primary text-white rounded-t-lg">
          <CardTitle className="flex items-center">
            <div className="mr-4 h-12 w-12 bg-white rounded-full flex items-center justify-center text-solar-primary font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xl">Welcome, {user.name}</div>
              <div className="text-sm opacity-80">Manage your solar energy account</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              
              {isEditMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input defaultValue={user.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input defaultValue={user.email} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input defaultValue={user.phone || ''} />
                  </div>
                  <Button onClick={handleSaveProfile} className="bg-solar-primary">
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span className="text-gray-700">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span className="text-gray-700">{user.phone || '+1 (555) 123-4567'}</span>
                  </div>
                  <Button onClick={handleEditProfile} className="w-full">
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
            
            {/* Billing Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Billing Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Plan:</span>
                  <span className="text-gray-700">{user.plan || 'Premium Solar'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Next Bill:</span>
                  <span className="text-gray-700">May 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span className="text-gray-700">₹9,999.99</span>
                </div>
                <Button variant="outline" className="w-full">
                  View Billing History
                </Button>
              </div>
            </div>
          </div>
          
          {/* Security Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Security</h3>
            <Button onClick={handleChangePassword} className="w-full md:w-auto">
              Change Password
            </Button>
          </div>
          
          {/* System Information */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Your Solar System</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">System Size</div>
                  <div className="text-2xl font-bold">5.8 kW</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">Installation Date</div>
                  <div className="text-2xl font-bold">June 12, 2023</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">Warranty Until</div>
                  <div className="text-2xl font-bold">June 2033</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Account;
