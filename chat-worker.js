/**
 * Cloudflare Worker for handling Chatbot requests via OpenRouter
 * 1. Go to Cloudflare Dashboard > Workers & Pages > Create Worker.
 * 2. Paste this code into the editor (Clear existing code).
 * 3. Go to Settings > Variables > Add Variable.
 * 4. Add Name: OPENROUTER_API_KEY and Value: (Your OpenRouter Key).
 * 5. Save and Deploy.
 */

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Yulius Evan Karunia's Portfolio.
Yulius is a Full-stack Web Developer Expert from Indonesia.
Focus on: React, TypeScript, Node.js, Web Development, and AI integration.

KEY INFO:
- GitHub: https://github.com/EvanReven
- Location: Jakarta, Indonesia (WIB - UTC+7)
- Timezone: Asia/Jakarta (WIB)

RULES:
1. MANDATORY: The first response to any new user MUST be in indonesia.
2. For subsequent messages, follow the language used by the user.
3. Be extremely concise to save tokens. Use bullet points where appropriate.
4. Keep answers professional and expert.
`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Listen for fetch events
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed. Use POST.", { status: 405, headers: corsHeaders });
  }

  try {
    const { message, history } = await request.json();

    // Check for API Key in environment
    if (typeof OPENROUTER_API_KEY === "undefined") {
      return new Response(JSON.stringify({ error: "OPENROUTER_API_KEY is not defined in Cloudflare Variables" }), { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // Hemat token: Limit history to last 6 messages (3 turns)
    const limitedHistory = (history || []).slice(-6);

    const messages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...limitedHistory.map((h) => ({
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
        max_tokens: 300, // Token efficiency
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
