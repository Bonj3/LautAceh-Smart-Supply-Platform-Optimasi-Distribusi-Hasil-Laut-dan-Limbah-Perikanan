import { useState, useEffect, useRef, useCallback } from "react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Camera, Check, X, ChevronDown, Sparkles } from "lucide-react";
import type {
  JenisIkan,
  DurasiJual,
  PriceTier,
  ProductInput,
} from "@lautaceh/shared";
import {
  DEFAULT_PRICE_TIERS,
  TEMPLATE_IMAGES,
  TITLE_SUGGESTIONS,
} from "@lautaceh/shared";

const JENIS_IKAN_OPTIONS: JenisIkan[] = [
  "Tuna",
  "Udang",
  "Cumi",
  "Tongkol",
  "Kakap Merah",
  "Kembung",
  "Cakalang",
  "Tenggiri",
  "Sarden",
];

const DURASI_OPTIONS: { value: DurasiJual; label: string }[] = [
  { value: 5, label: "5 Jam" },
  { value: 8, label: "8 Jam" },
  { value: 12, label: "12 Jam" },
  { value: 24, label: "24 Jam" },
];

interface SellerProductFormProps {
  /** Existing product data (for edit mode) */
  initialData?: Partial<ProductInput> & { id?: string };
  /** Called when form is submitted */
  onSubmit: (data: ProductInput) => void;
  /** Called when form is cancelled */
  onCancel: () => void;
}

