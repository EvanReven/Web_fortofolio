/**
 * Cloudflare Worker for handling Chatbot requests via OpenRouter
 */

export interface Env {
  OPENROUTER_API_KEY: string;
}

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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const { message, history } = await request.json() as any;

      if (!env.OPENROUTER_API_KEY) {
        return new Response(JSON.stringify({ error: "API Key not configured in Worker" }), { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      const messages = [
        { role: "system", content: SYSTEM_INSTRUCTION },
        ...(history || []).map((h: any) => ({
          role: h.role === "model" ? "assistant" : h.role,
          content: h.parts ? h.parts[0].text : h.content
        })),
        { role: "user", content: message }
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yulius.dev",
          "X-Title": "Yulius Portfolio",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: messages,
        })
      });

      const data: any = await response.json();
      
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

    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }
  },
};
