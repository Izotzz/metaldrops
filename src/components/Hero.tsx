"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative pt-48 pb-24 lg:pt-64 lg:pb-40 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-4xl">
          <motion.h1 variants={itemVariants} className="text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] mb-6">
            <span className="text-red-600 block">METAL</span>
            <span className="text-white block">DROPS</span>
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-6xl font-black tracking-tighter text-white/80 mb-10 uppercase italic">
            MARKETPLACE
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xs font-black tracking-[0.4em] text-red-500 uppercase mb-12 opacity-80">
            Premium Digital Assets & Tools for the Elite
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
            <Link to="/products">
              <Button size="lg" className="bg-red-600 hover:bg-red-500 text-white font-black px-10 h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                Explore products <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
            
            <Button size="lg" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl px-10 h-14 uppercase tracking-widest text-xs font-black">
              <Globe className="mr-3 h-4 w-4" /> Web Tools
            </Button>
            
            <Button size="lg" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl px-10 h-14 uppercase tracking-widest text-xs font-black">
              <MessageSquare className="mr-3 h-4 w-4" /> Discord
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Background Decorative Elements */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] -z-10"
      ></motion.div>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] -z-10"
      ></motion.div>
    </section>
  );
};

export default Hero;