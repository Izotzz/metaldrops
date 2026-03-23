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

  // Secure Unsplash images for each category
  const categoryImage = {
    mail: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=500&auto=format&fit=crop",
    folder: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=500&auto=format&fit=crop",
    cookie: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500&auto=format&fit=crop",
    card: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=500&auto=format&fit=crop",
    sparkles: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=500&auto=format&fit=crop",
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
        "group relative flex flex-col rounded-[2.5rem] bg-[#050505] border transition-all duration-500 overflow-hidden",
        isHighlighted 
          ? "border-red-600/40 shadow-[0_0_50px_rgba(220,38,38,0.15)]" 
          : "border-white/5 hover:border-red-600/30 hover:bg-[#080808] hover:shadow-[0_0_40px_rgba(220,38,38,0.1)]"
      )}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={categoryImage} 
          alt={name} 
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
        <div className="absolute top-6 left-6">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-red-600/20 backdrop-blur-md flex items-center justify-center border border-red-600/30"
          >
            <Icon className="w-6 h-6 text-red-600" />
          </motion.div>
        </div>
      </div>

      <div className="p-10 pt-2 flex-1 relative z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] w-fit mb-6">
          <Download className="w-3 h-3 text-red-600" />
          {downloads} Downloads
        </div>

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