"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { FileText, Plus, ChevronRight, Clock, Eye, MessageSquare, LogIn, X, ShieldAlert } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Paste {
  id: number;
  title: string;
  author: string;
  time: string;
  views: string;
  comments: number;
  color: string;
}

const Pastes = () => {
  const { isLoggedIn, username, role } = useAuth();
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPaste, setNewPaste] = useState({ title: '', content: '' });

  const isDropper = role === 'dropper';

  const handleCreatePaste = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaste.title || !newPaste.content) return;

    const paste: Paste = {
      id: Date.now(),
      title: newPaste.title,
      author: username || 'Anonymous',
      time: "Just now",
      views: "0",
      comments: 0,
      color: "text-red-600"
    };

    setPastes([paste, ...pastes]);
    setNewPaste({ title: '', content: '' });
    setIsModalOpen(false);
    showSuccess("Paste created successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20"
          >
            <div>
              <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">
                Community <span className="text-red-600">Pastes</span>
              </h1>
              <p className="text-gray-500 font-black mt-3 uppercase tracking-[0.3em] text-[10px]">Share and discover digital assets</p>
            </div>
            
            {!isLoggedIn ? (
              <Link to="/login">
                <Button 
                  className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black rounded-2xl h-16 px-10 uppercase tracking-widest text-xs"
                >
                  Access for uploading pastes <LogIn className="ml-3 h-5 w-5 text-red-600" />
                </Button>
              </Link>
            ) : isDropper ? (
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl h-16 px-10 shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs"
              >
                <Plus className="mr-3 h-5 w-5" /> Create Paste
              </Button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                <Button 
                  disabled
                  className="bg-white/5 border border-white/10 text-gray-500 font-black rounded-2xl h-16 px-10 uppercase tracking-widest text-xs cursor-not-allowed opacity-50"
                >
                  <ShieldAlert className="mr-3 h-5 w-5 text-red-600" /> Create Paste
                </Button>
                <span className="text-[9px] font-black text-red-600 uppercase tracking-widest animate-pulse">
                  Only droppers can upload pastes
                </span>
              </div>
            )}
          </motion.div>

          {pastes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/5"
            >
              <FileText className="h-20 w-20 text-white/5 mb-6" />
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">No pastes yet</h3>
              <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Be the first to share something with the community</p>
            </motion.div>
          ) : (
            <div className="space-y-5">
              {pastes.map((paste, index) => (
                <motion.div 
                  key={paste.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 10 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-10 rounded-[2.5rem] bg-[#050505] border border-white/5 hover:border-red-600/40 hover:bg-[#080808] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center border border-red-600/20 group-hover:scale-110 transition-transform">
                      <FileText className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-black uppercase tracking-tight mb-3 ${paste.color} group-hover:text-red-600 transition-colors italic`}>
                        {paste.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2">BY <span className="text-white">{paste.author}</span></span>
                        <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-red-600" /> {paste.time}</span>
                        <span className="flex items-center gap-2"><Eye className="h-3.5 w-3.5 text-red-600" /> {paste.views}</span>
                        <span className="flex items-center gap-2"><MessageSquare className="h-3.5 w-3.5 text-red-600" /> {paste.comments}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-0 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-red-600 transition-all group-hover:translate-x-3">
                    VIEW PASTE <ChevronRight className="h-5 w-5 text-red-600" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Paste Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#050505] border border-white/10 p-10 rounded-[3rem] shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">Create <span className="text-red-600">Paste</span></h2>
              
              <form onSubmit={handleCreatePaste} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Paste Title</label>
                  <Input 
                    value={newPaste.title}
                    onChange={(e) => setNewPaste({ ...newPaste, title: e.target.value })}
                    placeholder="e.g. Netflix Premium Accounts"
                    className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Content</label>
                  <Textarea 
                    value={newPaste.content}
                    onChange={(e) => setNewPaste({ ...newPaste, content: e.target.value })}
                    placeholder="Paste your content here..."
                    className="bg-black border-white/5 text-white min-h-[200px] rounded-2xl focus:ring-red-600 resize-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs"
                >
                  Publish Paste
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Pastes;