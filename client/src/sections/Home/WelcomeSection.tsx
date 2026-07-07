import { motion } from "motion/react";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(14,124,142,0.18)" }}
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "32px 24px",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s",
        cursor: "default",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Gambar lingkaran */}
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 20px",
          boxShadow: `0 12px 35px ${color}40`,
          border: `3px solid ${color}25`,
          position: "relative",
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
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, #3CC8D8)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "-18px auto 16px",
          fontSize: "18px",
          boxShadow: `0 4px 14px ${color}55`,
          position: "relative",
          zIndex: 2,
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          color: "#1a3a42",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
          color: "#6b8a90",
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        {description}
      </p>

      {/* Harga per kg */}
      {harga && (
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "2px",
          }}
        >
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "20px",
              color: color,
              lineHeight: 1,
            }}
          >
            {harga}
          </span>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              color: "#6b8a90",
            }}
          >
            {satuan}
          </span>
        </div>
      )}

      {/* Tombol Beli */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        style={{
          marginTop: "14px",
          padding: "9px 24px",
          background: `linear-gradient(135deg, ${color}, #3CC8D8)`,
          border: "none",
          borderRadius: "20px",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.5px",
          cursor: "pointer",
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
      style={{
        background: "#f0fbfd",
        padding: "80px 0 100px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* Kepala seksi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "13px",
              letterSpacing: "6px",
              color: "#3CC8D8",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Selamat Datang di LautAceh
          </p>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              color: "#1a3a42",
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
            }}
          >
            Jual Limbah Ikan
            <br />
            <span style={{ color: "#0891b2" }}>Per Potongan</span>
          </h2>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "15px",
              color: "#6b8a90",
              marginTop: "14px",
              maxWidth: "520px",
              margin: "14px auto 0",
              lineHeight: 1.7,
            }}
          >
            Beli limbah ikan per potongan tulang, sisik, dan kepala ikan langsung
            dari nelayan Aceh. Stok segar, harga per kg transparan, cocok untuk pakan ternak,
            pupuk organik, dan industri kreatif.
          </p>
          <div
            style={{
              width: 60,
              height: 4,
              background: "linear-gradient(90deg, #3CC8D8, #0891b2)",
              borderRadius: "2px",
              margin: "20px auto 0",
            }}
          />
        </motion.div>

        {/* Grid utama: kartu promo + kartu produk */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "28px",
            alignItems: "start",
          }}
          className="welcome-grid"
        >
          {/* Kartu promo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              borderRadius: "28px",
              overflow: "hidden",
              position: "relative",
              minHeight: 360,
              cursor: "pointer",
            }}
          >
            {/* Latar belakang makanan laut */}
            <div
              style={{
                position: "absolute",
                inset: 0,
              }}
            >
              <ImageWithFallback
                src={PROMO_BG}
                alt="Limbah ikan segar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(2,28,34,0.92) 40%, rgba(5,60,72,0.65) 100%)",
                }}
              />
            </div>

            {/* Overlay konten */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "36px 28px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                minHeight: 360,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(60,200,216,0.2)",
                  border: "1px solid rgba(60,200,216,0.4)",
                  borderRadius: "20px",
                  padding: "4px 14px",
                  marginBottom: "16px",
                  width: "fit-content",
                }}
              >
                <span
                  style={{
                    color: "#54D9E8",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Penawaran Spesial
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "22px",
                  color: "white",
                  lineHeight: 1.2,
                  marginBottom: "10px",
                }}
              >
                PAKET LIMBAH<br />HARGA TERBAIK
              </h3>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "6px",
                }}
              >
                Paket lengkap mulai dari
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "4px",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#3CC8D8",
                    lineHeight: 1,
                  }}
                >
                  Rp 50.000
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#54D9E8",
                  }}
                >
                  /kg
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "12px 32px",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  border: "none",
                  borderRadius: "24px",
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  cursor: "pointer",
                  width: "fit-content",
                  boxShadow: "0 6px 20px rgba(34,197,94,0.4)",
                }}
              >
                BELI SEKARANG
              </motion.button>
            </div>
          </motion.div>

          {/* Kartu produk */}
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginTop: "60px",
          }}
        >
          {[
            { num: "20+", label: "Jenis Limbah Tersedia", icon: "🐠" },
            { num: "500+", label: "Pembeli Puas", icon: "😊" },
            { num: "24 Jam", label: "Pengiriman Cepat", icon: "🚀" },
            { num: "100%", label: "Limbah Halal & Higienis", icon: "✅" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px 20px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "30px", marginBottom: "8px" }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "28px",
                  color: "#0891b2",
                  lineHeight: 1.1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  color: "#6b8a90",
                  fontWeight: 500,
                  marginTop: "4px",
                  letterSpacing: "0.3px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gaya responsif */}
      <style>{`
        @media (max-width: 900px) {
          .welcome-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .welcome-grid > div:last-child {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
