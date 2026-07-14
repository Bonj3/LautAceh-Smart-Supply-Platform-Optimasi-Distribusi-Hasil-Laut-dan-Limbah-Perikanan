import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Anchor, Recycle, Truck, ShieldCheck, Users, Leaf } from "lucide-react";

const ABOUT_IMG = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

const stats = [
  { value: "500+", label: "Nelayan Terdaftar", icon: Anchor },
  { value: "12+", label: "Kota Jangkauan", icon: Truck },
  { value: "98%", label: "Tingkat Kepuasan", icon: ShieldCheck },
  { value: "50 Ton", label: "Limbah Terkelola/Bulan", icon: Recycle },
];

const features = [
  {
    icon: "🐟",
    title: "Harga Transparan",
    description: "Harga limbah ikan langsung dari sumber, tanpa tengkulak. Nelayan mendapat harga adil, pembeli mendapat harga terbaik.",
  },
  {
    icon: "♻️",
    title: "Ekonomi Sirkular",
    description: "Tulang, sisik, kepala, dan jeroan ikan yang biasanya terbuang kini memiliki nilai ekonomi tinggi untuk industri pakan, pupuk, dan kosmetik.",
  },
  {
    icon: "🚚",
    title: "Distribusi Terintegrasi",
    description: "Sistem distribusi digital yang menghubungkan nelayan, pengolah, dan pembeli di seluruh Aceh secara efisien dan tepat waktu.",
  },
  {
    icon: "🌊",
    title: "Perikanan Berkelanjutan",
    description: "Mendorong pemanfaatan seluruh bagian hasil tangkapan laut untuk mendukung ekosistem perikanan yang ramah lingkungan.",
  },
];

