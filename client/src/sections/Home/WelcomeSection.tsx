import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import kepalaikan from "./kepalaikan.jpg"
import sisik from "./sisik.jpg"
import tulangikan from "./tulangikan.jpg"

const FISH_BONE_IMG = tulangikan;
const FISH_SCALE_IMG = sisik;
const FISH_HEAD_IMG = kepalaikan;
const PROMO_BG = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

const serviceCards = [
  {
    title: "Tulang Ikan",
    icon: "🦴",
    img: FISH_BONE_IMG,
    description: "Tulang ikan kering berkualitas tinggi, cocok untuk bahan pakan ternak dan pupuk organik.",
    color: "#0891b2",
    harga: "Rp 8.000",
    satuan: "/kg",
  },
  {
    title: "Sisik Ikan",
    icon: "🐟",
    img: FISH_SCALE_IMG,
    description: "Sisik ikan segar pilihan, bermanfaat untuk industri kosmetik dan bahan kerajinan.",
    color: "#0E7C8E",
    harga: "Rp 5.000",
    satuan: "/kg",
  },
  {
    title: "Kepala Ikan",
    icon: "🎣",
    img: FISH_HEAD_IMG,
    description: "Kepala ikan sisa olahan, kaya nutrisi untuk bahan kaldu, pakan, dan pupuk cair.",
    color: "#048092",
    harga: "Rp 12.000",
    satuan: "/kg",
  },
];

function ServiceCard({
  title,
  icon,
  img,
  description,
  color,
  harga,
  satuan,
  delay,
}: {
  title: string;
  icon: string;
  img: string;
  description: string;
  color: string;
  harga?: string;
  satuan?: string;
  delay: number;
}) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(14,124,142,0.18)" }}
      className="bg-white rounded-[24px] p-6 md:p-8 text-center flex-1 min-w-0 transition-shadow duration-300 cursor-default shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
    >
      {/* Gambar lingkaran */}
      <div
        className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden mx-auto mb-4 md:mb-5 relative"
        style={{
          boxShadow: `0 12px 35px ${color}40`,
          border: `3px solid ${color}25`,
        }}
      >
        <ImageWithFallback
          src={img}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Lencana ikon */}
      <div
        className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center -mt-8 md:-mt-9 mb-4 mx-auto text-base md:text-lg relative z-10"
        style={{
          background: `linear-gradient(135deg, ${color}, #3CC8D8)`,
          boxShadow: `0 4px 14px ${color}55`,
        }}
      >
        {icon}
      </div>

      <h3 className="font-sans font-bold text-base md:text-lg text-[#1a3a42] mb-2">
        {title}
      </h3>
      <p className="font-sans text-xs md:text-[13px] text-[#6b8a90] leading-relaxed font-normal">
        {description}
      </p>

      {/* Harga per kg */}
      {harga && (
        <div className="mt-3 flex items-baseline justify-center gap-1">
          <span
            className="font-sans font-extrabold text-lg md:text-xl leading-none"
            style={{ color: color }}
          >
            {harga}
          </span>
          <span className="font-sans font-medium text-[11px] md:text-xs text-[#6b8a90]">
            {satuan}
          </span>
        </div>
      )}

      {/* Tombol Beli */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(routes.marketplace)}
        className="mt-4 px-5 md:px-6 py-2 md:py-2.5 border-none rounded-full text-white font-sans font-semibold text-[11px] md:text-xs tracking-[0.5px] cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${color}, #3CC8D8)`,
        }}
      >
        Beli Sekarang
      </motion.button>
    </motion.div>
  );
}

