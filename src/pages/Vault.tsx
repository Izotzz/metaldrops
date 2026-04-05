"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VaultCard from '@/components/VaultCard';
import { VAULT_DATA } from '@/data/vault';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Clock, ShieldCheck } from 'lucide-react';

const Vault = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-red-600 selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <ShieldAlert className="w-3 h-3" /> Restricted Access Area
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic mb-4"
            >
              THE <span className="text-red-600">VAULT</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em] max-w-2xl mx-auto"
            >
              Leaked Methods, Private BINs & Zero-Day Exploits
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 p-6 rounded-3xl bg-red-600/5 border border-red-600/10"
            >
              <div className="flex items-center gap-3 text-red-500 font-black uppercase tracking-widest text-[10px]">
                <Clock className="w-4 h-4 animate-pulse" /> Methods are rotated every 48h. Save them before they are wiped.
              </div>
              <div className="h-px w-12 bg-red-600/20 hidden md:block"></div>
              <div className="flex items-center gap-3 text-gray-500 font-black uppercase tracking-widest text-[10px]">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Verified by Metal Drops Security
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VAULT_DATA.map((method) => (
              <VaultCard 
                key={method.id} 
                {...method} 
                isLoggedIn={isLoggedIn} 
              />
            ))}
          </div>

          {!isLoggedIn && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-20 p-12 rounded-[3rem] bg-gradient-to-b from-red-600/10 to-transparent border border-red-600/20 text-center"
            >
              <Zap className="w-12 h-12 text-red-600 mx-auto mb-6" />
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Want the full access?</h3>
              <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-8">Join the elite community to decrypt all methods and BINs instantly.</p>
              <a href="/register" className="inline-flex items-center justify-center h-14 px-10 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                Create Account Now
              </a>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Vault;