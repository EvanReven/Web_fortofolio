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
  Layout
} from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "Beranda", href: "#home" },
  { name: "Proyek", href: "#projects" },
  { name: "Keahlian", href: "#stack" },
  { name: "Kontak", href: "https://wa.me/6285249761877" },
];

const PROJECTS = [
  {
    title: "Krypto Pulse",
    description: "Platform web untuk pelacakan dan analisis harga mata uang kripto secara real-time.",
    tags: ["Kripto", "API", "React"],
    image: "https://res.cloudinary.com/dbxob5j4s/image/upload/v1778719266/Cuplikan_layar_dari_2026-05-14_07-40-29_adp4sl.png",
    link: "https://krypto-pulse.vercel.app"
  },
  {
    title: "Reffcode ID",
    description: "Platform referal terverifikasi untuk bursa kripto lokal Indonesia yang terdaftar di OJK & Bappebti.",
    tags: ["OJK", "Bappebti", "Crypto", "Lokal"],
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
            
            <h1 className="font-display text-6xl md:text-9xl leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl">
              YULIUS <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>EVAN</span> <br />
              KARUNIA
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-gray-400 font-medium mb-10 leading-relaxed">
              Full-stack developer yang merancang pengalaman digital skalabel secepat kilat. Dibangun dengan presisi, dideploy dengan gaya.
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
      <section id="projects" className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-vibe-primary font-mono text-sm tracking-widest mb-4 block uppercase leading-none">/ KARYA TERPILIH</span>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">ARTIFAK <br />DIGITAL</h2>
          </div>
          <p className="max-w-xs text-gray-500 font-medium pb-2 italic">
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
      <section className="py-32 bg-vibe-surface/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center bg-vibe-primary text-black rounded-sm shadow-[0_0_15px_rgba(0,255,156,0.5)]">
                <Layout className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Desain Antarmuka</h4>
              <p className="text-gray-500 font-medium">Membuat pengalaman digital imersif dengan fokus pada animasi, aksesibilitas, dan dampak visual tinggi.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center bg-vibe-accent text-white rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight">Arsitektur Sistem</h4>
              <p className="text-gray-500 font-medium">Membangun backend skalabel dan infrastruktur andal yang menangani aliran data kompleks dengan mulus.</p>
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
            <h2 className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-12">
              PUNYA <span className="text-vibe-primary">IDE?</span> <br />
              SAPA SAYA.
            </h2>
            <a 
              href="mailto:yuliusevankarunia@gmail.com"
              className="text-2xl md:text-4xl font-mono underline underline-offset-8 decoration-white/20 hover:decoration-vibe-primary transition-all duration-300 break-all"
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-vibe-bg p-10 flex flex-col justify-center gap-8"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10">
              <X className="w-8 h-8" />
            </button>
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl font-display font-bold uppercase tracking-tighter"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
