"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, ArrowLeft } from 'lucide-react';

const Register = () => {
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
            <h1 className="text-3xl font-black text-white tracking-tighter">JOIN THE DROPS</h1>
            <p className="text-gray-400 text-sm mt-2">Create an account to start collecting</p>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300 font-bold text-xs uppercase tracking-widest">Username</Label>
              <Input 
                id="username" 
                placeholder="collector_01" 
                className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-sky-500"
              />
            </div>

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
              <Label htmlFor="password" className="text-gray-300 font-bold text-xs uppercase tracking-widest">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" id="terms" className="rounded border-white/10 bg-black/40 text-sky-500 focus:ring-sky-500" />
              <label htmlFor="terms" className="text-xs text-gray-400">I agree to the <a href="#" className="text-sky-500 hover:underline">Terms of Service</a></label>
            </div>
            
            <Button className="w-full bg-sky-500 hover:bg-sky-400 text-white font-black h-12 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              CREATE ACCOUNT <UserPlus className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="text-sky-500 font-bold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;