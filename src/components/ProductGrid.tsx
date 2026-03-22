"use client";

import React from 'react';
import ProductCard from './ProductCard';

const PRODUCTS = [
  {
    id: 1,
    name: "Minimalist Cotton Tee",
    price: 35.00,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    name: "Premium Leather Tote",
    price: 120.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1584917033904-493bb3c3cc0f?q=80&w=800&auto=format&fit=crop",
    rating: 4.9
  },
  {
    id: 3,
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    isNew: true
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug Set",
    price: 45.00,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    rating: 4.6
  },
  {
    id: 5,
    name: "Eco-Friendly Yoga Mat",
    price: 65.00,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1592432676556-2845a9071390?q=80&w=800&auto=format&fit=crop",
    rating: 4.8
  },
  {
    id: 6,
    name: "Smart Watch Series X",
    price: 399.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    rating: 4.9
  },
  {
    id: 7,
    name: "Linen Blend Trousers",
    price: 85.00,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    rating: 4.5
  },
  {
    id: 8,
    name: "Scented Soy Candle",
    price: 28.00,
    category: "Home",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=800&auto=format&fit=crop",
    rating: 4.7
  }
];

const ProductGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Our most popular items this week</p>
          </div>
          <a href="#" className="text-indigo-600 font-semibold hover:underline">View All</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;