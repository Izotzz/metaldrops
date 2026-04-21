"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userId: string | null;
  username: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: { username: string; email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  sendResetCode: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (password: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Comprobación inicial de sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Escuchar cambios de estado
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true, message: data.user?.email || 'User' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  const register = async ({ username, email, password }: { username: string; email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: username },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
      return { success: true, message: "Check your email for verification." };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    // Fuerza bruta: Limpiar y redirigir al instante
    localStorage.clear();
    sessionStorage.clear();
    supabase.auth.signOut().catch(() => {}); // Intento silencioso
    window.location.href = '/login';
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

  const contextValue = useMemo(() => ({
    isLoggedIn: !!user,
    isLoading,
    userId: user?.id || null,
    username: user?.user_metadata?.display_name || user?.email?.split('@')[0] || null,
    login,
    register,
    logout,
    sendResetCode,
    resetPassword
  }), [user, isLoading]);

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