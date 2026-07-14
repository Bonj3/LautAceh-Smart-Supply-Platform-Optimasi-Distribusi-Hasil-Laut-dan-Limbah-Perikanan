import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export const faqData = [
  {
    question: "Apa itu PasaieUngkot?",
    answer: "PasaieUngkot adalah platform digital yang menghubungkan nelayan, pengepul, pelaku UMKM, industri, dan pembeli dalam satu ekosistem rantai pasok hasil laut. Platform ini juga menyediakan marketplace limbah perikanan agar hasil samping dapat dimanfaatkan menjadi produk bernilai ekonomi."
  },
  {
    question: "Siapa saja yang dapat menggunakan PasaieUngkot?",
    answer: "PasaieUngkot dapat digunakan oleh nelayan, pengepul, pedagang ikan, industri pengolahan hasil laut, UMKM, restoran, distributor, maupun masyarakat umum sebagai pembeli."
  },
  {
    question: "Apakah PasaieUngkot hanya tersedia di Aceh?",
    answer: "Saat ini PasaieUngkot dikembangkan dengan fokus pada sektor perikanan di Aceh. Namun, platform ini dirancang agar dapat dikembangkan dan diterapkan di wilayah lain di Indonesia."
  },
  {
    question: "Bagaimana cara membeli hasil laut di PasaieUngkot?",
    answer: "Pilih produk yang diinginkan, masukkan ke keranjang, lakukan pembayaran melalui metode yang tersedia, kemudian penjual akan memproses pesanan dan pengiriman."
  },
  {
    question: "Apakah saya bisa membeli dalam jumlah besar?",
    answer: "Ya. PasaieUngkot mendukung transaksi retail (B2C) maupun pembelian dalam jumlah besar (B2B) sesuai kapasitas dan ketersediaan stok dari penjual."
  },
  {
    question: "Bagaimana memastikan hasil laut yang dijual masih segar?",
    answer: "Setiap produk dilengkapi informasi mengenai tingkat kesegaran, waktu penangkapan, lokasi asal, dan status stok. Produk yang tidak lagi memenuhi standar kesegaran akan dipindahkan dari marketplace utama."
  },
  {
    question: "Bagaimana cara menjadi penjual?",
    answer: "Daftarkan akun sebagai penjual, lengkapi profil usaha, unggah produk, kemudian produk dapat dipasarkan melalui platform setelah memenuhi persyaratan yang berlaku."
  },
  {
    question: "Siapa yang dapat menjadi penjual di PasaieUngkot?",
    answer: "Nelayan, pengepul, koperasi perikanan, pelaku UMKM, serta pelaku usaha yang bergerak di bidang hasil laut dan produk turunannya."
  },
  {
    question: "Apakah ada biaya untuk mendaftar sebagai penjual?",
    answer: "Tidak. Pendaftaran akun sebagai penjual tidak dikenakan biaya. Ketentuan mengenai layanan dan biaya transaksi akan mengikuti kebijakan platform."
  },
  {
    question: "Apa yang dimaksud dengan marketplace limbah perikanan?",
    answer: "Marketplace limbah perikanan merupakan fitur khusus untuk memperjualbelikan hasil samping seperti kepala ikan, tulang, kulit, sisik, jeroan, cangkang, dan limbah laut lainnya yang masih memiliki nilai ekonomi."
  },
  {
    question: "Siapa yang dapat membeli limbah perikanan?",
    answer: "Limbah perikanan dapat dibeli oleh pelaku industri, UMKM, produsen pupuk organik, pakan ternak, kosmetik, kolagen, maupun usaha lain yang memanfaatkan bahan baku hasil samping perikanan."
  },
  {
    question: "Mengapa limbah perikanan dijual kembali?",
    answer: "Pemanfaatan limbah perikanan bertujuan mengurangi pencemaran lingkungan sekaligus meningkatkan nilai ekonomi hasil tangkapan melalui penerapan konsep ekonomi sirkular (circular economy)."
  },
  {
    question: "Bagaimana proses pengiriman dilakukan?",
    answer: "Pengiriman dilakukan oleh mitra logistik yang bekerja sama dengan penjual. Pengguna dapat memantau status pesanan melalui sistem hingga produk diterima."
  },
  {
    question: "Apakah tersedia layanan pengiriman berpendingin (cold chain)?",
    answer: "Ya. Untuk produk tertentu, tersedia layanan pengiriman menggunakan rantai dingin (cold chain) guna menjaga kualitas dan kesegaran hasil laut selama proses distribusi."
  },
  {
    question: "Apakah transaksi di PasaieUngkot aman?",
    answer: "Ya. PasaieUngkot menerapkan sistem autentikasi pengguna, pengelolaan data yang aman, serta mekanisme transaksi yang dirancang untuk melindungi penjual dan pembeli."
  },
  {
    question: "Bagaimana jika pesanan yang diterima tidak sesuai?",
    answer: "Pengguna dapat mengajukan komplain melalui fitur bantuan atau layanan pelanggan. Tim PasaieUngkot akan membantu proses penyelesaian sesuai dengan kebijakan yang berlaku."
  },
  {
    question: "Apakah PasaieUngkot memiliki fitur rekomendasi produk berbasis AI?",
    answer: "Ya. PasaieUngkot menyediakan fitur rekomendasi cerdas berbasis AI yang membantu pengguna menemukan produk sesuai kebutuhan, preferensi, dan riwayat pencarian."
  },
  {
    question: "Bagaimana sistem memberikan rekomendasi produk?",
    answer: "Sistem menganalisis kategori produk, preferensi pengguna, lokasi, serta riwayat aktivitas untuk memberikan rekomendasi yang lebih relevan dan sesuai kebutuhan."
  },
  {
    question: "Bagaimana cara mengubah informasi profil saya?",
    answer: "Masuk ke akun, buka menu Profil, lakukan perubahan pada informasi yang diinginkan, kemudian simpan perubahan tersebut."
  },
  {
    question: "Bagaimana jika saya lupa kata sandi akun?",
    answer: "Pilih menu Lupa Kata Sandi, masukkan alamat email yang terdaftar, kemudian ikuti petunjuk yang dikirimkan untuk membuat kata sandi baru."
  }
];

