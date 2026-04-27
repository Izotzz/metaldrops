"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Wheel from '@/components/Wheel';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, ShieldCheck } from 'lucide-react';

const Spin = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-grow pt-40 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <ShieldCheck className="w-3 h-3" /> Daily Rewards System
            </motion.div>
            
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic mb-4">
              LUCKY <span className="text-red-600">SPIN</span>
            </h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px]">
              Test your luck and win premium tools or extra generations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {!isLoggedIn ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 md:p-20 rounded-[3rem] bg-[#050505] border border-white/5 text-center space-y-8"
              >
                <div className="w-20 h-20 bg-red-600/10 rounded-[2rem] flex items-center justify-center mx-auto border border-red-600/20">
                  <LogIn className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Authentication Required</h2>
                <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] max-w-xs mx-auto leading-relaxed">
                  You must be logged in to access the daily lucky spin and claim your rewards.
                </p>
                <Link to="/login" className="block">
                  <Button className="bg-red-600 hover:bg-red-500 text-white font-black h-16 px-12 rounded-2xl uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                    Login to Spin
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <Wheel />
            )}
          </div>

          {/* Info Section */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Daily Reset", desc: "Every user gets one free spin every 24 hours automatically." },
              { title: "Premium Tools", desc: "Win permanent access to some of our most popular marketplace tools." },
              { title: "Extra Spins", desc: "Landing on the red segment grants you 2 additional spins for tomorrow." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/5">
                <h4 className="text-white font-black uppercase italic tracking-tight mb-3">{item.title}</h4>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Spin;