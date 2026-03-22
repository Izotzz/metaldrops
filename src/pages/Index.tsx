"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <div className="container mx-auto px-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20"></div>
        </div>
        
        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-600/5 blur-3xl rounded-full -translate-y-1/2"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/5 p-12 md:p-20 text-center backdrop-blur-sm">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                READY TO <span className="text-red-600">DROP?</span>
              </h2>
              <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
                Join the most exclusive marketplace for digital assets. 
                Get early access to limited drops and premium tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-6 py-4 rounded-2xl bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-600 flex-grow"
                />
                <button className="px-10 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  JOIN NOW
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default Index;