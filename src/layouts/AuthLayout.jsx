import React from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { FaArrowLeft, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import Logo from '../components/Logo/Logo';

const AuthLayout = () => {
  const location = useLocation();
  const isRegister = location.pathname.includes('register');

  return (
    <div className="min-h-screen w-full flex bg-gray-50 font-sans overflow-hidden">
      
      {/* Left */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 bg-gray-900 text-white overflow-hidden">
        
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')" 
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
            
            {/* Logo */}
            <div>
               <div className="bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded-2xl border border-white/20">
                  <Logo></Logo> 
               </div>
            </div>

            {/* Middle */}
            <div className="space-y-6 max-w-lg">
                <h1 className="text-5xl font-bold leading-tight">
                  {isRegister ? "Join the Change." : "Welcome Back."} <br />
                  <span className="text-blue-200">Build a Better City.</span>
                </h1>
                <p className="text-lg text-gray-200 leading-relaxed">
                  "Report infrastructure issues, track real-time progress, and help us maintain a safer, cleaner environment for everyone."
                </p>

                {/* Feature */}
                <div className="flex gap-3 pt-2">
                    {['Real-time Tracking', 'Direct Impact', 'Community Driven'].map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Floating Stats Card */}
            <div className="flex items-center gap-4">
                {/* Card 1 */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-fit">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                        <MdVerified size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">12k+</p>
                        <p className="text-xs text-gray-300">Issues Resolved</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-fit">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">8.5k</p>
                        <p className="text-xs text-gray-300">Active Citizens</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[45%] flex flex-col relative bg-white">
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
            <Link 
                to="/" 
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all font-medium group"
            >
                <span className="p-2 bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors">
                    <FaArrowLeft size={14} />
                </span>
                Back to Home
            </Link>

            {/* Toggle Login and Register */}
            <div className="text-sm font-medium">
                {isRegister ? "Already have an account?" : "New to CityFix?"}
                <Link 
                    to={isRegister ? "/login" : "/register"} 
                    className="ml-2 text-primary hover:underline"
                >
                    {isRegister ? "Log in" : "Register"}
                </Link>
            </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {isRegister ? "Create Account" : "Sign In"}
                    </h2>
                    <p className="text-gray-500">
                        {isRegister 
                            ? "Fill in your details to start reporting issues." 
                            : "Enter your credentials to access your dashboard."}
                    </p>
                </div>


                <div className="animate-fade-in-up">
                    <Outlet />
                </div>

            </div>
        </div>
        
        <div className="lg:hidden p-4 text-center text-xs text-gray-400 bg-gray-50">
            © {new Date().getFullYear()} CityFix. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;