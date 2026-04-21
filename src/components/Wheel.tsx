"use client";

import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from './ui/button';
import { Zap, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';

export type RewardType = 'extra_gen' | 'tool' | 'discord' | 'extra_spins' | 'nothing';

export interface Reward {
  label: string;
  type: RewardType;
  value: string | number;
  description: string;
  code?: string;
}

export interface Segment extends Omit<Reward, 'code'> {
  color: string;
}

interface WheelProps {
  canSpin: boolean;
  onResult: (result: Reward) => void;
}

export const SEGMENTS: Segment[] = [
  { label: '1x Extra Gen', type: 'extra_gen', value: 1, color: '#000000', description: 'You can generate 1 more account today!' },
  { label: '2x Extra Gen', type: 'extra_gen', value: 2, color: '#111111', description: 'You can generate 2 more accounts today!' },
  { label: 'Microsoft Fetcher', type: 'tool', value: 1, color: '#dc2626', description: 'Permanent access to Microsoft Fetcher tool!' },
  { label: '24h Discord', type: 'discord', value: '24h', color: '#000000', description: '24 hours of Premium Discord access!' },
  { label: '1w Discord', type: 'discord', value: '1w', color: '#111111', description: '1 week of Premium Discord access!' },
  { label: '2x Spins Tomorrow', type: 'extra_spins', value: 2, color: '#dc2626', description: '2 extra spins reward for tomorrow active!' },
  { label: 'Nothing', type: 'nothing', value: 0, color: '#000000', description: 'Better luck next time, collector.' },
];

const Wheel = ({ canSpin, onResult }: WheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();

  const spin = async () => {
    if (!canSpin || isSpinning) return;
    
    setIsSpinning(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('spin-wheel');
      
      if (error) throw error;
      
      const resultIndex = data.resultIndex;
      const reward = data.reward as Reward;
      
      const segmentAngle = 360 / SEGMENTS.length;
      const targetRotation = 360 * 5 + (SEGMENTS.length - resultIndex) * segmentAngle - (segmentAngle / 2);
      
      await controls.start({
        rotate: targetRotation,
        transition: { duration: 5, ease: [0.16, 1, 0.3, 1] }
      });
      
      onResult(reward);
    } catch (err: any) {
      showError(err.message || "Failed to spin the wheel");
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-12 bg-red-600 clip-path-triangle shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
        <div className="absolute inset-0 rounded-full border-8 border-red-600/20 shadow-[0_0_50px_rgba(220,38,38,0.1)]"></div>
        
        <motion.div 
          animate={controls}
          className="w-full h-full rounded-full border-4 border-red-600 relative overflow-hidden bg-black"
        >
          {SEGMENTS.map((segment, i) => {
            const angle = 360 / SEGMENTS.length;
            return (
              <div 
                key={i}
                className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end pr-8 md:pr-12"
                style={{ 
                  transform: `rotate(${i * angle}deg)`,
                  backgroundColor: segment.color,
                  clipPath: `polygon(0 0, 100% 0, 100% ${angle}%, 0 0)` 
                }}
              >
                <span 
                  className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-tighter italic whitespace-nowrap"
                  style={{ transform: `rotate(${angle / 2}deg)` }}
                >
                  {segment.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      <Button 
        onClick={spin}
        disabled={!canSpin || isSpinning}
        className="bg-red-600 hover:bg-red-500 text-white font-black h-20 px-16 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.4)] uppercase tracking-[0.2em] text-sm transition-all hover:scale-105 active:scale-95"
      >
        {isSpinning ? <Loader2 className="h-6 w-6 animate-spin" /> : "SPIN NOW"}
      </Button>
    </div>
  );
};

export default Wheel;