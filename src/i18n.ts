export type Language = 'id' | 'en';

export interface Translation {
  nav: {
    home: string;
    projects: string;
    skills: string;
    contact: string;
    resume: string;
    searchPlaceholder: string;
    searchKey: string;
    timeZonePrefix: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    bio: string;
    viewProjects: string;
    contactMe: string;
    scroll: string;
  };
  projects: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    quote: string;
    items: {
      title: string;
      description: string;
      tags: string[];
      image: string;
      link: string;
    }[];
  };
  expertise: {
    card1: {
      title: string;
      description: string;
    };
    card2: {
      title: string;
      description: string;
    };
    card3: {
      title: string;
      description: string;
    };
  };
  footer: {
    tagline: string;
    headingLine1: string;
    headingHighlight: string;
    headingLine2: string;
    copyright: string;
    buildStatus: string;
  };
  commandBar: {
    placeholder: string;
    empty: string;
    navigation: string;
    actions: string;
    social: string;
    cmdViewProjects: string;
    cmdViewSkills: string;
    cmdContact: string;
    cmdOpenChat: string;
    cmdOpenGithub: string;
    cmdOpenLinkedin: string;
    cmdSwitchLang: string;
    footerNav: string;
    footerSelect: string;
    footerTag: string;
  };
  chat: {
    title: string;
    status: string;
    greeting: string;
    inputPlaceholder: string;
    teaserPrefix: string;
    teaserPrompt: string;
    errorMessage: string;
    teasers: string[];
  };
}

export const translations: Record<Language, Translation> = {
  id: {
    nav: {
      home: "Beranda",
      projects: "Proyek",
      skills: "Keahlian",
      contact: "Kontak",
      resume: "Resume",
      searchPlaceholder: "Ketik perintah...",
      searchKey: "⌘K",
      timeZonePrefix: "Jakarta, ID",
    },
    hero: {
      badge: "Tersedia Berkolaborasi",
      titleLine1: "WEB",
      titleLine2: "DEVELOPER",
      titleLine3: "EXPERT",
      bio: "Halo, saya Yulius Evan Karunia. Full-stack Developer yang menghadirkan solusi digital modern, skalabel, dan berperforma tinggi untuk bisnis Anda. Dari ide hingga deployment.",
      viewProjects: "Lihat Proyek",
      contactMe: "Hubungi Saya",
      scroll: "Gulir",
    },
    projects: {
      badge: "/ KARYA TERPILIH",
      titleLine1: "ARTIFAK",
      titleLine2: "DIGITAL",
      quote: '"Kita membentuk alat kita, dan setelah itu alat kita membentuk kita."',
      items: [
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
      ]
    },
    expertise: {
      card1: {
        title: "Pengembangan Web & UI",
        description: "Spesialis pembuatan website responsif dengan desain modern yang optimal untuk SEO dan kenyamanan pengguna (UX)."
      },
      card2: {
        title: "Sistem & Backend",
        description: "Arsitektur aplikasi web yang kokoh menggunakan Node.js, Next.js, dan optimasi database PostgreSQL."
      },
      card3: {
        title: "Integrasi AI",
        description: "Memanfaatkan LLM tercanggih dan model machine learning untuk membangun aplikasi yang lebih pintar dan adaptif."
      }
    },
    footer: {
      tagline: "Mari bangun masa depan",
      headingLine1: "KOLABORASI",
      headingHighlight: "BISNIS?",
      headingLine2: "HUBUNGI SAYA.",
      copyright: "© 2026 YULIUS EVAN KARUNIA. DIBUAT DENGAN LOGIKA & SEMANGAT.",
      buildStatus: "BUILD: v2.4.92 / STABIL"
    },
    commandBar: {
      placeholder: "Ketik perintah atau cari...",
      empty: "Tidak ada hasil yang ditemukan",
      navigation: "Navigasi",
      actions: "Aksi",
      social: "Media Sosial",
      cmdViewProjects: "Lihat Proyek",
      cmdViewSkills: "Cek Keahlian",
      cmdContact: "Hubungi Yulius",
      cmdOpenChat: "Buka Chatbot AI",
      cmdOpenGithub: "Buka GitHub",
      cmdOpenLinkedin: "Buka LinkedIn",
      cmdSwitchLang: "Ganti ke Bahasa Inggris (Switch to English)",
      footerNav: "Navigasi",
      footerSelect: "Pilih",
      footerTag: "Yulius Portfolio Cmd Bar"
    },
    chat: {
      title: "AI Assistant",
      status: "Online",
      greeting: "Halo! Saya asisten AI Yulius. Ada yang bisa saya bantu terkait proyek atau keahliannya?",
      inputPlaceholder: "Tanyakan sesuatu...",
      teaserPrefix: "Tanya AI:",
      teaserPrompt: "Klik untuk tanya",
      errorMessage: "Maaf, ada gangguan koneksi. Detail:",
      teasers: [
        "Berapa lama Evan belajar pemrograman?",
        "Apa proyek terumit yang pernah Evan buat?",
        "Apakah Evan menerima freelance atau kontrak?",
        "Apa keahlian utama Evan di Frontend & Backend?",
        "Berapa rate jasa pembuatan web Evan?",
      ]
    }
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      resume: "Resume",
      searchPlaceholder: "Type a command...",
      searchKey: "⌘K",
      timeZonePrefix: "Jakarta, ID",
    },
    hero: {
      badge: "Open for Collaboration",
      titleLine1: "WEB",
      titleLine2: "DEVELOPER",
      titleLine3: "EXPERT",
      bio: "Hello, I'm Yulius Evan Karunia. A Full-stack Developer delivering modern, scalable, and high-performance digital solutions for your business. From concept to deployment.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      scroll: "Scroll",
    },
    projects: {
      badge: "/ SELECTED WORKS",
      titleLine1: "DIGITAL",
      titleLine2: "ARTIFACTS",
      quote: '"We shape our tools, and thereafter our tools shape us."',
      items: [
        {
          title: "Krypto Pulse",
          description: "Real-time cryptocurrency price analytics using advanced API integration for accurate digital asset tracking.",
          tags: ["Crypto", "Trading", "React"],
          image: "https://res.cloudinary.com/dbxob5j4s/image/upload/v1778719266/Cuplikan_layar_dari_2026-05-14_07-40-29_adp4sl.png",
          link: "https://krypto-pulse.vercel.app"
        },
        {
          title: "Reffcode ID",
          description: "Trusted crypto referral portal in Indonesia connecting users with regulated and legal exchanges.",
          tags: ["Investment", "Finance", "Web"],
          image: "https://res.cloudinary.com/dbxob5j4s/image/upload/v1778718720/Cuplikan_layar_dari_2026-05-14_07-31-45_x6cvbr.png",
          link: "https://refcode-web.vercel.app"
        }
      ]
    },
    expertise: {
      card1: {
        title: "Web & UI Development",
        description: "Specializing in responsive, modern web applications optimized for SEO and exceptional user experience (UX)."
      },
      card2: {
        title: "Systems & Backend",
        description: "Robust application architectures built with Node.js, Next.js, and high-performance PostgreSQL databases."
      },
      card3: {
        title: "AI Integration",
        description: "Leveraging state-of-the-art LLMs and machine learning models to build intelligent, adaptive digital solutions."
      }
    },
    footer: {
      tagline: "Let's build the future",
      headingLine1: "LOOKING TO",
      headingHighlight: "COLLABORATE?",
      headingLine2: "GET IN TOUCH.",
      copyright: "© 2026 YULIUS EVAN KARUNIA. CRAFTED WITH LOGIC & PASSION.",
      buildStatus: "BUILD: v2.4.92 / STABLE"
    },
    commandBar: {
      placeholder: "Type a command or search...",
      empty: "No commands or results found",
      navigation: "Navigation",
      actions: "Actions",
      social: "Social Media",
      cmdViewProjects: "View Projects",
      cmdViewSkills: "Check Skills",
      cmdContact: "Contact Yulius",
      cmdOpenChat: "Open AI Assistant",
      cmdOpenGithub: "Open GitHub",
      cmdOpenLinkedin: "Open LinkedIn",
      cmdSwitchLang: "Ganti ke Bahasa Indonesia (Switch to Indonesian)",
      footerNav: "Navigate",
      footerSelect: "Select",
      footerTag: "Yulius Portfolio Cmd Bar"
    },
    chat: {
      title: "AI Assistant",
      status: "Online",
      greeting: "Hello! I'm Yulius's AI assistant. How can I help you regarding his projects, tech stack, or collaboration?",
      inputPlaceholder: "Ask anything...",
      teaserPrefix: "Ask AI:",
      teaserPrompt: "Click to ask",
      errorMessage: "Sorry, connection error occurred. Details:",
      teasers: [
        "How long has Evan been programming?",
        "What is the most complex project Evan built?",
        "Is Evan available for freelance or full-time?",
        "What are Evan's key frontend & backend skills?",
        "What services and rates does Evan offer?",
      ]
    }
  }
};

/**
 * Detects browser language:
 * Returns 'id' if browser language starts with 'id' or 'ms', otherwise 'en'.
 */
export function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem("portfolio_lang") as Language | null;
    if (saved === 'id' || saved === 'en') {
      return saved;
    }
  } catch (e) {
    // ignore localstorage failures (e.g. iframe privacy modes)
  }

  if (typeof navigator !== "undefined") {
    const browserLanguages = navigator.languages || [navigator.language || ""];
    for (const lang of browserLanguages) {
      const lower = lang.toLowerCase();
      if (lower.startsWith("id") || lower.startsWith("ms")) {
        return "id";
      }
    }
  }

  return "en";
}
