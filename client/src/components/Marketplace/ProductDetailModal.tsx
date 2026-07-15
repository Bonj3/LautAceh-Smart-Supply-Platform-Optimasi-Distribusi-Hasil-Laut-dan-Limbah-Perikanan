import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart, CartProduct } from "../../context/CartContext";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProductDetailModalProps {
  product: CartProduct | null;
  onClose: () => void;
  onCartOpen: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onCartOpen,
}: ProductDetailModalProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Reset qty when product changes
  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [product?.id]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!product) return;
    addToCart(product, qty);
    onClose();
    onCartOpen();
  }

  const total = product ? product.harga * qty : 0;
  const totalLabel = `Rp ${total.toLocaleString("id-ID")}`;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(4, 20, 30, 0.85)",
              backdropFilter: "blur(6px)",
              zIndex: 1000,
            }}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.92, x: "-50%", y: "-45%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.92, x: "-50%", y: "-45%" }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 1001,
              width: "min(92vw, 820px)",
              maxHeight: "92vh",
              overflowY: "auto",
              background:
                "linear-gradient(145deg, #0d3545 0%, #0a2535 60%, #07192a 100%)",
              border: "1px solid rgba(93,232,212,0.2)",
              borderRadius: "24px",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(93,232,212,0.08)",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Tutup"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#c8e6ec",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Content layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
              }}
              className="modal-layout"
            >
              {/* Left – Image */}
              <div
                style={{
                  position: "relative",
                  height: "380px",
                  overflow: "hidden",
                  borderRadius: "24px 0 0 24px",
                  flexShrink: 0,
                }}
                className="modal-img-col"
              >
                <ImageWithFallback
                  src={product.gambar}
                  alt={product.nama}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background:
                      "linear-gradient(to top, rgba(7,25,42,0.8) 0%, transparent 100%)",
                  }}
                />
                {product.tag && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      padding: "5px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#fff",
                      background:
                        product.tag === "Grosir"
                          ? "linear-gradient(135deg, #f97316, #ea580c)"
                          : "linear-gradient(135deg, #991b1b, #7f1d1d)",
                    }}
                  >
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Right – Details */}
              <div
                style={{
                  padding: "32px 28px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                className="modal-detail-col"
              >
                {/* Category */}
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#5de8d4",
                    background: "rgba(93,232,212,0.12)",
                    border: "1px solid rgba(93,232,212,0.25)",
                    alignSelf: "flex-start",
                  }}
                >
                  {product.kategori}
                </span>

                {/* Name */}
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#e8f4f8",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {product.nama}
                </h2>

                {/* Price */}
                <div>
                  <span
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      color: "#5de8d4",
                    }}
                  >
                    {product.hargaLabel}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(180,220,230,0.5)",
                      marginLeft: "6px",
                    }}
                  >
                    / {product.satuan}
                  </span>
                </div>

                {/* Info tiles */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {[
                    { label: "Asal", value: "Nelayan Aceh" },
                    { label: "Kesegaran", value: "Tangkap Hari Ini" },
                    { label: "Satuan", value: product.satuan },
                    { label: "Min. Beli", value: `1 ${product.satuan}` },
                  ].map((info) => (
                    <div
                      key={info.label}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "10px",
                        padding: "10px 12px",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          color: "rgba(180,220,230,0.5)",
                          margin: "0 0 2px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {info.label}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#c8e6ec",
                          margin: 0,
                        }}
                      >
                        {info.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Qty selector */}
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(180,220,230,0.6)",
                      marginBottom: "8px",
                    }}
                  >
                    Jumlah ({product.satuan})
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "rgba(93,232,212,0.1)",
                        border: "1px solid rgba(93,232,212,0.3)",
                        color: "#5de8d4",
                        fontSize: "18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.2s",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: "32px",
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#e8f4f8",
                      }}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "rgba(93,232,212,0.1)",
                        border: "1px solid rgba(93,232,212,0.3)",
                        color: "#5de8d4",
                        fontSize: "18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.2s",
                      }}
                    >
                      +
                    </button>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#5de8d4",
                        marginLeft: "8px",
                      }}
                    >
                      = {totalLabel}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBuyNow}
                    style={{
                      padding: "13px 20px",
                      borderRadius: "12px",
                      border: "none",
                      background: "linear-gradient(135deg, #0d9488, #0f766e)",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.5px",
                    }}
                  >
                    🛒 Beli Sekarang
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    style={{
                      padding: "12px 20px",
                      borderRadius: "12px",
                      border: "1px solid rgba(93,232,212,0.35)",
                      background: added
                        ? "rgba(93,232,212,0.15)"
                        : "transparent",
                      color: "#5de8d4",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.3s",
                    }}
                  >
                    {added ? "✓ Ditambahkan!" : "+ Masukkan Keranjang"}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Responsive modal styles */}
          <style>{`
            @media (max-width: 640px) {
              .modal-layout {
                grid-template-columns: 1fr !important;
              }
              .modal-img-col {
                height: 220px !important;
                border-radius: 24px 24px 0 0 !important;
              }
              .modal-detail-col {
                padding: 20px 18px 24px !important;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
