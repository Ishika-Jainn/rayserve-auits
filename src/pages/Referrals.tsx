
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    const referralLink = document.getElementById('referral-link') as HTMLInputElement;
    
    if (referralLink) {
      referralLink.select();
      document.execCommand('copy');
      
      setCopied(true);
      toast.success('Referral link copied to clipboard');
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };
  
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">Customer Referral Program</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Referral Info */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Refer Friends, Earn Rewards</h2>
            <p className="text-gray-600 mb-6">
              Share your positive experience with friends and family. For every
              successful referral, both you and your friend will receive exclusive
              benefits.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-4">How It Works:</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <li>Share your unique referral link with friends</li>
                <li>Your friend signs up for a solar consultation</li>
                <li>If they become a customer, you both get rewards</li>
                <li>Track all your referrals in your dashboard</li>
              </ol>
            </div>
            
            <div className="bg-solar-primary text-white p-6 rounded-lg">
              <h3 className="font-bold mb-4">Your Referral Rewards:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>₹15,000 account credit for each successful referral</li>
                <li>Free system maintenance check</li>
                <li>Exclusive access to premium solar upgrades</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {/* Share Links */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Share Your Referral Link</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Your Unique Referral Link</label>
              <div className="flex">
                <Input 
                  id="referral-link"
                  value="https://ishaan-solar.com/ref/USER123" 
                  readOnly
                  className="rounded-r-none"
                />
                <Button 
                  onClick={handleCopyLink} 
                  className={`rounded-l-none ${copied ? 'bg-green-600' : 'bg-solar-primary'}`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Share via:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Facebook
                </Button>
                <Button variant="outline" className="bg-blue-400 text-white hover:bg-blue-500">
                  Twitter
                </Button>
                <Button variant="outline" className="bg-blue-700 text-white hover:bg-blue-800">
                  LinkedIn
                </Button>
                <Button variant="outline" className="bg-green-500 text-white hover:bg-green-600">
                  WhatsApp
                </Button>
                <Button variant="outline" className="col-span-full">
                  Email
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Referral Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-gray-700">3</div>
                  <div className="text-sm text-gray-500">Pending Referrals</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-green-600">2</div>
                  <div className="text-sm text-gray-500">Successful Referrals</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Referrals;
