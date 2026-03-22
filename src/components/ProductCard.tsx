"use client";

import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
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
    showSuccess(`${name} added to cart!`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {isNew && (
          <Badge className="absolute left-3 top-3 bg-orange-500 hover:bg-orange-600">
            New
          </Badge>
        )}
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500">
          <Heart className="h-4 w-4" />
        </button>
        
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">{category}</p>
        <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1">{name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-extrabold text-gray-900">${price.toFixed(2)}</p>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
            <span className="text-xs font-semibold text-gray-600">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;