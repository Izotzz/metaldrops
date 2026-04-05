"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
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
  register: (data: { username: string; email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  addBoughtProducts: (ids: number[]) => Promise<void>;
  claimDailyAccount: () => Promise<void>;
  sendResetCode: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (password: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'metal_drops_auth_cache';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Carga optimista desde localStorage
  const [cachedData, setCachedData] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [username, setUsername] = useState<string | null>(cachedData?.username || null);
  const [role, setRole] = useState<string | null>(cachedData?.role || null);
  const [dbCount, setDbCount] = useState(0);
  const [boughtProductIds, setBoughtProductIds] = useState<number[]>(cachedData?.boughtProductIds || []);
  const [lastClaimedAt, setLastClaimedAt] = useState<number | null>(cachedData?.lastClaimedAt || null);
  const [isLoading, setIsLoading] = useState(!cachedData); // Si hay caché, no bloqueamos
  const isInitialized = useRef(false);

  const BASE_MEMBERS = 26;
  const userCount = BASE_MEMBERS + dbCount;

  const updateCache = (data: any) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    setCachedData(data);
  };

  const clearCache = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setCachedData(null);
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, role, bought_product_ids, last_claimed_at')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        const profileInfo = {
          username: data.username,
          role: data.role || 'user',
          boughtProductIds: data.bought_product_ids || [],
          lastClaimedAt: data.last_claimed_at ? new Date(data.last_claimed_at).getTime() : null
        };
        
        setUsername(profileInfo.username);
        setRole(profileInfo.role);
        setBoughtProductIds(profileInfo.boughtProductIds);
        setLastClaimedAt(profileInfo.lastClaimedAt);
        
        updateCache(profileInfo);
        return profileInfo;
      }
    } catch (e) {
      console.error("[Auth] Profile fetch error:", e);
    }
    return null;
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (isInitialized.current) return;
      isInitialized.current = true;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            await fetchProfile(session.user.id);
          } else {
            // Si no hay sesión real, limpiamos el caché optimista
            clearCache();
            setUsername(null);
            setRole(null);
            setBoughtProductIds([]);
            setLastClaimedAt(null);
          }
        }
      } catch (error) {
        console.error("[Auth] Init error:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          await fetchProfile(session.user.id);
        }
      } else {
        setUser(null);
        setUsername(null);
        setRole(null);
        setBoughtProductIds([]);
        setLastClaimedAt(null);
        clearCache();
      }
      
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        setUser(data.user);
        const profile = await fetchProfile(data.user.id);
        return { success: true, message: profile?.username || 'User' };
      }
      return { success: false, message: "Login failed" };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ username: regUsername, email, password }: { username: string; email: string; password: string }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: regUsername },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
      return { success: true, message: "Registration successful. Please check your email." };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    clearCache();
    window.location.href = '/';
  };

  const addBoughtProducts = async (ids: number[]) => {
    if (!user) return;
    const newIds = Array.from(new Set([...boughtProductIds, ...ids]));
    await supabase.from('profiles').update({ bought_product_ids: newIds }).eq('id', user.id);
    setBoughtProductIds(newIds);
    updateCache({ ...cachedData, boughtProductIds: newIds });
  };

  const claimDailyAccount = async () => {
    if (!user) return;
    const now = new Date().toISOString();
    const timestamp = new Date(now).getTime();
    await supabase.from('profiles').update({ last_claimed_at: now }).eq('id', user.id);
    setLastClaimedAt(timestamp);
    updateCache({ ...cachedData, lastClaimedAt: timestamp });
  };

  const sendResetCode = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Reset link sent" };
  };

  const resetPassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Password updated" };
  };

  // Memoización del valor del contexto para evitar re-renders masivos
  const contextValue = useMemo(() => ({
    isLoggedIn: !!(user || cachedData),
    isLoading,
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
  }), [user, cachedData, isLoading, username, role, userCount, boughtProductIds, lastClaimedAt]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};