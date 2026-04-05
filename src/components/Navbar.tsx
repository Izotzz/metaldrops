"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Menu, LogIn, Home, ShoppingBag, Gift, FileText, Gamepad2, ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { showSuccess } from '@/utils/toast';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import CartSheet from './CartSheet';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, username, logout } = useAuth();
  const [bannerActive, setBannerActive] = useState(false);
  const [hidden, setHidden] = useState(false);
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
    { name: 'Daily', path: '/daily', icon: Gift },
    { name: 'Pastes', path: '/pastes', icon: FileText },
    { name: 'Free Games', path: '/free-games', icon: Gamepad2 },
  ];

  const handleLogout = async () => {
    await logout();
    showSuccess("Logged out successfully");
    navigate('/');
  };

  return (
    <motion.div 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -150, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ top: bannerActive ? '80px' : '16px' }}
      className="fixed left-0 right-0 z-50 px-4 transition-[top] duration-500"
    >
      <nav className="container mx-auto max-w-6xl h-16 flex items-center justify-between px-4 md:px-6 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-white italic text-xl shadow-[0_0_20px_rgba(220,38,38,0.4)]">M</div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">Metal Drops</span>
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
          
          {isLoading && !isLoggedIn ? (
            // Skeleton Loader para evitar saltos de layout
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-32 h-10 bg-white/5 rounded-xl animate-pulse border border-white/5"></div>
              <div className="w-10 h-10 bg-white/5 rounded-xl animate-pulse border border-white/5"></div>
            </div>
          ) : isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/settings" className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-600/20 transition-all group">
                <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-red-500" />
                </div>
                <span className="text-xs font-black text-gray-300 uppercase tracking-tighter group-hover:text-white">
                  {username}
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link to="/login" className="hidden lg:block">
              <Button className="bg-red-600 hover:bg-red-500 text-white font-black px-6 h-10 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] uppercase tracking-widest text-[10px]">
                Access <LogIn className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-gray-400 hover:text-white hover:bg-white/5 rounded-xl h-10 w-10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black border-white/10 p-0 z-[100]">
              <div className="flex flex-col h-full p-8">
                <div className="flex flex-col gap-2 flex-grow">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link to={item.path} className={cn("flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all", location.pathname === item.path ? "bg-red-600/10 text-red-500 border border-red-600/20" : "text-gray-400 hover:bg-white/5 hover:text-white")}>
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-auto pt-8 border-t border-white/5">
                  {isLoggedIn ? (
                    <Button onClick={handleLogout} className="w-full bg-white/5 hover:bg-red-600/10 text-gray-400 hover:text-red-500 border border-white/10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs">
                      Logout <LogOut className="ml-3 h-4 w-4" />
                    </Button>
                  ) : (
                    <SheetClose asChild>
                      <Link to="/login" className="block w-full">
                        <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-16 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                          Access Account <LogIn className="ml-3 h-5 w-5" />
                        </Button>
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;