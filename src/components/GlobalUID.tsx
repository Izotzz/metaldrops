"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';

const GlobalUID = () => {
  const { userId, isLoggedIn } = useAuth();

  if (!isLoggedIn) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[60] hidden md:flex flex-col items-end gap-1 opacity-40 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.4em]">Unique Identifier (UID)</p>
      <p className="text-[10px] font-mono text-red-600 font-black tracking-tighter bg-red-600/5 px-3 py-1 rounded-lg border border-red-600/10 backdrop-blur-sm">
        {userId || 'AUTH_PENDING'}
      </p>
    </div>
  );
};

export default GlobalUID;