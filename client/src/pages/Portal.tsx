import { PortalCard } from "@/components/ui/PortalCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function Portal() {
    const navigate = useNavigate();

    return (
        <div
            className="relative overflow-hidden"
            style={{
                fontFamily: "Poppins, sans-serif",
                scrollBehavior: "smooth",
                background: "linear-gradient(155deg, #022c35 0%, #055a6e 35%, #0e96b0 70%, #3CC8D8 100%)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* ── Ocean background image (from HeroSection) ── */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1530053969600-caed2596d242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                }}
            />

            {/* ── Radial glow overlay (from HeroSection) ── */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(60,200,216,0.18) 0%, transparent 70%)",
                }}
            />

            {/* ── Marine Themed Back Button ── */}
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 md:top-10 md:left-10 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a2e3c]/60 hover:bg-[#0d3d4e]/80 border border-[#5de8d4]/20 hover:border-[#5de8d4]/50 backdrop-blur-md text-[#5de8d4] font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(93,232,212,0.3)] group"
            >
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Kembali</span>
            </button>

            <main className="pt-24 pb-16 flex-grow flex flex-col justify-center items-center px-4 relative z-10">
                <div className="text-center mb-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
                    >
                        Pilih Kategori Anda
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-white/80 max-w-2xl mx-auto"
                    >
                        Silakan pilih jenis produk yang Anda cari untuk melanjutkan ke Marketplace kami.
                    </motion.p>
                </div>

                <div className="group/netflix grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full max-w-4xl mx-auto px-6 sm:px-8">
                    <PortalCard
                        title="Ikan Fresh"
                        tooltipType="fresh"
                        imageSrc="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
                        rotateDirection="cw"
                        onClick={() => navigate("/category")}
                        animationDelay={0.1}
                    />
                    <PortalCard
                        title="Bahan Baku Industri"
                        tooltipType="industri"
                        imageSrc="https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=800&q=80"
                        rotateDirection="ccw"
                        onClick={() => navigate("/marketplace?tab=industri")}
                        animationDelay={0.2}
                    />
                </div>
            </main>
        </div>
    );
}