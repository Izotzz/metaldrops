"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Skull, Terminal, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { VaultMethod } from '@/data/vault';

interface VaultCardProps extends VaultMethod {
  isLoggedIn: boolean;
}

const VaultCard = ({ title, content, status, difficulty, category, isLoggedIn }: VaultCardProps) => {
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [obfuscatedText, setObfuscatedText] = useState('');

  // Generar texto tipo Matrix
  useEffect(() => {
    if (!isUnlocked) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
      const interval = setInterval(() => {
        let result = '';
        for (let i = 0; i < 30; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setObfuscatedText(result);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isUnlocked]);

  const handleUnlock = () => {
    if (!isLoggedIn) return;
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      setIsUnlocked(true);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative group bg-black border border-red-600/20 rounded-2xl p-6 font-mono overflow-hidden hover:border-red-600/50 transition-all duration-500 shadow-[0_0_20px_rgba(220,38,38,0.05)]"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-red-600" />
          <span className="text-[10px] text-gray-500 uppercase tracking-tighter">SECURE_NODE_{category}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-600/20"></div>
          <div className="w-2 h-2 rounded-full bg-red-600/40"></div>
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-black text-white uppercase italic tracking-tighter leading-tight">
            {title}
          </h3>
          <span className={cn(
            "text-[8px] px-2 py-0.5 rounded-full font-black border",
            status === 'WORKING' ? "text-green-500 border-green-500/20 bg-green-500/5" : "text-orange-500 border-orange-500/20 bg-orange-500/5"
          )}>
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] text-gray-500 uppercase">Difficulty:</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Skull 
                key={i} 
                className={cn("w-3 h-3", i < difficulty ? "text-red-600" : "text-white/5")} 
              />
            ))}
          </div>
        </div>

        {/* Data Display Area */}
        <div className="relative bg-white/5 rounded-xl p-4 border border-white/5 min-h-[80px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {isUnlocked ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-500 break-all leading-relaxed text-center"
              >
                {content}
              </motion.div>
            ) : (
              <motion.div 
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-white/20 break-all tracking-widest text-center select-none"
              >
                {isDecrypting ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-5 h-5 text-red-600 animate-spin" />
                    <span className="text-[8px] text-red-600 animate-pulse">DECRYPTING_DATA...</span>
                  </div>
                ) : (
                  obfuscatedText
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        {!isUnlocked && (
          <Button 
            onClick={handleUnlock}
            disabled={isDecrypting}
            className={cn(
              "w-full h-12 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all duration-500",
              isLoggedIn 
                ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]" 
                : "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
            )}
          >
            {isLoggedIn ? (
              <>DECRYPT DATA <Unlock className="ml-2 w-3 h-3" /></>
            ) : (
              <>ACCESS RESTRICTED - LOGIN TO DECRYPT <Lock className="ml-2 w-3 h-3" /></>
            )}
          </Button>
        )}
      </div>

      {/* Decorative Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-red-600/5 to-transparent h-1/2 w-full animate-scanline opacity-20"></div>
    </motion.div>
  );
};

export default VaultCard;