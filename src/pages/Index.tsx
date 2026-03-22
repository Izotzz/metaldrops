"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Shield, Zap, Users, Trophy } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { TOOLS } from '@/data/tools';

const Index = () => {
  const { userCount } = useAuth();
  
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Welcome to the inner circle!");
  };

  const STATS = [
    { label: "Members", value: `${userCount}`, icon: Users },
    { label: "Tools Available", value: `${TOOLS.length}`, icon: Zap },
    { label: "Success Rate", value: "99.9%", icon: Shield },
    { label: "Awards Won", value: "12", icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Stats Section */}
        <section className="py-20 border-y border-white/5 bg-[#050505]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-red-600/20 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-4 italic">
                Why Choose <span className="text-red-600">Metal Drops?</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-black uppercase tracking-widest text-[10px]">
                We provide the most advanced tools and a thriving community for digital enthusiasts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Instant Access", desc: "Get your tools immediately after purchase with our automated delivery system." },
                { title: "Secure & Private", desc: "Your data is encrypted and we never store sensitive information on our servers." },
                { title: "24/7 Support", desc: "Our dedicated team is always available on Discord to help you with any issues." }
              ].map((feature, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-red-600/30 transition-all group">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black mb-6 group-hover:rotate-12 transition-transform">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight italic">{feature.title}</h3>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-600/5 blur-3xl rounded-full -translate-y-1/2"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto rounded-[3rem] border border-white/10 bg-[#0a0a0a] p-12 md:p-24 text-center backdrop-blur-sm shadow-2xl">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic">
                READY TO <span className="text-red-600">DROP?</span>
              </h2>
              <p className="text-gray-400 mb-12 max-w-xl mx-auto text-[10px] font-black uppercase tracking-[0.3em]">
                Join the most exclusive marketplace for digital assets. 
                Get early access to limited drops and premium tools.
              </p>
              <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  className="px-6 py-4 rounded-2xl bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-600 flex-grow font-black uppercase tracking-widest text-[10px]"
                />
                <button type="submit" className="px-10 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-[10px]">
                  JOIN NOW
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default Index;