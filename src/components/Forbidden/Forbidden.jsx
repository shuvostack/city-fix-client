import React from 'react';
import { Link } from 'react-router';
import { Building2, ShieldAlert, Construction, ArrowLeft } from 'lucide-react';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden relative">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-lg w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/50 relative z-10">
        
        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
         
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-4 bg-red-50 rounded-full"></div>

          {/* City Icon */}
          <div className="z-10 text-gray-400 animate-[bounce_3s_infinite]">
            <Building2 size={80} strokeWidth={1.5} />
          </div>

          {/* Shield Icon */}
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg z-20 animate-pulse">
             <ShieldAlert size={48} className="text-red-500" fill="currentColor" fillOpacity={0.1} />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-red-500 mb-2 font-mono">
          403
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Restricted Zone!
        </h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          Stop right there, citizen! 🚧 You don't have the necessary clearance to access this area of the city infrastructure.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-gray-900/30 active:scale-95"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          
          <Link 
            to="/auth/login" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-all duration-300 active:scale-95"
          >
            <ShieldAlert size={18} />
            Login as Admin
          </Link>
        </div>

        <div className="mt-8 flex justify-center gap-2 opacity-30">
            {[...Array(5)].map((_, i) => (
                <Construction key={i} size={20} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Forbidden;