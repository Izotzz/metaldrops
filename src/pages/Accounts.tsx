"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Tv, Gamepad2, Shield, Music, Play, Monitor, Smartphone, Zap, Crown, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';

const ALL_SERVICES = [
  { 
    id: 'spotify-random', 
    name: 'Spotify', 
    type: 'Random Account', 
    icon: Music, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
  { 
    id: 'spotify-family', 
    name: 'Spotify', 
    type: 'Family Link', 
    icon: Crown, 
    prices: { '1 MONTH': 2.99, '3 MONTHS': 4.99, '12 MONTHS': 8.99 } 
  },
  { 
    id: 'netflix', 
    name: 'Netflix', 
    type: 'Premium UHD', 
    icon: Tv, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
  { 
    id: 'dazn', 
    name: 'DAZN', 
    type: 'Total Access', 
    icon: Play, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
  { 
    id: 'crunchyroll', 
    name: 'Crunchyroll', 
    type: 'Mega Fan', 
    icon: Zap, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
  { 
    id: 'disney', 
    name: 'Disney+', 
    type: 'Premium', 
    icon: Monitor, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
  { 
    id: 'paramount', 
    name: 'Paramount+', 
    type: 'Premium', 
    icon: Play, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
  { 
    id: 'xbox', 
    name: 'Xbox Gamepass', 
    type: 'Ultimate', 
    icon: Gamepad2, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
  { 
    id: 'minecraft', 
    name: 'Minecraft', 
    type: 'Full Access', 
    icon: Smartphone, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
  { 
    id: 'expressvpn', 
    name: 'ExpressVPN', 
    type: 'Premium', 
    icon: Shield, 
    prices: { '1 MONTH': 1.99, '3 MONTHS': 3.99, '12 MONTHS': 6.99 } 
  },
];

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

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-20 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic"
            >
              Premium <span className="text-red-600">Accounts</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-black mt-4 uppercase tracking-[0.4em] text-[10px]"
            >
              Elite access to global streaming & services
            </motion.p>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ALL_SERVICES.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-8 md:p-10 rounded-[3rem] bg-[#050505] border-2 border-[#E63931]/20 hover:border-[#E63931] transition-all duration-500 group relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/5 blur-[80px] rounded-full group-hover:bg-red-600/10 transition-all"></div>

                <div className="flex items-center gap-6 mb-10">
                  <div className="w-20 h-20 rounded-[2rem] bg-black border-2 border-[#E63931] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(230,57,49,0.15)] group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="w-10 h-10 text-[#E63931]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-red-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-[10px] font-black text-red-600/60 uppercase tracking-[0.2em]">{service.type}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(service.prices).map(([duration, price]) => (
                    <div 
                      key={duration}
                      className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-600/30 transition-all group/plan"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover/plan:border-red-600/50 transition-colors">
                          <Clock className="w-4 h-4 text-gray-500 group-hover/plan:text-red-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">{duration}</p>
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Instant Delivery</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <span className="text-xl font-black text-white">{price.toFixed(2)}€</span>
                        <Button 
                          onClick={() => handleAddToCart(service.name, service.type, duration, price)}
                          className="bg-red-600 hover:bg-red-500 text-white font-black h-12 px-6 rounded-xl uppercase tracking-widest text-[10px] shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                        >
                          ADD <ShoppingCart className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
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