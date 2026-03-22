"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { FileText, Plus, ChevronRight, Clock } from 'lucide-react';

const PASTES = [
  { id: 1, title: "10x Netflix 4K HDR Accounts", author: "metalicdivision", time: "1 hour ago", color: "text-red-500" },
  { id: 2, title: "NETFLIX VALID COOKIE WITH FULL CAP", author: "fury_xd1", time: "16 days ago", color: "text-pink-500" },
  { id: 3, title: "NETFLIX VALID COOKIE", author: "fury_xd1", time: "1 month ago", color: "text-purple-500" },
  { id: 4, title: "NETFLIX FA ACCOUNT", author: "fury_xd1", time: "1 month ago", color: "text-indigo-500" },
];

const Pastes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-black text-white tracking-tighter">
              Community <span className="text-red-600">Pastes</span>
            </h1>
            <Button className="bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl gap-2">
              <Plus className="h-4 w-4" /> Post
            </Button>
          </div>

          <div className="flex gap-8 border-b border-white/10 mb-8">
            <button className="pb-4 text-red-600 font-bold border-b-2 border-red-600">Recent</button>
            <button className="pb-4 text-gray-500 font-bold hover:text-white transition-colors">Most Viewed</button>
          </div>

          <div className="space-y-4">
            {PASTES.map((paste) => (
              <div 
                key={paste.id}
                className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-600/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold uppercase tracking-tight ${paste.color}`}>{paste.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span>by <span className="text-gray-300">{paste.author}</span></span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {paste.time}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors" />
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