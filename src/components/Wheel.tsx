"use client";

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Zap, Trophy, Clock, Gift, MessageSquare, ExternalLink, X, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const SEGMENTS = [
  { label: '1x Extra Gen', color: '#111' },
  { label: '2x Extra Gen', color: '#1a1a1a' },
  { label: 'MS Fetcher', color: '#dc2626' },
  { label: '24h Discord', color: '#111' },
  { label: '1w Discord', color: '#1a1a1a' },
  { label: '2x Spins', color: '#dc2626' },
  { label: 'Nothing', color: '#050505' },
];

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [pendingSpins, setPendingSpins] = useState(0);
  const [rewardModal, setRewardModal] = useState<any>(null);
  const [showToolAnim, setShowToolAnim] = useState(false);
  const controls = useAnimation();

  const checkEligibility = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('last_spin_at, pending_spins')
      .eq('id', user.id)
      .single();

    if (profile) {
      setPendingSpins(profile.pending_spins || 0);
      const lastSpin = profile.last_spin_at ? new Date(profile.last_spin_at).getTime() : 0;
      const now = new Date().getTime();
      const diff = 24 * 60 * 60 * 1000 - (now - lastSpin);

      if (diff <= 0 || profile.pending_spins > 0) {
        setCanSpin(true);
        setTimeLeft(null);
      } else {
        setCanSpin(false);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    }
  };

  useEffect(() => {
    checkEligibility();
    const interval = setInterval(checkEligibility, 60000);
    return () => clearInterval(interval);
  }, []);

  const spin = async () => {
    if (isSpinning || !canSpin) return;

    setIsSpinning(true);
    try {
      const { data, error } = await supabase.functions.invoke('spin-wheel');
      if (error) throw error;

      const { resultIndex, reward } = data;
      
      const segmentAngle = 360 / SEGMENTS.length;
      const rotation = 360 * 8 + (360 - (resultIndex * segmentAngle) - (segmentAngle / 2));

      await controls.start({
        rotate: rotation,
        transition: { duration: 6, ease: [0.15, 0, 0, 1] }
      });

      // Manejar recompensas específicas
      if (reward.type === 'nothing') {
        showError("Better luck next time!");
      } else if (reward.type === 'discord') {
        setRewardModal(reward);
      } else if (reward.type === 'tool') {
        setShowToolAnim(true);
        showSuccess("Microsoft Fetcher unlocked permanently!");
        setTimeout(() => setShowToolAnim(false), 3000);
      } else if (reward.type === 'extra_gen') {
        showSuccess(`You can generate ${reward.value} more account(s) today!`);
      } else if (reward.type === 'extra_spins') {
        showSuccess("2x extra Spins reward for tomorrow active!");
      }

      setTimeout(() => {
        checkEligibility();
        setIsSpinning(false);
      }, 2000);

    } catch (err: any) {
      showError(err.message || "Failed to spin");
      setIsSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 relative">
      {/* Tool Animation */}
      <AnimatePresence>
        {showToolAnim && (
          <motion.div 
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.5, 0.5], 
              x: [0, 0, 400], 
              y: [0, -100, -400],
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="fixed z-[100] pointer-events-none"
          >
            <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.8)]">
              <Package className="w-10 h-10 text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px]">
        <div className="absolute inset-0 rounded-full border-[16px] border-[#0a0a0a] shadow-[0_0_60px_rgba(220,38,38,0.25)] z-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 30}deg) translateY(-235px) translateX(-50%)`
              }}
            />
          ))}
        </div>
        
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="w-10 h-12 bg-red-600 clip-path-triangle shadow-[0_0_30px_rgba(220,38,38,0.6)] border-x-2 border-white/20"></div>
        </div>

        <motion.div 
          animate={controls}
          className="w-full h-full rounded-full overflow-hidden relative border-4 border-white/10"
          style={{ background: '#000' }}
        >
          {SEGMENTS.map((seg, i) => {
            const angle = 360 / SEGMENTS.length;
            return (
              <div 
                key={i}
                className="absolute top-0 left-1/2 w-1/2 h-full origin-left"
                style={{ 
                  transform: `rotate(${i * angle}deg)`,
                  backgroundColor: seg.color,
                  clipPath: `polygon(0 0, 100% 0, 100% ${Math.tan((angle * Math.PI) / 180) * 100}%, 0 50%)`
                }}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                  style={{ 
                    transform: `rotate(${angle / 2}deg)`,
                    transformOrigin: '0 50%'
                  }}
                >
                  <span className="ml-24 md:ml-32 text-[11px] md:text-[13px] font-black text-white uppercase tracking-tighter italic whitespace-nowrap drop-shadow-lg">
                    {seg.label}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#050505] rounded-full border-4 border-red-600 z-20 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.4)]">
          <Zap className="w-8 h-8 text-red-600 fill-red-600 relative z-10" />
        </div>
      </div>

      <div className="text-center space-y-6">
        <AnimatePresence mode="wait">
          {pendingSpins > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex flex-col items-center gap-2"
            >
              <div className="px-6 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                <Trophy className="w-4 h-4" /> {pendingSpins} Extra Spins Available
              </div>
              {pendingSpins === 2 && (
                <span className="text-[9px] font-black text-red-600 uppercase tracking-widest animate-pulse">
                  2x extra Spins reward for tomorrow active
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          onClick={spin}
          disabled={!canSpin || isSpinning}
          className={cn(
            "h-20 px-20 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.25em] transition-all duration-500 italic",
            canSpin && !isSpinning 
              ? "bg-red-600 hover:bg-red-500 shadow-[0_0_50px_rgba(220,38,38,0.5)] scale-105" 
              : "bg-white/5 border border-white/10 text-gray-500"
          )}
        >
          {isSpinning ? "SPINNING..." : canSpin ? "SPIN NOW" : "LOCKED"}
        </Button>

        {!canSpin && timeLeft && (
          <div className="flex items-center justify-center gap-3 text-gray-500 font-black uppercase tracking-widest text-[11px]">
            <Clock className="w-4 h-4 text-red-600" /> Next free spin in: <span className="text-white font-mono">{timeLeft}</span>
          </div>
        )}
      </div>

      {/* Reward Modal (Discord) */}
      <AnimatePresence>
        {rewardModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRewardModal(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#050505] border border-red-600/30 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(220,38,38,0.2)] text-center"
            >
              <button 
                onClick={() => setRewardModal(null)}
                className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="w-20 h-20 bg-red-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-red-600/20">
                <Gift className="w-10 h-10 text-red-600" />
              </div>

              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
                {rewardModal.label}
              </h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8">
                Premium Access Unlocked
              </p>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">Your Unique Code</p>
                <div className="text-2xl font-mono font-black text-red-600 tracking-widest select-all">
                  {rewardModal.code}
                </div>
              </div>

              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-relaxed mb-10">
                Para reclamar tu premio, ve a nuestro Discord, abre un ticket y pega este código. Un Staff te dará el acceso.
              </p>

              <Button 
                asChild
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black h-16 rounded-2xl uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(88,101,242,0.3)]"
              >
                <a href="https://discord.gg/metaldrops" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-3 h-5 w-5" /> Join Discord <ExternalLink className="ml-2 h-4 w-4 opacity-50" />
                </a>
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wheel;