export function FaqItem({ question, answer, isOpen, onClick, isLast }: { question: string, answer: string, isOpen: boolean, onClick: () => void, isLast: boolean }) {
  return (
    <div className={`overflow-hidden transition-all duration-300 ${!isLast ? 'border-b border-white/10' : ''}`}>
      <button
        onClick={onClick}
        className="w-full flex items-start justify-between text-left p-5 md:p-6 cursor-pointer hover:bg-white/5 transition-colors focus:outline-none"
      >
        <span className="font-sans font-semibold text-[14px] md:text-[15px] text-white/90 pr-4 leading-relaxed">
          {question}
        </span>
        <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-colors ${isOpen ? 'bg-white/5 border-white/20 text-[#facc15]' : 'border-white/10 text-[#facc15]'}`}>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-5 md:p-6 pt-0 font-sans text-[13px] md:text-[14px] text-white/65 leading-[1.7]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const AnimatedSeparator = () => {
  const wavyPath = "M 1000 16 Q 950 -16 900 16 T 800 16 T 700 16 T 600 16 T 500 16 T 400 16 T 300 16 T 200 16 T 100 16 T 0 16";
  const straightPath = "M 1000 16 Q 950 16 900 16 T 800 16 T 700 16 T 600 16 T 500 16 T 400 16 T 300 16 T 200 16 T 100 16 T 0 16";

  return (
    <svg className="w-full h-8 overflow-visible" viewBox="0 0 1000 32" preserveAspectRatio="none">
      <motion.path
        initial={{ pathLength: 0, d: wavyPath, opacity: 0 }}
        whileInView={{ 
          pathLength: 1, 
          d: straightPath,
          opacity: 1
        }}
        viewport={{ once: false, margin: "250px" }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut",
          pathLength: { duration: 1.0, ease: "linear" },
          d: { delay: 1.0, duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.1 }
        }}
        fill="transparent"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export function FaqSection() {
  const navigate = useNavigate();
  const displayData = faqData.slice(0, 4);

  return (
    <section id="faq" className="w-full bg-[#072430] py-20 md:py-28 relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(14,124,142,0.15) 0%, transparent 100%)",
        }}
      />
      <div className="absolute top-[10%] left-[5%] text-[40px] opacity-20 rotate-12 select-none">🌊</div>
      <div className="absolute bottom-[20%] right-[8%] text-[30px] opacity-10 -rotate-12 select-none">🐟</div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "250px" }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span
              className="font-sans text-[36px] md:text-[48px] font-black tracking-[4px] uppercase text-[#3CC8D8] transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(60,200,216,0.8)] cursor-default inline-block"
            >
              FAQ
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "250px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-bold text-white text-[32px] md:text-[44px] leading-tight mb-4 tracking-[-0.5px]"
          >
            Yang sering ditanyakan.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "250px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[14px] md:text-[16px] text-white/60 max-w-[600px] mx-auto font-light leading-relaxed"
          >
            Beberapa jawaban cepat sebelum kamu masuk ke dashboard dan mulai menggunakan PasaieUngkot.
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col max-w-4xl mx-auto">
          {displayData.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "250px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="pb-2 mb-2"
            >
              <h3 className="font-sans font-semibold text-[16px] md:text-[18px] text-white/90 mb-3">
                {item.question}
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] text-white/65 leading-relaxed">
                {item.answer}
              </p>
              {index !== displayData.length - 1 && (
                <div className="mt-6 mb-2">
                  <AnimatedSeparator />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          id="faq-button"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "250px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <button
            onClick={() => navigate(routes.faq)}
            className="px-8 py-3.5 border-none rounded-full text-white font-sans font-bold text-[14px] md:text-[15px] tracking-[1px] cursor-pointer shadow-[0_8px_25px_rgba(60,200,216,0.2)] transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #0E7C8E, #3CC8D8)",
            }}
          >
            LIHAT SEMUA FAQ
          </button>
        </motion.div>
      </div>
    </section>
  );
}
