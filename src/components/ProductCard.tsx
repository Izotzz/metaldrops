"use client";

import React from 'react';
import { Mail, Folder, Cookie, CreditCard, Sparkles, Download, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ProductProps {
  id: number;
  name: string;
  description: string;
  downloads: number;
  iconType: 'mail' | 'folder' | 'cookie' | 'card' | 'sparkles';
  isHighlighted?: boolean;
}

const ProductCard = ({ name, description, downloads, iconType, isHighlighted }: ProductProps) => {
  const Icon = {
    mail: Mail,
    folder: Folder,
    cookie: Cookie,
    card: CreditCard,
    sparkles: Sparkles,
  }[iconType];

  return (
    <div className={cn(
      "group relative flex flex-col p-8 rounded-[2rem] bg-[#0a0a0a] border transition-all duration-300 cursor-pointer",
      isHighlighted 
        ? "border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]" 
        : "border-white/5 hover:border-red-500/30 hover:bg-[#0f0f0f]"
    )}>
      {/* Top Section: Icon and Downloads */}
      <div className="flex items-start justify-between mb-8">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
          <Icon className="w-8 h-8 text-red-500" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400">
          <Download className="w-3 h-3" />
          {downloads}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex-1">
        <h3 className={cn(
          "text-2xl font-bold mb-3 tracking-tight",
          isHighlighted ? "text-red-500" : "text-white"
        )}>
          {name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Bottom Section: Access Link */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white group-hover:text-red-500 transition-colors">
          ACCESS <ChevronRight className="w-4 h-4 text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;