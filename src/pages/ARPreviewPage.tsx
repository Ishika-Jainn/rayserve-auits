
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ARPreview from '@/components/ar/ARPreview';

const ARPreviewPage = () => {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-solar-primary to-yellow-500 bg-clip-text text-transparent animate-fade-in">
            Visualize Solar Panels on Your Roof
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Use our cutting-edge AR technology to see exactly how solar panels will look 
            on your home before installation. Make informed decisions with confidence.
          </p>
        </div>
        
        <ARPreview />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-solar-primary">How It Works</h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="bg-yellow-400 text-solar-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 shrink-0">1</span>
                <span>Upload a photo of your home or use our sample images</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-solar-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 shrink-0">2</span>
                <span>Customize the number and placement of solar panels</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-solar-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 shrink-0">3</span>
                <span>See real-time visualization with accurate sizing and shading</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-solar-primary h-6 w-6 rounded-full flex items-center justify-center mr-3 shrink-0">4</span>
                <span>Save or share your customized design with our solar experts</span>
              </li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-solar-primary">Benefits of AR Preview</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Visualize before you invest - see exactly how panels will look</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Accurate energy production estimates based on your roof</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Identify optimal panel placement for maximum efficiency</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Confidence in your solar decision with realistic visualization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ARPreviewPage;
