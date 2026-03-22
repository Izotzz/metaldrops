"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, ArrowLeft } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-sky-500/5 blur-3xl rounded-full -translate-y-1/2"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center font-black text-white italic text-xl mx-auto mb-4">M</div>
            <h1 className="text-3xl font-black text-white tracking-tighter">WELCOME BACK</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your credentials to access your account</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 font-bold text-xs uppercase tracking-widest">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-sky-500"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300 font-bold text-xs uppercase tracking-widest">Password</Label>
                <a href="#" className="text-xs text-sky-500 hover:underline">Forgot password?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-sky-500"
              />
            </div>
            
            <Button className="w-full bg-sky-500 hover:bg-sky-400 text-white font-black h-12 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              SIGN IN <LogIn className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="text-sky-500 font-bold hover:underline">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;