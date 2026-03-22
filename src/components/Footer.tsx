"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, MessageSquare, Mail, ExternalLink } from 'lucide-react';
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
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-white italic text-xl shadow-[0_0_15px_rgba(220,38,38,0.3)]">H</div>
              <span className="text-xl font-bold tracking-tighter text-white">hoku tools</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The ultimate destination for premium digital assets, tools, and community-driven pastes. Built for the elite.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 hover:text-red-500 text-sm transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-500 hover:text-red-500 text-sm transition-colors">Tools & Products</Link></li>
              <li><Link to="/pastes" className="text-gray-500 hover:text-red-500 text-sm transition-colors">Community Pastes</Link></li>
              <li><Link to="/login" className="text-gray-500 hover:text-red-500 text-sm transition-colors">Account Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-red-500 text-sm transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500 text-sm transition-colors">Discord Server</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500 text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Get notified about new drops and updates.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              />
              <button type="submit" className="absolute right-2 top-2 p-1.5 bg-red-600 rounded-lg text-white hover:bg-red-500 transition-colors">
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-medium">
            © 2024 HOKU TOOLS. ALL RIGHTS RESERVED.
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