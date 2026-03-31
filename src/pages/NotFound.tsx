"use client";

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center relative z-10 px-4"
      >
        <div className="w-24 h-24 bg-red-600/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-red-600/20 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="text-8xl md:text-[10rem] font-black text-white tracking-tighter leading-none mb-4 italic">
          404
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-black text-red-600 uppercase italic tracking-tighter mb-6">
          Access Denied / Not Found
        </h2>
        
        <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] mb-12 max-w-md mx-auto leading-relaxed">
          The digital asset you are looking for at <span className="text-white">{location.pathname}</span> does not exist or has been moved.
        </p>

        <Link to="/">
          <Button className="bg-red-600 hover:bg-red-500 text-white font-black h-16 px-12 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs transition-all hover:scale-105">
            <Home className="mr-3 h-5 w-5" /> Return to Main Menu
          </Button>
        </Link>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/10 uppercase tracking-[1em]">
        Metal Drops Security System
      </div>
    </div>
  );
};

export default NotFound;