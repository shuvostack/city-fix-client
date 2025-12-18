import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  Smartphone, 
  BellRing,
  ArrowUpRight
} from 'lucide-react';

const Features = () => {
  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-primary text-sm font-bold mb-6 border border-blue-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Key Features
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Smart Infrastructure, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Smarter Management
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500"
          >
            We empower citizens and authorities with tools that ensure transparency, speed, and accountability in public service delivery.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-gray-50 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group border border-gray-100 hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative z-10 max-w-md">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pinpoint Accuracy</h3>
              <p className="text-gray-500 leading-relaxed">
                Report issues with exact geolocation data. Our integrated map interface ensures maintenance teams know exactly where to go, reducing response time significantly.
              </p>
            </div>
            
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-cover opacity-5 group-hover:opacity-10 transition-opacity duration-500 grayscale"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:row-span-2 bg-gray-900 text-white rounded-[2rem] p-8 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
                <Smartphone size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Instant Alerts</h3>
              <p className="text-gray-400 mb-8 text-sm">
                Get real-time SMS & Email notifications when your reported issue status changes from Pending to Resolved.
              </p>
            </div>
            
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-64 bg-gray-800 rounded-t-3xl border-t-4 border-l-4 border-r-4 border-gray-700 shadow-2xl group-hover:-translate-y-4 transition-transform duration-500 flex flex-col items-center pt-4">
               <div className="w-16 h-1 bg-gray-600 rounded-full mb-4"></div>
               <div className="w-40 h-10 bg-gray-700/50 rounded-lg mb-2 flex items-center px-3 gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <BellRing size={12} className="text-green-400"/>
                  </div>
                  <div className="h-2 w-20 bg-gray-600 rounded"></div>
               </div>
               <div className="w-40 h-10 bg-gray-700/50 rounded-lg flex items-center px-3 gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Clock size={12} className="text-blue-400"/>
                  </div>
                  <div className="h-2 w-16 bg-gray-600 rounded"></div>
               </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 rounded-[2rem] p-8 group border border-blue-100 hover:border-blue-200 transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                 <BarChart3 size={24} />
               </div>
               <ArrowUpRight className="text-blue-300 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven City</h3>
            <p className="text-gray-500 text-sm">
              We collect and analyze infrastructure data to help authorities plan better budgets.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Transparent</h3>
            <p className="text-gray-500 text-sm">
              Every action is logged in a public timeline. No more hidden files or lost complaints.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;