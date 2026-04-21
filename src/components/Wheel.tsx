"use client";

import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from './ui/button';
import { Zap, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';

interface WheelProps {
  canSpin: boolean;
  pendingSpins: number;
  onResult: (result: any) => void;
}

const SEGMENTS = [
  { label: '1x Extra Gen', type: 'extra_gen', value: 1, color: '#000000', description: 'You can generate 1 more account today!' },
  { label: '2x Extra Gen', type: 'extra_gen', value: 2, color: '#111111', description: 'You can generate 2 more accounts today!' },
  { label: 'Microsoft Fetcher', type: 'tool', value: 1, color: '#dc2626', description: 'Permanent access to Microsoft Fetcher tool!' },
  { label: '24h Discord', type: 'discord', value: '24h', color: '#000000', description: '24 hours of Premium Discord access!' },
  { label: '1w Discord', type: 'discord', value: '1w', color: '#111111', description: '1 week of Premium Discord access!' },
  { label: '2x Spins Tomorrow', type: 'extra_spins', value: 2, color: '#dc2626', description: '2 extra spins reward for tomorrow active!' },
  { label: 'Nothing', type: 'nothing', value: 0, color: '#000000', description: 'Better luck next time, collector.' },
];

const Wheel = ({ canSpin, pendingSpins, onResult }: WheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = async () => {
    if (!canSpin || isSpinning) return;
    
    setIsSpinning(true);
    
    try {
      // Llamada a la Edge Function para calcular el premio de forma segura
      const { data, error } = await supabase.functions.invoke('spin-wheel');
      
      if (error) throw error;
      
      const resultIndex = data.resultIndex;
      const reward = data.reward;
      
      // Calcular rotación (mínimo 5 vueltas + posición del segmento)
      const segmentAngle = 360 / SEGMENTS.length;
      const targetRotation = 360 * 5 + (SEGMENTS.length - resultIndex) * segmentAngle - (segmentAngle / 2);
      
      await controls.start({
        rotate: targetRotation,
        transition: { duration: 5, ease: [0.16, 1, 0.3, 1] }
      });
      
      onResult(reward);
    } catch (err: any) {
      console.error("Spin error:", err);
      showError(err.message || "Failed to spin the wheel");
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-12 bg-red-600 clip-path-triangle shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
        
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-8 border-red-600/20 shadow-[0_0_50px_rgba(220,38,38,0.1)]"></div>
        
        {/* Wheel */}
        <motion.div 
          animate={controls}
          className="w-full h-full rounded-full border-4 border-red-600 relative overflow-hidden bg-black"
          style={{ transformOrigin: 'center' }}
        >
          {SEGMENTS.map((segment, i) => {
            const angle = 360 / SEGMENTS.length;
            const rotation = i * angle;
            return (
              <div 
                key={i}
                className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end pr-8 md:pr-12"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
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
          
          {/* Center Cap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full border-4 border-black z-10 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      <Button 
        onClick={spin}
        disabled={!canSpin || isSpinning}
        className="bg-red-600 hover:bg-red-500 text-white font-black h-20 px-16 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.4)] uppercase tracking-[0.2em] text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <>SPIN NOW <Zap className="ml-3 h-5 w-5" /></>
        )}
      </Button>
    </div>
  );
};

export default Wheel;