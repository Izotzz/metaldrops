"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-4">
              <span className="text-sky-500 block">METAL</span>
              <span className="text-white block">DROPS</span>
            </h1>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white/90 mb-8">
              MARKETPLACE
            </h2>
            
            <p className="text-sm font-bold tracking-[0.2em] text-sky-500/80 uppercase mb-10">
              Premium Digital Assets & Tools
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                  Explore products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl px-8">
                <Globe className="mr-2 h-4 w-4" /> Web Tools
              </Button>
              
              <Button size="lg" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl px-8">
                <MessageSquare className="mr-2 h-4 w-4" /> Discord
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative z-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop" 
                alt="Marketplace Preview" 
                className="rounded-2xl w-full h-auto opacity-80"
              />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-sky-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;