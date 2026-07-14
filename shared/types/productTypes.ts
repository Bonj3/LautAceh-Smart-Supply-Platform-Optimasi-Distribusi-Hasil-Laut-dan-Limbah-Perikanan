/* ──────────────────────────────────────────────
   Shared Product Types
   Used by both server and client
   ────────────────────────────────────────────── */

/** Tier harga berdasarkan jumlah pembelian */
export interface PriceTier {
  /** Label deskriptif */
  label: string;
  /** Batas bawah dalam kg (inklusif) */
  minKg: number;
  /** Batas atas dalam kg (inklusif) */
  maxKg: number;
  /** Harga per kg dalam Rupiah */
  hargaPerKg: number;
}

/** Jenis ikan yang tersedia */
export type JenisIkan =
  | "Tuna"
  | "Udang"
  | "Cumi"
  | "Tongkol"
  | "Kakap Merah"
  | "Kembung"
  | "Cakalang"
  | "Tenggiri"
  | "Sarden";

/** Status produk */
export type ProductStatus = "draft" | "dijual" | "selesai";

/** Durasi jual yang tersedia (dalam jam) */
export type DurasiJual = 5 | 8 | 12 | 24;

/** Model produk utama */
export interface Product {
  id: string;
  jenisIkan: JenisIkan;
  namaJudul: string;
  /** Tiers harga: eceran (250g-1kg), normal (1-10kg), grosir (10-100kg) */
  hargaTiers: PriceTier[];
  stokKilo: number;
  beratMinimal: number; // default 0.25 (250 gram)
  gambarUrl: string;
  status: ProductStatus;
  waktuMulaiJual?: string; // ISO timestamp
  durasiJualJam: DurasiJual;
  penjualId: string;
  createdAt: string;
}

/** Data yang dikirim saat membuat / update produk */
export interface ProductInput {
  jenisIkan: JenisIkan;
  namaJudul: string;
  hargaTiers: PriceTier[];
  stokKilo: number;
  gambarUrl: string;
  durasiJualJam: DurasiJual;
  status: "draft" | "dijual";
}

/** Harga default per jenis ikan (placeholder — akan diisi harga pasar real-time) */
export const DEFAULT_PRICE_TIERS: Record<JenisIkan, PriceTier[]> = {
  Tuna: [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 150000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 125000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 100000 },
  ],
  Udang: [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 135000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 110000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 90000 },
  ],
  Cumi: [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 95000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 75000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 60000 },
  ],
  Tongkol: [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 45000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 35000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 28000 },
  ],
  "Kakap Merah": [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 110000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 88000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 72000 },
  ],
  Kembung: [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 55000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 45000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 35000 },
  ],
  Cakalang: [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 40000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 28000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 22000 },
  ],
  Tenggiri: [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 85000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 65000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 52000 },
  ],
  Sarden: [
    { label: "Eceran (250g–1kg)", minKg: 0.25, maxKg: 1, hargaPerKg: 35000 },
    { label: "Normal (1–10kg)", minKg: 1, maxKg: 10, hargaPerKg: 25000 },
    { label: "Grosir (10–100kg)", minKg: 10, maxKg: 100, hargaPerKg: 18000 },
  ],
};

/** Template gambar default per jenis ikan (placeholder URLs — nanti diganti assets) */
export const TEMPLATE_IMAGES: Record<JenisIkan, string> = {
  Tuna: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  Udang: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80",
  Cumi: "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=600&q=80",
  Tongkol: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80",
  "Kakap Merah": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
  Kembung: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80",
  Cakalang: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  Tenggiri: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  Sarden: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80",
};

/** Template judul yang disarankan per jenis ikan (untuk auto-fill) */
export const TITLE_SUGGESTIONS: Record<JenisIkan, string[]> = {
  Tuna: [
    "Fillet Tuna Super Premium",
    "Tuna Segar Langsung dari Laut",
    "Ikan Tuna Utuh Pilihan",
    "Tuna Sirip Kuning Grade A",
  ],
  Udang: [
    "Udang Vaname Jumbo Segar",
    "Udang Windu Premium",
    "Udang Segar Tangkapan Hari Ini",
    "Udang Galah Pilihan",
  ],
  Cumi: [
    "Cumi-Cumi Segar Pilihan",
    "Cumi Utuh Ukuran Besar",
    "Cumi-Cumi Premium Aceh",
    "Sotong Segar Tangkapan Baru",
  ],
  Tongkol: [
    "Ikan Tongkol Segar",
    "Tongkol Abu-Abu Pilihan",
    "Tongkol Utuh Baru Tiba",
    "Ikan Tongkol Tangkapan Nelayan",
  ],
  "Kakap Merah": [
    "Kakap Merah Utuh Premium",
    "Ikan Kakap Merah Segar",
    "Kakap Merah Grade A",
    "Fillet Kakap Merah Pilihan",
  ],
  Kembung: [
    "Ikan Kembung Banjar Segar",
    "Kembung Segar Tangkapan Baru",
    "Ikan Kembung Utuh Pilihan",
    "Kembung Lelaki Segar",
  ],
  Cakalang: [
    "Ikan Cakalang Utuh",
    "Cakalang Segar Aceh",
    "Cakalang Tangkapan Hari Ini",
    "Ikan Cakalang Premium",
  ],
  Tenggiri: [
    "Ikan Tenggiri Potong Premium",
    "Tenggiri Segar Utuh",
    "Fillet Tenggiri Pilihan",
    "Ikan Tenggiri Batang Segar",
  ],
  Sarden: [
    "Ikan Sarden Segar",
    "Sarden Tangkapan Nelayan",
    "Lemuru Segar Pilihan",
    "Ikan Sarden Utuh Segar",
  ],
};
