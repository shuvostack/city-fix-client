import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, AlertTriangle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router'; 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Banner = () => {
  
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop", 
      title: "Shape Your City's Future",
      subtitle: "Report infrastructure issues instantly and watch your city transform.",
      color: "from-blue-600 to-blue-900"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop", 
      title: "Spot It. Report It. Fixed.",
      subtitle: "From potholes to broken lights – your voice matters in maintaining our streets.",
      color: "from-red-600 to-red-900"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop",
      title: "Real-Time Progress Tracking",
      subtitle: "See live updates as our staff resolves the issues you care about.",
      color: "from-emerald-600 to-emerald-900"
    }
  ];

  return (
    <div className="w-full min-h-[600px] h-[70vh] relative font-sans">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={'fade'}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="relative w-full h-full overflow-hidden group">
                
                {/* Background Image with Zoom Effect */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80 mix-blend-multiply`}></div>
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center px-6 md:px-20 container mx-auto">
                  <div className="max-w-3xl text-white space-y-6 mt-10">
                    
                    {/* Tagline Badge */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium"
                    >
                      <AlertTriangle size={16} className="text-yellow-400" />
                      <span>Public Infrastructure Reporting</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1 
                      initial={{ opacity: 0, x: -50 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-lg md:text-xl text-gray-200 max-w-xl"
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Action Area */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="pt-4 flex flex-col sm:flex-row gap-4"
                    >
                      {/* Search Bar */}
                      <div className="flex items-center bg-white rounded-xl overflow-hidden p-1.5 shadow-2xl w-full max-w-md">
                        <div className="pl-3 text-gray-400">
                          <MapPin size={20} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Search issues by location..." 
                          className="flex-1 px-4 py-2 text-gray-700 outline-none placeholder-gray-400"
                        />
                        <Link to="/all-issues">
                            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2">
                            <Search size={18} />
                            <span className="hidden sm:inline">Search</span>
                            </button>
                        </Link>
                      </div>

                      {/* CTA Button */}
                      <Link to="/dashboard/add-issue">
                        <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white font-semibold transition-all">
                            Report Issue
                            <ArrowRight size={18} />
                        </button>
                      </Link>
                    </motion.div>

                  </div>
                </div>

                {/* Scroll Down arrow button */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-10"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                    <ChevronDown size={24} />
                </motion.div>

              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;