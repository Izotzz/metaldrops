"use client";

import React from 'react';
import { Gift, Lock, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const DailyAccount = () => {
  const { isLoggedIn } = useAuth();

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
                  className="flex flex-col items-center gap-12"
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
              ) : (
                <motion.div
                  key="coming-soon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button 
                    disabled
                    className="bg-white/5 border border-white/10 text-gray-500 font-black h-20 px-16 rounded-2xl uppercase tracking-widest text-sm cursor-not-allowed"
                  >
                    <Clock className="mr-3 h-6 w-6 text-red-600" /> Coming Soon
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