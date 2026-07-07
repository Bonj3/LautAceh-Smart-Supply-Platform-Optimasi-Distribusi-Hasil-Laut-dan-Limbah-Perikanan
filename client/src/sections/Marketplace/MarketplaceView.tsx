import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { TooltipMarketplace } from "@/components/TooltipMarketplace";

/* ──────────────────────────────────────────────
   DATA LAYER – Typed product catalogues
   ────────────────────────────────────────────── */

interface ProdukSegar {
  id: number;
  nama: string;
  harga: string;
  satuan: string;
  gambar: string;
  kategori: string;
}

interface ProdukGrosir {
  id: number;
  nama: string;
  harga: string;
  satuan: string;
  minimum: string;
  gambar: string;
  kategori: string;
}

interface ProdukIndustri {
  id: number;
  jenisLimbah: string;
  asalIkan: string;
  hargaPerKilo: string;
  gambar: string;
  kategori: string;
}

const dataSegar: ProdukSegar[] = [
  {
    id: 1,
    nama: "Fillet Tuna Super Premium",
    harga: "Rp 125.000",
    satuan: "Kg",
    gambar:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    kategori: "Tuna Sirip Kuning",
  },
  {
    id: 2,
    nama: "Ikan Kembung Banjar Segar",
    harga: "Rp 45.000",
    satuan: "Kg",
    gambar:
      "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80",
    kategori: "Kembung",
  },
  {
    id: 3,
    nama: "Kakap Merah Utuh (800g+)",
    harga: "Rp 88.000",
    satuan: "Ekor",
    gambar:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    kategori: "Kakap Merah",
  },
  {
    id: 4,
    nama: "Udang Vaname Jumbo",
    harga: "Rp 110.000",
    satuan: "Kg",
    gambar:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80",
    kategori: "Udang",
  },
  {
    id: 5,
    nama: "Ikan Tongkol Segar",
    harga: "Rp 35.000",
    satuan: "Kg",
    gambar:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80",
    kategori: "Tongkol",
  },
  {
    id: 6,
    nama: "Cumi-Cumi Segar Pilihan",
    harga: "Rp 75.000",
    satuan: "Kg",
    gambar:
      "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=600&q=80",
    kategori: "Cumi-Cumi",
  },
  {
    id: 7,
    nama: "Ikan Cakalang Utuh",
    harga: "Rp 28.000",
    satuan: "Ekor",
    gambar:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    kategori: "Cakalang",
  },
  {
    id: 8,
    nama: "Ikan Tenggiri Potong",
    harga: "Rp 65.000",
    satuan: "Kg",
    gambar:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    kategori: "Tenggiri",
  },
];

const dataGrosir: ProdukGrosir[] = [
  {
    id: 1,
    nama: "Ikan Tongkol Segar (Box)",
    harga: "Rp 40.000",
    satuan: "Kg",
    minimum: "Min. 5 Kg",
    gambar:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    kategori: "Grosir",
  },
  {
    id: 2,
    nama: "Ikan Kembung Curah",
    harga: "Rp 15.000",
    satuan: "Kg",
    minimum: "Min. 10 Kg",
    gambar:
      "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80",
    kategori: "Surplus",
  },
  {
    id: 3,
    nama: "Ikan Tuna Potong B2B",
    harga: "Rp 55.000",
    satuan: "Kg",
    minimum: "Min. 10 Kg",
    gambar:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    kategori: "B2B",
  },
  {
    id: 4,
    nama: "Udang Windu Premium",
    harga: "Rp 85.000",
    satuan: "Kg",
    minimum: "Min. 2 Kg",
    gambar:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80",
    kategori: "Premium",
  },
];

const dataIndustri: ProdukIndustri[] = [
  {
    id: 1,
    jenisLimbah: "Tulang Ikan",
    asalIkan: "Tuna",
    hargaPerKilo: "Rp 8.000",
    gambar:
      "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=600&q=80",
    kategori: "Tepung Ikan",
  },
  {
    id: 2,
    jenisLimbah: "Kepala Ikan",
    asalIkan: "Tongkol",
    hargaPerKilo: "Rp 5.000",
    gambar:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    kategori: "Pakan Ternak",
  },
  {
    id: 3,
    jenisLimbah: "Sisik Ikan",
    asalIkan: "Kakap",
    hargaPerKilo: "Rp 12.000",
    gambar:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    kategori: "Kolagen",
  },
  {
    id: 4,
    jenisLimbah: "Kulit Ikan",
    asalIkan: "Tuna",
    hargaPerKilo: "Rp 15.000",
    gambar:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    kategori: "Kerupuk Kulit",
  },
];

