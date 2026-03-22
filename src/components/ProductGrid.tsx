"use client";

import React from 'react';
import ProductCard from './ProductCard';
import { TOOLS } from '@/data/tools';

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