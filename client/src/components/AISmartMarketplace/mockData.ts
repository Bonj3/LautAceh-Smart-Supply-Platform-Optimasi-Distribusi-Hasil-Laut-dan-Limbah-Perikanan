/* ──────────────────────────────────────────────
   AI Smart Marketplace — Mock Data & AI Logic
   ────────────────────────────────────────────── */

import type {
  ProductRecommendation,
  SuggestionItem,
  ChatMessage,
} from "./types";

/* ── Default suggestion cards (welcome screen) ── */

export const defaultSuggestions: SuggestionItem[] = [
  {
    emoji: "🐟",
    label: "Saya mencari ikan segar",
    prompt: "Saya mencari ikan segar untuk dibeli",
  },
  {
    emoji: "🍤",
    label: "Saya ingin seafood untuk restoran",
    prompt: "Saya ingin membeli seafood dalam jumlah besar untuk restoran saya",
  },
  {
    emoji: "🍽",
    label: "Saya ingin memasak untuk keluarga",
    prompt: "Saya ingin memasak hidangan laut untuk keluarga 5 orang",
  },
  {
    emoji: "♻️",
    label: "Saya ingin melihat produk ekonomi sirkular",
    prompt:
      "Saya ingin melihat produk ekonomi sirkular dari limbah perikanan",
  },
  {
    emoji: "📦",
    label: "Saya mencari produk olahan",
    prompt: "Saya mencari produk olahan ikan seperti bakso ikan atau nugget",
  },
  {
    emoji: "💡",
    label: "Berikan rekomendasi untuk saya",
    prompt: "Berikan rekomendasi produk terbaik untuk saya",
  },
];

/* ── Mock product catalogue ── */

const freshProducts: ProductRecommendation[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    name: "Fillet Tuna Super Premium",
    price: "Rp 125.000",
    seller: "Nelayan Sabang",
    location: "Sabang, Aceh",
    freshness: "Sangat Segar",
    stock: 45,
    rating: 4.9,
    unit: "Kg",
    reason:
      "Tuna premium tangkapan langsung dari laut Sabang, cocok untuk sashimi dan ikan bakar berkualitas restoran.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80",
    name: "Ikan Kembung Banjar Segar",
    price: "Rp 45.000",
    seller: "KUB Bahari Jaya",
    location: "Banda Aceh",
    freshness: "Segar",
    stock: 120,
    rating: 4.7,
    unit: "Kg",
    reason:
      "Pilihan ekonomis untuk masakan sehari-hari. Kaya omega-3, cocok untuk digoreng atau dipindang.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    name: "Kakap Merah Utuh (800g+)",
    price: "Rp 88.000",
    seller: "PT Laut Nusantara",
    location: "Lhokseumawe, Aceh",
    freshness: "Sangat Segar",
    stock: 30,
    rating: 4.8,
    unit: "Ekor",
    reason:
      "Kakap merah berukuran besar, sangat cocok untuk hidangan spesial keluarga seperti kakap bakar atau steam.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80",
    name: "Udang Vaname Jumbo",
    price: "Rp 110.000",
    seller: "Tambak Aceh Besar",
    location: "Aceh Besar",
    freshness: "Sangat Segar",
    stock: 60,
    rating: 4.9,
    unit: "Kg",
    reason:
      "Udang jumbo size 20-30 per kg, tekstur kenyal dan manis. Favorit untuk udang bakar dan udang saus tiram.",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80",
    name: "Ikan Tongkol Segar",
    price: "Rp 35.000",
    seller: "Nelayan Meulaboh",
    location: "Meulaboh, Aceh Barat",
    freshness: "Segar",
    stock: 200,
    rating: 4.5,
    unit: "Kg",
    reason:
      "Tongkol segar harga terjangkau, bisa diolah menjadi berbagai masakan dari tongkol balado hingga pindang.",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=600&q=80",
    name: "Cumi-Cumi Segar Pilihan",
    price: "Rp 75.000",
    seller: "KUB Nelayan Mandiri",
    location: "Sigli, Pidie",
    freshness: "Segar",
    stock: 55,
    rating: 4.6,
    unit: "Kg",
    reason:
      "Cumi-cumi segar kualitas pilihan, ideal untuk cumi goreng tepung, cumi bakar, atau seafood platter.",
  },
];

