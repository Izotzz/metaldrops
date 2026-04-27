"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Shield, ShoppingBag, MessageSquare, LifeBuoy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { userCount } = useAuth();
  
  const STATS = [
    { label: "Orders", value: "85+", icon: ShoppingBag },
    { label: "Support", value: "24/7", icon: LifeBuoy },
    { label: "Success Rate", value: "99.9%", icon: Shield },
    { label: "Discord Members", value: "700+", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Stats Section */}
        <section className="py-12 md:py-20 border-y border-white/5 bg-[#050505]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-red-600/20">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                  <div className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4 italic">
                Why Choose <span className="text-red-600">Metal Drops?</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-black uppercase tracking-widest text-[10px]">
                We provide the most advanced tools and a thriving community for digital enthusiasts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: "Instant Access", desc: "Get your tools immediately after purchase with our automated delivery system." },
                { title: "Secure & Private", desc: "Your data is encrypted and we never store sensitive information on our servers." },
                { title: "24/7 Support", desc: "Our dedicated team is always available on Discord to help you with any issues." }
              ].map((feature, i) => (
                <div key={i} className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-red-600/30 transition-all group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black mb-6 group-hover:rotate-12 transition-transform">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-white mb-4 uppercase tracking-tight italic">{feature.title}</h3>
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