"use client";

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Zap, Trophy, Clock, AlertCircle, Gift } from 'lucide-react';
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
      
      // Calcular rotación: 5 vueltas completas + el segmento
      const segmentAngle = 360 / SEGMENTS.length;
      const rotation = 360 * 5 + (360 - (resultIndex * segmentAngle));

      await controls.start({
        rotate: rotation,
        transition: { duration: 5, ease: [0.13, 0, 0, 1] }
      });

      if (reward.type === 'nothing') {
        showError("Better luck next time!");
      } else {
        showSuccess(`You won: ${reward.label}!`);
      }

      // Resetear posición suavemente después de un delay
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
      <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[12px] border-[#0a0a0a] shadow-[0_0_50px_rgba(220,38,38,0.2)] z-10"></div>
        
        {/* Indicator */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="w-8 h-10 bg-red-600 clip-path-triangle shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
        </div>

        {/* The Wheel */}
        <motion.div 
          animate={controls}
          className="w-full h-full rounded-full overflow-hidden relative border-4 border-white/5"
          style={{ background: '#000' }}
        >
          {SEGMENTS.map((seg, i) => (
            <div 
              key={i}
              className="absolute top-0 left-1/2 w-1/2 h-full origin-left"
              style={{ 
                transform: `rotate(${i * (360 / SEGMENTS.length)}deg)`,
                backgroundColor: seg.color,
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 50%)'
              }}
            >
              <span 
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -rotate-90 text-[10px] md:text-xs font-black text-white uppercase tracking-tighter whitespace-nowrap"
                style={{ transform: 'rotate(-90deg) translateY(-50%)' }}
              >
                {seg.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Center Cap */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#050505] rounded-full border-4 border-red-600 z-20 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
          <Zap className="w-6 h-6 text-red-600 fill-red-600" />
        </div>
      </div>

      <div className="text-center space-y-6">
        <AnimatePresence mode="wait">
          {pendingSpins > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest"
            >
              <Trophy className="w-3 h-3" /> {pendingSpins} Extra Spins Available
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          onClick={spin}
          disabled={!canSpin || isSpinning}
          className={cn(
            "h-20 px-16 rounded-[2rem] text-lg font-black uppercase tracking-[0.2em] transition-all duration-500",
            canSpin && !isSpinning 
              ? "bg-red-600 hover:bg-red-500 shadow-[0_0_40px_rgba(220,38,38,0.4)]" 
              : "bg-white/5 border border-white/10 text-gray-500"
          )}
        >
          {isSpinning ? "SPINNING..." : canSpin ? "SPIN NOW" : "LOCKED"}
        </Button>

        {!canSpin && timeLeft && (
          <div className="flex items-center justify-center gap-2 text-gray-500 font-black uppercase tracking-widest text-[10px]">
            <Clock className="w-4 h-4 text-red-600" /> Next free spin in: <span className="text-white">{timeLeft}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wheel;