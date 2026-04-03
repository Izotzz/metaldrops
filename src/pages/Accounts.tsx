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
  { id: 'netflix', name: 'NETFLIX', type: 'Premium UHD', image: netflixLogo, glow: 'rgba(229,9,20,0.5)' },
  { id: 'dazn', name: 'DAZN', type: 'Total Access', image: daznLogo, glow: 'rgba(255,255,255,0.2)' },
  { id: 'crunchyroll', name: 'CRUNCHYROLL', type: 'Mega Fan', image: crunchyrollLogo, glow: 'rgba(244,117,33,0.5)' },
  { id: 'disney', name: 'DISNEY+', type: 'Premium', image: disneyLogo, glow: 'rgba(0,110,153,0.5)' },
  { id: 'paramount', name: 'PARAMOUNT+', type: 'Premium', image: paramountLogo, glow: 'rgba(0,100,255,0.5)' },
  { id: 'xbox', name: 'XBOX GAMEPASS', type: 'Ultimate', image: xboxLogo, glow: 'rgba(16,124,16,0.5)' },
  { id: 'minecraft', name: 'MINECRAFT', type: 'Full Access', image: minecraftLogo, glow: 'rgba(255,255,255,0.15)' },
  { id: 'expressvpn', name: 'EXPRESSVPN', type: 'Premium', image: expressvpnLogo, glow: 'rgba(255,28,28,0.5)' },
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

  const PlanButton = ({ serviceName, type, duration, price, shortLabel }: any) => (
    <button
      onClick={() => handleAddToCart(serviceName, type, duration, price)}
      className="flex-1 group/btn relative flex flex-col items-center justify-center py-2 px-1 bg-black/80 border border-white/10 rounded-lg transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
    >
      <span className="text-[10px] font-black text-white uppercase tracking-tighter mb-0.5">{shortLabel || duration}</span>
      <span className="text-[9px] font-black text-red-600 tracking-tighter">€{price.toFixed(2)}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#020202] relative overflow-hidden">
      {/* Metallic Grid Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:12px_12px]"></div>
      
      {/* Red Ambient Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-900/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-red-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <Navbar />
      
      <main className="flex-grow pt-40 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Spotify Special Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-[2rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-red-600/40 shadow-[0_0_30px_rgba(220,38,38,0.15)] relative overflow-hidden group"
            >
              {/* Brushed Metal Texture Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <img 
                    src={spotifyLogo} 
                    alt="Spotify" 
                    className="h-12 object-contain mix-blend-screen drop-shadow-[0_0_15px_rgba(30,215,96,0.6)]" 
                  />
                  <h3 className="text-4xl font-black text-[#1DB954] uppercase italic tracking-tighter">Spotify</h3>
                </div>

                <div className="space-y-10 flex-grow">
                  {/* Random Account Section */}
                  <div className="text-center">
                    <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-1">RANDOM ACCOUNT</h4>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">Random account</p>
                    <div className="flex gap-3">
                      <PlanButton serviceName="Spotify" type="Random" duration="1 MONTH" shortLabel="1M" price={2.99} />
                      <PlanButton serviceName="Spotify" type="Random" duration="3 MONTHS" shortLabel="3M" price={8.99} />
                      <PlanButton serviceName="Spotify" type="Random" duration="1 YEAR" shortLabel="1Y" price={29.99} />
                    </div>
                  </div>

                  {/* Divider with Energy Glow */}
                  <div className="relative h-px w-full bg-red-600/20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-red-600 blur-md opacity-40"></div>
                  </div>

                  {/* Family Link Section */}
                  <div className="text-center">
                    <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-1">IN YOUR ACCOUNT <span className="text-gray-500 text-sm">(Family Link)</span></h4>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">In your account</p>
                    <div className="flex gap-3">
                      <PlanButton serviceName="Spotify" type="Family Link" duration="1 MONTH" shortLabel="1M" price={2.99} />
                      <PlanButton serviceName="Spotify" type="Family Link" duration="3 MONTHS" shortLabel="3M" price={8.99} />
                      <PlanButton serviceName="Spotify" type="Family Link" duration="1 YEAR" shortLabel="1Y" price={29.99} />
                    </div>
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
                className="p-8 rounded-[2rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-red-600/40 shadow-[0_0_30px_rgba(220,38,38,0.15)] relative overflow-hidden group flex flex-col items-center text-center"
              >
                {/* Brushed Metal Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>
                
                <div className="relative z-10 w-full flex flex-col h-full">
                  <div className="h-24 flex items-center justify-center mb-6">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="h-full object-contain mix-blend-screen" 
                      style={{ filter: `drop-shadow(0 0 20px ${service.glow})` }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">
                    {service.name}
                  </h3>
                  <p className="text-[10px] font-black text-gray-500 uppercase italic tracking-widest mb-8">{service.name}</p>

                  <div className="w-full mt-auto">
                    <div className="flex gap-3 mb-6">
                      <PlanButton serviceName={service.name} type={service.type} duration="1 MONTH" price={2.99} />
                      <PlanButton serviceName={service.name} type={service.type} duration="3 MONTHS" price={8.99} />
                      <PlanButton serviceName={service.name} type={service.type} duration="1 YEAR" price={29.99} />
                    </div>
                    <button 
                      onClick={() => handleAddToCart(service.name, service.type, '1 MONTH', 2.99)}
                      className="w-full flex items-center justify-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-red-600 transition-colors group/cart"
                    >
                      <ShoppingCart className="w-3 h-3 group-hover/cart:scale-110 transition-transform" /> ADD TO CART
                    </button>
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