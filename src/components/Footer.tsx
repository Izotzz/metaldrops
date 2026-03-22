"use client";

import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="/" className="text-2xl font-bold tracking-tight text-white mb-6 block">
              LUMINA<span className="text-orange-500">.</span>
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Premium quality goods for the modern lifestyle. We believe in sustainable 
              craftsmanship and timeless design.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Men's Fashion</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women's Fashion</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Home & Living</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to get special offers and first look at new arrivals.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white focus-visible:ring-indigo-500"
              />
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Mail size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 LUMINA Shop. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;