"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  username: string | null;
  role: string | null;
  discordId: string | null;
  userCount: number;
  boughtProductIds: number[];
  lastClaimedAt: number | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: { username: string; email: string; password: string; captchaToken?: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  linkDiscord: () => Promise<void>;
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
  const [discordId, setDiscordId] = useState<string | null>(null);
  const [dbCount, setDbCount] = useState(0);
  const [boughtProductIds, setBoughtProductIds] = useState<number[]>([]);
  const [lastClaimedAt, setLastClaimedAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialized = useRef(false);

  const BASE_MEMBERS = 26; // Aumentado a 26
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
        .select('username, role, discord_id, bought_product_ids, last_claimed_at')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        setUsername(data.username);
        setRole(data.role || 'user');
        setDiscordId(data.discord_id);
        setBoughtProductIds(data.bought_product_ids || []);
        setLastClaimedAt(data.last_claimed_at ? new Date(data.last_claimed_at).getTime() : null);
      }
    } catch (e) {
      console.error("[Auth] Profile fetch exception:", e);
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
        
        // Si venimos de un login de Discord, guardamos el ID
        if (session.user.app_metadata.provider === 'discord') {
          const dId = session.user.user_metadata.sub;
          if (dId) {
            await supabase.from('profiles').update({ discord_id: dId }).eq('id', session.user.id);
            setDiscordId(dId);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUsername(null);
        setRole(null);
        setDiscordId(null);
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
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .or(`email.eq.${email},username.eq.${regUsername}`)
        .maybeSingle();

      if (existingUser) {
        return { success: false, message: "User already exists with this email or username." };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: regUsername },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) throw error;
      
      if (data.user) {
        // Notificar vía Webhook (Simulado aquí, idealmente vía Edge Function)
        fetch('https://bhhpafsncrcqelpwwqxp.supabase.co/functions/v1/discord-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            content: `🔥 New User Joined the Metal Vault! Total Users: ${userCount + 1}` 
          })
        }).catch(() => {});

        if (!data.session) {
          return { success: true, message: "Please check your email to confirm your account." };
        }
        setUser(data.user);
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

  const linkDiscord = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}/settings`,
          skipBrowserRedirect: false
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("[Auth] Discord link error:", error);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setUsername(null);
      setRole(null);
      setDiscordId(null);
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
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      
      if (resetError) {
        if (resetError.status === 429 || resetError.message.toLowerCase().includes('too many requests')) {
          return { success: false, message: "Too many requests. Please try again later." };
        }
        return { success: false, message: resetError.message };
      }

      return { success: true, message: "Reset link sent" };
    } catch (error: any) {
      return { success: false, message: error.message || "An unexpected error occurred." };
    }
  };

  const resetPassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      return { success: true, message: "Password updated" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!user,
      isLoading,
      username,
      role,
      discordId,
      userCount,
      boughtProductIds,
      lastClaimedAt,
      login,
      register,
      logout,
      linkDiscord,
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