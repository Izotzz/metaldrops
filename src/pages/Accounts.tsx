"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserCircle, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Accounts = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-16 md:p-24 rounded-[3rem] bg-[#050505] border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
            
            <div className="w-24 h-24 bg-red-600/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-red-600/20">
              <UserCircle className="w-12 h-12 text-red-600" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6">
              Accounts <span className="text-red-600">Market</span>
            </h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px] mb-12">
              The ultimate collection of premium accounts is coming soon
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button disabled className="bg-white/5 border border-white/10 text-gray-500 font-black h-16 px-12 rounded-2xl uppercase tracking-widest text-xs cursor-not-allowed">
                <Clock className="mr-3 h-4 w-4 text-red-600" /> Coming Soon
              </Button>
              <Link to="/store">
                <Button variant="ghost" className="text-gray-400 hover:text-white font-black uppercase tracking-widest text-xs">
                  <ArrowLeft className="mr-3 h-4 w-4" /> Back to Store
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accounts;