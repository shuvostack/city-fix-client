import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Heart, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {

  const team = [
    {
      name: "Mehedi Hasan Shuvo",
      role: "Premium Citizen",
      image: "https://i.ibb.co/VpD6LMPw/Me.jpg",
      bio: "Passionate about building tech that solves real-world problems."
    },
    {
      name: "Nayeem Mp",
      role: "Staff",
      image: "https://i.ibb.co/dsJYLw6b/nayem-mp.jpg",
      bio: "Believes that good design can make public services accessible to everyone."
    },
    {
      name: "Sayefi Sukh",
      role: "Admin",
      image: "https://i.ibb.co/wr0k22w0/sukh.jpg",
      bio: "Ensuring that the platform runs smoothly, securely, and efficiently."
    }
  ];

  return (
    <div className="font-sans overflow-hidden">
      <section className="relative h-[500px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        {/* Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Who We Are
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Better City</span>, <br /> One Report at a Time.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            CityFix is a bridge between proactive citizens and the authorities, ensuring that every voice is heard and every issue is resolved.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
               >
                 <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop" alt="Meeting" className="w-full h-auto" />
               </motion.div>
               <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/10 rounded-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                 <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-4">
                    <Target size={24} />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                 <p className="text-gray-500 leading-relaxed">
                   To create a transparent, efficient, and user-friendly platform that empowers citizens to take ownership of their community's infrastructure. We aim to reduce the response time of public services by 50% through digital reporting.
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
               >
                 <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb size={24} />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                 <p className="text-gray-500 leading-relaxed">
                   A city where no pothole goes unnoticed, no street light remains broken, and every citizen feels connected to the development of their environment.
                 </p>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900">Core Values</h2>
             <p className="text-gray-500 mt-2">The principles that drive our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: <Users />, title: "Community First", desc: "We believe in the power of collective action to solve problems." },
               { icon: <Target />, title: "Transparency", desc: "Every report, update, and resolution is visible to the public." },
               { icon: <Heart />, title: "Passion for Service", desc: "We are dedicated to making our city a better place to live." }
             ].map((value, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
                >
                   <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-primary group-hover:text-white transition-colors mb-6">
                      {React.cloneElement(value.icon, { size: 32 })}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                   <p className="text-gray-500">{value.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The passionate individuals working behind the scenes to make CityFix a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {team.map((member, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="group relative"
               >
                 <div className="relative overflow-hidden rounded-2xl h-96 w-full shadow-lg">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <h3 className="text-white text-xl font-bold">{member.name}</h3>
                       <p className="text-primary font-medium mb-2">{member.role}</p>
                       <p className="text-gray-300 text-sm">{member.bio}</p>
                       
                       <div className="flex gap-4 mt-4">
                          <a href="#" className="text-white hover:text-primary"><Github size={20} /></a>
                          <a href="#" className="text-white hover:text-primary"><Linkedin size={20} /></a>
                          <a href="#" className="text-white hover:text-primary"><Twitter size={20} /></a>
                       </div>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
           <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
             Join thousands of citizens who are actively contributing to a cleaner, safer, and smarter city.
           </p>
           <Link 
             to="/register" 
             className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
           >
             Join Community <ArrowRight size={20} />
           </Link>
        </div>
      </section>

    </div>
  );
};

export default About;