"use client";

import React from 'react';
import { Menu, User, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Pastes', path: '/pastes' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4">
      <nav className="container mx-auto max-w-5xl h-14 flex items-center justify-between px-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-black text-white italic text-sm">M</div>
            <span className="text-lg font-bold tracking-tighter text-white hidden sm:block">METAL DROPS</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "transition-colors hover:text-sky-400",
                  location.pathname === item.path ? "text-sky-400" : "text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5 gap-2">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </Link>
          
          <Link to="/register">
            <Button size="sm" className="bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl px-4">
              Register
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="md:hidden text-gray-400">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;