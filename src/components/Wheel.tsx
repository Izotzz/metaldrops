"use client";

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Zap, Trophy, Clock, Gift } from 'lucide-react';
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
      // Ajustamos la rotación para que el puntero caiga en el centro del segmento
      const rotation = 360 * 8 + (360 - (resultIndex * segmentAngle) - (segmentAngle / 2));

      await controls.start({
        rotate: rotation,
        transition: { duration: 6, ease: [0.15, 0, 0, 1] }
      });

      if (reward.type === 'nothing') {
        showError("Better luck next time!");
      } else {
        showSuccess(`You won: ${reward.label}!`);
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
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px]">
        {/* Outer Ring with Lights */}
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
        
        {/* Indicator */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="w-10 h-12 bg-red-600 clip-path-triangle shadow-[0_0_30px_rgba(220,38,38,0.6)] border-x-2 border-white/20"></div>
        </div>

        {/* The Wheel */}
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

        {/* Center Cap */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#050505] rounded-full border-4 border-red-600 z-20 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.4)]">
          <div className="absolute inset-0 rounded-full bg-red-600/10 animate-pulse"></div>
          <Zap className="w-8 h-8 text-red-600 fill-red-600 relative z-10" />
        </div>
      </div>

      <div className="text-center space-y-6">
        <AnimatePresence mode="wait">
          {pendingSpins > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[11px] font-black uppercase tracking-widest"
            >
              <Trophy className="w-4 h-4" /> {pendingSpins} Extra Spins Available
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
    </div>
  );
};

export default Wheel;