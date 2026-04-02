"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase procesa automáticamente el hash de la URL al inicializarse o con getSession
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          setStatus('success');
          showSuccess("Verification successful. Logged in.");
          
          // Pequeña espera para que el usuario vea el estado de éxito
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          // Si no hay sesión y estamos en esta página, el link probablemente expiró o es inválido
          setStatus('error');
          showError("Verification link expired or invalid.");
        }
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setStatus('error');
        showError(error.message || "Authentication failed.");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#050505] border border-white/5 p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center relative z-10"
      >
        {status === 'loading' && (
          <div className="space-y-6">
            <Loader2 className="h-16 w-16 text-red-600 animate-spin mx-auto" />
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Verifying Access...</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Please wait while we secure your session</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Verification Successful</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Welcome to the elite. Redirecting to home...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border border-red-600/20">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Link Expired</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8">This verification link is no longer valid or has already been used.</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs transition-all"
            >
              Return to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCallback;