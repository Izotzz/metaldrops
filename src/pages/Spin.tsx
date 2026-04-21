"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Spin = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-40 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white uppercase italic">Lucky Spin</h1>
          <p className="text-red-600 font-black uppercase tracking-widest mt-4">System Maintenance - Back Soon</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Spin;