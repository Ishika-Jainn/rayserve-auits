
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import TicketForm from '@/components/support/TicketForm';
import { MessageCircle, Search, Headphones } from 'lucide-react';

const Support = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">Customer Support System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Live Chat */}
        <Card className="text-center">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="h-16 w-16 bg-solar-primary rounded-full flex items-center justify-center text-white mb-4">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-6">
              Chat with our support team in real-time for immediate assistance.
            </p>
            <Link to="/support/chat" className="mt-auto">
              <Button className="w-full bg-solar-primary">Start Chat</Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Knowledge Base */}
        <Card className="text-center">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Knowledge Base</h3>
            <p className="text-gray-600 mb-6">
              Search our comprehensive database for answers to common questions.
            </p>
            <Link to="/support/knowledge" className="mt-auto">
              <Button variant="outline" className="w-full">Browse Articles</Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Phone Support */}
        <Card className="text-center">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
              <Headphones className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-6">
              Speak directly with our technical support specialists for complex issues.
            </p>
            <Button variant="outline" className="w-full mt-auto">Call Support</Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Support Ticket Form */}
      <TicketForm />
    </MainLayout>
  );
};

export default Support;