const wholesaleProducts: ProductRecommendation[] = [
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    name: "Ikan Tongkol Segar (Box 20Kg)",
    price: "Rp 40.000",
    seller: "UD Samudra Aceh",
    location: "Banda Aceh",
    freshness: "Segar",
    stock: 500,
    rating: 4.6,
    unit: "Kg",
    reason:
      "Harga grosir langsung dari TPI, minimum order 20 Kg. Cocok untuk kebutuhan restoran dan katering harian.",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80",
    name: "Ikan Kembung Curah (50Kg)",
    price: "Rp 15.000",
    seller: "CV Bahari Sentosa",
    location: "Banda Aceh",
    freshness: "Segar",
    stock: 1000,
    rating: 4.4,
    unit: "Kg",
    reason:
      "Surplus hasil tangkapan harian, harga sangat ekonomis untuk industri olahan atau katering besar.",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    name: "Ikan Tuna Potong B2B",
    price: "Rp 55.000",
    seller: "PT Indo Marine",
    location: "Sabang, Aceh",
    freshness: "Sangat Segar",
    stock: 300,
    rating: 4.8,
    unit: "Kg",
    reason:
      "Grade ekspor, sudah dipotong fillet siap pakai. Ideal untuk restoran Jepang, hotel, dan supermarket.",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80",
    name: "Udang Windu Premium (Box)",
    price: "Rp 85.000",
    seller: "Tambak Jaya Aceh",
    location: "Aceh Besar",
    freshness: "Sangat Segar",
    stock: 150,
    rating: 4.7,
    unit: "Kg",
    reason:
      "Udang windu black tiger premium, size 15-20/kg. Supply konsisten untuk hotel dan restoran seafood.",
  },
];

const circularProducts: ProductRecommendation[] = [
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=600&q=80",
    name: "Kolagen Sisik Ikan Kakap",
    price: "Rp 180.000",
    seller: "PT EcoMarine Indonesia",
    location: "Banda Aceh",
    freshness: "Olahan",
    stock: 80,
    rating: 4.8,
    unit: "100g",
    reason:
      "Kolagen alami dari sisik ikan kakap, mendukung ekonomi sirkular. Digunakan untuk suplemen kecantikan dan kesehatan sendi.",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    name: "Tepung Tulang Ikan (Bone Meal)",
    price: "Rp 25.000",
    seller: "CV Limbah Berdaya",
    location: "Lhokseumawe, Aceh",
    freshness: "Olahan",
    stock: 200,
    rating: 4.5,
    unit: "Kg",
    reason:
      "Pupuk organik kaya kalsium dan fosfor dari tulang ikan. Mendukung pertanian berkelanjutan dan mengurangi limbah laut.",
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    name: "Minyak Ikan Murni (Fish Oil)",
    price: "Rp 95.000",
    seller: "PT Omega Aceh",
    location: "Sabang, Aceh",
    freshness: "Olahan",
    stock: 100,
    rating: 4.7,
    unit: "250ml",
    reason:
      "Minyak ikan omega-3 diekstrak dari limbah pengolahan tuna. Produk bernilai tinggi dari bahan yang biasanya terbuang.",
  },
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80",
    name: "Pupuk Organik Limbah Ikan",
    price: "Rp 15.000",
    seller: "Koperasi Hijau Laut",
    location: "Meulaboh, Aceh Barat",
    freshness: "Olahan",
    stock: 500,
    rating: 4.3,
    unit: "Kg",
    reason:
      "Pupuk organik fermentasi dari sisa olahan ikan. Ramah lingkungan, kaya nitrogen, cocok untuk tanaman pangan.",
  },
];

const processedProducts: ProductRecommendation[] = [
  {
    id: 15,
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80",
    name: "Bakso Ikan Tuna Premium",
    price: "Rp 55.000",
    seller: "UMKM Rasa Laut",
    location: "Banda Aceh",
    freshness: "Olahan",
    stock: 75,
    rating: 4.6,
    unit: "500g",
    reason:
      "Bakso ikan dari 100% daging tuna asli, tanpa pengawet. Praktis untuk masakan sehari-hari keluarga.",
  },
  {
    id: 16,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    name: "Nugget Ikan Tongkol",
    price: "Rp 42.000",
    seller: "CV Olahan Bahari",
    location: "Sigli, Pidie",
    freshness: "Beku",
    stock: 90,
    rating: 4.4,
    unit: "400g",
    reason:
      "Nugget ikan tanpa MSG, cocok untuk bekal anak sekolah dan menu praktis keluarga.",
  },
];