export function AboutSection() {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="bg-[#1a3d45] relative overflow-hidden w-full"
    >
      {/* Brush-stroke top edge */}
      <div className="absolute -top-0.5 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-[40px] sm:h-[80px]"
        >
          <path
            d="M0,80 C80,35 160,65 280,38 C400,12 500,70 640,44 C780,18 900,72 1040,35 C1160,8 1300,60 1380,30 C1420,18 1440,40 1440,40 L1440,0 L0,0 Z"
            fill="#f0fbfd"
          />
          <path
            d="M0,80 C120,45 240,70 380,42 C520,15 640,68 800,38 C960,10 1100,65 1260,32 C1370,12 1430,45 1440,38 L1440,0 L0,0 Z"
            fill="rgba(240,251,253,0.5)"
          />
        </svg>
      </div>

      {/* Background texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(60,200,216,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(8,145,178,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* ═══ BAGIAN 1: Tentang Kami ═══ */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-[2] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-[11px] md:text-[12px] tracking-[4px] md:tracking-[5px] text-[#3CC8D8] font-semibold uppercase mb-3"
          >
            Tentang Kami
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-black text-white leading-[1.1] tracking-[-0.5px] mb-6 md:mb-7"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Menghubungkan Ekosistem
            <br />
            <span className="text-[#3CC8D8]">Perikanan Aceh</span>
          </motion.h2>

          <div
            className="w-10 md:w-[50px] h-1 rounded-sm mb-6 md:mb-7"
            style={{
              background: "linear-gradient(90deg, #3CC8D8, #54D9E8)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-sm md:text-[15px] text-white/70 leading-[1.8] font-light mb-4"
          >
            PasaiEungkot hadir sebagai solusi digital untuk mengoptimalkan distribusi
            hasil laut dan limbah perikanan di Aceh. Kami percaya bahwa setiap bagian
            dari tangkapan laut memiliki nilai — dari daging hingga tulang, sisik, dan jeroan.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-sm md:text-[15px] text-white/70 leading-[1.8] font-light mb-8 md:mb-9"
          >
            Platform kami menghubungkan nelayan, pengolah ikan, restoran, dan pelaku industri
            sirkular dalam satu ekosistem terintegrasi — menciptakan rantai pasok yang transparan,
            efisien, dan berkelanjutan.
          </motion.p>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-3.5"
          >
            {[
              { icon: "🌊", text: "Sumber daya dari nelayan lokal Aceh yang terverifikasi" },
              { icon: "♻️", text: "Mendukung ekonomi sirkular — dari laut ke meja, tanpa sisa" },
              { icon: "🚚", text: "Distribusi digital langsung ke tangan pembeli" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3.5">
                <div className="w-9 h-9 md:w-[38px] md:h-[38px] rounded-full bg-[#3cc8d826] border border-[#3cc8d84d] flex items-center justify-center text-base md:text-lg shrink-0">
                  {item.icon}
                </div>
                <p className="font-sans text-xs md:text-[14px] text-white/70 font-normal">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center py-10"
        >
          {/* Main image */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-square rounded-3xl overflow-hidden relative border-4 md:border-[6px] border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_50px_rgba(60,200,216,0.15)]"
          >
            <ImageWithFallback
              src={ABOUT_IMG}
              alt="Nelayan Aceh di laut"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_30px_rgba(60,200,216,0.1)]" />
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute top-[5%] right-[2%] text-[40px] lg:text-[50px] select-none drop-shadow-md"
          >
            🐟
          </motion.div>
          <motion.div
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden md:block absolute bottom-[8%] left-[2%] text-[36px] lg:text-[45px] select-none drop-shadow-md"
          >
            🌊
          </motion.div>

          {/* Floating stat badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute top-[5%] md:top-[8%] left-[5%] md:left-[0%] bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          >
            <p className="text-[#3CC8D8] font-black text-lg md:text-xl">500+</p>
            <p className="text-white/60 text-[9px] md:text-[10px] font-medium tracking-wide">Nelayan Aktif</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="absolute bottom-[10%] md:bottom-[12%] right-[5%] md:right-[0%] bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          >
            <p className="text-[#3CC8D8] font-black text-lg md:text-xl">50 Ton</p>
            <p className="text-white/60 text-[9px] md:text-[10px] font-medium tracking-wide">Limbah/Bulan</p>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ BAGIAN 2: Statistik ═══ */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 relative z-[2]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 text-center hover:bg-white/[0.1] transition-colors duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#3cc8d820] border border-[#3cc8d840] flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#3CC8D8]" />
                </div>
                <p className="font-sans font-black text-white text-2xl md:text-3xl mb-1">{stat.value}</p>
                <p className="font-sans text-white/50 text-[11px] md:text-xs font-medium tracking-wide">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ═══ BAGIAN 3: Keunggulan ═══ */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-sans text-[11px] md:text-[12px] tracking-[4px] text-[#3CC8D8] font-semibold uppercase mb-3">
            Keunggulan
          </p>
          <h3
            className="font-sans font-black text-white tracking-[-0.5px]"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Mengapa Memilih PasaiEungkot?
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-7 hover:bg-white/[0.1] hover:border-[#3cc8d840] transition-all duration-300 cursor-default"
            >
              <div className="text-3xl md:text-4xl mb-4">{feature.icon}</div>
              <h4 className="font-sans font-bold text-white text-base md:text-lg mb-2">{feature.title}</h4>
              <p className="font-sans text-white/55 text-xs md:text-[13px] leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ BAGIAN 4: CTA Bawah ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 border-t border-[#3cc8d81f] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative z-[2] text-center md:text-left"
      >
        <div>
          <p className="font-sans text-xl md:text-[22px] font-bold text-white mb-1.5 md:mb-2">
            Siap memanfaatkan limbah ikan?
          </p>
          <p className="font-sans text-xs md:text-[14px] text-white/55 font-light">
            Jelajahi marketplace kami dan temukan produk limbah ikan berkualitas dari Aceh.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(routes.marketplace)}
            className="w-full sm:w-auto px-8 py-3 md:px-9 md:py-3.5 border-none rounded-full text-white font-sans font-bold text-xs md:text-[13px] tracking-[1.5px] cursor-pointer shadow-[0_8px_25px_rgba(60,200,216,0.3)]"
            style={{
              background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
            }}
          >
            JELAJAHI MARKETPLACE
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(routes.contact)}
            className="w-full sm:w-auto px-8 py-3 md:px-9 md:py-3.5 bg-transparent border-2 border-[#3cc8d873] rounded-full text-[#54D9E8] font-sans font-semibold text-xs md:text-[13px] tracking-[1px] cursor-pointer transition-colors"
          >
            HUBUNGI KAMI
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
