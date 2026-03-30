"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
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

// Initialize from localStorage to persist across reloadsconst storedUsername = localStorage.getItem('username') as string | null;
const [username, setUsername] = useState<string | null>(storedUsername);
const [role, setRole] = useState<string | null>(null);
const [dbCount, setDbCount] = useState(0);
const [boughtProductIds, setBoughtProductIds] = useState<number[]>([]);
const [lastClaimedAt, setLastClaimedAt] = useState<number | null>(null);
const [isLoading, setIsLoading] = useState(true);

const BASE_MEMBERS = 7;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  const fetchUserCount = async () => {
    try {
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (!error && count !== null) {
        setDbCount(count);
      }
    } catch (e) {
      console.log("Database count unavailable, using base stats.");
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
        fetchUserCount();
      }
    } catch (e) {
      // Silent fail
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
        
        // Persist username for reloads
        if (data.username) {
          localStorage.setItem('username', data.username);
        }
      }
    } catch (e) {
      setUsername(user?.user_metadata?.username || user?.email?.split('@')[0] || 'User');
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await ensureProfileExists(session.user);
        await fetchProfile(session.user.id);
      }
      fetchUserCount();
      setIsLoading(false);
    };

    initAuth();

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
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setIsLoading(false);
      return { success: false, message: error.message };
    }
    if (data.user) {
      await ensureProfileExists(data.user);
      await fetchProfile(data.user.id);
      setIsLoading(false);
      return { success: true, message: username || data.user.email || 'User' };
    }
    setIsLoading(false);
    return { success: false, message: "Login failed" };
  };

  const register = async ({ username: regUsername, email, password }: { username: string; email: string; password: string }) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: regUsername },
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) {
      setIsLoading(false);
      return { success: false, message: error.message };
    }
        if (data.user) {
      if (!data.session) {
        setIsLoading(false);
        return { success: true, message: "Please check your email to confirm your account." };
      }
      setUser(data.user);
      await ensureProfileExists(data.user);
      await fetchProfile(data.user.id);
      setIsLoading(false);
      return { success: true, message: "Registration successful" };
    }
    setIsLoading(false);
    return { success: false, message: "Registration failed" };
  };

  const logout = async () => {
    try {
      // 1. Clear all local storage and session data first
      localStorage.clear();
      sessionStorage.clear();
      
      // 2. Clear local state
      setUser(null);
      setUsername(null);
      setRole(null);
      setBoughtProductIds([]);
      setLastClaimedAt(null);
      
      // 3. Attempt to sign out from Supabase
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // 4. Always force a hard reload to ensure all memory/cookies are cleared
      window.location.href = '/';
    }
  };

  const addBoughtProducts = async (ids: number[]) => {
    if (!user) return;
    const newIds = Array.from(new Set([...boughtProductIds, ...ids]));
    try {
      const { error } = await supabase.from('profiles').update({ bought_product_ids: newIds }).eq('id', user.id);
      if (!error) setBoughtProductIds(newIds);
    } catch (e) {
      setBoughtProductIds(newIds);
    }
  };

  const claimDailyAccount = async () => {
    if (!user) return;
    const now = new Date().toISOString();
    try {
      const { error } = await supabase.from('profiles').update({ last_claimed_at: now }).eq('id', user.id);
      if (!error) setLastClaimedAt(new Date(now).getTime());
    } catch (e) {
      setLastClaimedAt(new Date(now).getTime());
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
      isLoading,
      username, 
      role,
      userCount, 
      boughtProductIds, 
      lastClaimedAt,
      login, 
      register,       logout, 
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