export function SellerProductForm({
  initialData,
  onSubmit,
  onCancel,
}: SellerProductFormProps) {
  const isEdit = !!initialData?.id;

  // Form state
  const [jenisIkan, setJenisIkan] = useState<JenisIkan>(
    initialData?.jenisIkan || "Tuna"
  );
  const [namaJudul, setNamaJudul] = useState(initialData?.namaJudul || "");
  const [stokKilo, setStokKilo] = useState<number>(
    initialData?.stokKilo ?? 1
  );
  const [durasiJualJam, setDurasiJualJam] = useState<DurasiJual>(
    initialData?.durasiJualJam || 5
  );
  const [gambarUrl, setGambarUrl] = useState(initialData?.gambarUrl || "");
  const [useTemplate, setUseTemplate] = useState(true);
  const [hargaTiers, setHargaTiers] = useState<PriceTier[]>(
    initialData?.hargaTiers || DEFAULT_PRICE_TIERS["Tuna"]
  );

  // Auto-fill suggestion state
  const [suggestion, setSuggestion] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // When jenis ikan changes, update defaults
  useEffect(() => {
    setHargaTiers(DEFAULT_PRICE_TIERS[jenisIkan]);
    if (useTemplate) {
      setGambarUrl(TEMPLATE_IMAGES[jenisIkan]);
    }
  }, [jenisIkan, useTemplate]);

  // Auto-fill suggestion logic
  const updateSuggestion = useCallback(
    (input: string) => {
      if (!input.trim()) {
        setSuggestion("");
        setShowSuggestion(false);
        return;
      }
      const suggestions = TITLE_SUGGESTIONS[jenisIkan] || [];
      const match = suggestions.find((s) =>
        s.toLowerCase().startsWith(input.toLowerCase())
      );
      if (match && match.toLowerCase() !== input.toLowerCase()) {
        setSuggestion(match);
        setShowSuggestion(true);
      } else {
        setSuggestion("");
        setShowSuggestion(false);
      }
    },
    [jenisIkan]
  );

  const handleTitleChange = (value: string) => {
    setNamaJudul(value);
    updateSuggestion(value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && showSuggestion && suggestion) {
      e.preventDefault();
      setNamaJudul(suggestion);
      setSuggestion("");
      setShowSuggestion(false);
    }
  };

  const handleSubmit = (status: "draft" | "dijual") => {
    if (!namaJudul.trim()) return;
    if (stokKilo < 0.25) return;

    onSubmit({
      jenisIkan,
      namaJudul: namaJudul.trim(),
      hargaTiers,
      stokKilo,
      gambarUrl: gambarUrl || TEMPLATE_IMAGES[jenisIkan],
      durasiJualJam,
      status,
    });
  };

  /** Format number to Rupiah */
  const fmtRp = (n: number) => "Rp " + n.toLocaleString("id-ID");

  return (
    <div className="space-y-6">
      {/* ── Jenis Ikan ── */}
      <div>
        <label className="block text-sm font-medium text-teal-50 mb-1.5">
          Jenis Ikan <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            value={jenisIkan}
            onChange={(e) => setJenisIkan(e.target.value as JenisIkan)}
            className="
              w-full appearance-none bg-[#0a3541]/50 border border-[#3CC8D8]/30 rounded-xl
              px-4 py-2.5 pr-10 text-sm text-white
              focus:outline-none focus:ring-2 focus:ring-[#3CC8D8] focus:border-[#3CC8D8]
              transition-colors [&>option]:text-gray-900
            "
          >
            {JENIS_IKAN_OPTIONS.map((jenis) => (
              <option key={jenis} value={jenis}>
                {jenis}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-100/60 pointer-events-none" />
        </div>
      </div>

      {/* ── Judul Produk (with auto-fill) ── */}
      <div>
        <label className="block text-sm font-medium text-teal-50 mb-1.5">
          Judul Produk <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            ref={titleInputRef}
            type="text"
            value={namaJudul}
            onChange={(e) => handleTitleChange(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            placeholder="Ketik judul atau tekan Tab untuk auto-fill..."
            className="
              w-full bg-[#0a3541]/50 border border-[#3CC8D8]/30 rounded-xl
              px-4 py-2.5 text-sm text-white placeholder-teal-100/40
              focus:outline-none focus:ring-2 focus:ring-[#3CC8D8] focus:border-[#3CC8D8]
              transition-colors
            "
          />
          {/* Ghost suggestion overlay */}
          {showSuggestion && suggestion && (
            <div className="absolute inset-0 pointer-events-none px-4 py-2.5 text-sm">
              <span className="invisible">{namaJudul}</span>
              <span className="text-teal-100/40">
                {suggestion.slice(namaJudul.length)}
              </span>
            </div>
          )}
          {showSuggestion && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0E7C8E]/40 border border-[#3CC8D8]/30 text-[10px] text-teal-100 font-mono">
              Tab ↹
            </span>
          )}
        </div>
        {/* Quick suggestion chips */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {TITLE_SUGGESTIONS[jenisIkan]?.slice(0, 3).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setNamaJudul(s);
                setSuggestion("");
                setShowSuggestion(false);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#3CC8D8]/10 text-[#3CC8D8] text-xs font-medium hover:bg-[#3CC8D8]/20 transition-colors border border-[#3CC8D8]/30"
            >
              <Sparkles className="w-3 h-3" />
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Gambar ── */}
      <div>
        <label className="block text-sm font-medium text-teal-50 mb-1.5">
          Gambar Produk
        </label>
        <div className="flex gap-3 mb-3">
          <button
            type="button"
            onClick={() => {
              setUseTemplate(true);
              setGambarUrl(TEMPLATE_IMAGES[jenisIkan]);
            }}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              useTemplate
                ? "bg-[#3CC8D8]/20 border-[#3CC8D8] text-[#3CC8D8]"
                : "bg-white/5 border-white/20 text-teal-100/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Camera className="w-4 h-4 mx-auto mb-1" />
            Gunakan Template
          </button>
          <button
            type="button"
            onClick={() => setUseTemplate(false)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              !useTemplate
                ? "bg-[#3CC8D8]/20 border-[#3CC8D8] text-[#3CC8D8]"
                : "bg-white/5 border-white/20 text-teal-100/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Camera className="w-4 h-4 mx-auto mb-1" />
            Upload Sendiri
          </button>
        </div>

        {useTemplate ? (
          <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#0a3541] border border-white/20">
            <ImageWithFallback
              src={TEMPLATE_IMAGES[jenisIkan]}
              alt={`Template ${jenisIkan}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-[#0d2b31]/80 backdrop-blur-sm text-teal-100 text-xs border border-white/10">
              Template: {jenisIkan}
            </div>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={gambarUrl}
              onChange={(e) => setGambarUrl(e.target.value)}
              placeholder="Masukkan URL gambar..."
              className="
                w-full bg-[#0a3541]/50 border border-[#3CC8D8]/30 rounded-xl
                px-4 py-2.5 text-sm text-white placeholder-teal-100/40
                focus:outline-none focus:ring-2 focus:ring-[#3CC8D8] focus:border-[#3CC8D8]
                transition-colors
              "
            />
            {gambarUrl && (
              <div className="mt-2 relative w-full h-40 rounded-xl overflow-hidden bg-[#0a3541] border border-white/20">
                <ImageWithFallback
                  src={gambarUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="text-xs text-teal-100/60 mt-2">
              * Nantinya bisa upload file langsung. Template gambar dari assets akan disediakan.
            </p>
          </div>
        )}
      </div>

      {/* ── Stok ── */}
      <div>
        <label className="block text-sm font-medium text-teal-50 mb-1.5">
          Stok Tersedia (Kg) <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          min={0.25}
          step={0.25}
          value={stokKilo}
          onChange={(e) => setStokKilo(parseFloat(e.target.value) || 0)}
          className="
            w-full bg-white/10 border border-[#3CC8D8]/30 rounded-xl
            px-4 py-2.5 text-sm text-white
            focus:outline-none focus:ring-2 focus:ring-[#3CC8D8] focus:border-[#3CC8D8]
            transition-colors
          "
        />
        <p className="text-xs text-teal-100/60 mt-1">
          Minimum 250 gram (0.25 kg). Sistem stok dalam kilogram.
        </p>
      </div>

      {/* ── Harga Tiers (readonly, auto dari jenis ikan) ── */}
      <div>
        <label className="block text-sm font-medium text-teal-50 mb-1.5">
          Harga per Kilogram
        </label>
        <p className="text-xs text-teal-100/60 mb-2">
          Harga otomatis sesuai kondisi pasar di Aceh. Tiga tier berdasarkan jumlah pembelian:
        </p>
        <div className="space-y-2">
          {hargaTiers.map((tier, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${
                i === 0
                  ? "bg-amber-500/10 border-amber-500/30"
                  : i === 1
                    ? "bg-[#3CC8D8]/10 border-[#3CC8D8]/30"
                    : "bg-blue-500/10 border-blue-500/30"
              }`}
            >
              <div>
                <span className="text-sm font-medium text-white">
                  {tier.label}
                </span>
                <span className="text-xs text-teal-100/70 ml-2">
                  ({tier.minKg}–{tier.maxKg} kg)
                </span>
              </div>
              <span
                className={`text-sm font-bold ${
                  i === 0
                    ? "text-amber-400"
                    : i === 1
                      ? "text-[#3CC8D8]"
                      : "text-blue-400"
                }`}
              >
                {fmtRp(tier.hargaPerKg)}/kg
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Durasi Jual ── */}
      <div>
        <label className="block text-sm font-medium text-teal-50 mb-1.5">
          Batas Waktu Penjualan (Expired)
        </label>
        <p className="text-xs text-teal-100/60 mb-2">
          Produk akan otomatis dicabut dari marketplace setelah waktu habis untuk menjaga kesegaran.
        </p>
        <div className="grid grid-cols-4 gap-2">
          {DURASI_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setDurasiJualJam(opt.value)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                durasiJualJam === opt.value
                  ? "bg-[#3CC8D8] text-[#0d2b31] border-[#3CC8D8] shadow-[0_0_15px_rgba(60,200,216,0.3)]"
                  : "bg-white/5 text-teal-100/70 border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => handleSubmit("draft")}
          disabled={!namaJudul.trim() || stokKilo < 0.25}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-teal-100 font-medium hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Simpan Draft
        </button>
        <button
          type="button"
          onClick={() => handleSubmit("dijual")}
          disabled={!namaJudul.trim() || stokKilo < 0.25}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0E7C8E] to-[#3CC8D8] hover:shadow-[0_4px_15px_rgba(60,200,216,0.4)] text-white font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-[#3CC8D8]/50"
        >
          <Check className="w-4 h-4" />
          {isEdit ? "Update & Jual" : "Langsung Jual"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="p-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-teal-100 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
