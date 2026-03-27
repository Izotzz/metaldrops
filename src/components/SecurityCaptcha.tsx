"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface SecurityCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

const SecurityCaptcha = ({ onVerify }: SecurityCaptchaProps) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  const generateChallenge = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setIsSolved(false);
    onVerify(false);
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserAnswer(val);
    
    if (parseInt(val) === num1 + num2) {
      setIsSolved(true);
      onVerify(true);
    } else {
      setIsSolved(false);
      onVerify(false);
    }
  };

  return (
    <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
          <ShieldCheck className={cn("h-3.5 w-3.5", isSolved ? "text-green-500" : "text-red-600")} />
          Security Verification
        </label>
        <button 
          type="button" 
          onClick={generateChallenge}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1 h-14 bg-black border border-white/5 rounded-xl flex items-center justify-center text-xl font-black italic text-white tracking-widest">
          {num1} + {num2} = ?
        </div>
        <Input 
          type="number"
          value={userAnswer}
          onChange={handleChange}
          placeholder="Result"
          className={cn(
            "w-24 h-14 bg-black border-white/5 text-center text-lg font-black rounded-xl focus:ring-red-600",
            isSolved && "border-green-500/50 text-green-500"
          )}
        />
      </div>
      
      {isSolved && (
        <p className="text-[9px] font-black text-green-500 uppercase tracking-widest animate-pulse">
          Verification successful
        </p>
      )}
    </div>
  );
};

export default SecurityCaptcha;