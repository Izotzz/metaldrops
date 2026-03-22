"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 mb-12">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4">
            OUR <span className="text-sky-500">PRODUCTS</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Browse our collection of high-performance tools and digital assets designed for the modern collector.
          </p>
        </div>
        <ProductGrid />
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default Products;