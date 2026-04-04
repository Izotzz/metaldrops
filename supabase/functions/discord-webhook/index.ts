import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { content } = await req.json()
    
    // URL del Webhook de Discord (El usuario debe configurar esto en Supabase Secrets)
    // Por ahora usamos una variable de entorno o placeholder
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1346441441441441441/EXAMPLE_TOKEN"

    console.log("[discord-webhook] Sending notification", { content })

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })

    return new Response(JSON.stringify({ success: response.ok }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("[discord-webhook] Error", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})