"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-48 pb-24 lg:pt-64 lg:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] mb-6">
            <span className="text-red-600 block">METAL</span>
            <span className="text-white block">DROPS</span>
          </h1>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white/80 mb-10 uppercase italic">
            MARKETPLACE
          </h2>
          
          <p className="text-xs font-black tracking-[0.4em] text-red-500 uppercase mb-12 opacity-80">
            Premium Digital Assets & Tools for the Elite
          </p>
          
          <div className="flex flex-wrap gap-5">
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
          </div>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] -z-10"></div>
    </section>
  );
};

export default Hero;