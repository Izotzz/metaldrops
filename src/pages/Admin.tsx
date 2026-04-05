"use client";

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldAlert, Users, ShoppingBag, Key, Zap, 
  Plus, Trash2, Edit3, Search, Save, Loader2,
  TrendingUp, Package, Database, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { showSuccess, showError } from '@/utils/toast';

const ADMIN_EMAIL = "bymetalyt@gmail.com";

const Admin = () => {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [stats, setStats] = useState({ users: 0, sales: 0, methods: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificación de Seguridad
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || null);
        const isAuthorized = user.email === ADMIN_EMAIL;
        setIsAdmin(isAuthorized);
        if (!isAuthorized) {
          showError("ACCESS DENIED: Unauthorized Entry Attempt");
          navigate('/');
        }
      } else if (!authLoading) {
        setIsAdmin(false);
        navigate('/login');
      }
      setLoading(false);
    };
    checkAdmin();
  }, [authLoading, navigate]);

  if (authLoading || loading) return null;
  if (isAdmin === false) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-mono">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header & Stats */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-black uppercase italic tracking-tighter">Admin <span className="text-red-600">Terminal</span></h1>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">System Administrator: {userEmail}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-500" },
                { label: "Daily Sales", value: "€428.50", icon: TrendingUp, color: "text-green-500" },
                { label: "Active Methods", value: "14", icon: Zap, color: "text-red-600" }
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-[#050505] border border-white/5 flex items-center justify-between group hover:border-red-600/30 transition-all">
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className="text-3xl font-black italic">{stat.value}</p>
                  </div>
                  <stat.icon className={cn("w-10 h-10 opacity-20 group-hover:opacity-100 transition-opacity", stat.color)} />
                </div>
              ))}
            </div>
          </div>

          {/* Control Tabs */}
          <Tabs defaultValue="store" className="space-y-12">
            <TabsList className="bg-[#050505] border border-white/5 p-1 rounded-2xl h-16">
              <TabsTrigger value="store" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <ShoppingBag className="w-4 h-4 mr-2" /> Store & Tools
              </TabsTrigger>
              <TabsTrigger value="accounts" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <Database className="w-4 h-4 mr-2" /> Accounts Stock
              </TabsTrigger>
              <TabsTrigger value="vault" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <Key className="w-4 h-4 mr-2" /> The Vault
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <UserCheck className="w-4 h-4 mr-2" /> Permissions
              </TabsTrigger>
            </TabsList>

            {/* Store Management */}
            <TabsContent value="store">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter">Product Inventory</h3>
                      <Button className="bg-red-600 hover:bg-red-500 text-white font-black rounded-xl h-12 px-6 uppercase tracking-widest text-[10px]">
                        <Plus className="w-4 h-4 mr-2" /> Add Product
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-red-600/20 transition-all">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20">
                              <Package className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-black uppercase text-sm tracking-tight">Microsoft Fetcher</h4>
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Price: €5.99 | Downloads: 124</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white hover:bg-white/10"><Edit3 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8">Tool Config</h3>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Executable Link (.exe)</Label>
                        <Input placeholder="https://cdn.metaldrops.com/tools/fetcher.exe" className="bg-black border-white/5 h-12 rounded-xl" />
                      </div>
                      <Button className="w-full bg-white/5 border border-white/10 text-white font-black h-12 rounded-xl uppercase tracking-widest text-[10px] hover:bg-red-600 hover:border-red-600 transition-all">
                        Update Link <Save className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Accounts Stock */}
            <TabsContent value="accounts">
              <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Stock Management</h3>
                  <div className="flex gap-4">
                    <select className="bg-black border border-white/10 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest text-white">
                      <option>Netflix</option>
                      <option>Spotify</option>
                      <option>DAZN</option>
                    </select>
                    <Button className="bg-red-600 hover:bg-red-500 text-white font-black rounded-xl h-12 px-6 uppercase tracking-widest text-[10px]">
                      <Plus className="w-4 h-4 mr-2" /> Bulk Upload
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {['Netflix', 'Spotify', 'DAZN', 'Disney+'].map((service) => (
                    <div key={service} className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{service}</p>
                      <p className="text-3xl font-black text-red-600">42</p>
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">In Stock</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Paste Accounts (email:pass)</Label>
                  <textarea 
                    className="w-full h-64 bg-black border border-white/5 rounded-2xl p-6 text-xs font-mono text-red-500 focus:ring-red-600 focus:border-red-600/50 outline-none"
                    placeholder="user1@example.com:pass123&#10;user2@example.com:pass456"
                  />
                  <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                    Load into Database
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Vault Editor */}
            <TabsContent value="vault">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5 space-y-8">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">New Vault Entry</h3>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Method Title</Label>
                      <Input placeholder="Amazon Prime Video BIN" className="bg-black border-white/5 h-12 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Difficulty (1-3)</Label>
                        <Input type="number" min="1" max="3" className="bg-black border-white/5 h-12 rounded-xl" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status</Label>
                        <select className="w-full bg-black border border-white/5 h-12 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest text-white">
                          <option>WORKING</option>
                          <option>TESTING</option>
                          <option>PATCHED</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Encrypted Data (BIN/Text)</Label>
                      <textarea className="w-full h-32 bg-black border border-white/5 rounded-xl p-4 text-xs font-mono text-red-500 outline-none" />
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs">
                      Publish to Vault
                    </Button>
                  </div>
                </div>

                <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-8">Daily Drop Config</h3>
                  <div className="space-y-8">
                    <div className="p-6 rounded-2xl bg-red-600/5 border border-red-600/10">
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Current Daily Account
                      </p>
                      <p className="text-xs font-mono text-white">netflix_premium_01:metal2026</p>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">New Daily Account</Label>
                      <Input placeholder="email:pass" className="bg-black border-white/5 h-12 rounded-xl" />
                    </div>
                    <Button className="w-full bg-white/5 border border-white/10 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs hover:bg-red-600 hover:border-red-600 transition-all">
                      Update Daily Drop
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* User Permissions */}
            <TabsContent value="users">
              <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/5">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-10">User Management</h3>
                
                <div className="relative mb-12">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input 
                    placeholder="Search user by email..." 
                    className="bg-black border-white/5 h-16 pl-14 rounded-2xl text-sm focus:ring-red-600"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-500">User</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Email</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Role</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[1, 2, 3].map((i) => (
                        <tr key={i} className="group">
                          <td className="py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-600 font-black text-[10px]">U</div>
                              <span className="text-xs font-black uppercase tracking-tight">collector_{i}</span>
                            </div>
                          </td>
                          <td className="py-6 text-xs text-gray-400">user{i}@example.com</td>
                          <td className="py-6">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-gray-500">
                              USER
                            </span>
                          </td>
                          <td className="py-6 text-right">
                            <Button className="bg-white/5 hover:bg-red-600/20 text-gray-500 hover:text-red-500 border border-white/10 h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                              Make Dropper
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;