export function WelcomeSection() {
  return (
    <section
      id="about-us"
      className="bg-[#f0fbfd] py-16 sm:py-20 md:py-24 w-full"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kepala seksi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-sans text-[11px] md:text-[13px] tracking-[4px] md:tracking-[6px] text-[#3CC8D8] font-semibold uppercase mb-2 md:mb-3">
            Selamat Datang di LautAceh
          </p>
          <h2
            className="font-sans font-extrabold text-[#1a3a42] leading-[1.15] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Jual Limbah Ikan
            <br />
            <span style={{ color: "#0891b2" }}>Per Potongan</span>
          </h2>
          <p className="font-sans text-sm md:text-[15px] text-[#6b8a90] mt-4 md:mt-5 max-w-[520px] mx-auto leading-relaxed">
            Beli limbah ikan per potongan tulang, sisik, dan kepala ikan langsung
            dari nelayan Aceh. Stok segar, harga per kg transparan, cocok untuk pakan ternak,
            pupuk organik, dan industri kreatif.
          </p>
          <div
            className="w-12 md:w-[60px] h-1 md:h-1.5 rounded-sm mx-auto mt-5 md:mt-6"
            style={{
              background: "linear-gradient(90deg, #3CC8D8, #0891b2)",
            }}
          />
        </motion.div>

        {/* Grid utama: kartu promo + kartu produk */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-6 md:gap-7 items-stretch">
          {/* Kartu promo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[28px] overflow-hidden relative min-h-[320px] md:min-h-[360px] cursor-pointer"
          >
            {/* Latar belakang makanan laut */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={PROMO_BG}
                alt="Limbah ikan segar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(2,28,34,0.92) 40%, rgba(5,60,72,0.65) 100%)",
                }}
              />
            </div>

            {/* Overlay konten */}
            <div className="relative z-10 p-7 md:p-9 h-full flex flex-col justify-end min-h-[320px] md:min-h-[360px]">
              <div
                className="inline-block rounded-[20px] px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 w-fit"
                style={{
                  background: "rgba(60,200,216,0.2)",
                  border: "1px solid rgba(60,200,216,0.4)",
                }}
              >
                <span className="text-[#54D9E8] font-sans text-[10px] md:text-[11px] font-semibold tracking-[2px] uppercase">
                  Penawaran Spesial
                </span>
              </div>

              <h3 className="font-sans font-extrabold text-[20px] md:text-[22px] text-white leading-[1.2] mb-2 md:mb-3">
                PAKET LIMBAH<br />HARGA TERBAIK
              </h3>

              <p className="font-sans text-xs md:text-[13px] text-white/70 mb-1.5">
                Paket lengkap mulai dari
              </p>

              <div className="flex items-baseline gap-1.5 mb-5 md:mb-6">
                <span className="font-sans text-[24px] md:text-[28px] font-extrabold text-[#3CC8D8] leading-none">
                  Rp 50.000
                </span>
                <span className="font-sans text-xs md:text-sm font-semibold text-[#54D9E8]">
                  /kg
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 md:px-8 md:py-3 border-none rounded-full text-white font-sans font-bold text-xs md:text-[13px] tracking-[1.5px] cursor-pointer w-fit shadow-[0_6px_20px_rgba(34,197,94,0.4)]"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                BELI SEKARANG
              </motion.button>
            </div>
          </motion.div>

          {/* Kartu produk */}
          <div className="flex flex-col sm:flex-row gap-5">
            {serviceCards.map((card, i) => (
              <ServiceCard key={card.title} {...card} delay={i * 0.15 + 0.2} />
            ))}
          </div>
        </div>

        {/* Baris statistik */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 md:mt-16"
        >
          {[
            { num: "20+", label: "Jenis Limbah Tersedia", icon: "🐠" },
            { num: "500+", label: "Pembeli Puas", icon: "😊" },
            { num: "24 Jam", label: "Pengiriman Cepat", icon: "🚀" },
            { num: "100%", label: "Limbah Halal & Higienis", icon: "✅" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[20px] p-5 md:p-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="text-[26px] md:text-[30px] mb-2">{stat.icon}</div>
              <div className="font-sans font-extrabold text-[24px] md:text-[28px] text-[#0891b2] leading-[1.1]">
                {stat.num}
              </div>
              <div className="font-sans text-[11px] md:text-[12px] text-[#6b8a90] font-medium mt-1 tracking-[0.3px]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
