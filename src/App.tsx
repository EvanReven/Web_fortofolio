import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Github, 
  Twitter, 
  Linkedin, 
  ExternalLink, 
  ChevronRight,
  Menu,
  X,
  Layout,
  MessageSquare,
  Send,
  Bot,
  User,
  Loader2
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// --- Chat Component ---
function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: input,
          history: messages.map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }]
          }))
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: "model", text: data.text }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "model", text: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", text: "Terjadi kesalahan koneksi. Silakan coba lagi nanti." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[90vw] sm:w-[400px] h-[500px] bg-vibe-surface rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-vibe-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-gray-500 uppercase font-mono">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                  <Bot className="w-12 h-12 mb-4" />
                  <p className="text-sm font-medium">Halo! Saya asisten AI Yulius. Ada yang bisa saya bantu terkait proyek atau keahliannya?</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    m.role === "user" 
                      ? "bg-vibe-primary text-black rounded-tr-none font-medium" 
                      : "bg-white/5 border border-white/10 rounded-tl-none"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="flex-1 bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-vibe-primary/50 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-vibe-primary text-black flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-vibe-primary text-black flex items-center justify-center shadow-2xl shadow-vibe-primary/20 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}

const NAV_LINKS = [
  { name: "Beranda", href: "#home" },
  { name: "Proyek", href: "#projects" },
  { name: "Keahlian", href: "#stack" },
  { name: "Kontak", href: "https://wa.me/6285249761877" },
];

const PROJECTS = [
  {
    title: "Krypto Pulse",
    description: "Analisis harga kripto real-time menggunakan integrasi API tingkat lanjut untuk pelacakan aset digital yang akurat.",
    tags: ["Kripto", "Trading", "React"],
    image: "https://res.cloudinary.com/dbxob5j4s/image/upload/v1778719266/Cuplikan_layar_dari_2026-05-14_07-40-29_adp4sl.png",
    link: "https://krypto-pulse.vercel.app"
  },
  {
    title: "Reffcode ID",
    description: "Portal rujukan (referral) kripto terpercaya di Indonesia yang menghubungkan pengguna dengan bursa legal terdaftar Bappebti.",
    tags: ["Investasi", "Finansial", "Web"],
    image: "https://res.cloudinary.com/dbxob5j4s/image/upload/v1778718720/Cuplikan_layar_dari_2026-05-14_07-31-45_x6cvbr.png",
    link: "https://refcode-web.vercel.app"
  }
];

