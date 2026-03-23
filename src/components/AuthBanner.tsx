"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';

const AuthBanner = () => {
  const { isLoggedIn } = useAuth();
  const [isVisible, setIsVisible] = useState(true);

  if (isLoggedIn || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-red-600/10 border-b border-red-600/20 relative z-[60] overflow-hidden"
      >
        <div className="container mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-relaxed">
              You aren't logged in. You will need to access in order to buy products, generate accounts and upload pastes.
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={() => setIsVisible(false)}
            className="h-9 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest text-[9px] transition-all"
          >
            Understood
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthBanner;