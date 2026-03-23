"use client";

import React from 'react';
import { Mail, Folder, Cookie, CreditCard, Sparkles, Download, ShoppingCart } from 'lucide-react';
import { cn } from "@/lib/utils";
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';

interface ProductProps {
  id: number;
  name: string;
  description: string;
  downloads: number;
  iconType: 'mail' | 'folder' | 'cookie' | 'card' | 'sparkles';
  isHighlighted?: boolean;
}

const ProductCard = ({ id, name, description, downloads, iconType, isHighlighted }: ProductProps) => {
  const { addToCart } = useCart();
  
  const Icon = {
    mail: Mail,
    folder: Folder,
    cookie: Cookie,
    card: CreditCard,
    sparkles: Sparkles,
  }[iconType];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price: 29.99, iconType });
    showSuccess(`${name} added to cart!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col rounded-[2.5rem] bg-[#050505] border transition-all duration-500 overflow-hidden p-10",
        isHighlighted 
          ? "border-red-600/40 shadow-[0_0_50px_rgba(220,38,38,0.15)]" 
          : "border-white/5 hover:border-red-600/30 hover:bg-[#080808] hover:shadow-[0_0_40px_rgba(220,38,38,0.1)]"
      )}
    >
      <div className="flex justify-between items-start mb-8">
        <motion.div 
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-14 h-14 rounded-2xl bg-red-600/10 flex items-center justify-center border border-red-600/20"
        >
          <Icon className="w-7 h-7 text-red-600" />
        </motion.div>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <Download className="w-3 h-3 text-red-600" />
          {downloads}
        </div>
      </div>

      <div className="flex-1">
        <h3 className={cn(
          "text-3xl font-black mb-4 tracking-tighter uppercase italic",
          isHighlighted ? "text-red-600" : "text-white group-hover:text-red-600 transition-colors"
        )}>
          {name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="text-xl font-black text-white">$29.99</div>
          <Button 
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-500 text-white font-black rounded-xl h-12 px-6 uppercase tracking-widest text-[10px]"
          >
            Add to Cart <ShoppingCart className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;