"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { FileText, Plus, ChevronRight, Clock, Eye, MessageSquare } from 'lucide-react';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

const PASTES = [
  { id: 1, title: "10x Netflix 4K HDR Accounts", author: "metalicdivision", time: "1 hour ago", views: "1.2k", comments: 12, color: "text-red-500" },
  { id: 2, title: "NETFLIX VALID COOKIE WITH FULL CAP", author: "fury_xd1", time: "16 days ago", views: "850", comments: 5, color: "text-red-400" },
  { id: 3, title: "NETFLIX VALID COOKIE", author: "fury_xd1", time: "1 month ago", views: "3.4k", comments: 42, color: "text-red-600" },
  { id: 4, title: "NETFLIX FA ACCOUNT", author: "fury_xd1", time: "1 month ago", views: "2.1k", comments: 18, color: "text-red-700" },
];

const Pastes = () => {
  const handlePost = () => {
    showSuccess("Post editor opened! (Simulation)");
  };

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
      <main className="flex-grow pt-40 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase">
                Community <span className="text-red-600">Pastes</span>
              </h1>
              <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-xs">Share and discover digital assets</p>
            </div>
            <Button 
              onClick={handlePost}
              className="bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl h-14 px-8 shadow-[0_0_20px_rgba(220,38,38,0.3)] uppercase tracking-widest"
            >
              <Plus className="mr-2 h-5 w-5" /> Create Paste
            </Button>
          </div>

          <div className="flex gap-8 border-b border-white/5 mb-10">
            <button className="pb-4 text-red-600 font-black border-b-2 border-red-600 uppercase tracking-widest text-xs">Recent</button>
            <button className="pb-4 text-gray-500 font-black hover:text-white transition-colors uppercase tracking-widest text-xs">Most Viewed</button>
            <button className="pb-4 text-gray-500 font-black hover:text-white transition-colors uppercase tracking-widest text-xs">My Pastes</button>
          </div>

          <div className="space-y-4">
            {PASTES.map((paste) => (
              <div 
                key={paste.id}
                onClick={() => handleViewPaste(paste.title)}
                className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-red-600/40 hover:bg-[#0f0f0f] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-red-600/10 flex items-center justify-center border border-red-600/20 group-hover:scale-110 transition-transform">
                    <FileText className="h-7 w-7 text-red-600" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${paste.color} group-hover:text-red-500 transition-colors`}>
                      {paste.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">BY <span className="text-white">{paste.author}</span></span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-red-500" /> {paste.time}</span>
                      <span className="flex items-center gap-1.5"><Eye className="h-3 w-3 text-red-500" /> {paste.views}</span>
                      <span className="flex items-center gap-1.5"><MessageSquare className="h-3 w-3 text-red-500" /> {paste.comments}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-red-500 transition-all group-hover:translate-x-2">
                  VIEW PASTE <ChevronRight className="h-4 w-4 text-red-500" />
                </div>
              </div>
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