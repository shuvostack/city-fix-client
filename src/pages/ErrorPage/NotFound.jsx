import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { MapPinOff, Home, AlertTriangle, Construction } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#4A5568 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 text-gray-200"
      >
        <Construction size={120} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-20 text-gray-200"
      >
        <AlertTriangle size={100} />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <div className="relative inline-block">
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-9xl md:text-[12rem] font-black text-gray-900 tracking-tighter"
            >
              4
              <span className="text-primary inline-block relative mx-2">
                0
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                >
                   <MapPinOff size={60} md:size={80} />
                </motion.div>
              </span>
              4
            </motion.h1>
            
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "110%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 bg-yellow-400 -rotate-6 flex items-center overflow-hidden border-y-4 border-black shadow-xl"
            >
                <div className="flex gap-4 animate-marquee whitespace-nowrap font-bold text-black uppercase tracking-widest text-lg">
                    <span>🚧 Road Closed 🚧</span>
                    <span>Dead End</span>
                    <span>Do Not Enter</span>
                    <span>🚧 Road Closed 🚧</span>
                    <span>Dead End</span>
                </div>
            </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 space-y-4"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                You've gone off the map!
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
                The page you are looking for doesn't exist or has been moved. It looks like this part of the city is still under construction.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link 
                    to="/" 
                    className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/30 group"
                >
                    <Home size={20} className="group-hover:-translate-y-1 transition-transform" />
                    Back to Safety
                </Link>
                <Link 
                    to="/contact" 
                    className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                    Report Missing Page
                </Link>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFound;