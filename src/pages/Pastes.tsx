"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { FileText, Plus, ChevronRight, Clock, Eye, MessageSquare } from 'lucide-react';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';
import { motion } from 'framer-motion';

const PASTES = [
  { id: 1, title: "10x Netflix 4K HDR Accounts", author: "metalicdivision", time: "1 hour ago", views: "1.2k", comments: 12, color: "text-red-600" },
  { id: 2, title: "NETFLIX VALID COOKIE WITH FULL CAP", author: "fury_xd1", time: "16 days ago", views: "850", comments: 5, color: "text-red-500" },
  { id: 3, title: "NETFLIX VALID COOKIE", author: "fury_xd1", time: "1 month ago", views: "3.4k", comments: 42, color: "text-red-700" },
  { id: 4, title: "NETFLIX FA ACCOUNT", author: "fury_xd1", time: "1 month ago", views: "2.1k", comments: 18, color: "text-red-800" },
];

const Pastes = () => {
  const handleViewPaste = (title: string) => {
    const toastId = showLoading(`Loading ${title}...`);
    setTimeout(() => {
      dismissToast(toastId);
      showSuccess("Paste content loaded!");
    }, 800);
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
            <Button 
              onClick={() => showSuccess("Post editor coming soon!")}
              className="bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl h-16 px-10 shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs"
            >
              <Plus className="mr-3 h-5 w-5" /> Create Paste
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-10 border-b border-white/5 mb-12"
          >
            <button className="pb-5 text-red-600 font-black border-b-2 border-red-600 uppercase tracking-widest text-[10px]">Recent</button>
            <button className="pb-5 text-gray-500 font-black hover:text-white transition-colors uppercase tracking-widest text-[10px]">Most Viewed</button>
            <button className="pb-5 text-gray-500 font-black hover:text-white transition-colors uppercase tracking-widest text-[10px]">My Pastes</button>
          </motion.div>

          <div className="space-y-5">
            {PASTES.map((paste, index) => (
              <motion.div 
                key={paste.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 10 }}
                onClick={() => handleViewPaste(paste.title)}
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
        </div>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default Pastes;