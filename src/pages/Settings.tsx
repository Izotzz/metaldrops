"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { User, Bell, Camera, Loader2, Save, ShieldCheck, Zap, ShieldAlert, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  if (authLoading && !isLoggedIn) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <Loader2 className="h-16 w-16 text-red-600 animate-spin" />
          <Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-red-600/50" />
        </div>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] animate-pulse">Authenticating Access...</p>
      </motion.div>
    </div>
  );

  if (!isLoggedIn && !authLoading) return <Navigate to="/login" />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(220,38,38,0.1),transparent_70%)] pointer-events-none"></div>

      <Navbar />
      
      <main className="flex-grow pt-48 pb-24 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 max-w-5xl"
        >
          <motion.div variants={itemVariants} className="mb-20 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[9px] font-black uppercase tracking-widest mb-6">
              <ShieldAlert className="w-3 h-3" /> Secure Profile Management
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">
              Account <span className="text-red-600">Settings</span>
            </h1>
            <div className="w-24 h-1 bg-red-600 mt-6 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] mx-auto lg:mx-0"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Card */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="relative group p-10 rounded-[3rem] bg-[#050505] border border-white/5 text-center overflow-hidden transition-all duration-500 hover:border-red-600/30">
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-red-600/5 to-transparent h-1/2 w-full animate-scanline opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="w-full h-full rounded-[2.5rem] bg-red-600/10 border border-red-600/20 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      {profileData.avatar_url ? (
                        <img src={profileData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-red-600" />
                      )}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:bg-red-500 transition-colors border-4 border-black">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{username || 'Collector'}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    <Zap className="w-3 h-3 text-red-600" /> Elite Member
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-1">Registered Email</p>
                    <p className="text-xs font-medium text-white/80">{profileData.email || 'Syncing...'}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Settings Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="p-10 md:p-12 rounded-[3rem] bg-[#050505] border border-white/5 space-y-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldCheck size={120} className="text-red-600" />
                </div>

                <div className="relative z-10 space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs">
                      <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20">
                        <ShieldCheck className="w-4 h-4 text-red-600" />
                      </div>
                      Security Credentials
                    </div>
                    
                    <div className="grid gap-6">
                      <div className="p-8 rounded-2xl bg-white/5 border border-white/5 group hover:border-red-600/20 transition-colors">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-3">Unique Identifier (UID)</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-mono text-white/60 break-all tracking-tighter">{userId || 'Loading...'}</p>
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        </div>
                      </div>

                      <div className="p-8 rounded-2xl bg-white/5 border border-white/5 group hover:border-red-600/20 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Account Status</p>
                          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Verified</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1.5, delay: 1 }}
                              className="h-full bg-red-600"
                            ></motion.div>
                          </div>
                          <span className="text-[10px] font-black text-white">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs">
                      <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20">
                        <Bell className="w-4 h-4 text-red-600" />
                      </div>
                      Preferences
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Email Notifications</h4>
                        <p className="text-[10px] text-gray-500 font-medium">Receive updates about new drops and tools.</p>
                      </div>
                      <div className="w-12 h-6 bg-red-600/20 rounded-full relative border border-red-600/30 cursor-not-allowed">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-red-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      setIsSaving(true);
                      setTimeout(() => {
                        setIsSaving(false);
                        showSuccess("Security protocols updated");
                      }, 1000);
                    }}
                    disabled={isSaving}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-16 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSaving ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>UPDATING...</span>
                      </div>
                    ) : (
                      <>APPLY CHANGES <Save className="ml-3 h-4 w-4" /></>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;