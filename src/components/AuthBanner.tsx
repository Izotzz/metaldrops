"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';

const AuthBanner = () => {
  const { isLoggedIn } = useAuth();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Verificar si el usuario ya lo cerró en esta sesión
    const dismissed = sessionStorage.getItem('auth-banner-dismissed');
    if (dismissed) setIsVisible(false);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('auth-banner-dismissed', 'true');
    // Notificar a otros componentes que el banner se ha cerrado
    window.dispatchEvent(new CustomEvent('auth-banner-closed'));
  };

  if (isLoggedIn || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 bg-red-600/10 border-b border-red-600/20 z-[70] backdrop-blur-md"
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
            onClick={handleDismiss}
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