"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Wheel from '@/components/Wheel';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Zap, Gift, MessageSquare, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';

const Spin = () => {
  const { isLoggedIn, userId, isLoading: authLoading } = useAuth();
  const [canSpin, setCanSpin] = useState(false);
  const [pendingSpins, setPendingSpins] = useState(0);
  const [isChecking, setIsChecking] = useState(true);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [reward, setReward] = useState<any>(null);

  useEffect(() => {
    const checkSpinStatus = async () => {
      if (!userId) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('last_spin_at, pending_spins')
          .eq('id', userId)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const lastSpin = data.last_spin_at ? new Date(data.last_spin_at).getTime() : 0;
          const now = new Date().getTime();
          const hoursSinceLastSpin = (now - lastSpin) / (1000 * 60 * 60);
          
          setPendingSpins(data.pending_spins || 0);
          setCanSpin(hoursSinceLastSpin >= 24 || (data.pending_spins || 0) > 0);
        }
      } catch (err) {
        console.error("Error checking spin status:", err);
      } finally {
        setIsChecking(false);
      }
    };

    if (isLoggedIn && userId) {
      checkSpinStatus();
    } else {
      setIsChecking(false);
    }
  }, [isLoggedIn, userId]);

  const handleSpinResult = async (result: any) => {
    setReward(result);
    setShowRewardModal(true);
    
    // Actualizar estado local
    if (result.type === 'extra_spins') {
      setPendingSpins(prev => prev + 2);
    } else if (pendingSpins > 0) {
      setPendingSpins(prev => prev - 1);
    }
    
    // Si no quedan giros pendientes, bloquear
    if (pendingSpins <= 1) {
      setCanSpin(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)] pointer-events-none"></div>

      <Navbar />
      
      <main className="flex-grow pt-40 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-6think
The user wants me to continue the previous response exactly where it left off.
Looking at the previous response, it cut off inside a `<dyad-write>` block for `src/pages/Spin.tsx`.

The last line was:
`initial={{ opacity: 0, y: -20 }}`
`animate={{ opacity: 1, y: 0 }}`
`className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-6`

I need to complete the `src/pages/Spin.tsx` file, then provide the other files I mentioned: `src/components/Wheel.tsx`, `src/App.tsx`, `src/components/Navbar.tsx`, `src/context/AuthContext.tsx`, and the SQL setup.

Wait, I should check the instructions.
"Continue exactly where you left off without any preamble."

The previous response ended at:
`className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-6`

I will continue from `00/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"`

Let's reconstruct the `src/pages/Spin.tsx` content.

```tsx
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Zap className="w-3 h-3" /> Daily Rewards System
            </motion.div>
            
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic mb-4">
              LUCKY <span className="text-red-600">SPIN</span>
            </h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px]">
              Test your luck and win premium assets
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-12">
            {!isLoggedIn ? (
              <div className="text-center space-y-8 p-12 rounded-[3rem] bg-[#050505] border border-white/5 max-w-md w-full">
                <div className="w-20 h-20 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto border border-red-600/20">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Login to Spin</h2>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                  You must be authenticated to participate in the daily rewards program.
                </p>
                <Link to="/login" className="block">
                  <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                    Access Account <LogIn className="ml-3 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : isChecking ? (
              <div className="flex flex-col items-center gap-4 py-20">
                <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Checking eligibility...</p>
              </div>
            ) : (
              <div className="relative">
                <Wheel 
                  canSpin={canSpin} 
                  onResult={handleSpinResult} 
                  pendingSpins={pendingSpins}
                />
                
                {pendingSpins > 0 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                      {pendingSpins} Extra Spins Available
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && reward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowRewardModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#050505] border border-red-600/30 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(220,38,38,0.2)] text-center"
            >
              <div className="w-20 h-20 bg-red-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-red-600/20">
                <Gift className="w-10 h-10 text-red-600" />
              </div>
              
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
                CONGRATULATIONS!
              </h2>
              <p className="text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-8">
                You won a premium reward
              </p>
              
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 mb-10">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">
                  {reward.label}
                </h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                  {reward.description}
                </p>
                
                {reward.code && (
                  <div className="mt-6 p-4 bg-black border border-red-600/20 rounded-xl">
                    <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-2">Your Unique Code</p>
                    <p className="text-xl font-mono font-black text-red-600 tracking-tighter">{reward.code}</p>
                  </div>
                )}
              </div>

              {reward.type === 'discord' ? (
                <div className="space-y-4">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-relaxed">
                    To claim your prize, go to our Discord, open a ticket and paste this code. A Staff member will grant you access.
                  </p>
                  <Button 
                    asChild
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                  >
                    <a href="https://discord.gg/metaldrops" target="_blank" rel="noopener noreferrer">
                      Join Discord <MessageSquare className="ml-3 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowRewardModal(false)}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                >
                  Claim Reward <CheckCircle2 className="ml-3 h-4 w-4" />
                </Button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Spin;
```

Then `src/components/Wheel.tsx`.

```tsx
"use client";

import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from './ui/button';
import { Zap, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';

interface WheelProps {
  canSpin: boolean;
  pendingSpins: number;
  onResult: (result: any) => void;
}

const SEGMENTS = [
  { label: '1x Extra Gen', type: 'extra_gen', value: 1, color: '#000000', description: 'You can generate 1 more account today!' },
  { label: '2x Extra Gen', type: 'extra_gen', value: 2, color: '#111111', description: 'You can generate 2 more accounts today!' },
  { label: 'Microsoft Fetcher', type: 'tool', value: 1, color: '#dc2626', description: 'Permanent access to Microsoft Fetcher tool!' },
  { label: '24h Discord', type: 'discord', value: '24h', color: '#000000', description: '24 hours of Premium Discord access!' },
  { label: '1w Discord', type: 'discord', value: '1w', color: '#111111', description: '1 week of Premium Discord access!' },
  { label: '2x Spins Tomorrow', type: 'extra_spins', value: 2, color: '#dc2626', description: '2 extra spins reward for tomorrow active!' },
  { label: 'Nothing', type: 'nothing', value: 0, color: '#000000', description: 'Better luck next time, collector.' },
];

const Wheel = ({ canSpin, pendingSpins, onResult }: WheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = async () => {
    if (!canSpin || isSpinning) return;
    
    setIsSpinning(true);
    
    try {
      // Llamada a la Edge Function para calcular el premio de forma segura
      const { data, error } = await supabase.functions.invoke('spin-wheel');
      
      if (error) throw error;
      
      const resultIndex = data.resultIndex;
      const reward = data.reward;
      
      // Calcular rotación (mínimo 5 vueltas + posición del segmento)
      const segmentAngle = 360 / SEGMENTS.length;
      const targetRotation = 360 * 5 + (SEGMENTS.length - resultIndex) * segmentAngle - (segmentAngle / 2);
      
      await controls.start({
        rotate: targetRotation,
        transition: { duration: 5, ease: [0.16, 1, 0.3, 1] }
      });
      
      onResult(reward);
    } catch (err: any) {
      console.error("Spin error:", err);
      showError(err.message || "Failed to spin the wheel");
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-12 bg-red-600 clip-path-triangle shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
        
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-8 border-red-600/20 shadow-[0_0_50px_rgba(220,38,38,0.1)]"></div>
        
        {/* Wheel */}
        <motion.div 
          animate={controls}
          className="w-full h-full rounded-full border-4 border-red-600 relative overflow-hidden bg-black"
          style={{ transformOrigin: 'center' }}
        >
          {SEGMENTS.map((segment, i) => {
            const angle = 360 / SEGMENTS.length;
            const rotation = i * angle;
            return (
              <div 
                key={i}
                className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end pr-8 md:pr-12"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  backgroundColor: segment.color,
                  clipPath: `polygon(0 0, 100% 0, 100% ${angle}%, 0 0)` // Simplificado para visualización
                }}
              >
                <span 
                  className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-tighter italic whitespace-nowrap"
                  style={{ transform: `rotate(${angle / 2}deg)` }}
                >
                  {segment.label}
                </span>
              </div>
            );
          })}
          
          {/* Center Cap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full border-4 border-black z-10 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      <Button 
        onClick={spin}
        disabled={!canSpin || isSpinning}
        className="bg-red-600 hover:bg-red-500 text-white font-black h-20 px-16 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.4)] uppercase tracking-[0.2em] text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <>SPIN NOW <Zap className="ml-3 h-5 w-5" /></>
        )}
      </Button>
    </div>
  );
};

export default Wheel;
```

Wait, I need to provide the SQL first to ensure the columns exist.

```sql
-- Add spin and reward columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_spin_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS pending_spins INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS extra_gens_today INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_gen_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create user_rewards table for tracking specific rewards
CREATE TABLE IF NOT EXISTS public.user_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_type TEXT NOT NULL,
  reward_value TEXT,
  code TEXT,
  claimed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_used BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can see their own rewards" ON public.user_rewards
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own rewards" ON public.user_rewards
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
```

And the Edge Function.

```typescript
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SEGMENTS = [
  { label: '1x Extra Gen', type: 'extra_gen', value: 1, weight: 30 },
  { label: '2x Extra Gen', type: 'extra_gen', value: 2, weight: 15 },
  { label: 'Microsoft Fetcher', type: 'tool', value: 1, weight: 1.5 },
  { label: '24h Discord', type: 'discord', value: '24h', weight: 10 },
  { label: '1w Discord', type: 'discord', value: '1w', weight: 2 },
  { label: '2x Spins Tomorrow', type: 'extra_spins', value: 2, weight: 20 },
  { label: 'Nothing', type: 'nothing', value: 0, weight: 21.5 },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('No auth header')
    
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
    if (userError || !user) throw new Error('Unauthorized')

    // Check eligibility
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('last_spin_at, pending_spins')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError

    const lastSpin = profile.last_spin_at ? new Date(profile.last_spin_at).getTime() : 0
    const now = new Date().getTime()
    const hoursSinceLastSpin = (now - lastSpin) / (1000 * 60 * 60)
    
    if (hoursSinceLastSpin < 24 && profile.pending_spins <= 0) {
      throw new Error('You already spun today. Come back later!')
    }

    // Calculate result based on weights
    // If user has pending spins, they can't win "extra spins tomorrow" again to avoid loops
    const filteredSegments = profile.pending_spins > 0 
      ? SEGMENTS.filter(s => s.type !== 'extra_spins')
      : SEGMENTS;
    
    const totalWeight = filteredSegments.reduce((acc, s) => acc + s.weight, 0)
    let random = Math.random() * totalWeight
    let resultIndex = 0
    
    for (let i = 0; i < filteredSegments.length; i++) {
      if (random < filteredSegments[i].weight) {
        resultIndex = SEGMENTS.findIndex(s => s.label === filteredSegments[i].label)
        break
      }
      random -= filteredSegments[i].weight
    }

    const reward = SEGMENTS[resultIndex]
    const rewardData: any = { ...reward }

    // Process reward
    if (reward.type === 'extra_gen') {
      await supabaseClient.from('profiles').update({
        extra_gens_today: (profile.extra_gens_today || 0) + (reward.value as number)
      }).eq('id', user.id)
    } else if (reward.type === 'tool') {
      const { data: currentProfile } = await supabaseClient.from('profiles').select('bought_product_ids').eq('id', user.id).single()
      const currentIds = currentProfile?.bought_product_ids || []
      if (!currentIds.includes(reward.value as number)) {
        await supabaseClient.from('profiles').update({
          bought_product_ids: [...currentIds, reward.value as number]
        }).eq('id', user.id)
      }
    } else if (reward.type === 'discord') {
      const code = `${reward.value}${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      rewardData.code = code
      await supabaseClient.from('user_rewards').insert({
        user_id: user.id,
        reward_type: 'discord_access',
        reward_value: reward.value as string,
        code: code
      })
    } else if (reward.type === 'extra_spins') {
      await supabaseClient.from('profiles').update({
        pending_spins: (profile.pending_spins || 0) + (reward.value as number)
      }).eq('id', user.id)
    }

    // Update spin status
    const updateData: any = {}
    if (profile.pending_spins > 0) {
      updateData.pending_spins = profile.pending_spins - 1
    } else {
      updateData.last_spin_at = new Date().toISOString()
    }
    
    await supabaseClient.from('profiles').update(updateData).eq('id', user.id)

    return new Response(JSON.stringify({ resultIndex, reward: rewardData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
```

I'll start the response now.00/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Zap className="w-3 h-3" /> Daily Rewards System
            </motion.div>
            
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic mb-4">
              LUCKY <span className="text-red-600">SPIN</span>
            </h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px]">
              Test your luck and win premium assets
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-12">
            {!isLoggedIn ? (
              <div className="text-center space-y-8 p-12 rounded-[3rem] bg-[#050505] border border-white/5 max-w-md w-full">
                <div className="w-20 h-20 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto border border-red-600/20">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Login to Spin</h2>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                  You must be authenticated to participate in the daily rewards program.
                </p>
                <Link to="/login" className="block">
                  <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase tracking-widest text-xs">
                    Access Account <LogIn className="ml-3 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : isChecking ? (
              <div className="flex flex-col items-center gap-4 py-20">
                <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Checking eligibility...</p>
              </div>
            ) : (
              <div className="relative">
                <Wheel 
                  canSpin={canSpin} 
                  onResult={handleSpinResult} 
                  pendingSpins={pendingSpins}
                />
                
                {pendingSpins > 0 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                      {pendingSpins} Extra Spins Available
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && reward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowRewardModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#050505] border border-red-600/30 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(220,38,38,0.2)] text-center"
            >
              <div className="w-20 h-20 bg-red-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-red-600/20">
                <Gift className="w-10 h-10 text-red-600" />
              </div>
              
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
                CONGRATULATIONS!
              </h2>
              <p className="text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-8">
                You won a premium reward
              </p>
              
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 mb-10">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">
                  {reward.label}
                </h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                  {reward.description}
                </p>
                
                {reward.code && (
                  <div className="mt-6 p-4 bg-black border border-red-600/20 rounded-xl">
                    <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-2">Your Unique Code</p>
                    <p className="text-xl font-mono font-black text-red-600 tracking-tighter">{reward.code}</p>
                  </div>
                )}
              </div>

              {reward.type === 'discord' ? (
                <div className="space-y-4">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-relaxed">
                    To claim your prize, go to our Discord, open a ticket and paste this code. A Staff member will grant you access.
                  </p>
                  <Button 
                    asChild
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                  >
                    <a href="https://discord.gg/metaldrops" target="_blank" rel="noopener noreferrer">
                      Join Discord <MessageSquare className="ml-3 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowRewardModal(false)}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black h-14 rounded-2xl uppercase tracking-widest text-xs"
                >
                  Claim Reward <CheckCircle2 className="ml-3 h-4 w-4" />
                </Button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Spin;