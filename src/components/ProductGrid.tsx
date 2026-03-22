"use client";

import React from 'react';
import ProductCard from './ProductCard';

const TOOLS = [
  {
    id: 1,
    name: "Hotmail Checker Mobile",
    description: "Mobile version of our high-performance Hotmail checker.",
    downloads: 214,
    iconType: 'mail' as const,
  },
  {
    id: 2,
    name: "Hotmail Checker",
    description: "High-performance combo processor.",
    downloads: 431,
    iconType: 'mail' as const,
  },
  {
    id: 3,
    name: "Combo Maker",
    description: "Extract URL:Login:Pass combos from logs.",
    downloads: 317,
    iconType: 'folder' as const,
    isHighlighted: true,
  },
  {
    id: 4,
    name: "Cookies Extractor",
    description: "Extract valid session cookies from various platforms.",
    downloads: 98,
    iconType: 'cookie' as const,
  },
  {
    id: 5,
    name: "Microsoft Subscriptions",
    description: "Check and manage Microsoft account subscriptions.",
    downloads: 247,
    iconType: 'card' as const,
  },
  {
    id: 6,
    name: "Minecraft Checker",
    description: "Fast and reliable Minecraft account validator.",
    downloads: 189,
    iconType: 'sparkles' as const,
  }
];

const ProductGrid = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <ProductCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;