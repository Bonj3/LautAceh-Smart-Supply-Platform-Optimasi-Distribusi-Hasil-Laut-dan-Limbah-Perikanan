import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Store,
    ShoppingBag,
    FileText,
    AlertTriangle,
    Fish,
    Package,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Navbar } from "../components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SellerProductForm } from "@/components/ui/seller/SellerProductForm";
import { SellerProductCard } from "@/components/ui/seller/SellerProductCard";
import type { Product, ProductInput } from "@lautaceh/shared";

/* ──────────────────────────────────────────────
   API Layer
   ────────────────────────────────────────────── */

const API_BASE = "http://localhost:5000/api/products";

async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch(API_BASE);
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

async function apiCreateProduct(input: ProductInput): Promise<Product | null> {
    try {
        const res = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });
        const json = await res.json();
        return json.data || null;
    } catch {
        return null;
    }
}

async function apiUpdateProduct(
    id: string,
    input: Partial<ProductInput>
): Promise<Product | null> {
    try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });
        const json = await res.json();
        return json.data || null;
    } catch {
        return null;
    }
}

async function apiDeleteProduct(id: string): Promise<boolean> {
    try {
        await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        return true;
    } catch {
        return false;
    }
}

async function apiPublishProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${API_BASE}/${id}/publish`, { method: "PATCH" });
        const json = await res.json();
        return json.data || null;
    } catch {
        return null;
    }
}

async function apiWithdrawProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${API_BASE}/${id}/withdraw`, { method: "PATCH" });
        const json = await res.json();
        return json.data || null;
    } catch {
        return null;
    }
}

/* ──────────────────────────────────────────────
   Main Page Component
   ────────────────────────────────────────────── */

