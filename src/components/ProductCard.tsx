"use client";

import React from 'react';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isNew?: boolean;
}

const ProductCard = ({ name, price, category, image, rating, isNew }: ProductProps) => {
  const handleAddToCart = () => {
    showSuccess(`${name} added to collection!`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-sky-500/50 hover:bg-white/[0.08]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        {isNew && (
          <Badge className="absolute left-3 top-3 bg-sky-500 hover:bg-sky-400 text-white border-none">
            <Zap className="w-3 h-3 mr-1 fill-current" /> NEW DROP
          </Badge>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-bold"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Get Access
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest">{category}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-sky-500 text-sky-500" />
            <span className="text-xs font-bold text-gray-400">{rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-4 line-clamp-1">{name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-xl font-black text-white">${price.toFixed(2)}</p>
          <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-sky-500/50 transition-colors">
            <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-sky-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

import { ArrowRight } from 'lucide-react';
export default ProductCard;