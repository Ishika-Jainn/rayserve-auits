
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ChatInterface from '@/components/support/ChatInterface';

const ChatPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Chat Support</h1>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md mb-8 animate-fade-in">
          <div className="flex items-start">
            <div className="bg-blue-500 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">24/7 AI-Powered Support</h2>
              <p className="text-gray-600">
                Our AI assistant is available anytime to help you with your questions and issues.
                You can use text or voice to communicate with our assistant.
              </p>
              <div className="mt-3 text-sm bg-yellow-100 p-2 rounded">
                <span className="font-medium">Pro Tip:</span> Try using voice commands by clicking the microphone icon!
              </div>
            </div>
          </div>
        </div>
        
        <div className="animate-scale-in">
          <ChatInterface />
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
