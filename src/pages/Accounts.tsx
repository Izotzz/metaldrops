"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Import logos
import spotifyLogo from '@/assets/spotify_logo.png';
import netflixLogo from '@/assets/netflix_logo.png';
import daznLogo from '@/assets/dazn_logo.png';
import crunchyrollLogo from '@/assets/crunchyroll_logo.png';
import disneyLogo from '@/assets/disney_logo.png';
import paramountLogo from '@/assets/paramount_logo.png';
import xboxLogo from '@/assets/xbox_logo.png';
import minecraftLogo from '@/assets/minecraft_logo.png';
import expressvpnLogo from '@/assets/expressvpn_logo.png';

const SERVICES = [
  { id: 'netflix', name: 'NETFLIX', type: 'Premium UHD', image: netflixLogo, glow: 'shadow-[0_0_50px_rgba(229,9,20,0.4)]' },
  { id: 'dazn', name: 'DAZN', type: 'Total Access', image: daznLogo, glow: 'shadow-[0_0_50px_rgba(255,255,255,0.15)]' },
  { id: 'crunchyroll', name: 'CRUNCHYROLL', type: 'Mega Fan', image: crunchyrollLogo, glow: 'shadow-[0_0_50px_rgba(244,117,33,0.4)]' },
  { id: 'disney', name: 'DISNEY+', type: 'Premium', image: disneyLogo, glow: 'shadow-[0_0_50px_rgba(0,110,153,0.4)]' },
  { id: 'paramount', name: 'PARAMOUNT+', type: 'Premium', image: paramountLogo, glow: 'shadow-[0_0_50px_rgba(0,100,255,0.4)]' },
  { id: 'xbox', name: 'XBOX GAMEPASS', type: 'Ultimate', image: xboxLogo, glow: 'shadow-[0_0_50px_rgba(16,124,16,0.4)]' },
  { id: 'minecraft', name: 'MINECRAFT', type: 'Full Access', image: minecraftLogo, glow: 'shadow-[0_0_50px_rgba(255,255,255,0.1)]' },
  { id: 'expressvpn', name: 'EXPRESSVPN', type: 'Premium', image: expressvpnLogo, glow: 'shadow-[0_0_50px_rgba(255,28,28,0.4)]' },
];

const PRICES = {
  standard: { '1 MONTH': 2.99, '3 MONTHS': 8.99, '1 YEAR': 29.99 },
  spotify_family: { '1 MONTH': 2.99, '3 MONTHS': 8.99, '1 YEAR': 29.99 }
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
      className="flex-1 group/btn relative flex flex-col items-center justify-center py-3 px-1 bg-black border border-white/10 rounded-xl transition-all duration-300 hover:border-red-600 hover:bg-red-600/10"
    >
      <span className="text-[8px] font-black text-white uppercase tracking-widest mb-1">{duration}</span>
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-black text-red-600">€{price.toFixed(2)}</span>
        <ShoppingCart className="w-2.5 h-2.5 text-gray-500 group-hover/btn:text-white transition-colors" />
      </div>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] relative overflow-hidden">
      {/* Metallic Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Red Smoke/Glow Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed top-[40%] left-[30%] w-[40%] h-[40%] bg-red-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <Navbar />
      
      <main className="flex-grow pt-40 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Spotify Special Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border-2 border-red-600/40 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src={spotifyLogo} 
                    alt="Spotify" 
                    className="h-full object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(30,215,96,0.5)]" 
                  />
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                {/* Random Account Section */}
                <div className="text-center">
                  <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-1">RANDOM ACCOUNT</h4>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">Random account</p>
                  <div className="flex gap-2">
                    {Object.entries(PRICES.standard).map(([duration, price]) => (
                      <PlanButton key={duration} serviceName="Spotify" type="Random" duration={duration} price={price} />
                    ))}
                  </div>
                </div>

                {/* Divider with Glow */}
                <div className="relative h-px w-full bg-red-600/20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-red-600 blur-sm opacity-50"></div>
                </div>

                {/* Family Link Section */}
                <div className="text-center">
                  <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-1">IN YOUR ACCOUNT <span className="text-gray-500 text-sm">(Family Link)</span></h4>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">In your account</p>
                  <div className="flex gap-2">
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
                className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border-2 border-red-600/40 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col items-center text-center group"
              >
                <div className={cn("w-full h-28 flex items-center justify-center mb-6 transition-all duration-500", service.glow)}>
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="h-full object-contain mix-blend-screen" 
                  />
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">
                  {service.name}
                </h3>
                <p className="text-[10px] font-black text-gray-500 uppercase italic tracking-widest mb-8">{service.name}</p>

                <div className="w-full mt-auto">
                  <div className="flex gap-2 mb-4">
                    {Object.entries(PRICES.standard).map(([duration, price]) => (
                      <PlanButton key={duration} serviceName={service.name} type={service.type} duration={duration} price={price} />
                    ))}
                  </div>
                  <button 
                    onClick={() => handleAddToCart(service.name, service.type, '1 MONTH', PRICES.standard['1 MONTH'])}
                    className="w-full flex items-center justify-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-red-600 transition-colors"
                  >
                    <ShoppingCart className="w-3 h-3" /> ADD TO CART
                  </button>
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