import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, MessageSquare, ShoppingBag, Zap, Send, Fish } from "lucide-react";

const AI_FEATURES = [
  {
    id: "assistant",
    icon: Bot,
    title: "Asisten Belanja Pintar",
    desc: "Tidak perlu repot mencari. Cukup beritahu AI Chatbot kami limbah ikan apa yang Anda butuhkan, dan biarkan AI yang mencarikannya untuk Anda.",
    benefits: ["Pencarian instan", "Tersedia 24/7", "Respon interaktif"],
  },
  {
    id: "recommendation",
    icon: Fish,
    title: "Rekomendasi Personal",
    desc: "AI akan memberikan rekomendasi pasokan limbah atau ikan yang paling sesuai dengan kebutuhan industri atau bisnis Anda.",
    benefits: ["Sesuai kebutuhan", "Saran alternatif stok", "Pilihan harga terbaik"],
  },
  {
    id: "transaction",
    icon: ShoppingBag,
    title: "Pemesanan Super Cepat",
    desc: "Temukan produk, negosiasi, dan langsung selesaikan pesanan Anda langsung di dalam antarmuka percakapan yang praktis.",
    benefits: ["Checkout dari chat", "Hemat waktu", "Tanpa formulir rumit"],
  },
];

export function AiSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="ai" className="bg-[#0b1b24] relative overflow-hidden py-24 md:py-32 w-full font-sans">
      {/* ── Background Glows ── */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* ── Grid Overlay ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#2dd4bf 1px, transparent 1px), linear-gradient(90deg, #2dd4bf 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="text-center md:text-left mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 mb-6 shadow-[0_0_15px_rgba(45,212,191,0.2)]"
          >
            <Bot className="w-4 h-4" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">PasaiEungkot AI Assistant</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6"
          >
            Belanja Hasil Laut Kini<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              Semudah Chatting
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed font-light"
          >
            Platform kami dilengkapi dengan fitur AI Chatbot pintar yang siap membantu Anda menemukan pasokan ikan atau limbah perikanan sesuai kebutuhan Anda, dalam hitungan detik.
          </motion.p>
        </div>

        {/* ── Interactive Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* Left: Interactive Tabs */}
          <div className="flex flex-col gap-4">
            {AI_FEATURES.map((feature, idx) => {
              const isActive = activeTab === idx;
              const Icon = feature.icon;

              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group w-full
                    ${isActive
                      ? "bg-teal-950/40 border-teal-500/50 shadow-[0_0_30px_rgba(45,212,191,0.1)]"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                    }
                  `}
                >
                  {/* Active highlight line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-ai-tab"
                      className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 md:p-3 rounded-xl transition-colors duration-300 shrink-0
                      ${isActive ? "bg-teal-500/20 text-teal-400" : "bg-slate-800 text-slate-400 group-hover:text-slate-300"}
                    `}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className={`text-base md:text-lg font-bold mb-1.5 md:mb-2 transition-colors duration-300
                        ${isActive ? "text-white" : "text-slate-300"}
                      `}>
                        {feature.title}
                      </h3>
                      <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300
                        ${isActive ? "text-teal-100/70" : "text-slate-500"}
                      `}>
                        {feature.desc}
                      </p>

                      {/* Benefits shown only if active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <ul className="flex flex-wrap gap-2">
                              {feature.benefits.map((benefit, bIdx) => (
                                <li key={bIdx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-[9px] md:text-[10px] text-teal-300 font-medium tracking-wide uppercase">
                                  <Zap className="w-2.5 h-2.5 md:w-3 md:h-3" /> {benefit}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Visualizations */}
          <div className="relative h-[450px] md:h-[500px] rounded-3xl bg-slate-900/60 border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl mt-8 lg:mt-0">

            {/* Background grid inner */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.05)_0%,transparent_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeTab === 0 && <ChatbotVisual key="chat1" type="assistant" />}
              {activeTab === 1 && <ChatbotVisual key="chat2" type="recommendation" />}
              {activeTab === 2 && <ChatbotVisual key="chat3" type="transaction" />}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* Bottom Wave Transition to FaqSection */}
      <div className="absolute bottom-[-1px] left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] sm:h-[80px]">
          <path
            d="M0,40 C240,100 480,10 720,60 C960,110 1200,20 1440,50 L1440,120 L0,120 Z"
            fill="#072430"
          />
          <path
            d="M0,60 C300,20 600,90 900,50 C1100,25 1300,70 1440,45 L1440,120 L0,120 Z"
            fill="rgba(7,36,48,0.5)"
          />
        </svg>
      </div>
    </section>
  );
}

// ── Visualizations ──

function ChatbotVisual({ type }: { type: 'assistant' | 'recommendation' | 'transaction' }) {

  type ChatMessage = { sender: string; text: string; delay: number; typing?: boolean; isCard?: boolean; showButton?: boolean; };

  // Data percakapan berdasarkan tipe tab
  const getChatData = (): ChatMessage[] => {
    switch (type) {
      case 'assistant':
        return [
          { sender: 'user', text: "Saya butuh 50kg tulang ikan untuk bahan baku pupuk.", delay: 0.5 },
          { sender: 'ai', text: "Tentu! Sebentar saya carikan stok tulang ikan segar yang tersedia saat ini di sekitar Anda.", delay: 1.5, typing: true },
          { sender: 'ai', text: "Ketemu! Ada 50kg tulang ikan tongkol di TPI Lampulo seharga Rp 8.000/kg. Apakah Anda ingin melihat detailnya?", delay: 3.5, isCard: true }
        ];
      case 'recommendation':
        return [
          { sender: 'user', text: "Apakah ada stok kepala ikan hari ini?", delay: 0.5 },
          { sender: 'ai', text: "Hari ini stok kepala ikan sedang menipis, namun kami sangat merekomendasikan jeroan ikan dan sisik ikan sebagai alternatif bahan baku kosmetik Anda.", delay: 1.5, typing: true },
          { sender: 'ai', text: "Rekomendasi: Paket Sisik Kakap (Rp 5.000/kg) - Tersedia 100kg.", delay: 3.5, isCard: true }
        ];
      case 'transaction':
        return [
          { sender: 'user', text: "Bagus. Saya ambil 50kg tulang ikan tadi ya.", delay: 0.5 },
          { sender: 'ai', text: "Siap diproses! Total tagihan Anda adalah Rp 400.000 + biaya ongkir Rp 20.000.", delay: 1.5, typing: true },
          { sender: 'ai', text: "Silakan tekan tombol di bawah ini untuk menyelesaikan pembayaran Anda dengan mudah.", delay: 3.5, isCard: true, showButton: true }
        ];
    }
  };

  const messages = getChatData();
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    messages.forEach((msg, idx) => {
      const to = setTimeout(() => {
        setVisibleMessages(prev => [...prev, idx]);
      }, msg.delay * 1000);
      timeouts.push(to);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative w-[90%] md:w-[80%] h-[85%] bg-slate-900 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
    >
      {/* Header Chat */}
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/80 border-b border-white/5 backdrop-blur-md">
        <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
          <Bot className="w-4 h-4 text-teal-400" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-200">AI Assistant</h4>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-slate-400">Online</span>
          </div>
        </div>
      </div>

      {/* Body Chat */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {messages.map((msg, idx) => {
          const isVisible = visibleMessages.includes(idx);
          const isUser = msg.sender === 'user';

          if (!isVisible) return null;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
            >
              {isUser ? (
                <div className="max-w-[80%] bg-teal-600/90 text-white text-xs md:text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-md">
                  {msg.text}
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-w-[85%]">
                  {msg.isCard ? (
                    <div className="bg-slate-800 border border-teal-500/30 p-3 rounded-2xl rounded-tl-sm shadow-lg">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                          <ShoppingBag className="w-4 h-4 text-teal-400" />
                        </div>
                        <p className="text-xs md:text-[13px] text-slate-300 leading-relaxed">{msg.text}</p>
                      </div>
                      {msg.showButton && (
                        <button className="w-full mt-2 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 text-[11px] font-bold rounded-lg transition-colors">
                          PROSES PEMBAYARAN
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-800 text-slate-300 text-xs md:text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm border border-white/5 shadow-md">
                      {msg.text}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Typing Indicator if waiting for AI */}
        {visibleMessages.length > 0 && visibleMessages.length < messages.length && messages[visibleMessages.length].sender === 'ai' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex w-full justify-start mt-1"
          >
            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Chat Input */}
      <div className="p-3 border-t border-white/5 bg-slate-800/50 mt-auto">
        <div className="flex items-center gap-2 bg-slate-900 rounded-full px-4 py-2 border border-white/10">
          <MessageSquare className="w-4 h-4 text-slate-500" />
          <div className="text-[11px] md:text-xs text-slate-500 font-light flex-1">Ketik kebutuhan Anda di sini...</div>
          <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center ml-auto">
            <Send className="w-3.5 h-3.5 text-teal-400 -ml-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
