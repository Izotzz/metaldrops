"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
  password?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (user: User) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Initialize from localStorage (simulating cookies/persistent session)
  useEffect(() => {
    const session = localStorage.getItem('metal_drops_session');
    if (session) {
      const sessionData = JSON.parse(session);
      setIsLoggedIn(true);
      setUsername(sessionData.username);
    }
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem('metal_drops_users');
    return users ? JSON.parse(users) : [];
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      localStorage.setItem('metal_drops_session', JSON.stringify({ username: user.username }));
      return { success: true, message: "Login successful" };
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

    const updatedUsers = [...users, newUser];
    localStorage.setItem('metal_drops_users', JSON.stringify(updatedUsers));
    
    // Auto-login after registration
    setIsLoggedIn(true);
    setUsername(newUser.username);
    localStorage.setItem('metal_drops_session', JSON.stringify({ username: newUser.username }));
    
    return { success: true, message: "Registration successful" };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem('metal_drops_session');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, register, logout }}>
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