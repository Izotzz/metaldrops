"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !newPassword) {
      setError("Please fill in all fields");
      return;
    }

    const result = resetPassword(email, newPassword);
    
    if (result.success) {
      setStep(2);
      showSuccess("Password reset successfully!");
    } else {
      setError(result.message);
      showError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link to="/login" className="inline-flex items-center gap-3 text-gray-500 hover:text-white mb-10 transition-colors font-black uppercase tracking-widest text-[10px]">
          <ArrowLeft className="h-4 w-4 text-red-600" /> Back to login
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#050505] border border-white/5 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl"
        >
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center font-black text-white italic text-2xl mx-auto mb-6 shadow-[0_0_20px_rgba(220,38,38,0.4)]">M</div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">RECOVER ACCESS</h1>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Reset your account password</p>
          </div>
          
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8" 
                onSubmit={handleReset}
              >
                {error && (
                  <div className="p-4 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="newPassword" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                  RESET PASSWORD <KeyRound className="ml-3 h-4 w-4" />
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Success!</h3>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Your password has been updated.</p>
                </div>
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-white/5 border border-white/10 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                >
                  Return to Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;