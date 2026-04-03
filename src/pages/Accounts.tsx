"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle2, Tv, Gamepad2, Shield, Music, Play, Monitor, Smartphone, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SERVICES = [
  { id: 'netflix', name: 'Netflix', icon: Tv, color: '#E50914' },
  { id: 'dazn', name: 'DAZN', icon: Play, color: '#000000' },
  { id: 'crunchyroll', name: 'Crunchyroll', icon: Zap, color: '#F47521' },
  { id: 'disney', name: 'Disney+', icon: Monitor, color: '#006E99' },
  { id: 'paramount', name: 'Paramount+', icon: Play, color: '#0064FF' },
  { id: 'xbox', name: 'Xbox Gamepass', icon: Gamepad2, color: '#107C10' },
  { id: 'minecraft', name: 'Minecraft', icon: Smartphone, color: '#388E3C' },
  { id: 'expressvpn', name: 'ExpressVPN', icon: Shield, color: '#FF1C1C' },
];

const PRICES = {
  standard: { '1m': 1.99, '3m': 3.99, '1y': 6.99 },
  spotify_family: { '1m': 2.99, '3m': 4.99, '1y': 8.99 }
};

const Accounts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (serviceName: string, type: string, duration: string, price: number) => {
    const id = Math.floor(Math.random() * 1000000); // ID temporal para el carrito
    addToCart({
      id,
      name: `${serviceName} - ${type} (${duration})`,
      price,
      iconType: 'card'
    });
    showSuccess(`${serviceName} added to cart!`);
  };

  const SubscriptionButtons = ({ serviceName, type, prices }: { serviceName: string, type: string, prices: any }) => (
    <div className="flex flex-wrap gap-3 mt-4">
      {Object.entries(prices).map(([duration, price]) => (
        <Button
          key={duration}
          onClick={() => handleAddToCart(serviceName, type, duration, price as number)}
          variant="outline"
          className="flex-1 min-w-[80px] bg-black border-[#E63931] text-white hover:bg-[#E63931] hover:text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl transition-all duration-300"
        >
          {duration} • {(price as number).toFixed(2)}€
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-20 text-center lg:text-left">
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">
              Premium <span className="text-red-600">Accounts</span>
            </h1>
            <p className="text-gray-500 font-black mt-3 uppercase tracking-[0.3em] text-[10px]">Elite access to global streaming & services</p>
          </div>

          {/* Spotify Special Section */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                <Music className="text-red-600 h-6 w-6" /> Spotify Premium
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 rounded-[3rem] bg-[#050505] border-2 border-[#E63931] shadow-[0_0_30px_rgba(230,57,49,0.1)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
                <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                  <div className="w-24 h-24 rounded-[2rem] bg-black border-2 border-[#E63931] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(230,57,49,0.2)]">
                    <Music className="w-12 h-12 text-[#E63931]" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Spotify</h3>
                </div>
                
                <div className="lg:col-span-3 space-y-10">
                  <div>
                    <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Random Account
                    </h4>
                    <SubscriptionButtons serviceName="Spotify" type="Random" prices={PRICES.standard} />
                  </div>
                  
                  <div className="pt-8 border-t border-white/5">
                    <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> In Your Account (Family Link)
                    </h4>
                    <SubscriptionButtons serviceName="Spotify" type="Family Link" prices={PRICES.spotify_family} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Other Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-8 rounded-[2.5rem] bg-[#050505] border-2 border-[#E63931] hover:bg-[#080808] transition-all duration-500 group"
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-black border-2 border-[#E63931] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(230,57,49,0.15)] group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="w-10 h-10 text-[#E63931]" />
                  </div>
                  
                  <div className="flex-1 w-full text-center lg:text-left">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-red-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-6">Premium Subscription</p>
                    <SubscriptionButtons serviceName={service.name} type="Premium" prices={PRICES.standard} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accounts;