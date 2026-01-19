import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, HandHeart } from 'lucide-react';

const VolunteerCTA = () => {
  return (
    <section className="relative py-24 font-sans overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' 
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 font-bold uppercase tracking-wider text-xs mb-6">
          <HandHeart size={16} />
          Join the Movement
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">City Guardian</span>
        </h2>

        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          You don't just have to report problems—you can help fix them too. Join 5,000+ volunteers who are actively working to make our city cleaner and safer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/register" 
            className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2"
          >
            Join as Volunteer
            <ArrowRight size={20} />
          </Link>
          
          <Link 
            to="/about" 
            className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

      </div>
    </section>
  );
};

export default VolunteerCTA;