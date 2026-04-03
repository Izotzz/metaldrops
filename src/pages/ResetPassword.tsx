"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Este enlace ha caducado o ya ha sido utilizado por seguridad. Por favor, solicita uno nuevo.");
        setStatus('error');
      }
    };
    checkSession();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setStatus('loading');
    try {
      const result = await resetPassword(newPassword);
      if (result.success) {
        // MEDIDA DE SEGURIDAD: Cerrar sesión inmediatamente para invalidar el token de recuperación
        await supabase.auth.signOut();
        
        setStatus('success');
        showSuccess("Contraseña actualizada. Por seguridad, el enlace ha sido invalidado.");
        
        // Redirección forzada al login tras un breve delay para que el usuario vea el éxito
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(result.message);
        setStatus('error');
        showError(result.message);
      }
    } catch (err: any) {
      const msg = err.message || "Failed to update password";
      setError(msg);
      setStatus('error');
      showError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <div className="w-full max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#050505] border border-white/5 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl"
        >
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center font-black text-white italic text-2xl mx-auto mb-6 shadow-[0_0_20px_rgba(220,38,38,0.4)]">M</div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">NEW PASSWORD</h1>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Secure your account with a new password</p>
          </div>
          
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Success!</h3>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    Contraseña actualizada. Por seguridad, el enlace ha sido invalidado. Inicia sesión con tu nueva clave.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-white/5 border border-white/10 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                >
                  Go to Login Now
                </Button>
              </motion.div>
            ) : status === 'error' && error?.includes("caducado") ? (
              <motion.div 
                key="expired"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border border-red-600/20">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Link Inválido</h3>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                    {error}
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/forgot-password')}
                  className="w-full bg-red-600 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                >
                  Solicitar nuevo enlace
                </Button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8" 
                onSubmit={handleUpdatePassword}
              >
                {error && (
                  <div className="p-4 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

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

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                  />
                </div>
                
                <Button type="submit" disabled={status === 'loading'} className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                  {status === 'loading' ? <Loader2 className="animate-spin h-4 w-4" /> : "UPDATE PASSWORD"} <KeyRound className="ml-3 h-4 w-4" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;