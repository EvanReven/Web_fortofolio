import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Yulius Evan Karunia's Portfolio.
Yulius is a Full-stack Web Developer Expert from Indonesia.
He specializes in building scalable digital experiences with precision.

KEY INFO:
- Name: Yulius Evan Karunia
- Email: yuliusevankarunia@gmail.com
- WhatsApp: +62 852 4976 1877
- GitHub: https://github.com/EvanReven
- Location: Jakarta, Indonesia (WIB - UTC+7)
- Timezone: Asia/Jakarta (WIB)
- Projects: Krypto Pulse, Reffcode ID.

RULES:
1. Always respond in the language used by the user (Indonesian or English).
2. If the user writes in English, reply in English. If in Indonesian, reply in Indonesian.
3. Be concise, helpful, and professional. Use bullet points where appropriate.
4. Keep answers focused on Yulius's engineering skills, projects, and collaboration.
`;

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is missing from environment variables.");
      return res.status(500).json({ error: "OpenRouter API key is not configured. Please add OPENROUTER_API_KEY in Settings > Secrets." });
    }

    // Hemat token: Limit history to last 6 messages
    const limitedHistory = (history || []).slice(-6);

    const messages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...limitedHistory.map((h: any) => ({
        role: h.role === "model" ? "assistant" : h.role,
        content: h.parts ? h.parts[0].text : h.content
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
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

    const data: any = await response.json();
    
    if (data.error) {
      console.error("OpenRouter API Error Response:", data.error);
      const errorMsg = data.error.message || JSON.stringify(data.error);
      throw new Error(`OpenRouter Error: ${errorMsg}`);
    }

    const reply = data.choices?.[0]?.message?.content;
    
    if (!reply) {
      throw new Error("No response from OpenRouter.");
    }

    res.json({ text: reply });
  } catch (error: any) {
    console.error("Chat Error Detail:", error);
    res.status(500).json({ error: error.message || "Failed to generate response" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
