"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, AlertCircle, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { sendResetCode } = useAuth();

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Verificación visual del input antes de la llamada
    alert('Enviando a: ' + email);
    
    setIsLoading(true);
    try {
      const result = await sendResetCode(email);
      if (result.success) {
        setIsSent(true);
        showSuccess("Recovery link sent to your email!");
      } else {
        setError(result.message);
        showError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      // El estado de carga solo se quita cuando Supabase responde
      setIsLoading(false);
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
              {isSent ? "Check your inbox" : "Enter your email to receive a recovery link"}
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8" 
                onSubmit={handleSendLink}
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
                
                <Button type="submit" disabled={isLoading} className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                  {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "SEND RECOVERY LINK"} <Mail className="ml-3 h-4 w-4" />
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border border-red-600/20">
                  <Mail className="w-10 h-10 text-red-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Check your email</h3>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">We've sent a recovery link to {email}.</p>
                </div>
                <Button 
                  onClick={() => setIsSent(false)}
                  className="w-full bg-white/5 border border-white/10 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                >
                  Try another email
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