import React from 'react';
import { Apple, Smartphone } from 'lucide-react'; 

const MobileApp = () => {
  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden relative font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px] -ml-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Content */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Report Issues <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                On The Go
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0">
              Download our mobile app to snap photos, report location automatically, and track status anytime, anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Apple Store Button */}
              <button className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all active:scale-95">
                <Apple size={28} />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Download on the</p>
                  <p className="text-lg font-bold leading-none">App Store</p>
                </div>
              </button>

              {/* Play Store Button */}
              <button className="flex items-center gap-3 bg-gray-800 text-white border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-700 transition-all active:scale-95">
                <Smartphone size={28} />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Get it on</p>
                  <p className="text-lg font-bold leading-none">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-72 h-[500px] bg-gray-800 rounded-[3rem] border-8 border-gray-700 shadow-2xl flex items-center justify-center overflow-hidden rotate-6 hover:rotate-0 transition-transform duration-500">
                
                <div className="absolute inset-0 bg-gray-900 flex flex-col">
                    {/* Status Bar */}
                    <div className="h-6 w-full bg-black/20"></div>
                    {/* App Header */}
                    <div className="p-4 bg-primary">
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="h-32 bg-gray-800 rounded-2xl w-full animate-pulse"></div>
                        <div className="h-20 bg-gray-800 rounded-2xl w-full animate-pulse delay-75"></div>
                        <div className="h-20 bg-gray-800 rounded-2xl w-full animate-pulse delay-150"></div>
                    </div>
                    <div className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white text-2xl font-bold">+</div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileApp;