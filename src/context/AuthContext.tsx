"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
  password?: string;
  boughtProductIds?: number[];
  lastClaimedAt?: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  userCount: number;
  boughtProductIds: number[];
  lastClaimedAt: number | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (user: User) => { success: boolean; message: string };
  logout: () => void;
  addBoughtProducts: (ids: number[]) => void;
  claimDailyAccount: () => void;
  sendResetCode: (email: string) => { success: boolean; message: string; code?: string };
  resetPassword: (email: string, newPassword: string) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [boughtProductIds, setBoughtProductIds] = useState<number[]>([]);
  const [lastClaimedAt, setLastClaimedAt] = useState<number | null>(null);
  const [activeResetCodes, setActiveResetCodes] = useState<Record<string, string>>({});

  const getUsers = (): User[] => {
    const users = localStorage.getItem('metal_drops_users');
    return users ? JSON.parse(users) : [];
  };

  const updateUsers = (users: User[]) => {
    localStorage.setItem('metal_drops_users', JSON.stringify(users));
  };

  useEffect(() => {
    const session = localStorage.getItem('metal_drops_session');
    if (session) {
      const sessionData = JSON.parse(session);
      setIsLoggedIn(true);
      setUsername(sessionData.username);
      
      const users = getUsers();
      const currentUser = users.find(u => u.username === sessionData.username);
      if (currentUser) {
        setBoughtProductIds(currentUser.boughtProductIds || []);
        setLastClaimedAt(currentUser.lastClaimedAt || null);
      }
    }
    
    const users = getUsers();
    setUserCount(users.length);
  }, []);

  const login = (email: string, password: string) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      setBoughtProductIds(user.boughtProductIds || []);
      setLastClaimedAt(user.lastClaimedAt || null);
      localStorage.setItem('metal_drops_session', JSON.stringify({ username: user.username }));
      return { success: true, message: user.username };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = (newUser: User) => {
    const users = getUsers();
    if (users.find(u => u.email === newUser.email)) {
      return { success: false, message: "Email already registered" };
    }
    if (users.find(u => u.username === newUser.username)) {
      return { success: false, message: "Username already taken" };
    }

    const userToSave = { ...newUser, boughtProductIds: [], lastClaimedAt: undefined };
    const updatedUsers = [...users, userToSave];
    updateUsers(updatedUsers);
    setUserCount(updatedUsers.length);
    
    setIsLoggedIn(true);
    setUsername(newUser.username);
    setBoughtProductIds([]);
    setLastClaimedAt(null);
    localStorage.setItem('metal_drops_session', JSON.stringify({ username: newUser.username }));
    
    return { success: true, message: "Registration successful" };
  };

  const sendResetCode = (email: string) => {
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    // For security, we check if user exists, but for testing we'll allow it
    // In a real app, you might return success even if user doesn't exist to prevent email enumeration
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveResetCodes(prev => ({ ...prev, [email]: code }));
    
    console.log(`Reset code for ${email}: ${code}`);
    
    if (!user) {
      return { success: false, message: "Email not found in our records" };
    }

    return { success: true, message: "Reset code sent to your email", code };
  };

  const resetPassword = (email: string, newPassword: string) => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      return { success: false, message: "Email not found" };
    }

    users[userIndex].password = newPassword;
    updateUsers(users);
    
    setActiveResetCodes(prev => {
      const next = { ...prev };
      delete next[email];
      return next;
    });

    return { success: true, message: "Password updated successfully" };
  };

  const addBoughtProducts = (ids: number[]) => {
    if (!username) return;
    
    const users = getUsers();
    const updatedUsers = users.map(u => {
      if (u.username === username) {
        const currentIds = u.boughtProductIds || [];
        const newIds = Array.from(new Set([...currentIds, ...ids]));
        setBoughtProductIds(newIds);
        return { ...u, boughtProductIds: newIds };
      }
      return u;
    });
    
    updateUsers(updatedUsers);
  };

  const claimDailyAccount = () => {
    if (!username) return;
    
    const now = Date.now();
    const users = getUsers();
    const updatedUsers = users.map(u => {
      if (u.username === username) {
        setLastClaimedAt(now);
        return { ...u, lastClaimedAt: now };
      }
      return u;
    });
    
    updateUsers(updatedUsers);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setBoughtProductIds([]);
    setLastClaimedAt(null);
    localStorage.removeItem('metal_drops_session');
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
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