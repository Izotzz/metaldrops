"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductGrid />
        
        {/* Newsletter/Promo Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Lumina Community</h2>
            <p className="text-indigo-100 mb-10 max-w-xl mx-auto">
              Get 15% off your first order when you sign up for our newsletter. 
              Stay updated with the latest trends and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-6 py-3 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 flex-grow"
              />
              <button className="px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 font-bold transition-colors">
                Subscribe
              </button>
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