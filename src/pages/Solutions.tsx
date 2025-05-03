
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { ChevronRight, Check, Calendar, FileText, CreditCard } from 'lucide-react';

const Solutions = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'residential'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate sending the data to backend
    toast.success("Consultation request submitted successfully!");
    console.log("Form submitted:", formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      service: 'residential'
    });
  };
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">Our Solar Solutions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Residential Solar */}
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="h-48 overflow-hidden">
              <img 
                src="/uploads/imageup.png" 
                alt="Residential Solar" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Residential Solar</h3>
              <p className="text-gray-600 mb-6">
                Custom solar solutions for homes with smart monitoring systems.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-yellow-400 text-solar-primary hover:bg-yellow-500">
                    Get More Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Residential Solar Consultation</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <Input 
                      name="name" 
                      placeholder="Your Name *" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="Email Address *" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      name="phone" 
                      placeholder="Phone Number *" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea 
                      name="message" 
                      placeholder="Tell us about your requirements" 
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                    <input 
                      type="hidden" 
                      name="service" 
                      value="residential" 
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Submit Request</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          {/* Commercial Solar */}
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="h-48 overflow-hidden">
              <img 
                src="/uploads/imageup.png"
                alt="Commercial Solar" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Commercial Solar</h3>
              <p className="text-gray-600 mb-6">
                Large-scale solar installations for businesses and industries.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-yellow-400 text-solar-primary hover:bg-yellow-500">
                    Get More Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Commercial Solar Consultation</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <Input 
                      name="name" 
                      placeholder="Your Name *" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="Email Address *" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      name="phone" 
                      placeholder="Phone Number *" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea 
                      name="message" 
                      placeholder="Tell us about your requirements" 
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                    <input 
                      type="hidden" 
                      name="service" 
                      value="commercial" 
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Submit Request</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          {/* Solar Maintenance */}
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="h-48 overflow-hidden">
              <img 
                src="/uploads/imageup.png"
                alt="Solar Maintenance" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Solar Maintenance</h3>
              <p className="text-gray-600 mb-6">
                24/7 monitoring and maintenance services for optimal performance.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-yellow-400 text-solar-primary hover:bg-yellow-500">
                    Get More Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Solar Maintenance Consultation</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <Input 
                      name="name" 
                      placeholder="Your Name *" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="Email Address *" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input 
                      name="phone" 
                      placeholder="Phone Number *" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Textarea 
                      name="message" 
                      placeholder="Tell us about your requirements" 
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                    <input 
                      type="hidden" 
                      name="service" 
                      value="maintenance" 
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Submit Request</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Services */}
        <h2 className="text-2xl font-bold mb-6">Additional Services</h2>
        
        <Tabs defaultValue="energy_audit" className="w-full mb-8">
          <TabsList className="w-full bg-gray-100 p-1 mb-6">
            <TabsTrigger value="energy_audit" className="flex-1">Energy Efficiency Audit</TabsTrigger>
            <TabsTrigger value="battery_storage" className="flex-1">Solar Battery Storage</TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">Solar Analytics</TabsTrigger>
            <TabsTrigger value="financing" className="flex-1">Solar Financing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="energy_audit" className="animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Energy Efficiency Audit</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4">
                    Our experts analyze your energy usage patterns and recommend efficiency improvements 
                    to maximize your solar investment.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Comprehensive energy usage analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Detailed efficiency recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>ROI calculations for suggested improvements</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Professional thermal imaging assessment</span>
                    </li>
                  </ul>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Schedule an Audit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule Energy Audit</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="First Name *" required />
                          <Input placeholder="Last Name *" required />
                        </div>
                        <Input type="email" placeholder="Email Address *" required />
                        <Input placeholder="Phone Number *" required />
                        <div className="flex items-center">
                          <Calendar className="text-gray-500 mr-2" />
                          <p className="text-sm text-gray-500">Our team will contact you to schedule a convenient date</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" onClick={() => toast.success("Audit request submitted!")}>Submit</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src="/uploads/imageup.png" 
                    alt="Energy audit" 
                    className="w-full h-52 object-cover" 
                  />
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-semibold mb-1">What to expect</h4>
                    <p className="text-sm text-gray-600">Our energy audit typically takes 2-3 hours and covers all aspects of your home's energy use.</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="battery_storage" className="animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Solar Battery Storage</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4">
                    Add battery storage to your solar system to save excess energy for night use or during power outages.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Store excess solar energy for later use</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Power your home during grid outages</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Reduce dependency on conventional power grid</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Smart management via our mobile app</span>
                    </li>
                  </ul>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Get Battery Options</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Solar Battery Information</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="First Name *" required />
                          <Input placeholder="Last Name *" required />
                        </div>
                        <Input type="email" placeholder="Email Address *" required />
                        <Input placeholder="Phone Number *" required />
                        <Textarea placeholder="Tell us about your current solar setup (if any)" />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" onClick={() => toast.success("Request submitted!")}>Submit</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src="/uploads/imageup.png" 
                    alt="Battery storage" 
                    className="w-full h-52 object-cover" 
                  />
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-semibold mb-1">Available battery options</h4>
                    <p className="text-sm text-gray-600">We offer a range of battery capacities from 5kWh to 20kWh to suit various homes and needs.</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Solar Analytics</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4">
                    Advanced analytics platform that helps you track and optimize your solar energy production and consumption.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Real-time monitoring of your solar system</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Detailed performance reports and insights</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Predictive maintenance alerts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Integration with smart home devices</span>
                    </li>
                  </ul>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Learn More</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Solar Analytics Information</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="First Name *" required />
                          <Input placeholder="Last Name *" required />
                        </div>
                        <Input type="email" placeholder="Email Address *" required />
                        <Input placeholder="Phone Number *" required />
                        <div className="flex items-center">
                          <FileText className="text-gray-500 mr-2" />
                          <p className="text-sm text-gray-500">We'll send you our detailed analytics brochure</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" onClick={() => toast.success("Request submitted!")}>Submit</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src="/uploads/imageup.png" 
                    alt="Solar analytics" 
                    className="w-full h-52 object-cover" 
                  />
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-semibold mb-1">Analytics on the go</h4>
                    <p className="text-sm text-gray-600">Our mobile app gives you instant access to your solar system's performance data anytime, anywhere.</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="financing" className="animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Solar Financing</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4">
                    Explore our flexible financing options including loans, leases, and power purchase agreements.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Zero down payment options available</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Competitive interest rates for solar loans</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Fixed monthly payments for budget predictability</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Tax credit guidance and assistance</span>
                    </li>
                  </ul>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Financing Options</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Solar Financing Information</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="First Name *" required />
                          <Input placeholder="Last Name *" required />
                        </div>
                        <Input type="email" placeholder="Email Address *" required />
                        <Input placeholder="Phone Number *" required />
                        <div className="flex items-center">
                          <CreditCard className="text-gray-500 mr-2" />
                          <p className="text-sm text-gray-500">We'll prepare personalized financing options for your situation</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" onClick={() => toast.success("Request submitted!")}>Submit</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src="/uploads/imageup.png" 
                    alt="Solar financing" 
                    className="w-full h-52 object-cover" 
                  />
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-semibold mb-1">ROI Calculator</h4>
                    <p className="text-sm text-gray-600">Our financing specialists will help you calculate your return on investment and payback period.</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-solar-primary mb-4">Ready to start your solar journey?</h3>
            <p className="text-gray-700 mb-6">
              Our team of solar experts is ready to help you find the perfect solution for your specific needs. 
              Get a free consultation and a personalized quote today.
            </p>
            <Button className="bg-yellow-400 text-solar-primary hover:bg-yellow-500 px-8 py-6 text-lg">
              Get Free Consultation <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Solutions;
