"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          setStatus('error');
          setErrorMessage("This link has expired or has already been used for security reasons. Please request a new one.");
          showError("Invalid or expired link.");
          setTimeout(() => navigate('/login'), 4000);
          return;
        }

        if (session) {
          const next = searchParams.get('next') || '/';
          
          if (!next.includes('reset-password')) {
            await supabase.auth.signOut();
            setStatus('success');
            showSuccess("Email verified successfully. Please sign in.");
            setTimeout(() => navigate('/login'), 2000);
          } else {
            setStatus('success');
            showSuccess("Access verified.");
            setTimeout(() => navigate(next), 1000);
          }
        } else {
          setStatus('error');
          setErrorMessage("Could not establish a valid session. The link may have expired.");
          setTimeout(() => navigate('/login'), 4000);
        }
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setStatus('error');
        setErrorMessage("Critical authentication error.");
        setTimeout(() => navigate('/login'), 4000);
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

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
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Redirecting...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border border-red-600/20">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Access Denied</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
              {errorMessage}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCallback;