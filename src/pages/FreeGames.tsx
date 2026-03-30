"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, Globe, Wrench, Gamepad2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const WEBSITES = [
  { name: "Skidrow Reloaded", url: "https://skidrowreloaded.com" },
  { name: "STEAMRIP", url: "https://steamrip.com" },
  { name: "FitGirl Repacks", url: "https://fitgirl-repacks.to" },
  { name: "DODI Repacks", url: "https://dodi-repacks.site/" },
  { name: "The Pirate Bay", url: "https://www2.thepiratebay3.co/" },
];

const TOOLS = [
  { name: "Steam Tools", url: "https://steamtools.net/download", desc: "Advanced toolkit for Steam users." },
  { name: "Greenluma", url: "https://github.com/BlueAmulet/GreenLuma-2025-Manager", desc: "Steam family sharing and DLC unlocker manager." },
  { name: "Hydra Launcher", url: "https://hydralauncher.gg/", desc: "The ultimate game launcher with built-in discovery." },
];

const FreeGames = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic"
            >
              Free <span className="text-red-600">Games</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-black mt-4 uppercase tracking-[0.4em] text-[10px]"
            >
              Premium resources for digital explorers
            </motion.p>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
          </div>

          {/* Websites Section */}
          <div className="mb-32">
            <div className="flex items-center justify-center gap-6 mb-16">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                <Globe className="text-red-600 h-6 w-6" /> Websites
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WEBSITES.map((site, index) => (
                <motion.div 
                  key={site.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-10 rounded-[2.5rem] bg-[#050505] border border-white/5 hover:border-red-600/30 transition-all group text-center"
                >
                  <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-600/20 group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8 group-hover:text-red-600 transition-colors">
                    {site.name}
                  </h3>
                  <Button 
                    asChild
                    className="w-full bg-white/5 hover:bg-red-600 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-[10px] transition-all"
                  >
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      Open link <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="mb-32">
            <div className="flex items-center justify-center gap-6 mb-16">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                <Wrench className="text-red-600 h-6 w-6" /> Tools
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
            </div>

            <div className="space-y-6">
              {TOOLS.map((tool, index) => (
                <motion.div 
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 md:p-10 rounded-[2.5rem] bg-[#050505] border border-white/5 hover:border-red-600/30 transition-all group flex flex-col md:flex-row items-center justify-between gap-8"
                >
                  <div className="flex items-center gap-8 text-center md:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center border border-red-600/20 group-hover:rotate-12 transition-transform shrink-0">
                      <Wrench className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-red-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{tool.desc}</p>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white font-black h-14 px-12 rounded-2xl uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                  >
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      Download Tool <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-[3rem] bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-8">
              <Info className="text-red-600 h-6 w-6" />
              <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Additional Resources</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
                  Check out <a href="https://fmhy.net/gaming-tools" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline transition-colors">FMHY</a> for more gaming tools and resources.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeGames;