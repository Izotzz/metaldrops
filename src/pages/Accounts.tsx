"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Tv, Gamepad2, Shield, Music, Play, Monitor, Smartphone, Zap, Crown, Clock, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SERVICES = [
  { id: 'netflix', name: 'Netflix', type: 'Premium UHD', icon: Tv },
  { id: 'dazn', name: 'DAZN', type: 'Total Access', icon: Play },
  { id: 'crunchyroll', name: 'Crunchyroll', type: 'Mega Fan', icon: Zap },
  { id: 'disney', name: 'Disney+', type: 'Premium', icon: Monitor },
  { id: 'paramount', name: 'Paramount+', type: 'Premium', icon: Play },
  { id: 'xbox', name: 'Xbox Gamepass', type: 'Ultimate', icon: Gamepad2 },
  { id: 'minecraft', name: 'Minecraft', type: 'Full Access', icon: Smartphone },
  { id: 'expressvpn', name: 'ExpressVPN', type: 'Premium', icon: Shield },
];

const PRICES = {
  standard: { '1M': 1.99, '3M': 3.99, '1Y': 6.99 },
  spotify_family: { '1M': 2.99, '3M': 4.99, '1Y': 8.99 }
};

const Accounts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (serviceName: string, type: string, duration: string, price: number) => {
    const id = Math.floor(Math.random() * 1000000);
    addToCart({
      id,
      name: `${serviceName} - ${type} (${duration})`,
      price,
      iconType: 'card'
    });
    showSuccess(`${serviceName} added to cart!`);
  };

  const PlanButton = ({ serviceName, type, duration, price }: any) => (
    <button
      onClick={() => handleAddToCart(serviceName, type, duration, price)}
      className="flex-1 group/btn relative flex flex-col items-center justify-center py-4 px-2 bg-black border border-red-600/30 rounded-xl transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
    >
      <span className="text-[10px] font-black text-gray-400 group-hover/btn:text-white/80 uppercase tracking-widest mb-1">{duration}</span>
      <span className="text-sm font-black text-white group-hover/btn:text-white">{price.toFixed(2)}€</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      {/* Background Pattern & Gradient */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,rgba(220,38,38,0.1),transparent_70%)]"></div>

      <Navbar />
      
      <main className="flex-grow pt-48 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 mb-6"
            >
              <Star className="w-3 h-3 text-red-600 fill-red-600" />
              <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em]">Elite Marketplace</span>
            </motion.div>
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">
              PREMIUM <span className="text-red-600">DROPS</span>
            </h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.5em] text-[10px]">Instant Delivery • 24/7 Support • Secure Access</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Spotify Special Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-1 p-8 rounded-[2.5rem] bg-black border border-red-600/30 shadow-[0_0_40px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-black border border-red-600/20 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.15)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-red-600/5 blur-xl group-hover:bg-red-600/10 transition-all"></div>
                  <Music className="w-8 h-8 text-red-600 relative z-10 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-1">Spotify</h3>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Premium Service</p>
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                {/* Random Account Section */}
                <div>
                  <h4 className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-600"></div> Random Account
                  </h4>
                  <div className="flex gap-3">
                    {Object.entries(PRICES.standard).map(([duration, price]) => (
                      <PlanButton key={duration} serviceName="Spotify" type="Random" duration={duration} price={price} />
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>

                {/* Family Link Section */}
                <div>
                  <h4 className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-600"></div> In Your Account
                  </h4>
                  <div className="flex gap-3">
                    {Object.entries(PRICES.spotify_family).map(([duration, price]) => (
                      <PlanButton key={duration} serviceName="Spotify" type="Family Link" duration={duration} price={price} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Other Services */}
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-8 rounded-[2.5rem] bg-black border border-red-600/30 shadow-[0_0_40px_rgba(0,0,0,1)] flex flex-col hover:border-red-600/60 transition-all duration-500"
              >
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-black border border-red-600/20 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.15)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-600/5 blur-xl group-hover:bg-red-600/10 transition-all"></div>
                    <service.icon className="w-8 h-8 text-red-600 relative z-10 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-1">{service.name}</h3>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Premium Service</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <h4 className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-600"></div> {service.type}
                  </h4>
                  <div className="flex gap-3">
                    {Object.entries(PRICES.standard).map(([duration, price]) => (
                      <PlanButton key={duration} serviceName={service.name} type={service.type} duration={duration} price={price} />
                    ))}
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