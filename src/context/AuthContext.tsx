"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [dbCount, setDbCount] = useState(0);
  const [boughtProductIds, setBoughtProductIds] = useState<number[]>([]);
  const [lastClaimedAt, setLastClaimedAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialized = useRef(false);

  const BASE_MEMBERS = 19;
  const userCount = BASE_MEMBERS + dbCount;

  const fetchUserCount = async () => {
    try {
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      if (!error && count !== null) setDbCount(count);
    } catch (e) {
      console.warn("[Auth] User count fetch failed");
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, role, bought_product_ids, last_claimed_at')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        setUsername(data.username);
        setRole(data.role || 'user');
        setBoughtProductIds(data.bought_product_ids || []);
        setLastClaimedAt(data.last_claimed_at ? new Date(data.last_claimed_at).getTime() : null);
      }
    } catch (e) {
      console.error("[Auth] Profile fetch exception:", e);
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
        // Priorizamos display_name de los metadatos
        const newUsername = supabaseUser.user_metadata?.display_name || 
                          supabaseUser.user_metadata?.username || 
                          supabaseUser.email?.split('@')[0] || 
                          'User';
        
        await supabase.from('profiles').insert({
          id: supabaseUser.id,
          username: newUsername,
          role: 'user'
        });
        fetchUserCount();
      }
    } catch (e) {
      console.error("[Auth] Profile creation error:", e);
    }
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
            fetchProfile(session.user.id);
            ensureProfileExists(session.user);
          }
          fetchUserCount();
        }
      } catch (error) {
        console.error("[Auth] Initialization failed:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUsername(null);
        setRole(null);
        setBoughtProductIds([]);
        setLastClaimedAt(null);
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        setUser(data.user);
        await fetchProfile(data.user.id);
        // Devolvemos el display_name de los metadatos para el mensaje de bienvenida inmediato
        const displayName = data.user.user_metadata?.display_name || data.user.user_metadata?.username || 'User';
        return { success: true, message: displayName };
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
          // Guardamos el nombre en display_name como se solicitó
          data: { display_name: regUsername },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) throw error;
      
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
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setUsername(null);
      setRole(null);
      setBoughtProductIds([]);
      setLastClaimedAt(null);
    } catch (error) {
      console.error("[Auth] Logout error:", error);
    } finally {
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
      console.error("[Auth] Update error:", e);
    }
  };

  const claimDailyAccount = async () => {
    if (!user) return;
    const now = new Date().toISOString();
    try {
      const { error } = await supabase.from('profiles').update({ last_claimed_at: now }).eq('id', user.id);
      if (!error) setLastClaimedAt(new Date(now).getTime());
    } catch (e) {
      console.error("[Auth] Claim error:", e);
    }
  };

  const sendResetCode = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
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