"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { TOOLS } from '@/data/tools';
import { useAuth } from '@/context/AuthContext';
import { Download, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyProducts = () => {
  const { isLoggedIn, boughtProductIds } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const myTools = TOOLS.filter(tool => boughtProductIds.includes(tool.id));

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">
              My <span className="text-red-600">Library</span>
            </h1>
            <p className="text-gray-500 font-black mt-3 uppercase tracking-[0.3em] text-[10px]">Your collection of premium tools</p>
          </div>

          {myTools.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/5"
            >
              <Package className="h-20 w-20 text-white/5 mb-6" />
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">No products yet</h3>
              <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-8">You haven't purchased any tools yet</p>
              <Link to="/products">
                <Button className="bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl h-14 px-10 uppercase tracking-widest text-xs">
                  Browse Marketplace <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myTools.map((tool, index) => (
                <motion.div 
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-10 rounded-[2.5rem] bg-[#050505] border border-white/5 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">{tool.name}</h3>
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center border border-red-600/20">
                      <Package className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-10 flex-grow">{tool.description}</p>
                  <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black h-14 rounded-2xl uppercase tracking-widest text-xs">
                    Download Tool <Download className="ml-3 h-4 w-4 text-red-600" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default MyProducts;