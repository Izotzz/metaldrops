"use client";

import React, { useState, useEffect } from 'react';
import { Gift, Clock, Lock, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CLAIM_COOLDOWN = 10 * 60 * 60 * 1000; // 10 hours in milliseconds

const ACCOUNTS = [
  "Netflix Premium (4K)",
  "Spotify Premium (Family)",
  "Disney+ Premium",
  "Hulu + Live TV",
  "Crunchyroll Mega Fan",
  "HBO Max Ad-Free",
  "Paramount+ with SHOWTIME",
  "YouTube Premium"
];

const DailyAccount = () => {
  const { isLoggedIn, lastClaimedAt, claimDailyAccount } = useAuth();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!lastClaimedAt) {
      setTimeLeft(0);
      return;
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const diff = (lastClaimedAt + CLAIM_COOLDOWN) - now;
      return diff > 0 ? diff : 0;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [lastClaimedAt]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    if (!isLoggedIn) {
      showError("Please login to claim your daily account");
      return;
    }

    const randomAccount = ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)];
    claimDailyAccount();
    showSuccess(`Success! You claimed: ${randomAccount}`);
  };

  const isCooldown = timeLeft > 0;

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-[3rem] border border-white/10 bg-[#050505] p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
          <div className="absolute -inset-px bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-red-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-red-600/20">
              <Gift className="w-10 h-10 text-red-600" />
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic">
              Daily <span className="text-red-600">Account</span>
            </h2>
            <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] mb-12">
              Claim a random premium service account every 10 hours
            </p>

            <AnimatePresence mode="wait">
              {!isLoggedIn ? (
                <motion.div
                  key="login-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-center gap-3 text-gray-500 font-black uppercase tracking-widest text-[10px]">
                    <Lock className="w-4 h-4 text-red-600" /> Authentication Required
                  </div>
                  <Link to="/login">
                    <Button className="bg-red-600 hover:bg-red-500 text-white font-black h-16 px-12 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                      Login to Claim
                    </Button>
                  </Link>
                </motion.div>
              ) : isCooldown ? (
                <motion.div
                  key="cooldown"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="text-6xl md:text-8xl font-black text-white tracking-tighter font-mono">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
                      Come back in {Math.floor(timeLeft / (1000 * 60 * 60))} hours
                    </p>
                    <Button disabled className="bg-white/5 border border-white/10 text-gray-500 font-black h-16 px-12 rounded-2xl uppercase tracking-widest text-xs cursor-not-allowed">
                      <Clock className="mr-3 h-5 w-5" /> Claimed
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="claim-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button 
                    onClick={handleClaim}
                    className="group bg-red-600 hover:bg-red-500 text-white font-black h-20 px-16 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.4)] uppercase tracking-widest text-sm transition-all hover:scale-105"
                  >
                    Claim Now <Sparkles className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyAccount;