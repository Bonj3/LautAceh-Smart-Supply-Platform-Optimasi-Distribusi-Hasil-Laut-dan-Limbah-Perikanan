import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Clock, Tag, ChevronRight, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

// Mock Data untuk Berita
const FEATURED_NEWS = {
  id: 1,
  title: "Cuaca Ekstrem Terjang Perairan Aceh, Pasokan Ikan Diprediksi Menurun Bulan Ini",
  excerpt: "Kondisi angin kencang dan gelombang tinggi membuat sebagian besar nelayan tradisional di Banda Aceh memilih untuk tidak melaut. Hal ini berpotensi memicu lonjakan harga ikan dalam beberapa minggu ke depan.",
  category: "Cuaca & Alam",
  date: "15 Juli 2026",
  image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cb?auto=format&fit=crop&q=80&w=1200",
  readTime: "4 min read",
};

const NEWS_ARTICLES = [
  {
    id: 2,
    title: "Harga Tuna Sirip Kuning Tembus Rp 130.000/Kg di Pasar Internasional",
    excerpt: "Permintaan ekspor yang tinggi, khususnya dari Jepang dan Amerika Serikat, mendongkrak harga jual tuna lokal...",
    category: "Harga Pasar",
    date: "14 Juli 2026",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Inovasi Baru: Limbah Kepala Ikan Kini Disulap Jadi Tepung Protein Tinggi",
    excerpt: "Sebuah pabrik pengolahan di Aceh Besar berhasil menerapkan teknologi baru untuk mendaur ulang limbah perikanan...",
    category: "Inovasi & Teknologi",
    date: "12 Juli 2026",
    image: "https://images.unsplash.com/photo-1582845610819-215093f4e245?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "Pemerintah Aceh Kucurkan Dana Bantuan untuk Koperasi Nelayan",
    excerpt: "Guna meningkatkan daya saing, pemerintah provinsi menyalurkan bantuan berupa alat tangkap ramah lingkungan...",
    category: "Kebijakan",
    date: "10 Juli 2026",
    image: "https://images.unsplash.com/photo-1522069335606-2580798eb419?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Waspada Tengkulak! Ini Cara Cerdas Menentukan Harga Jual Ikan Tangkapan",
    excerpt: "Mengandalkan data pasar real-time dari aplikasi PasaiEungkot dapat membantu nelayan menghindari kerugian akibat calo...",
    category: "Tips & Edukasi",
    date: "08 Juli 2026",
    image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "Tren Budidaya Udang Vaname Semakin Diminati Petambak Lokal",
    excerpt: "Masa panen yang cepat dan harga jual yang relatif stabil membuat budidaya udang vaname menjadi primadona baru...",
    category: "Harga Pasar",
    date: "05 Juli 2026",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=600",
    readTime: "3 min read",
  },
  {
    id: 7,
    title: "BMKG Peringatkan Potensi Gelombang Tinggi di Samudra Hindia Barat Aceh",
    excerpt: "Nelayan dihimbau berhati-hati dan membawa perlengkapan keselamatan tambahan saat melaut minggu ini...",
    category: "Cuaca & Alam",
    date: "02 Juli 2026",
    image: "https://images.unsplash.com/photo-1505672678657-cc70370f6e81?auto=format&fit=crop&q=80&w=600",
    readTime: "2 min read",
  },
];

const CATEGORIES = ["Semua", "Harga Pasar", "Cuaca & Alam", "Inovasi & Teknologi", "Kebijakan", "Tips & Edukasi"];

export default function News() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredNews = activeCategory === "Semua" 
    ? NEWS_ARTICLES 
    : NEWS_ARTICLES.filter(article => article.category === activeCategory);

  return (
    <div style={{ backgroundColor: "#06141b" }} className="min-h-screen text-slate-200 font-sans flex flex-col">
      <Navbar theme="dark" />

      {/* ── Background Glow ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20 w-full relative z-10">
        
        {/* ── Page Header ── */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4"
          >
            <TrendingUp className="w-3.5 h-3.5" /> Jendela Informasi
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight"
          >
            Berita & Wawasan <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">Perikanan</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-400 max-w-2xl leading-relaxed"
          >
            Dapatkan informasi terkini mengenai harga pasar, prediksi cuaca melaut, inovasi pengolahan limbah, serta kebijakan terbaru di sektor perikanan Aceh.
          </motion.p>
        </div>

        {/* ── Featured News (Hanya tampil jika kategori "Semua") ── */}
        {activeCategory === "Semua" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16 group cursor-pointer"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src={FEATURED_NEWS.image} 
                alt={FEATURED_NEWS.title} 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div 
                className="absolute inset-0" 
                style={{ background: "linear-gradient(to top, #06141b, rgba(6, 20, 27, 0.6), transparent)" }} 
              />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-3/4">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-md bg-cyan-500 text-[#06141b] text-xs font-bold uppercase tracking-wider">
                    {FEATURED_NEWS.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <Clock className="w-3.5 h-3.5" /> {FEATURED_NEWS.date}
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
                  {FEATURED_NEWS.title}
                </h2>
                
                <p className="text-slate-300 line-clamp-2 md:line-clamp-3 mb-6 md:text-lg">
                  {FEATURED_NEWS.excerpt}
                </p>

                <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm group-hover:gap-3 transition-all">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Categories ── */}
        <div className="flex items-center gap-2 md:gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                ${activeCategory === category 
                  ? "bg-cyan-900/60 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]" 
                  : "bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ── News Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (idx % 3) }}
              className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-cyan-400" /> {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center text-[11px] text-slate-400 mb-3">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-cyan-500 group-hover:text-cyan-400">
                  Baca Artikel <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Belum ada berita untuk kategori ini.
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
