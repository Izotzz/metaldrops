"use client";

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { showSuccess, showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const CartSheet = () => {
  const { items, removeFromCart, clearCart, total } = useCart();
  const { isLoggedIn, addBoughtProducts } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      showError("Please login to complete your purchase");
      navigate('/login');
      return;
    }
    
    const productIds = items.map(item => item.id);
    addBoughtProducts(productIds);
    showSuccess("Purchase successful! Products added to your library.");
    clearCart();
    navigate('/my-products');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black border-white/10 text-white w-full sm:max-w-md">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-black uppercase italic text-white tracking-tighter">Your Cart</SheetTitle>
        </SheetHeader>

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
                    <p className="text-red-500 text-[10px] font-black mt-1">$29.99</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/10 pb-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-black uppercase tracking-widest text-xs">Total</span>
                <span className="text-2xl font-black text-white">${total.toFixed(2)}</span>
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
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;