"use client";

import React from 'react';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold tracking-tight text-indigo-600">
            LUMINA<span className="text-orange-500">.</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Shop All</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Collections</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Sale</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-indigo-500"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-gray-600">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;