"use client";

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Menu, LogIn, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import CartSheet from './CartSheet';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/products' },
    { name: 'Pastes', path: '/pastes' },
  ];

  const handleLogout = () => {
    logout();
    showSuccess("Logged out successfully");
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 px-4"
    >
      <nav className="container mx-auto max-w-6xl h-16 flex items-center justify-between px-6 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-white italic text-xl shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              M
            </motion.div>
            <span className="text-xl font-black tracking-tighter text-white hidden lg:block uppercase italic">Metal Drops</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative",
                location.pathname === item.path 
                  ? "text-red-500" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute inset-0 bg-red-600/10 rounded-xl -z-10"
                />
              )}
              {item.name}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              to="/my-products"
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative",
                location.pathname === "/my-products" 
                  ? "text-red-500" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {location.pathname === "/my-products" && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute inset-0 bg-red-600/10 rounded-xl -z-10"
                />
              )}
              My Library
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <CartSheet />
          
          {isLoggedIn ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => showSuccess("No new notifications")}
                className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
              >
                <Bell className="h-5 w-5" />
              </Button>

              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-red-500" />
                </div>
                <span className="text-xs font-black text-gray-300 uppercase tracking-tighter">{username}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className="bg-red-600 hover:bg-red-500 text-white font-black px-6 h-10 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] uppercase tracking-widest text-[10px]">
                Access <LogIn className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden text-gray-400 rounded-xl">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;