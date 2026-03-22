"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-40 pb-20">
        <div className="container mx-auto px-4 text-center mb-16">
          <h1 className="text-7xl font-black text-white tracking-tighter uppercase">
            Tools
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
        </div>
        <ProductGrid />
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default Products;