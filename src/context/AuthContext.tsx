"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  role: string | null;
  userCount: number;
  boughtProductIds: number[];
  lastClaimedAt: number | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: { username: string; email: string; password: string; captchaToken?: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  addBoughtProducts: (ids: number[]) => Promise<void>;
  claimDailyAccount: () => Promise<void>;
  sendResetCode: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (password: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base number to make the community look established
const BASE_MEMBERS = 1420;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [dbCount, setDbCount] = useState(0);
  const [simulatedIncrement, setSimulatedIncrement] = useState(0);
  const [boughtProductIds, setBoughtProductIds] = useState<number[]>([]);
  const [lastClaimedAt, setLastClaimedAt] = useState<number | null>(null);

  const userCount = BASE_MEMBERS + dbCount + simulatedIncrement;

  const fetchUserCount = async () => {
    try {
      // We try to get the count from profiles, but we don't fail if it doesn't exist
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (!error && count !== null) {
        setDbCount(count);
      }
    } catch (e) {
      // If SQL fails, we just keep dbCount at 0 and rely on BASE + Simulated
      console.log("Database count unavailable, using simulated stats.");
    }
  };

  const ensureProfileExists = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (!existing) {
        await supabase.from('profiles').insert({
          id: supabaseUser.id,
          username: supabaseUser.user_metadata?.username || supabaseUser.email?.split('@')[0] || 'User',
          role: 'user'
        });
      }
    } catch (e) {
      // Silent fail for profile creation if table doesn't exist
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, role, bought_product_ids, last_claimed_at')
        .eq('id', userId)
        .maybeSingle();

      if (data && !error) {
        setUsername(data.username);
        setRole(data.role || 'user');
        setBoughtProductIds(data.bought_product_ids || []);
        setLastClaimedAt(data.last_claimed_at ? new Date(data.last_claimed_at).getTime() : null);
      }
    } catch (e) {
      // Fallback for UI if profile fetch fails
      setUsername(user?.user_metadata?.username || user?.email?.split('@')[0] || 'User');
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await ensureProfileExists(session.user);
        await fetchProfile(session.user.id);
      }
      fetchUserCount();
    };

    initAuth();

    // Simulated "Live" growth ticker
    const tickerInterval = setInterval(() => {
      setSimulatedIncrement(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 30000); // Check for "new members" every 30 seconds

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await ensureProfileExists(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setUsername(null);
        setRole(null);
        setBoughtProductIds([]);
        setLastClaimedAt(null);
      }
      fetchUserCount();
    });

    return () => {
      subscription.unsubscribe();
      clearInterval(tickerInterval);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, message: error.message };
    if (data.user) {
      await ensureProfileExists(data.user);
      await fetchProfile(data.user.id);
      return { success: true, message: username || data.user.email || 'User' };
    }
    return { success: false, message: "Login failed" };
  };

  const register = async ({ username: regUsername, email, password }: { username: string; email: string; password: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: regUsername },
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) return { success: false, message: error.message };
    
    if (data.user) {
      if (!data.session) {
        return { success: true, message: "Please check your email to confirm your account." };
      }
      setUser(data.user);
      await ensureProfileExists(data.user);
      await fetchProfile(data.user.id);
      return { success: true, message: "Registration successful" };
    }
    return { success: false, message: "Registration failed" };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const addBoughtProducts = async (ids: number[]) => {
    if (!user) return;
    const newIds = Array.from(new Set([...boughtProductIds, ...ids]));
    try {
      const { error } = await supabase.from('profiles').update({ bought_product_ids: newIds }).eq('id', user.id);
      if (!error) setBoughtProductIds(newIds);
    } catch (e) {
      setBoughtProductIds(newIds); // Optimistic update if DB fails
    }
  };

  const claimDailyAccount = async () => {
    if (!user) return;
    const now = new Date().toISOString();
    try {
      const { error } = await supabase.from('profiles').update({ last_claimed_at: now }).eq('id', user.id);
      if (!error) setLastClaimedAt(new Date(now).getTime());
    } catch (e) {
      setLastClaimedAt(new Date(now).getTime()); // Optimistic update
    }
  };

  const sendResetCode = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/forgot-password`,
    });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Reset link sent" };
  };

  const resetPassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Password updated" };
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn: !!user, 
      username, 
      role,
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
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};