"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, ArrowLeft } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 text-gray-500 hover:text-white mb-10 transition-colors font-black uppercase tracking-widest text-[10px]">
          <ArrowLeft className="h-4 w-4 text-red-600" /> Back to home
        </Link>
        
        <div className="bg-[#050505] border border-white/5 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center font-black text-white italic text-2xl mx-auto mb-6 shadow-[0_0_20px_rgba(220,38,38,0.4)]">H</div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">WELCOME BACK</h1>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Enter your credentials to access</p>
          </div>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Password</Label>
                <a href="#" className="text-[10px] text-red-600 font-black uppercase tracking-widest hover:underline">Forgot?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
              />
            </div>
            
            <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
              SIGN IN <LogIn className="ml-3 h-4 w-4" />
            </Button>
          </form>
          
          <div className="mt-10 text-center text-[10px] font-black uppercase tracking-widest">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="text-red-600 hover:underline">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;