"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowLeft, AlertCircle, CheckCircle2, Mail, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password, 4: Success
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  
  const { sendResetCode, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const result = sendResetCode(email);
    
    if (result.success) {
      setGeneratedCode(result.code || '');
      setStep(2);
      showSuccess("Verification code generated!");
    } else {
      setError(result.message);
      showError(result.message);
    }
  };

  const handleResendCode = () => {
    setIsResending(true);
    const result = sendResetCode(email);
    setTimeout(() => {
      if (result.success) {
        setGeneratedCode(result.code || '');
        showSuccess("New code generated!");
      }
      setIsResending(false);
    }, 1000);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (code === generatedCode) {
      setStep(3);
      showSuccess("Identity verified!");
    } else {
      setError("Invalid verification code");
      showError("Invalid verification code");
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    const result = resetPassword(email, newPassword);
    
    if (result.success) {
      setStep(4);
      showSuccess("Password updated successfully!");
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
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
              {step === 1 && "Enter your email to receive a code"}
              {step === 2 && "Enter the 6-digit verification code"}
              {step === 3 && "Set your new account password"}
              {step === 4 && "Account recovered successfully"}
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8" 
                onSubmit={handleSendCode}
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
                
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                  SEND RESET CODE <Mail className="ml-3 h-4 w-4" />
                </Button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8" 
                onSubmit={handleVerifyCode}
              >
                {error && (
                  <div className="p-4 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Simulated Email Content:</p>
                  <p className="text-2xl font-black text-red-600 tracking-[0.3em]">{generatedCode}</p>
                  <p className="text-[8px] text-gray-600 uppercase font-bold">(In a real app, this would be in your inbox)</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="code" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Verification Code</Label>
                  <Input 
                    id="code" 
                    type="text" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000" 
                    maxLength={6}
                    className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50 text-center text-2xl tracking-[0.5em] font-black"
                  />
                </div>
                
                <div className="space-y-4">
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                    VERIFY CODE <ShieldCheck className="ml-3 h-4 w-4" />
                  </Button>
                  
                  <button 
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="w-full flex items-center justify-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={cn("h-3 w-3", isResending && "animate-spin")} /> 
                    {isResending ? "Resending..." : "Resend Code"}
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form 
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8" 
                onSubmit={handleUpdatePassword}
              >
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
                  UPDATE PASSWORD <KeyRound className="ml-3 h-4 w-4" />
                </Button>
              </motion.form>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
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