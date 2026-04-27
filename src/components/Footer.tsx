"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Successfully subscribed to the newsletter!");
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-white italic text-xl shadow-[0_0_15px_rgba(220,38,38,0.3)]">M</div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">Metal Drops</span>
            </Link>
            <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-xs uppercase tracking-wider">
              The ultimate destination for premium digital assets, tools, and community-driven pastes. Built for the elite.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-[10px]">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">Home</Link></li>
              <li><Link to="/store" className="text-gray-500 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">Store</Link></li>
              <li><Link to="/daily" className="text-gray-500 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">Daily Account</Link></li>
              <li><Link to="/pastes" className="text-gray-500 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">Community Pastes</Link></li>
              <li><Link to="/free-games" className="text-gray-500 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">Free Games</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-[10px]">Support</h4>
            <ul className="space-y-4">
              <li><a href="https://discord.gg/metaldrops" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">Discord Server</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-[10px]">Newsletter</h4>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">Get notified about new drops and updates.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-red-500/50 transition-colors"
              />
              <button type="submit" className="absolute right-2 top-2 p-1.5 bg-red-600 rounded-lg text-white hover:bg-red-500 transition-colors">
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
            © 2026 METAL DROPS MARKETPLACE | ALL RIGHTS RESERVED | MADE BY BYMETAL
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[10px] font-black text-red-500/50 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              System Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;