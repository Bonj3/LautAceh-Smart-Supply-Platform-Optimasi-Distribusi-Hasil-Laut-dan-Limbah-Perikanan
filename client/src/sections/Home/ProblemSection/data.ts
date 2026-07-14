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
  { label: "Nelayan" },
  { label: "Pengepul" },
  { label: "Pasar" },
  { label: "Restoran" },
  { label: "Pabrik" }
];
