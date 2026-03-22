"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DailyAccount from '@/components/DailyAccount';
import { motion } from 'framer-motion';

const DailyAccountPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-40 pb-20">
        <div className="container mx-auto px-4 text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">
              Daily <span className="text-red-600">Drops</span>
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
          </motion.div>
        </div>
        <DailyAccount />
      </main>
      <Footer />
    </div>
  );
};

export default DailyAccountPage;