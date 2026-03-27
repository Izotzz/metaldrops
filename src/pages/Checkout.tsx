"use client";

import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, ShieldCheck, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { isLoggedIn, addBoughtProducts } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (items.length === 0 && !isSuccess) return <Navigate to="/products" />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (Object.values(formData).some(val => !val)) {
      showError("Please fill in all fields");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing delay
    setTimeout(async () => {
      const productIds = items.map(item => item.id);
      await addBoughtProducts(productIds);
      
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      showSuccess("Payment processed successfully!");
      
      // Redirect after a short delay to show success state
      setTimeout(() => {
        navigate('/my-products');
      }, 3000);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-48 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Payment <span className="text-green-500">Successful</span></h1>
                <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-12">Your products have been added to your library. Redirecting...</p>
                <Button 
                  onClick={() => navigate('/my-products')}
                  className="bg-white/5 border border-white/10 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                >
                  Go to My Library
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="checkout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              >
                {/* Left Column: Billing & Payment Form */}
                <div className="lg:col-span-2 space-y-12">
                  <div className="mb-12">
                    <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">
                      Secure <span className="text-red-600">Checkout</span>
                    </h1>
                    <p className="text-gray-500 font-black mt-3 uppercase tracking-[0.3em] text-[10px]">Complete your purchase securely</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Billing Information */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs">
                        <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20">
                          <ShieldCheck className="w-4 h-4 text-red-600" />
                        </div>
                        Billing Information
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="fullName" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Full Name</Label>
                          <Input 
                            id="fullName" 
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe" 
                            className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com" 
                            className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                          <Label htmlFor="address" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Billing Address</Label>
                          <Input 
                            id="address" 
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="123 Street Name" 
                            className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="city" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">City</Label>
                          <Input 
                            id="city" 
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="New York" 
                            className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="zipCode" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Zip Code</Label>
                          <Input 
                            id="zipCode" 
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="10001" 
                            className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs">
                        <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20">
                          <CreditCard className="w-4 h-4 text-red-600" />
                        </div>
                        Payment Details
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 space-y-3">
                          <Label htmlFor="cardNumber" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Card Number</Label>
                          <div className="relative">
                            <Input 
                              id="cardNumber" 
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="0000 0000 0000 0000" 
                              className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50 pl-12"
                            />
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="expiry" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY" 
                            className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="cvc" className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">CVC</Label>
                          <Input 
                            id="cvc" 
                            value={formData.cvc}
                            onChange={handleInputChange}
                            placeholder="123" 
                            className="bg-black border-white/5 text-white h-14 rounded-2xl focus:ring-red-600 focus:border-red-600/50"
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isProcessing}
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-16 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs"
                    >
                      {isProcessing ? "PROCESSING PAYMENT..." : `PAY ${total.toFixed(2)}€`} <Lock className="ml-3 h-4 w-4" />
                    </Button>
                  </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-40 p-10 rounded-[2.5rem] bg-[#050505] border border-white/5">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">Order Summary</h3>
                    
                    <div className="space-y-6 mb-10">
                      {items.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex justify-between items-center">
                          <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">{item.name}</span>
                          <span className="text-white font-black text-xs">{item.price.toFixed(2)}€</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Subtotal</span>
                        <span className="text-white font-black text-xs">{total.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Tax (0%)</span>
                        <span className="text-white font-black text-xs">0.00€</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-white font-black uppercase tracking-widest text-xs">Total</span>
                        <span className="text-2xl font-black text-red-600">{total.toFixed(2)}€</span>
                      </div>
                    </div>

                    <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-red-600" />
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                        Your payment is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;