/* ──────────────────────────────────────────────
   ICON – question‑mark circle (inline SVG)
   ────────────────────────────────────────────── */

function IconQuestionCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   INLINE STYLES – Ocean‑themed marketplace
   ────────────────────────────────────────────── */

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a2e3c 0%, #0d3d4e 30%, #062a36 60%, #041e28 100%)",
    position: "relative" as const,
    overflow: "hidden",
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  /* Animated underwater light rays */
  lightOverlay: {
    position: "absolute" as const,
    inset: 0,
    background:
      "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,200,200,0.06) 0%, transparent 70%)",
    pointerEvents: "none" as const,
  },
  container: {
    position: "relative" as const,
    zIndex: 1,
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "48px 32px 120px",
  },
  /* Header area */
  headerRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: "24px",
    marginBottom: "32px",
  },
  headerText: {
    flex: "1 1 400px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 800,
    color: "#e8f4f8",
    letterSpacing: "-0.5px",
    margin: 0,
    lineHeight: 1.2,
  },
  subtitle: {
    marginTop: "8px",
    fontSize: "15px",
    color: "rgba(180, 220, 230, 0.7)",
    lineHeight: 1.6,
    maxWidth: "520px",
  },
  /* Search */
  searchWrapper: {
    position: "relative" as const,
    flex: "0 0 280px",
  },
  searchIcon: {
    position: "absolute" as const,
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "18px",
    height: "18px",
    color: "rgba(120, 200, 220, 0.6)",
    pointerEvents: "none" as const,
  },
  searchInput: {
    width: "100%",
    height: "44px",
    paddingLeft: "42px",
    paddingRight: "16px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(0,200,200,0.2)",
    borderRadius: "12px",
    color: "#c8e6ec",
    fontSize: "14px",
    outline: "none",
    backdropFilter: "blur(8px)",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  /* Tab navigation */
  tabNav: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "28px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    paddingBottom: "0",
  },
  tabBtn: (isActive: boolean) => ({
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: isActive ? 600 : 400,
    color: isActive ? "#5de8d4" : "rgba(180,220,230,0.6)",
    background: "transparent",
    border: "none",
    borderBottom: isActive ? "2px solid #5de8d4" : "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "-1px",
  }),
  /* Product grid */
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
  /* Product card */
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(0,200,200,0.12)",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    backdropFilter: "blur(6px)",
  },
  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 40px rgba(0,200,200,0.12)",
    borderColor: "rgba(0,200,200,0.3)",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover" as const,
    display: "block",
    transition: "transform 0.4s ease",
  },
  cardBody: {
    padding: "16px 18px 18px",
  },
  categoryBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #0d9488, #14b8a6)",
    marginBottom: "8px",
    letterSpacing: "0.3px",
  },
  productName: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#e2eff3",
    margin: "0 0 10px 0",
    lineHeight: 1.3,
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceBlock: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
  },
  price: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#5de8d4",
  },
  priceSatuan: {
    fontSize: "13px",
    fontWeight: 400,
    color: "rgba(180,220,230,0.5)",
  },
  beliBtn: {
    padding: "6px 18px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #0d9488, #0f766e)",
    border: "1px solid rgba(13,148,136,0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap" as const,
  },
  /* Underwater decorations */
  oceanFloor: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100px",
    pointerEvents: "none" as const,
    zIndex: 0,
    overflow: "hidden",
  },
};

/* ──────────────────────────────────────────────
   Underwater decoration SVGs
   ────────────────────────────────────────────── */

function FishSchool() {
  return (
    <svg
      style={{
        position: "absolute",
        bottom: "40px",
        left: "10%",
        width: "240px",
        height: "60px",
        opacity: 0.35,
      }}
      viewBox="0 0 240 60"
      fill="none"
    >
      {/* Fish 1 */}
      <g transform="translate(0,20)">
        <ellipse cx="18" cy="10" rx="14" ry="7" fill="#14b8a6" />
        <polygon points="32,10 40,3 40,17" fill="#14b8a6" />
        <circle cx="10" cy="8" r="2" fill="#041e28" />
      </g>
      {/* Fish 2 */}
      <g transform="translate(50,8)">
        <ellipse cx="15" cy="10" rx="12" ry="6" fill="#0d9488" />
        <polygon points="27,10 34,4 34,16" fill="#0d9488" />
        <circle cx="8" cy="8" r="1.8" fill="#041e28" />
      </g>
      {/* Fish 3 */}
      <g transform="translate(85,28)">
        <ellipse cx="16" cy="10" rx="13" ry="6.5" fill="#2dd4bf" />
        <polygon points="29,10 37,3.5 37,16.5" fill="#2dd4bf" />
        <circle cx="8" cy="8" r="1.8" fill="#041e28" />
      </g>
      {/* Fish 4 */}
      <g transform="translate(130,14)">
        <ellipse cx="14" cy="9" rx="11" ry="5.5" fill="#14b8a6" />
        <polygon points="25,9 32,3 32,15" fill="#14b8a6" />
        <circle cx="7" cy="7" r="1.6" fill="#041e28" />
      </g>
      {/* Fish 5 */}
      <g transform="translate(170,30)">
        <ellipse cx="13" cy="8" rx="10" ry="5" fill="#0d9488" />
        <polygon points="23,8 30,2.5 30,13.5" fill="#0d9488" />
        <circle cx="7" cy="6.5" r="1.5" fill="#041e28" />
      </g>
    </svg>
  );
}

