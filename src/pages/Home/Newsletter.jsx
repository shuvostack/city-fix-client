import React from 'react';
import { Send, Bell, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    
    if(email){
        toast.success("Successfully subscribed to CityFix updates!");
        form.reset();
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 font-sans">
      <div className="container mx-auto">
        
        {/* Main Card Container */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-900/20">
          
          {/* Background Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10">
            
            {/* Text Content */}
            <div className="max-w-xl text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <Bell size={14} />
                Stay Updated
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">City Update</span>
              </h2>
              
              <p className="text-blue-100 text-lg">
                Join 5,000+ citizens receiving weekly reports on city improvements, resolved issues, and upcoming infrastructure projects.
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-200 text-sm mt-4">
                <ShieldCheck size={16} />
                <span>No spam, unsubscribe anytime.</span>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-md">
              <form onSubmit={handleSubscribe} className="relative group">
                {/* Input Container */}
                <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 transition-all duration-300 focus-within:bg-white/20 focus-within:border-white/40 focus-within:shadow-lg focus-within:shadow-blue-900/10">
                  
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email address..." 
                    required
                    className="w-full bg-transparent text-white placeholder-blue-200 px-4 py-3 outline-none text-base"
                  />
                  
                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-lg group-hover:scale-105 active:scale-95"
                  >
                    Subscribe
                    <Send size={18} className="-rotate-45 mb-1" />
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;