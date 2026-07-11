import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryGrid, CategoryItem } from "@/components/ui/CategoryGrid";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FISH_CATEGORIES: CategoryItem[] = [
  { id: "tuna", label: "Ikan Tuna", queryFilter: "tuna", imageUrl: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500&q=80" },
  { id: "cumi", label: "Cumi-cumi", queryFilter: "cumi", imageUrl: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=500&q=80" },
  { id: "udang", label: "Udang", queryFilter: "udang", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&q=80" },
  { id: "sarden", label: "Ikan Sarden", queryFilter: "sarden", imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6d4ce4?w=500&q=80" },
  { id: "tongkol", label: "Ikan Tongkol", queryFilter: "tongkol", imageUrl: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500&q=80" }, // Using generic fish
  { id: "kerapu", label: "Ikan Kerapu", queryFilter: "kerapu", imageUrl: "https://images.unsplash.com/photo-1596557608151-5121b6416ba3?w=500&q=80" },
  { id: "kakap", label: "Ikan Kakap", queryFilter: "kakap", imageUrl: "https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?w=500&q=80" },
  { id: "kepiting", label: "Kepiting", queryFilter: "kepiting", imageUrl: "https://images.unsplash.com/photo-1611756535515-bbbd0f979857?w=500&q=80" },
  { id: "kerang", label: "Kerang", queryFilter: "kerang", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80" },
  { id: "bandeng", label: "Ikan Bandeng", queryFilter: "bandeng", imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6d4ce4?w=500&q=80" }, // Using generic fish
];

export default function Category() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        scrollBehavior: "smooth",
        background: "#f4f7f6", // Light background to make the white grid pop out
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <main className="pt-28 pb-16 flex-grow px-4 md:px-8 relative max-w-7xl mx-auto w-full">
        {/* ── Marine Themed Back Button ── */}
        <button
          onClick={() => navigate("/portal")}
          className="absolute top-24 left-4 md:left-8 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-[#0b4553] hover:border-[#5de8d4] hover:shadow-[0_0_15px_rgba(93,232,212,0.2)] transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Kembali</span>
        </button>

        <div className="mt-14 bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-wide">
              KATEGORI Ikan Fresh
            </h1>
          </div>
          
          <CategoryGrid categories={FISH_CATEGORIES} />
        </div>
      </main>

      <Footer />
    </div>
  );
}