"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VaultAccess = () => {
  const { isLoggedIn, discordId, isLoading } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        navigate('/login');
        return;
      }

      if (discordId) {
        setStatus('success');
        // Redirigir a Vaultcord después de un breve mensaje de éxito
        setTimeout(() => {
          window.location.href = 'https://vaultcord.com/verify/metaldrops'; // Link de Vaultcord
        }, 2000);
      } else {
        // Si llega aquí sin discordId, algo falló en el OAuth o no se ha guardado aún
        // Esperamos un poco más por si el onAuthStateChange está procesando
        const timer = setTimeout(() => {
          if (!discordId) setStatus('error');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoggedIn, discordId, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#050505] border border-white/5 p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center relative z-10"
        >
          {status === 'checking' && (
            <div className="space-y-6">
              <Loader2 className="h-16 w-16 text-red-600 animate-spin mx-auto" />
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Verifying Identity...</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Syncing Discord credentials with Metal Vault</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                <ShieldCheck className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Identity Verified</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                Access granted. Redirecting to Vaultcord for final server verification...
              </p>
              <div className="flex items-center justify-center gap-2 text-red-600 font-black uppercase tracking-widest text-[8px] animate-pulse">
                <ExternalLink className="w-3 h-3" /> SECURE_TUNNEL_ESTABLISHED
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border border-red-600/20">
                <Loader2 className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Syncing...</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                We are still waiting for Discord to confirm your ID. If this takes too long, please try linking again from Settings.
              </p>
              <button 
                onClick={() => navigate('/settings')}
                className="text-red-600 font-black uppercase tracking-widest text-[10px] hover:underline"
              >
                Return to Settings
              </button>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default VaultAccess;