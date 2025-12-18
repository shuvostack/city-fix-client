import React from 'react';
import { motion } from 'framer-motion';
import { Camera, UserCog, Hammer, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Submit a Report",
      description: "Spot a problem? Take a photo, add the location, and submit details. It takes less than 2 minutes.",
      icon: <Camera className="w-6 h-6" />,
      role: "Citizen"
    },
    {
      id: 2,
      title: "Admin Verification",
      description: "Our admins review the report for authenticity and assign the most suitable staff member for the job.",
      icon: <UserCog className="w-6 h-6" />,
      role: "Admin"
    },
    {
      id: 3,
      title: "Expert Resolution",
      description: "Assigned staff reaches the location, fixes the issue, and updates the status from 'In-Progress' to 'Resolved'.",
      icon: <Hammer className="w-6 h-6" />,
      role: "Staff"
    },
    {
      id: 4,
      title: "Get Notified",
      description: "You receive an instant update with a proof picture. The issue is closed, and the city gets better!",
      icon: <CheckCircle2 className="w-6 h-6" />,
      role: "System"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 font-sans overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            How We <span className="text-primary">Fix It</span> Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500"
          >
            From a broken street light to a fixed road—here is the journey of your report.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-gradient-to-b from-primary via-blue-300 to-gray-200 rounded-full"></div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center md:justify-between ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                
                <div className="hidden md:block w-5/12"></div>

                <div className="absolute left-0 md:left-1/2 md:-ml-6 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-primary shadow-xl z-10">
                   <span className="text-primary">{step.icon}</span>
                </div>

                {/* Content Card */}
                <div className="ml-16 md:ml-0 w-full md:w-5/12">
                   <div className={`p-6 bg-white rounded-2xl shadow-sm border-l-4 hover:shadow-xl transition-shadow duration-300 relative ${
                       index % 2 === 0 ? 'border-primary md:text-right' : 'border-blue-400 md:text-left'
                   }`}>
                      
                      <div className={`hidden md:block absolute top-1/2 -mt-2 w-4 h-4 bg-white transform rotate-45 ${
                          index % 2 === 0 ? '-right-2 border-r border-t border-gray-100' : '-left-2 border-l border-b border-gray-100'
                      }`}></div>

                      <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-primary bg-blue-50 rounded-full uppercase">
                        Step 0{step.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                   </div>
                </div>

              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mt-20 relative z-10"
          >
             <Link 
                to="/dashboard/add-issue" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/40 hover:-translate-y-1"
             >
                Start Reporting Now <ArrowRight size={18} />
             </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;