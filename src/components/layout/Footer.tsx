
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the email to a backend service
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-solar-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">AUITS SOLAR</h2>
            <p className="mb-6">
              Leading provider of solar energy solutions for residential and commercial applications.
              Committed to a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="hover:text-yellow-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-yellow-400 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-yellow-400 transition-colors">Solutions</Link>
              </li>
              <li>
                <Link to="/ar-preview" className="hover:text-yellow-400 transition-colors">AR Preview</Link>
              </li>
              <li>
                <Link to="/referrals" className="hover:text-yellow-400 transition-colors">Referral Program</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-yellow-400 transition-colors">Support</Link>
              </li>
              <li>
                <Link to="/payment" className="hover:text-yellow-400 transition-colors">Payment</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-yellow-400 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <span>akshatudyam@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <span>+91 99117 91555</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <span>625 E Sec 17 Konark Enclave Vasundhara, Ghaziabad, UP-201012</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-yellow-400 pb-2">Newsletter</h3>
            <p className="mb-4">
              Subscribe to receive updates on solar technology and special offers.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col space-y-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white text-solar-primary" 
                  required 
                />
                <Button 
                  type="submit" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-solar-primary"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 AUITS Solar Pvt Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-yellow-400 transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-400 transition-colors text-sm">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-yellow-400 transition-colors text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