export default function Penjual() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("dijual");

    // Dialog states
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showLimbahPopup, setShowLimbahPopup] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
        null
    );

    // Load products
    const loadProducts = useCallback(async () => {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Filter products by tab
    const dijualProducts = products.filter((p) => p.status === "dijual");
    const draftProducts = products.filter(
        (p) => p.status === "draft" || p.status === "selesai"
    );

    // Handlers
    const handleCreateOrUpdate = async (input: ProductInput) => {
        if (editingProduct) {
            await apiUpdateProduct(editingProduct.id, input);
        } else {
            await apiCreateProduct(input);
        }
        setShowForm(false);
        setEditingProduct(null);
        await loadProducts();
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        await apiDeleteProduct(id);
        setShowDeleteConfirm(null);
        await loadProducts();
    };

    const handlePublish = async (id: string) => {
        await apiPublishProduct(id);
        await loadProducts();
    };

    const handleWithdraw = async (id: string) => {
        await apiWithdrawProduct(id);
        await loadProducts();
    };

    const handleExpired = async (id: string) => {
        // Refresh to get updated status from server
        await loadProducts();
    };

    return (
        <div className="min-h-screen pt-[78px] text-white" style={{ fontFamily: "Inter, Poppins, sans-serif", background: "#0b4553" }}>
            <Navbar />
            
            {/* ── Header Section ── */}
            <header className="relative py-12 overflow-hidden bg-[#0d2b31]/40 border-b border-white/10 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 shadow-[0_4px_20px_rgba(60,200,216,0.3)]">
                            <Store className="w-8 h-8 text-[#3CC8D8]" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-3 tracking-wide">
                            Selamat datang Penjual
                        </h1>
                        <p className="text-teal-50 max-w-lg mb-8 text-sm sm:text-base leading-relaxed opacity-90">
                            Kelola inventaris ikan segar Anda, pantau statistik penjualan, dan jangkau lebih banyak pembeli di seluruh ekosistem PasaiEungkot.
                        </p>
                        
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    setEditingProduct(null);
                                    setShowForm(true);
                                }}
                                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-[#3CC8D8]/50 text-white font-bold tracking-wide transition-all duration-300 hover:bg-[#3CC8D8]/20 hover:border-[#3CC8D8] hover:shadow-[0_0_30px_rgba(60,200,216,0.6)] hover:-translate-y-1 overflow-hidden"
                            >
                                <Plus className="w-5 h-5 text-[#3CC8D8] group-hover:text-white transition-colors" />
                                Jual Produk
                            </button>
                        </div>
                    </div>
                    
                    {/* Jual Limbah Button */}
                    <div className="absolute bottom-0 right-4 sm:right-6 lg:right-8">
                        <button
                            onClick={() => setShowLimbahPopup(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl border border-b-0 border-[#3CC8D8]/30 bg-[#0E7C8E]/40 backdrop-blur-md text-teal-100 text-sm font-medium hover:bg-[#0E7C8E]/60 hover:text-white transition-colors shadow-sm"
                        >
                            <Package className="w-4 h-4" />
                            Jual Limbah
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Stats Bar ── */}
            <div className="bg-[#0b4553] border-b border-white/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <ShoppingBag className="w-8 h-8 text-[#3CC8D8]" />
                            <div>
                                <p className="text-2xl font-bold text-white">
                                    {dijualProducts.length}
                                </p>
                                <p className="text-xs text-teal-100/80">Sedang Dijual</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <FileText className="w-8 h-8 text-teal-200/70" />
                            <div>
                                <p className="text-2xl font-bold text-white">
                                    {draftProducts.length}
                                </p>
                                <p className="text-xs text-teal-100/80">Draft & Selesai</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Fish className="w-8 h-8 text-[#3CC8D8]" />
                            <div>
                                <p className="text-2xl font-bold text-white">
                                    {products.reduce((sum, p) => sum + p.stokKilo, 0).toFixed(1)} kg
                                </p>
                                <p className="text-xs text-teal-100/80">Total Stok</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Content with Tabs ── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full sm:w-auto bg-white/10 border border-white/10 rounded-xl p-1 mb-6">
                        <TabsTrigger
                            value="dijual"
                            className="flex-1 sm:flex-none gap-2 px-4 py-2 rounded-lg text-sm text-teal-100 data-[state=active]:bg-[#0E7C8E] data-[state=active]:text-white data-[state=active]:shadow-sm transition-colors"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Sedang Dijual
                            {dijualProducts.length > 0 && (
                                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">
                                    {dijualProducts.length}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            value="draft"
                            className="flex-1 sm:flex-none gap-2 px-4 py-2 rounded-lg text-sm text-teal-100 data-[state=active]:bg-[#0d2b31] data-[state=active]:text-white data-[state=active]:shadow-sm transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            Draft & Selesai
                            {draftProducts.length > 0 && (
                                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">
                                    {draftProducts.length}
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab: Sedang Dijual */}
                    <TabsContent value="dijual">
                        {loading ? (
                            <div className="text-center py-12 text-gray-400">
                                Memuat produk...
                            </div>
                        ) : dijualProducts.length === 0 ? (
                            <EmptyState
                                title="Belum ada produk yang dijual"
                                description="Tambahkan produk ikan fresh dan mulai menjual ke marketplace!"
                                onAction={() => {
                                    setEditingProduct(null);
                                    setShowForm(true);
                                }}
                            />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {dijualProducts.map((p) => (
                                    <SellerProductCard
                                        key={p.id}
                                        product={p}
                                        onEdit={handleEdit}
                                        onDelete={(id) => setShowDeleteConfirm(id)}
                                        onPublish={handlePublish}
                                        onWithdraw={handleWithdraw}
                                        onExpired={handleExpired}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Tab: Draft */}
                    <TabsContent value="draft">
                        {loading ? (
                            <div className="text-center py-12 text-gray-400">
                                Memuat produk...
                            </div>
                        ) : draftProducts.length === 0 ? (
                            <EmptyState
                                title="Belum ada draft produk"
                                description="Buat draft produk untuk menyimpannya sebelum dijual."
                                onAction={() => {
                                    setEditingProduct(null);
                                    setShowForm(true);
                                }}
                            />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {draftProducts.map((p) => (
                                    <SellerProductCard
                                        key={p.id}
                                        product={p}
                                        onEdit={handleEdit}
                                        onDelete={(id) => setShowDeleteConfirm(id)}
                                        onPublish={handlePublish}
                                        onWithdraw={handleWithdraw}
                                        onExpired={handleExpired}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </main>

            {/* ── Add/Edit Product Dialog ── */}
            <Dialog
                open={showForm}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowForm(false);
                        setEditingProduct(null);
                    }
                }}
            >
                <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-[#0d2b31] border border-[#3CC8D8]/20 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-white">
                            {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-teal-100/70">
                            {editingProduct
                                ? "Perbarui informasi produk ikan fresh Anda."
                                : "Isi detail produk ikan fresh yang ingin Anda jual."}
                        </DialogDescription>
                    </DialogHeader>
                    <SellerProductForm
                        initialData={
                            editingProduct
                                ? {
                                    ...editingProduct,
                                    status: (editingProduct.status === "selesai"
                                        ? "draft"
                                        : editingProduct.status) as "draft" | "dijual",
                                    id: editingProduct.id,
                                }
                                : undefined
                        }
                        onSubmit={handleCreateOrUpdate}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingProduct(null);
                        }}
                    />
                </DialogContent>
            </Dialog>

            {/* ── Limbah Certification Popup ── */}
            <Dialog open={showLimbahPopup} onOpenChange={setShowLimbahPopup}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                            <AlertTriangle className="w-8 h-8 text-amber-600" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-gray-900 text-center">
                            Akun Belum Tersertifikasi
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-500 mt-2">
                            Untuk menjual bahan baku industri (limbah perikanan), akun Anda
                            harus <strong>tersertifikasi</strong> terlebih dahulu. Proses
                            sertifikasi memerlukan dokumen-dokumen berikut:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 py-3">
                        {[
                            "KTP / Identitas Resmi",
                            "Surat Izin Usaha Perikanan (SIUP)",
                            "Sertifikat Kelayakan Pengolahan (SKP)",
                            "Dokumen HACCP / GMP",
                        ].map((doc, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200"
                            >
                                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-amber-700">
                                        {i + 1}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-700">{doc}</span>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <button
                            onClick={() => setShowLimbahPopup(false)}
                            className="w-full px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors"
                        >
                            Mengerti, Nanti Saya Lengkapi
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ── Delete Confirmation Dialog ── */}
            <Dialog
                open={!!showDeleteConfirm}
                onOpenChange={(open) => {
                    if (!open) setShowDeleteConfirm(null);
                }}
            >
                <DialogContent className="sm:max-w-sm bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-gray-900">
                            Hapus Produk?
                        </DialogTitle>
                        <DialogDescription>
                            Produk yang dihapus tidak dapat dikembalikan. Yakin ingin
                            melanjutkan?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={() =>
                                showDeleteConfirm && handleDelete(showDeleteConfirm)
                            }
                            className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                        >
                            Ya, Hapus
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

/* ──────────────────────────────────────────────
   Empty State Component
   ────────────────────────────────────────────── */

function EmptyState({
    title,
    description,
    onAction,
}: {
    title: string;
    description: string;
    onAction: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 rounded-full bg-teal-50 flex items-center justify-center mb-6">
                <Fish className="w-12 h-12 text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
                {description}
            </p>
            <button
                onClick={onAction}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors shadow-sm"
            >
                <Plus className="w-4 h-4" />
                Tambah Produk Pertama
            </button>
        </div>
    );
}
