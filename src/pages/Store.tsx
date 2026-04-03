"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Wrench, UserCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Store = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      <Navbar />
      <main className="flex-grow flex flex-col lg:flex-row pt-16 lg:pt-0">
        {/* Tools Section */}
        <Link 
          to="/products" 
          className="relative flex-1 group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
          <motion.div 
            initial={{ scale: 1.1, opacity: 0.3 }}
            whileHover={{ scale: 1.05, opacity: 0.5 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-24 h-24 bg-red-600/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-red-600/20 group-hover:scale-110 group-hover:bg-red-600/20 transition-all duration-500"
            >
              <Wrench className="w-10 h-10 text-red-600" />
            </motion.div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-red-600 transition-colors">
              Tools
            </h2>
            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-12 max-w-xs mx-auto">
              Premium software, checkers and automation scripts
            </p>
            
            <Button className="bg-white/5 border border-white/10 text-white font-black h-16 px-12 rounded-2xl uppercase tracking-widest text-xs group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500">
              Enter Tools <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </div>
        </Link>

        {/* Accounts Section */}
        <Link 
          to="/accounts" 
          className="relative flex-1 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
          <motion.div 
            initial={{ scale: 1.1, opacity: 0.3 }}
            whileHover={{ scale: 1.05, opacity: 0.5 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-24 h-24 bg-red-600/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-red-600/20 group-hover:scale-110 group-hover:bg-red-600/20 transition-all duration-500"
            >
              <UserCircle className="w-10 h-10 text-red-600" />
            </motion.div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-red-600 transition-colors">
              Accounts
            </h2>
            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-12 max-w-xs mx-auto">
              Premium streaming, gaming and service accounts
            </p>
            
            <Button className="bg-white/5 border border-white/10 text-white font-black h-16 px-12 rounded-2xl uppercase tracking-widest text-xs group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500">
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