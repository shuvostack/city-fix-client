import React from 'react';
import { Building2, Globe, Landmark, ShieldCheck, Wifi, Zap } from 'lucide-react';

const Partners = () => {
  const partners = [
    { id: 1, name: "City Corporation", icon: <Landmark size={40} /> },
    { id: 2, name: "Eco Solutions", icon: <Globe size={40} /> },
    { id: 3, name: "Urban Develop", icon: <Building2 size={40} /> },
    { id: 4, name: "Power Grid", icon: <Zap size={40} /> },
    { id: 5, name: "Secure City", icon: <ShieldCheck size={40} /> },
    { id: 6, name: "Smart Net", icon: <Wifi size={40} /> },
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200 font-sans">
      <div className="container mx-auto px-6">
        
        <p className="text-center text-gray-400 font-semibold uppercase tracking-[0.2em] text-sm mb-10">
          Trusted by Government & Private Agencies
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center opacity-70">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="group flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300 hover:opacity-100 hover:scale-105 cursor-pointer"
            >
              <div className="text-gray-400 group-hover:text-primary transition-colors duration-300">
                {partner.icon}
              </div>
              <span className="text-sm font-bold text-gray-400 group-hover:text-gray-800 transition-colors duration-300">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;