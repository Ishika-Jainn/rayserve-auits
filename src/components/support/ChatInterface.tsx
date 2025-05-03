
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Send } from 'lucide-react';
import { useDB } from '@/lib/db';
import { useAuth } from '@/contexts/AuthContext';
import { startSpeechRecognition, speakText, stopSpeaking } from '@/lib/speech';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

const getResponse = async (message: string): Promise<string> => {
  // This would be a real AI service in production
  const responses = [
    "I'm here to help with your solar system! How can I assist you today?",
    "Solar panels can work during cloudy days, though with reduced efficiency.",
    "The average lifespan of our solar panels is 25-30 years.",
    "Yes, we offer installation services and maintenance packages.",
    "Your system is performing at optimal efficiency based on the latest readings.",
    "We can schedule a maintenance visit for you next week.",
    "The warranty on your solar inverter is valid for 10 years.",
    "You can track your solar production in real-time through the dashboard.",
    "The best position for solar panels is south-facing with a 30-degree tilt.",
    "Your next bill payment is scheduled for the 15th of this month."
  ];
  
  // Simple mock implementation - in production use a real NLP service
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return responses[0];
  } else if (message.toLowerCase().includes('cloud')) {
    return responses[1];
  } else if (message.toLowerCase().includes('lifespan') || message.toLowerCase().includes('how long')) {
    return responses[2];
  } else if (message.toLowerCase().includes('installation') || message.toLowerCase().includes('maintain')) {
    return responses[3];
  } else if (message.toLowerCase().includes('performance') || message.toLowerCase().includes('efficiency')) {
    return responses[4];
  } else if (message.toLowerCase().includes('schedule') || message.toLowerCase().includes('visit')) {
    return responses[5];
  } else if (message.toLowerCase().includes('warranty')) {
    return responses[6];
  } else if (message.toLowerCase().includes('track') || message.toLowerCase().includes('monitor')) {
    return responses[7];
  } else if (message.toLowerCase().includes('position') || message.toLowerCase().includes('placement')) {
    return responses[8];
  } else if (message.toLowerCase().includes('bill') || message.toLowerCase().includes('payment')) {
    return responses[9];
  }
  
  // Default response
  return "I'll need to check on that for you. Would you like me to connect you with a customer support representative?";
};

const ChatInterface: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { addMessage, getMessages } = useDB();
  
  useEffect(() => {
    // Initialize chat with welcome message if no messages
    if (user && messages.length === 0) {
      const initialMessage = {
        id: 'welcome',
        content: `Hello! How can I help you with your solar energy today?`,
        isBot: true,
        timestamp: new Date().toISOString()
      };
      setMessages([initialMessage]);
      
      // In a real app, fetch message history
      if (user.id) {
        const userMessages = getMessages(user.id);
        if (userMessages.length > 0) {
          setMessages([initialMessage, ...userMessages]);
        }
      }
    }
  }, [user, getMessages]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing || !user) return;
    
    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    
    // Store message
    if (user.id) {
      addMessage(user.id, inputMessage, false);
    }
    
    try {
      // Get AI response
      const response = await getResponse(inputMessage);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Store bot message
      if (user.id) {
        addMessage(user.id, response, true);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again later.',
        isBot: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    
    setIsRecording(true);
    
    // Start speech recognition
    const stopListening = startSpeechRecognition(
      (text) => {
        setInputMessage(text);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );
    
    // Cleanup function will be called when the component unmounts
    return stopListening;
  };
  
  const handleSpeakResponse = (message: Message) => {
    if (!message.isBot) return;
    
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    
    setIsSpeaking(true);
    speakText(message.content, () => {
      setIsSpeaking(false);
    });
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto border shadow-lg">
      <CardHeader className="bg-solar-primary text-white rounded-t-lg">
        <CardTitle className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          Ishaan Solar Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 ${message.isBot ? 'text-left' : 'text-right'}`}
            >
              <div 
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  message.isBot 
                    ? 'bg-white text-gray-800 shadow' 
                    : 'bg-solar-primary text-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="block">{message.content}</span>
                  {message.isBot && (
                    <button 
                      onClick={() => handleSpeakResponse(message)}
                      className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {isSpeaking ? (
                        <span className="text-xs">Stop</span>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t flex">
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={toggleRecording}
            className={isRecording ? 'bg-red-500 text-white' : ''}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mx-2 flex-1"
            disabled={isProcessing || isRecording}
          />
          <Button onClick={handleSendMessage} disabled={isProcessing || !inputMessage.trim()}>
            <Send className="h-4 w-4 mr-1" /> Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