/* ── Follow-up suggestion sets ── */

const followUpFresh: SuggestionItem[] = [
  { emoji: "🔥", label: "Untuk ikan bakar", prompt: "Ikan apa yang paling cocok untuk dibakar?" },
  { emoji: "🍳", label: "Untuk digoreng", prompt: "Rekomendasi ikan segar yang enak digoreng" },
  { emoji: "👨‍👩‍👧‍👦", label: "Untuk 5 orang", prompt: "Saya butuh ikan segar untuk memasak buat 5 orang" },
];

const followUpRestaurant: SuggestionItem[] = [
  { emoji: "📋", label: "Lihat paket restoran", prompt: "Ada paket bulk khusus restoran?" },
  { emoji: "🚚", label: "Info pengiriman", prompt: "Bagaimana pengiriman untuk order restoran?" },
  { emoji: "💰", label: "Budget di bawah 1 juta", prompt: "Rekomendasi seafood restoran budget di bawah 1 juta" },
];

const followUpCircular: SuggestionItem[] = [
  { emoji: "🌱", label: "Untuk pertanian", prompt: "Produk limbah ikan yang cocok untuk pupuk pertanian" },
  { emoji: "💊", label: "Untuk suplemen", prompt: "Produk kolagen atau minyak ikan untuk suplemen kesehatan" },
  { emoji: "🏭", label: "Untuk industri", prompt: "Limbah ikan untuk kebutuhan industri skala besar" },
];

const followUpGeneral: SuggestionItem[] = [
  { emoji: "🐟", label: "Lihat ikan segar", prompt: "Tampilkan ikan segar terbaik" },
  { emoji: "♻️", label: "Produk sirkular", prompt: "Saya ingin lihat produk ekonomi sirkular" },
  { emoji: "💰", label: "Harga terjangkau", prompt: "Rekomendasi produk dengan harga terjangkau" },
];

/* ── Mock AI response generator ── */

interface MockAIResponse {
  text: string;
  recommendations: ProductRecommendation[];
  followUpSuggestions: SuggestionItem[];
}

