
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ChevronUp, ChevronDown, Upload, ImageUp, Download } from 'lucide-react';

const ARPreview = () => {
  const [activeTab, setActiveTab] = useState('view1');
  const [panelCount, setPanelCount] = useState(12);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeded. Maximum 5MB allowed.");
      return;
    }
    
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setIsUploading(false);
      toast.success("Image uploaded successfully!");
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      toast.error("Error reading the file");
    };
    
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const incrementPanels = () => {
    if (panelCount < 24) {
      setPanelCount(prev => prev + 1);
      toast.info(`Panel count updated to ${panelCount + 1}`);
    }
  };
  
  const decrementPanels = () => {
    if (panelCount > 4) {
      setPanelCount(prev => prev - 1);
      toast.info(`Panel count updated to ${panelCount - 1}`);
    }
  };
  
  const downloadImage = () => {
    // Create a link element
    const link = document.createElement('a');
    
    // Set the href to the current view image
    const imageUrl = uploadedImage || 
      (activeTab === 'view1' 
        ? '/uploads/imageup.png'
        : activeTab === 'view2' 
          ? '/uploads/imageup.png' 
          : '/uploads/imageup.png');
    
    link.href = imageUrl;
    
    // Set the download attribute and filename
    link.download = `solar-panel-preview-${activeTab}.jpg`;
    
    // Append to the document
    document.body.appendChild(link);
    
    // Trigger the click event
    link.click();
    
    // Remove the link from the document
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully!");
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg animate-fade-in">
      <Tabs defaultValue="view1" className="w-full" onValueChange={setActiveTab}>
        <div className="p-4 bg-solar-primary text-white">
          <h2 className="text-2xl font-bold animate-fade-in">AR Solar Panel Visualizer</h2>
          <p className="text-sm opacity-90 animate-fade-in" style={{animationDelay: "0.1s"}}>See how solar panels would look on your property</p>
          <TabsList className="mt-4 bg-solar-secondary/20">
            <TabsTrigger value="view1" className="data-[state=active]:bg-solar-secondary transition-all hover:bg-solar-secondary/50">Front View</TabsTrigger>
            <TabsTrigger value="view2" className="data-[state=active]:bg-solar-secondary transition-all hover:bg-solar-secondary/50">Top View</TabsTrigger>
            <TabsTrigger value="view3" className="data-[state=active]:bg-solar-secondary transition-all hover:bg-solar-secondary/50">Side View</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="view1" className="p-0">
          <div className="aspect-video relative bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
            {uploadedImage && activeTab === 'view1' ? (
              <img 
                src={uploadedImage} 
                alt="House with solar panels - custom front view" 
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <img 
                src="/uploads/imageup.png" 
                alt="House with solar panels - front view" 
                className="w-full h-full object-cover animate-fade-in"
              />
            )}
            <div className="absolute top-4 right-4 bg-yellow-400 text-solar-primary px-3 py-1 rounded shadow-md text-sm font-medium animate-fade-in">
              Front View
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="view2" className="p-0">
          <div className="aspect-video relative bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
            {uploadedImage && activeTab === 'view2' ? (
              <img 
                src={uploadedImage} 
                alt="House with solar panels - custom top view" 
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <img 
                src="/uploads/imageup.png" 
                alt="House with solar panels - top view" 
                className="w-full h-full object-cover animate-fade-in"
              />
            )}
            <div className="absolute top-4 right-4 bg-yellow-400 text-solar-primary px-3 py-1 rounded shadow-md text-sm font-medium animate-fade-in">
              Top View
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="view3" className="p-0">
          <div className="aspect-video relative bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
            {uploadedImage && activeTab === 'view3' ? (
              <img 
                src={uploadedImage} 
                alt="House with solar panels - custom side view" 
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <img 
                src="/uploads/imageup.png" 
                alt="House with solar panels - side view" 
                className="w-full h-full object-cover animate-fade-in"
              />
            )}
            <div className="absolute top-4 right-4 bg-yellow-400 text-solar-primary px-3 py-1 rounded shadow-md text-sm font-medium animate-fade-in">
              Side View
            </div>
          </div>
        </TabsContent>
        
        <div className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Current View: {activeTab === 'view1' ? 'Front' : activeTab === 'view2' ? 'Top' : 'Side'}</h3>
              <p className="text-sm text-gray-600">Viewing how {panelCount} solar panels would look on your property</p>
            </div>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={triggerFileInput}
                disabled={isUploading}
                className="hover:bg-gray-100 transition-colors">
                <Upload className="w-4 h-4 mr-2" /> Upload Your Home Photo
              </Button>
              <Button onClick={downloadImage} className="hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" /> Download Image
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 animate-fade-in" style={{animationDelay: "0.1s"}}>
              <div className="text-sm text-gray-500">Estimated Power</div>
              <div className="text-2xl font-bold">{(panelCount * 0.4).toFixed(1)} kW</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="text-sm text-gray-500">Annual Production</div>
              <div className="text-2xl font-bold">{(panelCount * 520).toFixed(0)} kWh</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 animate-fade-in" style={{animationDelay: "0.3s"}}>
              <div className="text-sm text-gray-500">CO₂ Offset</div>
              <div className="text-2xl font-bold">{(panelCount * 0.36).toFixed(1)} tons/year</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="text-sm text-gray-500">Panel Count</div>
              <div className="flex items-center">
                <div className="text-2xl font-bold">{panelCount}</div>
                <div className="ml-4 flex flex-col space-y-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={incrementPanels} 
                    className="h-6 w-6 p-0 flex items-center justify-center"
                    disabled={panelCount >= 24}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={decrementPanels} 
                    className="h-6 w-6 p-0 flex items-center justify-center"
                    disabled={panelCount <= 4}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-6 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <h4 className="font-semibold mb-2 flex items-center text-blue-800">
              <ImageUp className="h-5 w-5 mr-2" />
              AR Visualization Tips
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 ml-7 list-disc">
              <li>Upload a clear, well-lit image of your property</li>
              <li>For the most accurate visualization, take photos at midday</li>
              <li>Ensure your roof is clearly visible in the image</li>
              <li>Adjust panel count to see different installation sizes</li>
              <li>Download and share with family or send to our solar experts</li>
            </ul>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ARPreview;
