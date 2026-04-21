"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { User, Bell, Camera, Loader2, Save, ShieldCheck, Zap, ShieldAlert, Fingerprint, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess } from '@/utils/toast';
import { Navigate } from 'react-router-dom';

const Settings = () => {
  const { isLoggedIn, userId, username, isLoading: authLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email || '');
    };
    if (isLoggedIn) fetchUser();
  }, [isLoggedIn]);

  if (authLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
    </div>
  );

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      <Navbar />
      <main className="flex-grow pt-48 pb-32 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-20 text-center lg:text-left">
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">
              Account <span className="text-red-600">Settings</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 text-center">
                <div className="w-32 h-32 mx-auto mb-8 rounded-[2.5rem] bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                  <User className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{username}</h3>
                <p className="text-xs font-medium text-white/80">{email}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs">
                    <Bell className="w-4 h-4 text-red-600" /> Notification Preferences
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="text-xs font-black text-white uppercase tracking-widest">Email Alerts</span>
                    <div className="w-12 h-6 bg-red-600/20 rounded-full relative border border-red-600/30">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-red-600 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setIsSaving(true);
                    setTimeout(() => {
                      setIsSaving(false);
                      showSuccess("Settings updated");
                    }, 500);
                  }}
                  disabled={isSaving}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-16 rounded-2xl uppercase tracking-widest text-xs"
                >
                  {isSaving ? "SAVING..." : "SAVE CHANGES"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;