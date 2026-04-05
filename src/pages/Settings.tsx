"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { User, Bell, Camera, Loader2, Save, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Navigate } from 'react-router-dom';

const Settings = () => {
  const { isLoggedIn, userId, username, isLoading: authLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    avatar_url: '',
    email: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from('profiles').select('avatar_url').eq('id', user.id).maybeSingle();
          setProfileData({
            avatar_url: data?.avatar_url || '',
            email: user.email || ''
          });
        }
      } catch (err) {
        console.error("Error fetching profile in settings:", err);
      }
    };
    
    if (isLoggedIn && userId) fetchProfile();
  }, [isLoggedIn, userId]);

  // Solo mostramos el spinner si no hay datos cacheados Y estamos cargando
  if (authLoading && !isLoggedIn) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
    </div>
  );

  if (!isLoggedIn && !authLoading) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-16">
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">
              Account <span className="text-red-600">Settings</span>
            </h1>
            <p className="text-gray-500 font-black mt-3 uppercase tracking-[0.3em] text-[10px]">Manage your profile</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-[2.5rem] bg-red-600/10 border border-red-600/20 flex items-center justify-center overflow-hidden">
                  {profileData.avatar_url ? (
                    <img src={profileData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-red-600" />
                  )}
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{username || 'Collector'}</h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">{profileData.email || 'Syncing...'}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 space-y-8">
                <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs">
                  <ShieldCheck className="w-4 h-4 text-red-600" /> Security Information
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">User ID</p>
                  <p className="text-xs font-mono text-white break-all">{userId || 'Loading...'}</p>
                </div>
                <Button 
                  onClick={() => showSuccess("Settings saved")}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-16 rounded-2xl uppercase tracking-widest text-xs"
                >
                  Save Changes <Save className="ml-3 h-4 w-4" />
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