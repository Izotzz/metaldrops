"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, LogIn, Home, ShoppingBag, Gift, FileText, Gamepad2, ShieldAlert, Zap, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import CartSheet from './CartSheet';

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, isLoading, username, logout } = useAuth();
  const [bannerActive, setBannerActive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const dismissed = sessionStorage.getItem('auth-banner-dismissed');
    setBannerActive(!isLoggedIn && !dismissed && !isLoading);
    
    const handleBannerClose = () => setBannerActive(false);
    window.addEventListener('auth-banner-closed', handleBannerClose);
    return () => window.removeEventListener('auth-banner-closed', handleBannerClose);
  }, [isLoggedIn, isLoading]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Store', path: '/store', icon: ShoppingBag },
    { name: 'Vault', path: '/vault', icon: ShieldAlert },
    { name: 'Spin', path: '/spin', icon: Zap },
    { name: 'Daily', path: '/daily', icon: Gift },
    { name: 'Pastes', path: '/pastes', icon: FileText },
    { name: 'Free Games', path: '/free-games', icon: Gamepad2 },
  ];

  return (
    <>
      <motion.div 
        initial={false}
        animate={{ 
          y: hidden ? -150 : 0,
          top: bannerActive ? 80 : 16,
          opacity: hidden ? 0 : 1
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 z-50 px-4"
      >
        <nav className="container mx-auto max-w-6xl h-16 flex items-center justify-between px-4 md:px-6 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-white italic text-xl shadow-[0_0_20px_rgba(220,38,38,0.4)]">M</div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic hidden sm:block">Metal Drops</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative",
                  location.pathname === item.path ? "text-red-500" : "text-gray-400 hover:text-white"
                )}
              >
                {location.pathname === item.path && (
                  <motion.div layoutId="nav-active" className="absolute inset-0 bg-red-600/10 rounded-xl -z-10" />
                )}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <CartSheet />
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="loading" className="w-10 h-10 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                </motion.div>
              ) : isLoggedIn ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <Link to="/settings" className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <User className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-xs font-black text-gray-300 uppercase tracking-tighter">{username}</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => logout()} className="text-gray-400 hover:text-red-500 rounded-xl">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="bg-red-600 hover:bg-red-500 text-white font-black px-6 h-10 rounded-xl uppercase tracking-widest text-[10px]">
                    Access <LogIn className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              )}
            </AnimatePresence>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white rounded-xl h-10 w-10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-black border-l border-white/10 z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 flex-grow overflow-y-auto">
                {navItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
                      location.pathname === item.path ? "bg-red-600/10 text-red-500 border border-red-600/20" : "text-gray-400 hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-white/5">
                {isLoggedIn ? (
                  <Button onClick={() => logout()} className="w-full bg-white/5 text-gray-400 hover:text-red-500 border border-white/10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs">
                    Logout <LogOut className="ml-3 h-4 w-4" />
                  </Button>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-red-600 text-white font-black h-16 rounded-2xl uppercase tracking-widest text-xs">
                      Access Account <LogIn className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;