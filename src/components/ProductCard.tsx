"use client";

import React from 'react';
import { Mail, Folder, Cookie, CreditCard, Sparkles, Download, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

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

  const handleAccess = () => {
    const toastId = showLoading(`Preparing ${name}...`);
    setTimeout(() => {
      dismissToast(toastId);
      showSuccess(`${name} is ready for download!`);
    }, 1500);
  };

  return (
    <div 
      onClick={handleAccess}
      className={cn(
        "group relative flex flex-col p-8 rounded-[2rem] bg-[#0a0a0a] border transition-all duration-500 cursor-pointer overflow-hidden",
        isHighlighted 
          ? "border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.15)]" 
          : "border-white/5 hover:border-red-500/40 hover:bg-[#0f0f0f] hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]"
      )}
    >
      {/* Hover Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Top Section: Icon and Downloads */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-8 h-8 text-red-500" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <Download className="w-3 h-3 text-red-500" />
          {downloads}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex-1 relative z-10">
        <h3 className={cn(
          "text-2xl font-black mb-3 tracking-tighter uppercase",
          isHighlighted ? "text-red-500" : "text-white group-hover:text-red-500 transition-colors"
        )}>
          {name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
          {description}
        </p>
      </div>

      {/* Bottom Section: Access Link */}
      <div className="mt-auto relative z-10">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-red-500 transition-all group-hover:translate-x-2">
          ACCESS TOOL <ChevronRight className="w-4 h-4 text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;