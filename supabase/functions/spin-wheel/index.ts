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

    // Verificar elegibilidad
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('last_spin_at, pending_spins, extra_gens_today, bought_product_ids')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError

    const lastSpin = profile.last_spin_at ? new Date(profile.last_spin_at).getTime() : 0
    const now = new Date().getTime()
    const hoursSinceLastSpin = (now - lastSpin) / (1000 * 60 * 60)
    
    if (hoursSinceLastSpin < 24 && (profile.pending_spins || 0) <= 0) {
      throw new Error('You already spun today. Come back later!')
    }

    // Calcular resultado basado en pesos
    // Si tiene giros pendientes, eliminamos la opción de ganar más giros (evitar bucles)
    const filteredSegments = (profile.pending_spins || 0) > 0 
      ? SEGMENTS.filter(s => s.type !== 'extra_spins')
      : SEGMENTS;
    
    const totalWeight = filteredSegments.reduce((acc, s) => acc + s.weight, 0)
    let random = Math.random() * totalWeight
    let resultIndex = 0
    
    for (let i = 0; i < filteredSegments.length; i++) {
      if (random < filteredSegments[i].weight) {
        // Encontrar el índice original en SEGMENTS para el frontend
        resultIndex = SEGMENTS.findIndex(s => s.label === filteredSegments[i].label)
        break
      }
      random -= filteredSegments[i].weight
    }

    const reward = SEGMENTS[resultIndex]
    const rewardData: any = { ...reward }

    // Procesar recompensa
    if (reward.type === 'extra_gen') {
      await supabaseClient.from('profiles').update({
        extra_gens_today: (profile.extra_gens_today || 0) + (reward.value as number)
      }).eq('id', user.id)
    } else if (reward.type === 'tool') {
      const currentIds = profile.bought_product_ids || []
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

    // Actualizar estado de giro
    const updateData: any = {}
    if ((profile.pending_spins || 0) > 0) {
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