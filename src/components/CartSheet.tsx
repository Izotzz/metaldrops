"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, CreditCard, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartSheet = () => {
  const { items, removeFromCart, total } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      showError("Please login to complete your purchase");
      navigate('/login');
      setIsOpen(false);
      return;
    }
    navigate('/checkout');
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className="relative text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
      >
        <ShoppingCart className="h-5 w-5" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-black border-l border-white/10 z-[70] p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase italic text-white tracking-tighter">Your Cart</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-400">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                  <ShoppingCart className="h-16 w-16 text-white/10 mb-4" />
                  <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Your cart is empty</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                    {items.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div>
                          <h4 className="font-black uppercase text-xs tracking-widest">{item.name}</h4>
                          <p className="text-red-500 text-[10px] font-black mt-1">{item.price.toFixed(2)}€</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-white/10 pb-10">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-500 font-black uppercase tracking-widest text-xs">Total</span>
                      <span className="text-2xl font-black text-white">{total.toFixed(2)}€</span>
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs"
                    >
                      Checkout <CreditCard className="ml-3 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSheet;