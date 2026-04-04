"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DiscordCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const processLinking = async () => {
      try {
        // 1. Obtener la sesión de la popup (la de Discord)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        const originalId = searchParams.get('original_id');

        if (sessionError || !session || !originalId) {
          throw new Error("Could not verify Discord identity or original user ID.");
        }

        // 2. Extraer el ID de Discord de las identidades
        const discordIdentity = session.user.identities?.find(id => id.provider === 'discord');
        const discordId = discordIdentity?.id;

        if (!discordId) {
          throw new Error("Discord ID not found in the authentication response.");
        }

        // 3. Actualizar la tabla profiles del usuario ORIGINAL
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ discord_id: discordId })
          .eq('id', originalId);

        if (updateError) throw updateError;

        // 4. Éxito: Notificar a la ventana principal y cerrar
        setStatus('success');
        if (window.opener) {
          window.opener.postMessage('discord-linked-success', window.location.origin);
          setTimeout(() => window.close(), 2000);
        } else {
          setTimeout(() => navigate('/settings'), 2000);
        }

      } catch (error: any) {
        console.error("[DiscordCallback] Error:", error);
        setStatus('error');
        setErrorMessage(error.message || "An error occurred during linking.");
      }
    };

    processLinking();
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
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Linking Discord...</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Securing your digital identity</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Identity Linked</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
              Closing window and updating profile...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border border-red-600/20">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Linking Failed</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
              {errorMessage}
            </p>
            <button onClick={() => window.close()} className="text-red-600 font-black uppercase tracking-widest text-[10px] hover:underline">
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DiscordCallback;