export function generateMockResponse(message: string): MockAIResponse {
  const lower = message.toLowerCase();

  // ── Circular economy / limbah ──
  if (
    lower.includes("sirkular") ||
    lower.includes("limbah") ||
    lower.includes("daur ulang") ||
    lower.includes("kolagen") ||
    lower.includes("bone meal") ||
    lower.includes("pupuk") ||
    lower.includes("minyak ikan") ||
    lower.includes("fish oil")
  ) {
    return {
      text: "Berikut produk ekonomi sirkular dari limbah perikanan yang tersedia. Setiap pembelian Anda mendukung pengurangan limbah laut dan mendorong keberlanjutan lingkungan! 🌊♻️",
      recommendations: circularProducts,
      followUpSuggestions: followUpCircular,
    };
  }

  // ── Restaurant / hotel / bulk ──
  if (
    lower.includes("restoran") ||
    lower.includes("restaurant") ||
    lower.includes("hotel") ||
    lower.includes("katering") ||
    lower.includes("catering") ||
    lower.includes("bulk") ||
    lower.includes("grosir") ||
    lower.includes("jumlah besar")
  ) {
    return {
      text: "Untuk kebutuhan restoran dan hotel, berikut produk grosir dengan supply konsisten dan harga kompetitif. Semua produk tersedia dalam jumlah besar dengan pengiriman terjadwal. 🍽️",
      recommendations: wholesaleProducts,
      followUpSuggestions: followUpRestaurant,
    };
  }

  // ── Olahan / processed ──
  if (
    lower.includes("olahan") ||
    lower.includes("bakso") ||
    lower.includes("nugget") ||
    lower.includes("praktis") ||
    lower.includes("beku") ||
    lower.includes("frozen")
  ) {
    return {
      text: "Berikut produk olahan ikan berkualitas, dibuat dari bahan segar tanpa pengawet berbahaya. Praktis untuk kebutuhan sehari-hari! 📦",
      recommendations: processedProducts,
      followUpSuggestions: followUpGeneral,
    };
  }

  // ── Family cooking ──
  if (
    lower.includes("keluarga") ||
    lower.includes("masak") ||
    lower.includes("rumah") ||
    lower.includes("orang") ||
    lower.includes("bakar") ||
    lower.includes("goreng") ||
    lower.includes("steam")
  ) {
    const familyPicks = [freshProducts[2], freshProducts[1], freshProducts[4]];
    return {
      text: "Untuk masakan keluarga, saya rekomendasikan produk-produk ini berdasarkan kualitas, harga, dan kemudahan pengolahan. Semua langsung dari nelayan lokal Aceh! 👨‍👩‍👧‍👦",
      recommendations: familyPicks,
      followUpSuggestions: followUpFresh,
    };
  }

  // ── Fresh fish (default seafood search) ──
  if (
    lower.includes("ikan") ||
    lower.includes("segar") ||
    lower.includes("tuna") ||
    lower.includes("udang") ||
    lower.includes("cumi") ||
    lower.includes("kakap") ||
    lower.includes("tongkol") ||
    lower.includes("seafood") ||
    lower.includes("laut")
  ) {
    return {
      text: "Berikut pilihan ikan dan seafood segar terbaik dari perairan Aceh. Semua produk dijamin kesegarannya langsung dari nelayan! 🐟",
      recommendations: freshProducts.slice(0, 4),
      followUpSuggestions: followUpFresh,
    };
  }

  // ── Budget / harga ──
  if (
    lower.includes("murah") ||
    lower.includes("terjangkau") ||
    lower.includes("budget") ||
    lower.includes("hemat") ||
    lower.includes("ekonomis")
  ) {
    const budgetPicks = [freshProducts[1], freshProducts[4], processedProducts[1]];
    return {
      text: "Berikut produk berkualitas dengan harga terjangkau. Tetap segar dan bergizi tanpa harus mahal! 💰",
      recommendations: budgetPicks,
      followUpSuggestions: followUpGeneral,
    };
  }

  // ── Rekomendasi umum / general ──
  if (
    lower.includes("rekomendasi") ||
    lower.includes("terbaik") ||
    lower.includes("populer") ||
    lower.includes("favorit")
  ) {
    const topPicks = [freshProducts[0], freshProducts[3], wholesaleProducts[2], circularProducts[0]];
    return {
      text: "Berikut rekomendasi produk terpopuler di SirkuLaut minggu ini! Dari ikan segar premium hingga produk ekonomi sirkular. 🌟",
      recommendations: topPicks,
      followUpSuggestions: followUpGeneral,
    };
  }

  // ── Industry / industrial ──
  if (
    lower.includes("industri") ||
    lower.includes("pabrik") ||
    lower.includes("ton") ||
    lower.includes("ekspor")
  ) {
    return {
      text: "Untuk kebutuhan industri, kami menyediakan supply dalam skala besar dengan kontrak jangka panjang. Berikut produk yang tersedia: 🏭",
      recommendations: [...wholesaleProducts.slice(0, 2), ...circularProducts.slice(1, 3)],
      followUpSuggestions: followUpCircular,
    };
  }

  // ── Fallback — ask follow-up questions ──
  return {
    text: "Terima kasih atas pertanyaan Anda! Untuk memberikan rekomendasi yang lebih tepat, boleh saya tahu:\n\n• Anda ingin memasak untuk berapa orang?\n• Preferensi ikan segar atau beku?\n• Ada budget tertentu?\n• Untuk konsumsi rumah, restoran, atau industri?\n\nAtau Anda bisa pilih salah satu opsi di bawah ini:",
    recommendations: [],
    followUpSuggestions: [
      { emoji: "🐟", label: "Ikan segar", prompt: "Tampilkan ikan segar terbaik" },
      { emoji: "🍤", label: "Seafood restoran", prompt: "Seafood untuk restoran" },
      { emoji: "♻️", label: "Ekonomi sirkular", prompt: "Produk ekonomi sirkular" },
      { emoji: "📦", label: "Produk olahan", prompt: "Produk olahan ikan" },
    ],
  };
}
