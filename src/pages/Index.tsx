"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import DailyAccount from '@/components/DailyAccount';
import { Shield, Zap, Users, Trophy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { TOOLS } from '@/data/tools';

const Index = () => {
  const { userCount } = useAuth();
  
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

        {/* Daily Account Section */}
        <DailyAccount />

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
      </main>
      <Footer />
    </div>
  );
};

export default Index;