function Seashell() {
  return (
    <svg
      style={{
        position: "absolute",
        bottom: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "36px",
        height: "36px",
        opacity: 0.3,
      }}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M18 4 C10 4, 4 12, 4 20 C4 28, 10 32, 18 32 C26 32, 32 28, 32 20 C32 12, 26 4, 18 4Z"
        fill="#c084fc"
        opacity="0.6"
      />
      <path
        d="M18 8 L18 32 M12 10 Q18 20 12 30 M24 10 Q18 20 24 30"
        stroke="#a855f7"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  );
}

function SeaweedLeft() {
  return (
    <svg
      style={{
        position: "absolute",
        bottom: 0,
        right: "8%",
        width: "80px",
        height: "90px",
        opacity: 0.3,
      }}
      viewBox="0 0 80 90"
      fill="none"
    >
      <path
        d="M20 90 Q15 60 25 40 Q35 20 20 0"
        stroke="#22c55e"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 90 Q35 55 45 35 Q55 15 40 0"
        stroke="#16a34a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M58 90 Q53 65 60 45 Q67 25 55 5"
        stroke="#22c55e"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BubbleGroup() {
  return (
    <svg
      style={{
        position: "absolute",
        bottom: "50px",
        right: "20%",
        width: "60px",
        height: "80px",
        opacity: 0.15,
      }}
      viewBox="0 0 60 80"
      fill="none"
    >
      <circle cx="15" cy="60" r="5" stroke="#5de8d4" strokeWidth="1" />
      <circle cx="30" cy="40" r="8" stroke="#5de8d4" strokeWidth="1" />
      <circle cx="45" cy="20" r="4" stroke="#5de8d4" strokeWidth="1" />
      <circle cx="22" cy="15" r="6" stroke="#5de8d4" strokeWidth="1" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   COMPONENT – MarketplaceView
   ────────────────────────────────────────────── */

type TabKey = "segar" | "grosir" | "industri";

export default function MarketplaceView() {
  const [activeTab, setActiveTab] = useState<TabKey>("segar");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter helper
  const matchSearch = (text: string) =>
    text.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredSegar = dataSegar.filter(
    (item) => matchSearch(item.nama) || matchSearch(item.kategori)
  );
  const filteredGrosir = dataGrosir.filter(
    (item) => matchSearch(item.nama) || matchSearch(item.kategori)
  );
  const filteredIndustri = dataIndustri.filter(
    (item) =>
      matchSearch(item.jenisLimbah) ||
      matchSearch(item.asalIkan) ||
      matchSearch(item.kategori)
  );

  return (
    <section style={styles.pageWrapper}>
      {/* Ambient light overlay */}
      <div style={styles.lightOverlay} />

      <div style={styles.container} className="mp-container">
        {/* ── Page Header ── */}
        <div style={styles.headerRow}>
          <div style={styles.headerText}>
            <h1 style={styles.title} className="mp-title">Katalog PasaieUngkot</h1>
            <p style={styles.subtitle} className="mp-subtitle">
              Menghubungkan hasil laut Aceh yang segar dengan konsumen rumah
              tangga, mitra bisnis, hingga kebutuhan industri pengolahan.
            </p>
          </div>
          <div style={styles.searchWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "18px",
                height: "18px",
                color: "rgba(120, 200, 220, 0.6)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Cari jenis ikan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,200,200,0.5)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(0,200,200,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,200,200,0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        {/* ── Tab Navigation ── */}
        <TooltipProvider delayDuration={150}>
          <nav style={styles.tabNav} className="mp-tab-nav">
            <button
              style={styles.tabBtn(activeTab === "segar")}
              className="mp-tab-btn"
              onClick={() => setActiveTab("segar")}
              onMouseEnter={(e) => {
                if (activeTab !== "segar")
                  e.currentTarget.style.color = "rgba(180,220,230,0.9)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "segar")
                  e.currentTarget.style.color = "rgba(180,220,230,0.6)";
              }}
            >
              Tangkapan Segar
            </button>
            <button
              style={styles.tabBtn(activeTab === "grosir")}
              className="mp-tab-btn"
              onClick={() => setActiveTab("grosir")}
              onMouseEnter={(e) => {
                if (activeTab !== "grosir")
                  e.currentTarget.style.color = "rgba(180,220,230,0.9)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "grosir")
                  e.currentTarget.style.color = "rgba(180,220,230,0.6)";
              }}
            >
              Surplus Grosir
            </button>
            <button
              style={styles.tabBtn(activeTab === "industri")}
              className="mp-tab-btn"
              onClick={() => setActiveTab("industri")}
              onMouseEnter={(e) => {
                if (activeTab !== "industri")
                  e.currentTarget.style.color = "rgba(180,220,230,0.9)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "industri")
                  e.currentTarget.style.color = "rgba(180,220,230,0.6)";
              }}
            >
              Bahan Baku Industri
              <TooltipMarketplace />
            </button>
          </nav>

          {/* ── Tab Content: Tangkapan Segar ── */}
          {activeTab === "segar" && (
            <div style={styles.productGrid} className="mp-grid">
              {filteredSegar.map((item) => {
                const key = `segar-${item.id}`;
                const isHovered = hoveredCard === key;
                return (
                  <div
                    key={key}
                    style={{
                      ...styles.card,
                      ...(isHovered ? styles.cardHover : {}),
                    }}
                    onMouseEnter={() => setHoveredCard(key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="mp-card"
                  >
                    <div style={{ overflow: "hidden" }}>
                      <ImageWithFallback
                        src={item.gambar}
                        alt={item.nama}
                        className="mp-card-img"
                        style={{
                          ...styles.cardImage,
                          transform: isHovered ? "scale(1.08)" : "scale(1)",
                        }}
                      />
                    </div>
                    <div style={styles.cardBody} className="mp-card-body">
                      <span style={styles.categoryBadge} className="mp-card-badge">{item.kategori}</span>
                      <h3 style={styles.productName} className="mp-card-title">{item.nama}</h3>
                      <div style={styles.priceRow}>
                        <div style={styles.priceBlock}>
                          <span style={styles.price} className="mp-card-price">{item.harga}</span>
                          <span style={styles.priceSatuan} className="mp-card-price-satuan">
                            / {item.satuan}
                          </span>
                        </div>
                        <button
                          style={styles.beliBtn}
                          className="mp-card-btn"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "linear-gradient(135deg, #14b8a6, #0d9488)";
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "linear-gradient(135deg, #0d9488, #0f766e)";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Tab Content: Surplus Grosir ── */}
          {activeTab === "grosir" && (
            <div style={styles.productGrid} className="mp-grid">
              {filteredGrosir.map((item) => {
                const key = `grosir-${item.id}`;
                const isHovered = hoveredCard === key;
                return (
                  <div
                    key={key}
                    style={{
                      ...styles.card,
                      ...(isHovered ? styles.cardHover : {}),
                    }}
                    onMouseEnter={() => setHoveredCard(key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="mp-card"
                  >
                    <div style={{ overflow: "hidden" }}>
                      <ImageWithFallback
                        src={item.gambar}
                        alt={item.nama}
                        className="mp-card-img"
                        style={{
                          ...styles.cardImage,
                          transform: isHovered ? "scale(1.08)" : "scale(1)",
                        }}
                      />
                    </div>
                    <div style={styles.cardBody} className="mp-card-body">
                      <span style={styles.categoryBadge} className="mp-card-badge">{item.kategori}</span>
                      <h3 style={styles.productName} className="mp-card-title">{item.nama}</h3>
                      {item.minimum && (
                        <p
                          style={{
                            fontSize: "12px",
                            color: "rgba(180,220,230,0.45)",
                            margin: "0 0 6px 0",
                          }}
                          className="mp-card-meta"
                        >
                          {item.minimum}
                        </p>
                      )}
                      <div style={styles.priceRow}>
                        <div style={styles.priceBlock}>
                          <span style={styles.price} className="mp-card-price">{item.harga}</span>
                          <span style={styles.priceSatuan} className="mp-card-price-satuan">
                            / {item.satuan}
                          </span>
                        </div>
                        <button
                          style={styles.beliBtn}
                          className="mp-card-btn"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "linear-gradient(135deg, #14b8a6, #0d9488)";
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "linear-gradient(135deg, #0d9488, #0f766e)";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Tab Content: Bahan Baku Industri ── */}
          {activeTab === "industri" && (
            <div style={styles.productGrid} className="mp-grid">
              {filteredIndustri.map((item) => {
                const key = `industri-${item.id}`;
                const isHovered = hoveredCard === key;
                return (
                  <div
                    key={key}
                    style={{
                      ...styles.card,
                      ...(isHovered ? styles.cardHover : {}),
                    }}
                    onMouseEnter={() => setHoveredCard(key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="mp-card"
                  >
                    <div style={{ overflow: "hidden" }}>
                      <ImageWithFallback
                        src={item.gambar}
                        alt={`${item.jenisLimbah} – ${item.asalIkan}`}
                        className="mp-card-img"
                        style={{
                          ...styles.cardImage,
                          transform: isHovered ? "scale(1.08)" : "scale(1)",
                        }}
                      />
                    </div>
                    <div style={styles.cardBody} className="mp-card-body">
                      <span style={styles.categoryBadge} className="mp-card-badge">{item.kategori}</span>
                      <h3 style={styles.productName} className="mp-card-title">{item.jenisLimbah}</h3>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(180,220,230,0.45)",
                          margin: "0 0 6px 0",
                        }}
                        className="mp-card-meta"
                      >
                        Asal: {item.asalIkan}
                      </p>
                      <div style={styles.priceRow}>
                        <div style={styles.priceBlock}>
                          <span style={styles.price} className="mp-card-price">{item.hargaPerKilo}</span>
                          <span style={styles.priceSatuan} className="mp-card-price-satuan">/ Kg</span>
                        </div>
                        <button
                          style={styles.beliBtn}
                          className="mp-card-btn"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "linear-gradient(135deg, #14b8a6, #0d9488)";
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "linear-gradient(135deg, #0d9488, #0f766e)";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TooltipProvider>
      </div>

      {/* ── Ocean Floor Decorations ── */}
      <div style={styles.oceanFloor}>
        <FishSchool />
        <Seashell />
        <SeaweedLeft />
        <BubbleGroup />
      </div>

      {/* Inline CSS for responsive + animations */}
      <style>{`
        @keyframes mp-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes mp-swim {
          0% { transform: translateX(0); }
          100% { transform: translateX(30px); }
        }

        /* Search icon positioning fix */
        [data-slot="mp-search-icon"] {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: rgba(120, 200, 220, 0.6);
          pointer-events: none;
        }

        /* Responsive grid */
        .mp-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
        }

        @media (max-width: 1200px) {
          .mp-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .mp-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }

        /* Mobile adjustments for Android & iOS */
        @media (max-width: 640px) {
          /* Enforce main section to never exceed screen width */
          section {
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }

          .mp-container {
            padding: 32px 16px 100px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          .mp-title {
            font-size: 24px !important;
          }
          .mp-subtitle {
            font-size: 13.5px !important;
          }
          .mp-tab-nav {
            justify-content: space-between !important;
            gap: 4px !important;
            margin-bottom: 20px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .mp-tab-btn {
            padding: 8px 4px !important;
            font-size: 11px !important;
            flex: 1 1 0% !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 2px !important;
            min-width: 0 !important;          /* Allow button to shrink */
            white-space: normal !important;   /* Let text wrap */
            word-break: break-word !important; /* Wrap long words */
            line-height: 1.25 !important;
          }

          /* Card layout overrides for mobile (2 columns) */
          .mp-card {
            box-sizing: border-box !important;
            width: 100% !important;
          }
          .mp-card-body {
            padding: 12px 10px 14px !important;
            box-sizing: border-box !important;
          }
          .mp-card-title {
            font-size: 13.5px !important;
            margin-bottom: 8px !important;
            line-height: 1.4 !important;
          }
          .mp-card-price {
            font-size: 14px !important;
          }
          .mp-card-price-satuan {
            font-size: 11px !important;
          }
          .mp-card-btn {
            padding: 5px 10px !important;
            font-size: 11px !important;
            border-radius: 6px !important;
          }
          .mp-card-badge {
            font-size: 9px !important;
            padding: 2px 6px !important;
            margin-bottom: 6px !important;
          }
          .mp-card-img {
            height: 130px !important;
          }
          .mp-card-meta {
            font-size: 11px !important;
            margin-bottom: 4px !important;
          }
        }

        @media (max-width: 360px) {
          .mp-tab-btn {
            font-size: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}