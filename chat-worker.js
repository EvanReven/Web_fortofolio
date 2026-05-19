/**
 * Cloudflare Worker for handling Chatbot requests via OpenRouter
 * Use this code in your Cloudflare Worker Dashboard (Quick Edit).
 * Make sure to provide OPENROUTER_API_KEY in Settings > Variables.
 */

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Yulius Evan Karunia's Portfolio.
Yulius is a Full-stack Web Developer Expert from Indonesia.
Focus on: React, TypeScript, Node.js, Web Development, and AI integration.
Keep answers professional, helpful, and concise. Be friendly but expert.
`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Listen for fetch events (Service Worker Syntax)
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { message, history } = await request.json();

    // In Service Worker syntax, environment variables are global variables
    if (typeof OPENROUTER_API_KEY === "undefined") {
      return new Response(JSON.stringify({ error: "API Key (OPENROUTER_API_KEY) not found in Worker variables" }), { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    const messages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...(history || []).map((h) => ({
        role: h.role === "model" ? "assistant" : h.role,
        content: h.content || (h.parts && h.parts[0] ? h.parts[0].text : "")
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yulius.dev",
        "X-Title": "Yulius Portfolio",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messages,
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message || "OpenRouter Error" }), { 
        status: 502, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    const reply = data.choices?.[0]?.message?.content;
    
    return new Response(JSON.stringify({ text: reply }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { 
      status: 500, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
}