const TECH_STACK = [
  "React", "TypeScript", "Tailwind CSS", "Motion", "Node.js", "Firebase", "PostgreSQL", "Next.js", "Three.js", "Python", "Rust", "GCP"
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-vibe-bg text-gray-100 selection:bg-vibe-primary selection:text-black antialiased">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-vibe-bg/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-vibe-primary rounded-sm flex items-center justify-center">
              <Terminal className="text-black w-5 h-5" />
            </div>
            <span className="font-display text-xl tracking-tighter uppercase font-bold">YULIUS.DEV</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-gray-400 hover:text-vibe-primary transition-colors tracking-widest uppercase"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-5 py-2 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-vibe-primary transition-colors"
            >
              Resume
            </motion.button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-vibe-primary/10 border border-vibe-primary/30 rounded-full">
                <span className="text-[10px] font-bold text-vibe-primary tracking-[0.2em] uppercase">Tersedia Berkolaborasi</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-vibe-primary animate-pulse" />
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl md:text-9xl leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl">
              WEB <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>DEVELOPER</span> <br />
              EXPERT
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-gray-400 font-medium mb-10 leading-relaxed">
              Halo, saya Yulius Evan Karunia. Full-stack Developer yang menghadirkan solusi digital modern, skalabel, dan berperforma tinggi untuk bisnis Anda. Dari ide hingga deployment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="group relative px-8 py-4 bg-vibe-primary text-black font-bold uppercase tracking-widest overflow-hidden transition-all glow-hover flex items-center justify-center">
                <span className="relative z-10 flex items-center gap-2">
                  Lihat Proyek <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a href="https://wa.me/6285249761877" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/20 hover:border-vibe-primary transition-colors font-bold uppercase tracking-widest flex items-center justify-center">
                Hubungi Saya
              </a>
            </div>
          </motion.div>
        </div>

        {/* Ambient Background Elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-vibe-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-vibe-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Gulir</span>
          <div className="w-px h-12 bg-white/20" />
        </motion.div>
      </section>

      {/* Marquee Stack */}
      <section id="stack" className="py-20 border-y border-white/5 bg-vibe-surface/30 overflow-hidden">
        <div className="animate-marquee hover:pause whitespace-nowrap">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div key={i} className="mx-12 flex items-center gap-4 group cursor-default">
              <span className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter text-gray-500 group-hover:text-vibe-primary transition-colors">
                {tech}
              </span>
              <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-vibe-primary/50 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 md:py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
          <div>
            <span className="text-vibe-primary font-mono text-sm tracking-widest mb-4 block uppercase leading-none">/ KARYA TERPILIH</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter">ARTIFAK <br />DIGITAL</h2>
          </div>
          <p className="max-w-xs text-gray-500 font-medium pb-2 italic text-sm md:text-base">
            "Kita membentuk alat kita, dan setelah itu alat kita membentuk kita."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i % 2 * 0.2 }}
              className="group cursor-pointer block"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-vibe-surface mb-6 border border-white/5 rounded-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 flex gap-2 overflow-hidden translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-xl">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-bold uppercase mb-2 group-hover:text-vibe-primary transition-colors">{project.title}</h3>
                  <p className="text-gray-500 font-medium max-w-sm">{project.description}</p>
                </div>
                <div className="w-12 h-12 border border-white/10 group-hover:border-vibe-primary group-hover:bg-vibe-primary flex items-center justify-center transition-all">
                  <ExternalLink className="w-5 h-5 group-hover:text-black transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 md:py-32 bg-vibe-surface/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center bg-vibe-primary text-black rounded-sm shadow-[0_0_15px_rgba(0,255,156,0.5)]">
                <Layout className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Pengembangan Web & UI</h4>
              <p className="text-gray-500 font-medium">Spesialis pembuatan website responsif dengan desain modern yang optimal untuk SEO dan kenyamanan pengguna (UX).</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center bg-vibe-accent text-white rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Sistem & Backend</h4>
              <p className="text-gray-500 font-medium">Arsitektur aplikasi web yang kokoh menggunakan Node.js, Next.js, dan optimasi database PostgreSQL.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-500 text-white rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Integrasi AI</h4>
              <p className="text-gray-500 font-medium">Memanfaatkan LLM tercanggih dan model machine learning untuk membangun aplikasi yang lebih pintar dan adaptif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 bg-vibe-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-500 font-mono text-sm tracking-[0.5em] mb-8 block uppercase">Mari bangun masa depan</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-12">
              KOLABORASI <span className="text-vibe-primary">BISNIS?</span> <br />
              HUBUNGI SAYA.
            </h2>
            <a 
              href="mailto:yuliusevankarunia@gmail.com"
              className="text-lg sm:text-2xl md:text-4xl font-mono underline underline-offset-8 decoration-white/20 hover:decoration-vibe-primary transition-all duration-300 break-all px-4"
            >
              YULIUSEVANKARUNIA@GMAIL.COM
            </a>
          </motion.div>

          <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest text-center">
              &copy; 2026 YULIUS EVAN KARUNIA. DIBUAT DENGAN LOGIKA & SEMANGAT.
            </p>
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest hidden md:block">
              BUILD: v2.4.92 / STABIL
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-vibe-bg p-6 flex flex-col justify-center gap-10"
          >
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="absolute top-8 right-6 p-2 rounded-full bg-white/5"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-tighter hover:text-vibe-primary transition-colors flex items-center justify-between group"
                >
                  {link.name}
                  <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
            
            <div className="mt-12 flex gap-6">
              <a href="#" className="p-3 bg-white/5 rounded-full"><Github className="w-6 h-6" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full"><Linkedin className="w-6 h-6" /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ChatAssistant />
    </div>
  );
}
