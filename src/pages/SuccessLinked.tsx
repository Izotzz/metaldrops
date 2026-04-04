"use client";

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SuccessLinked = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Efecto de sonido de sistema (Beep metálico)
    const playBeep = () => {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    };

    playBeep();

    // Auto-redirección tras 5 segundos
    const timer = setTimeout(() => {
      navigate('/store');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-red-600 selection:text-white overflow-hidden">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 relative">
        {/* Background Grid & Glow */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
               backgroundSize: '40px 40px' 
             }}>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-2xl w-full text-center"
        >
          {/* Animated Checkmark Container */}
          <motion.div 
            initial={{ rotate: -45, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-12 relative"
          >
            <div className="absolute inset-0 bg-red-600 rounded-[2.5rem] blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative w-full h-full bg-black border-4 border-red-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)]">
              <Check className="w-16 h-16 text-red-600 stroke-[4px]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-6 leading-none">
              DISCORD <span className="text-red-600">LINKED</span> <br /> SUCCESSFULLY
            </h1>
            
            <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] mb-12 max-w-md mx-auto leading-relaxed">
              You are now a verified member of Metal Drops. Your access to <span className="text-white">The Vault</span> and <span className="text-white">Exclusive Methods</span> has been granted.
            </p>

            <div className="flex flex-col items-center gap-6">
              <Button 
                onClick={() => navigate('/vault')}
                className="bg-red-600 hover:bg-red-500 text-white font-black h-16 px-12 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.6)] uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95"
              >
                ENTER THE VAULT NOW <Zap className="ml-3 h-4 w-4 fill-current" />
              </Button>

              <div className="flex items-center gap-3 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                <div className="w-12 h-px bg-white/5"></div>
                Auto-redirecting to store in 5s
                <div className="w-12 h-px bg-white/5"></div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="mt-20 flex justify-center gap-12 opacity-20">
            <ShieldCheck className="w-8 h-8 text-red-600" />
            <Zap className="w-8 h-8 text-red-600" />
            <ArrowRight className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessLinked;