import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { SellerTimerBadge } from "./SellerTimerBadge";
import { Pencil, Trash2, ShoppingBag, Undo2 } from "lucide-react";
import type { Product } from "@lautaceh/shared";

interface SellerProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onWithdraw: (id: string) => void;
  onExpired: (id: string) => void;
}

/** Format number to Rupiah */
function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

export function SellerProductCard({
  product,
  onEdit,
  onDelete,
  onPublish,
  onWithdraw,
  onExpired,
}: SellerProductCardProps) {
  const isDijual = product.status === "dijual";
  const isDraft = product.status === "draft";
  const isSelesai = product.status === "selesai";

  // Get the "normal" price tier for display
  const normalTier = product.hargaTiers.find((t) => t.label.includes("Normal"));
  const displayPrice = normalTier
    ? formatRupiah(normalTier.hargaPerKg)
    : formatRupiah(product.hargaTiers[0]?.hargaPerKg ?? 0);

  return (
    <div
      className={`
      group relative bg-white rounded-2xl border overflow-hidden
      transition-all duration-300 hover:shadow-lg
      ${isDijual ? "border-emerald-200 shadow-sm" : ""}
      ${isDraft ? "border-gray-200 shadow-sm" : ""}
      ${isSelesai ? "border-gray-200 opacity-60" : ""}
    `}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.gambarUrl}
          alt={product.namaJudul}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {isDijual && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Sedang Dijual
            </span>
          )}
          {isDraft && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white shadow-sm">
              Draft
            </span>
          )}
          {isSelesai && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500 text-white shadow-sm">
              Kedaluwarsa
            </span>
          )}
        </div>

        {/* Jenis ikan badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm shadow-sm">
            {product.jenisIkan}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
          {product.namaJudul}
        </h3>

        {/* Price & Stock */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-teal-700">{displayPrice}</p>
            <p className="text-xs text-gray-500">/kg (harga normal)</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              {product.stokKilo} kg
            </p>
            <p className="text-xs text-gray-500">Stok tersedia</p>
          </div>
        </div>

        {/* Price tiers mini */}
        <div className="flex gap-1 flex-wrap">
          {product.hargaTiers.map((tier, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                i === 0
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : i === 1
                    ? "bg-teal-50 text-teal-700 border border-teal-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              {tier.label.split(" ")[0]}: {formatRupiah(tier.hargaPerKg)}
            </span>
          ))}
        </div>

        {/* Timer (only for active sales) */}
        {isDijual && product.waktuMulaiJual && (
          <SellerTimerBadge
            waktuMulaiJual={product.waktuMulaiJual}
            durasiJam={product.durasiJualJam}
            onExpired={() => onExpired(product.id)}
          />
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          {isDraft && (
            <>
              <button
                onClick={() => onPublish(product.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Jual Sekarang
              </button>
              <button
                onClick={() => onEdit(product)}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          {isDijual && (
            <>
              <button
                onClick={() => onWithdraw(product.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium transition-colors"
              >
                <Undo2 className="w-3.5 h-3.5" />
                Tarik dari Penjualan
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          {isSelesai && (
            <>
              <button
                onClick={() => onPublish(product.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Jual Lagi
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
