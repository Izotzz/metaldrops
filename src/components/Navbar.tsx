"use client";

import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/products' },
    { name: 'Get Free Key', path: '#' },
    { name: 'My Keys', path: '#' },
    { name: 'Pastes', path: '/pastes' },
    { name: 'Web Tools', path: '#' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4">
      <nav className="container mx-auto max-w-6xl h-16 flex items-center justify-between px-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-white italic text-xl shadow-[0_0_15px_rgba(220,38,38,0.3)]">H</div>
            <span className="text-xl font-bold tracking-tighter text-white hidden lg:block">hoku tools</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                location.pathname === item.path 
                  ? "bg-white/5 text-white" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-red-500" />
            </div>
            <span className="text-xs font-bold text-gray-300">metalicdivision</span>
          </div>
          
          <Link to="/login">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white hover:bg-white/5">
              <LogOut className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="md:hidden text-gray-500">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;