"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  userCount: number;
  boughtProductIds: number[];
  lastClaimedAt: number | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: { username: string; email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  addBoughtProducts: (ids: number[]) => Promise<void>;
  claimDailyAccount: () => Promise<void>;
  sendResetCode: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (password: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [boughtProductIds, setBoughtProductIds] = useState<number[]>([]);
  const [lastClaimedAt, setLastClaimedAt] = useState<number | null>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUsername(null);
        setBoughtProductIds([]);
        setLastClaimedAt(null);
      }
    });

    // Fetch total user count
    fetchUserCount();

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, bought_product_ids, last_claimed_at')
      .eq('id', userId)
      .single();

    if (data && !error) {
      setUsername(data.username);
      setBoughtProductIds(data.bought_product_ids || []);
      setLastClaimedAt(data.last_claimed_at ? new Date(data.last_claimed_at).getTime() : null);
    }
  };

  const fetchUserCount = async () => {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    if (!error && count !== null) {
      setUserCount(count);
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { success: false, message: error.message };
    if (data.user) {
      await fetchProfile(data.user.id);
      return { success: true, message: username || data.user.email || '' };
    }
    return { success: false, message: "Login failed" };
  };

  const register = async ({ username, email, password }: { username: string; email: string; password: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) return { success: false, message: error.message };
    if (data.user) {
      await fetchUserCount();
      return { success: true, message: "Registration successful" };
    }
    return { success: false, message: "Registration failed" };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsername(null);
    setBoughtProductIds([]);
    setLastClaimedAt(null);
  };

  const addBoughtProducts = async (ids: number[]) => {
    if (!user) return;
    
    const newIds = Array.from(new Set([...boughtProductIds, ...ids]));
    const { error } = await supabase
      .from('profiles')
      .update({ bought_product_ids: newIds })
      .eq('id', user.id);

    if (!error) {
      setBoughtProductIds(newIds);
    }
  };

  const claimDailyAccount = async () => {
    if (!user) return;
    
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('profiles')
      .update({ last_claimed_at: now })
      .eq('id', user.id);

    if (!error) {
      setLastClaimedAt(new Date(now).getTime());
    }
  };

  const sendResetCode = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/forgot-password`,
    });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Reset link sent to your email" };
  };

  const resetPassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Password updated successfully" };
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn: !!user, 
      username, 
      userCount, 
      boughtProductIds, 
      lastClaimedAt,
      login, 
      register, 
      logout, 
      addBoughtProducts,
      claimDailyAccount,
      sendResetCode,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};