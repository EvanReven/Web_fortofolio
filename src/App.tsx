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
  Loader2,
  Code2,
  Mail,
  Search,
  Briefcase,
  Sun,
  Moon
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// --- Chat Component ---
const TEASERS = [
  "Berapa lama Evan belajar PHP?",
  "Apa proyek terumit yang pernah Evan buat?",
  "Apakah Evan bisa bahasa Inggris?",
  "Apa keahlian utama Evan di Frontend?",
  "Berapa rate jasa pembuatan web Evan?",
];

function ChatAssistant({ 
  isOpen, 
  setIsOpen,
  hide
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void;
  hide?: boolean;
}) {
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teaserIndex, setTeaserIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTeaserIndex(prev => (prev + 1) % TEASERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      
      // Construct URL
      let apiUrl = "/api/chat";
      if (apiBase) {
        apiUrl = apiBase.endsWith("/") ? `${apiBase}api/chat` : `${apiBase}/api/chat`;
      }
      
      const isProduction = window.location.hostname !== "localhost";
      if (isProduction && !apiBase) {
        throw new Error("VITE_API_BASE_URL belum diatur di Vercel. Silakan atur URL Cloudflare Worker Anda di Environment Variables Vercel.");
      }

      console.log("Connecting to AI at:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: input,
          history: messages.map(m => ({
            role: m.role === "user" ? "user" : "model",
            content: m.text // Send as content for broader compatibility
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: "model", text: data.text }]);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error: any) {
      console.error("Chat Connection Error:", error);
      setMessages(prev => [...prev, { 
        role: "model", 
        text: `Maaf, saya sedang mengalami gangguan koneksi ke otak AI saya. Detail: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex flex-col items-end transition-opacity duration-300 ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              filter: "blur(0px)" 
            }}
            exit={{ 
              opacity: 0, 
              y: 50, 
              scale: 0.8,
              filter: "blur(10px)"
            }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 200,
              mass: 1
            }}
            className="w-[90vw] sm:w-[400px] h-[500px] bg-vibe-surface rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden mb-4"
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
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    delay: 0.05
                  }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    m.role === "user" 
                      ? "bg-vibe-primary text-black rounded-tr-none font-medium" 
                      : "bg-white/5 border border-white/10 rounded-tl-none"
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
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

      <div className="flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="flex flex-col items-end gap-2 pr-2"
            >
              {/* Dynamic Teaser */}
              <div className="relative max-w-[200px] bg-vibe-surface/90 backdrop-blur-md px-4 py-3 rounded-2xl rounded-br-none border border-white/10 shadow-xl pointer-events-auto cursor-pointer group"
                   onClick={() => setIsOpen(true)}>
                <div className="absolute bottom-[-6px] right-[-1px] w-4 h-4 bg-vibe-surface border-r border-b border-white/10 transform rotate-45" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={teaserIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[11px] text-gray-300 italic font-medium leading-relaxed"
                  >
                    "Tanya AI: {TEASERS[teaserIndex]}"
                  </motion.p>
                </AnimatePresence>
                <div className="mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[8px] uppercase tracking-tighter text-vibe-primary font-bold">Klik untuk tanya</span>
                   <ChevronRight className="w-2 h-2 text-vibe-primary" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-vibe-primary text-black flex items-center justify-center shadow-2xl shadow-vibe-primary/20 transition-all pointer-events-auto"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
        </motion.button>
      </div>
    </div>
  );
}

// --- Local Time Component ---
function LocalTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Indonesia Time (WIB - UTC+7)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  const timeString = time.toLocaleTimeString('id-ID', options);

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400">
      <div className="flex items-center gap-1 sm:gap-1.5 border-r border-white/10 pr-2 sm:pr-3">
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-vibe-primary animate-pulse" />
        <span className="hidden sm:block">Jakarta, ID</span>
        <span className="sm:hidden">JKT</span>
      </div>
      <span className="text-white font-bold">{timeString} WIB</span>
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
  "PHP", "TypeScript", "CodeIgniter", "JavaScript", "Node.js", "Vercel", "PostgreSQL", "Next.js", "Three.js", "Python", "HTML", "CSS"
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const commands = [
    { id: "proyek", name: "Lihat Proyek", icon: Briefcase, section: "Navigasi", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "keahlian", name: "Cek Keahlian", icon: Code2, section: "Navigasi", action: () => document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "kontak", name: "Hubungi Yulius", icon: Mail, section: "Navigasi", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "theme", name: "Ganti Tema (Dark/Light)", icon: theme === "dark" ? Sun : Moon, section: "Aksi", action: () => setTheme(theme === "dark" ? "light" : "dark") },
    { id: "chat", name: "Buka Chatbot AI", icon: MessageSquare, section: "Aksi", action: () => setIsChatOpen(true) },
    { id: "github", name: "Buka GitHub", icon: Github, section: "Media Sosial", action: () => window.open("https://github.com/EvanReven", "_blank") },
    { id: "linkedin", name: "Buka LinkedIn", icon: Linkedin, section: "Media Sosial", action: () => window.open("https://linkedin.com", "_blank") },
  ];

  const filteredCommands = searchQuery 
    ? commands.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : commands;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandBarOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandBarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPct = (winScroll / height) * 100;
      setScrollProgress(scrolledPct);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-vibe-bg text-gray-100 selection:bg-vibe-primary selection:text-black antialiased">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-vibe-primary z-[101] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />
      
      {/* Command Bar Overlay */}
      <AnimatePresence>
        {isCommandBarOpen && (
          <div className="fixed inset-0 z-[200] flex items-start sm:items-start justify-center sm:pt-[15vh] px-0 sm:px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCommandBarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full sm:h-auto sm:max-w-2xl bg-vibe-surface sm:border border-black/10 dark:border-white/10 sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 sm:p-4 border-b border-black/10 dark:border-white/10 flex items-center gap-3 bg-vibe-surface/80 backdrop-blur-md sticky top-0 z-10">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  autoFocus
                  placeholder="Ketik perintah atau cari..." 
                  className="w-full bg-transparent border-none outline-none text-lg text-white placeholder-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsCommandBarOpen(false)}
                  className="sm:hidden p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-500">
                  ESC
                </kbd>
              </div>

              <div className="flex-1 overflow-y-auto p-2 scrollbar-none">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-4 py-2">
                    {["Navigasi", "Aksi", "Media Sosial"].map(section => {
                      const sectionCommands = filteredCommands.filter(c => c.section === section);
                      if (sectionCommands.length === 0) return null;
                      
                      return (
                        <div key={section} className="space-y-1">
                          <h3 className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gray-500">{section}</h3>
                          {sectionCommands.map(cmd => (
                            <button
                              key={cmd.id}
                              onClick={() => {
                                cmd.action();
                                setIsCommandBarOpen(false);
                                setSearchQuery("");
                              }}
                              className="w-full flex items-center gap-3 px-3 py-4 sm:py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-vibe-primary transition-colors text-left group active:bg-white/10"
                            >
                              <cmd.icon className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                              <span className="flex-1 text-sm font-medium">{cmd.name}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-gray-500">Tidak ada perintah yang ditemukan untuk "{searchQuery}"</p>
                  </div>
                )}
              </div>

              <div className="p-3 bg-black/20 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-tighter mt-auto">
                <div className="flex gap-4">
                  <span className="hidden sm:inline">↑↓ Navigasi</span>
                  <span className="hidden sm:inline">↵ Pilih</span>
                  <span className="sm:hidden">Geser untuk navigasi</span>
                </div>
                <span>Yulius Portfolio Cmd Bar</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) for Search on Mobile */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCommandBarOpen(true)}
            className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-vibe-surface border border-white/10 text-vibe-primary flex items-center justify-center shadow-2xl z-[90] md:hidden"
          >
            <Search className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-vibe-bg/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 py-4" : "bg-transparent py-6"
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

          <LocalTime />

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setIsCommandBarOpen(true)}
              className="flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors group"
            >
              <Search className="w-4 h-4 text-gray-500 group-hover:text-vibe-primary transition-colors" />
              <span className="text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-widest font-medium">Search...</span>
              <kbd className="flex items-center gap-1 px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-mono text-gray-400">
                <span className="text-[11px]">⌘</span>K
              </kbd>
            </button>

            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, color: "#00FF9C" }}
                transition={{ 
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
                className="text-sm font-medium text-gray-400 transition-colors tracking-widest uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-vibe-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-5 py-2 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-vibe-primary transition-colors"
            >
              Resume
            </motion.button>

            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
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
              <span className="text-transparent" style={{ WebkitTextStroke: theme === 'dark' ? '1px rgba(255,255,255,0.4)' : '1px rgba(0,0,0,0.2)', color: 'transparent' }}>DEVELOPER</span> <br />
              EXPERT
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-10 leading-relaxed">
              Halo, saya Yulius Evan Karunia. Full-stack Developer yang menghadirkan solusi digital modern, skalabel, dan berperforma tinggi untuk bisnis Anda. Dari ide hingga deployment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                href="#projects" 
                className="group relative px-8 py-4 bg-vibe-primary text-black font-bold uppercase tracking-widest overflow-hidden transition-all glow-hover flex items-center justify-center rounded-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Lihat Proyek <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.02, borderColor: "rgba(0, 255, 156, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                href="https://wa.me/6285249761877" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 border border-white/20 font-bold uppercase tracking-widest flex items-center justify-center rounded-sm transition-colors"
              >
                Hubungi Saya
              </motion.a>
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
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: i % 2 * 0.2 
              }}
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
      <section className="py-20 md:py-32 bg-vibe-surface/20 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center bg-vibe-primary text-black rounded-sm shadow-[0_0_15px_rgba(0,255,156,0.5)]">
                <Layout className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Pengembangan Web & UI</h4>
              <p className="text-gray-600 dark:text-gray-500 font-medium">Spesialis pembuatan website responsif dengan desain modern yang optimal untuk SEO dan kenyamanan pengguna (UX).</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center bg-vibe-accent text-white rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Sistem & Backend</h4>
              <p className="text-gray-600 dark:text-gray-500 font-medium">Arsitektur aplikasi web yang kokoh menggunakan Node.js, Next.js, dan optimasi database PostgreSQL.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-500 text-white rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Integrasi AI</h4>
              <p className="text-gray-600 dark:text-gray-500 font-medium">Memanfaatkan LLM tercanggih dan model machine learning untuk membangun aplikasi yang lebih pintar dan adaptif.</p>
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
              {[
                { icon: Github, href: "https://github.com/EvanReven" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((social, idx) => (
                <motion.a 
                  key={idx}
                  whileHover={{ y: -5, scale: 1.2, color: "#00FF9C" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  href={social.href} 
                  className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-[10px] font-mono text-gray-500 dark:text-gray-600 uppercase tracking-widest text-center">
              &copy; 2026 YULIUS EVAN KARUNIA. DIBUAT DENGAN LOGIKA & SEMANGAT.
            </p>
            <p className="text-[10px] font-mono text-gray-500 dark:text-gray-600 uppercase tracking-widest hidden md:block">
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
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCommandBarOpen(true);
                }}
                className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-tighter text-vibe-primary flex items-center justify-between group"
              >
                Cari / Search
                <Search className="w-8 h-8" />
              </button>
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-tighter text-gray-500 flex items-center justify-between group active:text-vibe-primary"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                {theme === "dark" ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
              </button>
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
      <ChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} hide={isMenuOpen} />
    </div>
  );
}
