"use client";

import React from 'react';
import { ShoppingCart, Search, Menu, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4">
      <nav className="container mx-auto max-w-5xl h-14 flex items-center justify-between px-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-black text-white italic">M</div>
            <span className="text-lg font-bold tracking-tighter text-white hidden sm:block">METAL DROPS</span>
          </a>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="text-white hover:text-sky-400 transition-colors">Home</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Market</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Drops</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Tools</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-sky-400" />
            </div>
            <span className="text-xs font-semibold text-gray-300">collector_01</span>
          </div>
          
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
            <LogOut className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden text-gray-400">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;