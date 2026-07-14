import { Fish, Package, Building, Utensils, Network, Sprout, Leaf, Waves, Truck } from "lucide-react";

export const STORY_DATA = {
  intro: {
    headline: "Mengapa PasaiEungkot Dibutuhkan?",
    supporting: "Setiap hasil tangkapan laut memulai perjalanan panjang dari laut hingga ke tangan konsumen. Namun di sepanjang perjalanan tersebut masih terdapat berbagai tantangan yang mengurangi nilai ekonomi dan menciptakan limbah yang sebenarnya dapat dimanfaatkan."
  },
  scenes: [
    {
      id: "scene-2-price",
      title: "Harga Belum Transparan",
      description: "Banyak nelayan masih bergantung pada tengkulak sehingga harga jual ikan tidak selalu mencerminkan nilai pasar yang sebenarnya."
    },
    {
      id: "scene-3-logistics",
      title: "Distribusi Belum Efisien",
      description: "Restoran, hotel, dan pelaku usaha membutuhkan pasokan yang stabil, namun distribusi yang masih manual menyebabkan keterlambatan dan ketidakpastian stok."
    },
    {
      id: "scene-4-supply",
      title: "Rantai Pasok Terfragmentasi",
      description: "Informasi stok, permintaan, dan distribusi masih berjalan sendiri-sendiri sehingga banyak peluang penjualan hilang."
    },
    {
      id: "scene-5-waste",
      title: "Potensi Belum Dimanfaatkan",
      description: "Bagian hasil ikan seperti kepala, tulang, kulit, dan sisik masih sering terbuang, padahal memiliki nilai ekonomi tinggi sebagai bahan baku produk sirkular."
    }
  ],
  outro: {
    headline: "Kini Semua Terhubung",
    supporting: "SirkuLaut menghadirkan satu platform digital yang menghubungkan seluruh ekosistem perikanan Aceh secara transparan, efisien, dan berkelanjutan.",
    benefits: [
      "Transparent Pricing",
      "Digital Distribution",
      "Integrated Supply Chain",
      "Circular Economy"
    ],
    tagline: "Dari Laut ke Meja, Tanpa Sisa."
  }
};

export const SCENE_ASSETS = {
  boat: "",
  truck: "",
  warehouse: "",
  restaurant: "",
  hubLogo: ""
};

export const HUB_NODES = [
  { label: "Nelayan", angle: 0, icon: "🎣" },
  { label: "Pengepul", angle: 72, icon: "📦" },
  { label: "Pasar", angle: 144, icon: "🏪" },
  { label: "Restoran", angle: 216, icon: "🍽️" },
  { label: "Pabrik", angle: 288, icon: "🏭" }
];

export const TIMELINE = {
  ocean: [0, 0.1, 0.9, 1.0],
  waves: [0, 0.1, 0.9, 1.0],
  sun: [0, 0.1, 0.9, 1.0],
  bubbles: [0, 0.1, 0.9, 1.0],
  route: [0.1, 0.2, 0.9, 1.0],
  boat: [0.1, 0.3, 0.4, 0.5],
  truck: [0.2, 0.4, 0.5, 0.6],
  warehouse: [0.4, 0.6, 0.7, 0.8],
  restaurant: [0.6, 0.8, 0.9, 1.0],
  network: [0.5, 0.7, 0.9, 1.0],
  skeleton: [0.6, 0.7, 0.8, 0.9],
  hub: [0.8, 0.9, 1.0, 1.1]
};

export const STAGES = [
  {
    title: "Harga Belum Transparan",
    desc: "Banyak nelayan masih bergantung pada tengkulak.",
    bg: "rgba(15,76,129,0.08)",
    color: "#0F4C81",
    border: "rgba(15,76,129,0.14)",
    badge: "Tahap 1",
  },
  {
    title: "Distribusi Belum Efisien",
    desc: "Distribusi manual menyebabkan keterlambatan.",
    bg: "rgba(15,76,129,0.08)",
    color: "#0F4C81",
    border: "rgba(15,76,129,0.14)",
    badge: "Tahap 2",
  },
  {
    title: "Rantai Pasok Terfragmentasi",
    desc: "Informasi masih berjalan sendiri-sendiri.",
    bg: "rgba(15,76,129,0.08)",
    color: "#0F4C81",
    border: "rgba(15,76,129,0.14)",
    badge: "Tahap 3",
  },
  {
    title: "Potensi Belum Dimanfaatkan",
    desc: "Limbah ikan sering terbuang.",
    bg: "rgba(15,76,129,0.08)",
    color: "#0F4C81",
    border: "rgba(15,76,129,0.14)",
    badge: "Tahap 4",
  }
];

export const SUCCESS = [
  { icon: "💰", text: "Transparent Pricing" },
  { icon: "🚚", text: "Digital Distribution" },
  { icon: "🔗", text: "Integrated Supply Chain" },
  { icon: "♻️", text: "Circular Economy" }
];

export const PROGRESS_MILESTONES = [
  { cx: 10, cy: 40, thresh: 0.1 },
  { cx: 96, cy: 14, thresh: 0.3 },
  { cx: 240, cy: 28, thresh: 0.5 },
  { cx: 392, cy: 42, thresh: 0.7 },
  { cx: 470, cy: 18, thresh: 0.9 }
];

export const BG_KEYFRAMES = [
  { p: 0, t: "#E0F2FE", b: "#BAE6FD" },
  { p: 0.5, t: "#BAE6FD", b: "#7DD3FC" },
  { p: 1, t: "#7DD3FC", b: "#38BDF8" }
];
