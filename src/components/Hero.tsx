"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-indigo-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-600 mb-6">
            New Season Collection 2024
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Elevate Your <span className="text-indigo-600">Everyday</span> Style
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-lg">
            Discover our curated selection of premium essentials designed for comfort, 
            durability, and timeless aesthetics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-full">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-full px-8">
              View Lookbook
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden lg:block w-1/3 h-full">
        <div className="relative h-full w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;