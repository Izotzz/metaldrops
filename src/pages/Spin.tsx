"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Wheel, { Reward } from '@/components/Wheel';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Zap, Gift, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Spin = () => {
  const { isLoggedIn, userId, isLoading: authLoading } = useAuth();
  const [canSpin, setCanSpin] = useState(false);
  const [pendingSpins, setPendingSpins] = useState(0);
  const [isChecking, setIsChecking] = useState(true);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);

  const checkSpinStatus = useCallback(async () => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('last_spin_at, pending_spins')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const lastSpin = data.last_spin_at ? new Date(data.last_spin_at).getTime() : 0;
        const now = new Date().getTime();
        const hoursSinceLastSpin = (now - lastSpin) / (1000 * 60 * 60);
        
        setPendingSpins(data.pending_spins || 0);
        setCanSpin(hoursSinceLastSpin >= 24 || (data.pending_spins || 0) > 0);
      }
    } catch (err) {
      console.error("Error checking spin status:", err);
    } finally {
      setIsChecking(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!authLoading) {
      if (isLoggedIn && userId) {
        checkSpinStatus();
      } else {
        setIsChecking(false);
      }
    }
  }, [isLoggedIn, userId, authLoading, checkSpinStatus]);

  const handleSpinResult = (result: Reward) => {
    setReward(result);
    setShowRewardModal(true);
    
    if (result.type === 'extra_spins') {
      setPendingSpins(prev => prev + (result.value as number));
      setCanSpin(true);
    } else {
      // Re-verificar estado después de un pequeño delay para sincronizar con la DB
      setTimeout(checkSpinStatus, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      <Navbar />
      <main className="flex-grow pt-40 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Zap className="w-3 h-3" /> Daily Rewards System
            </motion.div>
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic mb-4">
              LUCKY <span className="text-red-600">SPIN</span>
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-12">
            {!isLoggedIn ? (
              <div className="text-center space-y-8 p-12 rounded-[3rem] bg-[#050505] border border-white/5 max-w-md w-full">
                <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Login to Spin</h2>
                <Link to="/login" className="block">
                  <Button className="w-full bg-red-600 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs">
                    Access Account <LogIn className="ml-3 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : isChecking ? (
              <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
            ) : (
              <div className="relative">
                <Wheel canSpin={canSpin} onResult={handleSpinResult} />
                {pendingSpins > 0 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                      {pendingSpins} Extra Spins Available
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showRewardModal && reward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowRewardModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-md bg-[#050505] border border-red-600/30 p-10 rounded-[3rem] text-center"
            >
              <Gift className="w-10 h-10 text-red-600 mx-auto mb-8" />
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">CONGRATULATIONS!</h2>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 mb-10">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">{reward.label}</h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{reward.description}</p>
                {reward.code && (
                  <div className="mt-6 p-4 bg-black border border-red-600/20 rounded-xl">
                    <p className="text-xl font-mono font-black text-red-600 tracking-tighter">{reward.code}</p>
                  </div>
                )}
              </div>
              <Button onClick={() => setShowRewardModal(false)} className="w-full bg-red-600 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs">
                Claim Reward <CheckCircle2 className="ml-3 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Spin;