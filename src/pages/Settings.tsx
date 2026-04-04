"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Bell, Camera, Loader2, Save, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Navigate } from 'react-router-dom';

const Settings = () => {
  const { isLoggedIn, username, isLoading: authLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileData, setProfileData] = useState({
    avatar_url: '',
    email_notifications: false
  });

  useEffect(() => {
    const fetchProfileSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url, email_notifications')
          .eq('id', user.id)
          .maybeSingle();
        
        if (!error && data) {
          setProfileData({
            avatar_url: data.avatar_url || '',
            email_notifications: false
          });
        }
      }
    };

    if (isLoggedIn) fetchProfileSettings();
  }, [isLoggedIn]);

  if (authLoading) return null;
  if (!isLoggedIn) return <Navigate to="/login" />;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfileData(prev => ({ ...prev, avatar_url:think
The user wants me to continue my previous response exactly where it left off.

Looking at the previous response:
The last file being written was `src/pages/Settings.tsx`.
The last line was: `setProfileData(prev => ({ ...prev, avatar_url:`

I need to complete the `src/pages/Settings.tsx` file, then write the remaining files: `src/components/VaultCard.tsx`, `src/pages/Vault.tsx`, `src/components/Navbar.tsx`, and `src/App.tsx`.

Let's finish `src/pages/Settings.tsx` first.

```tsx
      setProfileData(prev => ({ ...prev, avatar_url: publicUrl }));
      showSuccess("Profile image updated!");
    } catch (error: any) {
      showError(error.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showSuccess("Settings applied successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-16">
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">
              Account <span className="text-red-600">Settings</span>
            </h1>
            <p className="text-gray-500 font-black mt-3 uppercase tracking-[0.3em] text-[10px]">Manage your profile and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 text-center relative overflow-hidden group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full rounded-[2.5rem] bg-red-600/10 border border-red-600/20 flex items-center justify-center overflow-hidden">
                    {profileData.avatar_url ? (
                      <img src={profileData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-red-600" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors shadow-lg border-2 border-black">
                    {isUploading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Camera className="w-5 h-5 text-white" />}
                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={isUploading} />
                  </label>
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{username}</h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Elite Member</p>
              </motion.div>

              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex items-center gap-4">
                <ShieldCheck className="h-6 w-6 text-red-600" />
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                  Your account is protected by bank-level encryption.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 space-y-12"
              >
                {/* Notifications Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs">
                    <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20">
                      <Bell className="w-4 h-4 text-red-600" />
                    </div>
                    Notification Preferences
                  </div>

                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/10 border border-white/10 opacity-60 cursor-not-allowed">
                    <Checkbox id="notifications" checked={false} disabled className="mt-1 border-white/20" />
                    <div className="grid gap-1.5 leading-none">
                      <div className="flex items-center gap-2">
                        <label htmlFor="notifications" className="text-xs font-black text-white uppercase tracking-widest">Email Notifications</label>
                        <span className="flex items-center gap-1 text-[8px] bg-red-600/20 text-red-500 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                          <Clock className="w-2 h-2" /> Coming Soon
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed">This feature is currently under development.</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-16 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs"
                >
                  {isSaving ? "SAVING CHANGES..." : "SAVE SETTINGS"} <Save className="ml-3 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
```

Next, `src/components/VaultCard.tsx`:
Remove Discord logic.

Next, `src/pages/Vault.tsx`:
Remove Discord logic.

Next, `src/components/Navbar.tsx`:
Remove Discord logic.

Next, `src/App.tsx`:
Remove Discord routes.

I will start by completing the `Settings.tsx` file.publicUrl }));
      showSuccess("Profile image updated!");
    } catch (error: any) {
      showError(error.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showSuccess("Settings applied successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-16">
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">
              Account <span className="text-red-600">Settings</span>
            </h1>
            <p className="text-gray-500 font-black mt-3 uppercase tracking-[0.3em] text-[10px]">Manage your profile and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 text-center relative overflow-hidden group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full rounded-[2.5rem] bg-red-600/10 border border-red-600/20 flex items-center justify-center overflow-hidden">
                    {profileData.avatar_url ? (
                      <img src={profileData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-red-600" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors shadow-lg border-2 border-black">
                    {isUploading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Camera className="w-5 h-5 text-white" />}
                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={isUploading} />
                  </label>
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{username}</h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Elite Member</p>
              </motion.div>

              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex items-center gap-4">
                <ShieldCheck className="h-6 w-6 text-red-600" />
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                  Your account is protected by bank-level encryption.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 space-y-12"
              >
                {/* Notifications Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs">
                    <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20">
                      <Bell className="w-4 h-4 text-red-600" />
                    </div>
                    Notification Preferences
                  </div>

                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/10 border border-white/10 opacity-60 cursor-not-allowed">
                    <Checkbox id="notifications" checked={false} disabled className="mt-1 border-white/20" />
                    <div className="grid gap-1.5 leading-none">
                      <div className="flex items-center gap-2">
                        <label htmlFor="notifications" className="text-xs font-black text-white uppercase tracking-widest">Email Notifications</label>
                        <span className="flex items-center gap-1 text-[8px] bg-red-600/20 text-red-500 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                          <Clock className="w-2 h-2" /> Coming Soon
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed">This feature is currently under development.</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-16 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs"
                >
                  {isSaving ? "SAVING CHANGES..." : "SAVE SETTINGS"} <Save className="ml-3 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;