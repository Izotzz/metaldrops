"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Wrench, UserCircle, ArrowRight, Key, Mail, Laptop, 
  Shield, Code, Tv, Gamepad2, Music, Play, Monitor, Smartphone 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FloatingIcons = ({ icons, color = "text-red-600/20" }: { icons: any[], color?: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="grid grid-cols-4 md:grid-cols-6 gap-12 p-8 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 20 - 10, 
                y: Math.random() * 20 - 10,
                rotate: Math.random() * 360 
              }}
              animate={{ 
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className={color}
            >
              <Icon size={48} strokeWidth={1} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Store = () => {
  const toolIcons = [Wrench, Key, Mail, Laptop, Shield, Code];
  const accountIcons = [Tv, Gamepad2, Music, Play, Monitor, Smartphone];

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      <Navbar />
      <main className="flex-grow flex flex-col lg:flex-row pt-32 lg:pt-40">
        {/* Tools Section */}
        <Link 
          to="/products" 
          className="relative flex-1 group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 bg-black"
        >
          {/* Animated Background */}
          <FloatingIcons icons={toolIcons} />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10"></div>
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center py-24 lg:py-32">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-24 h-24 bg-red-600/5 rounded-[2.5rem] flex items-center justify-center mb-8 border border-red-600/20 group-hover:scale-110 group-hover:bg-red-600/20 group-hover:border-red-600/40 transition-all duration-500"
            >
              <Wrench className="w-10 h-10 text-red-600" />
            </motion.div>
            
            <h2 className="text-6xl lg:text-8xl font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-red-600 transition-colors">
              Tools
            </h2>
            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-12 max-w-xs mx-auto">
              Premium software, checkers and automation scripts
            </p>
            
            <Button className="bg-white/5 border border-white/10 text-white font-black h-16 px-12 rounded-2xl uppercase tracking-widest text-xs group-hover:bg-red-600 group-hover:border-red-600 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-500">
              Enter Tools <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </div>
        </Link>

        {/* Accounts Section */}
        <Link 
          to="/accounts" 
          className="relative flex-1 group overflow-hidden bg-black"
        >
          {/* Animated Background */}
          <FloatingIcons icons={accountIcons} />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10"></div>
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center py-24 lg:py-32">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-24 h-24 bg-red-600/5 rounded-[2.5rem] flex items-center justify-center mb-8 border border-red-600/20 group-hover:scale-110 group-hover:bg-red-600/20 group-hover:border-red-600/40 transition-all duration-500"
            >
              <UserCircle className="w-10 h-10 text-red-600" />
            </motion.div>
            
            <h2 className="text-6xl lg:text-8xl font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-red-600 transition-colors">
              Accounts
            </h2>
            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-12 max-w-xs mx-auto">
              Premium streaming, gaming and service accounts
            </p>
            
            <Button className="bg-white/5 border border-white/10 text-white font-black h-16 px-12 rounded-2xl uppercase tracking-widest text-xs group-hover:bg-red-600 group-hover:border-red-600 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-500">
              Enter Accounts <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </div>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Store;