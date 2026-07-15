import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, updateQty, cartTotal, orders } = useCart();
  const navigate = useNavigate();

  const totalLabel = `Rp ${cartTotal.toLocaleString("id-ID")}`;
  const ongkir = cartTotal > 0 ? 15000 : 0;
  const grandTotal = `Rp ${(cartTotal + ongkir).toLocaleString("id-ID")}`;

  function handleCheckout() {
    onClose();
    navigate("/checkout");
  }

  function handleViewOrders() {
    if (orders.length > 0) {
      onClose();
      navigate(`/orders/${orders[0].id}`);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(4, 20, 30, 0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 900,
            }}
          />

          {/* Sidebar Panel */}
          <motion.div
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(420px, 100vw)",
              background:
                "linear-gradient(180deg, #0d3545 0%, #071e2c 100%)",
              border: "1px solid rgba(93,232,212,0.15)",
              borderRight: "none",
              borderRadius: "24px 0 0 24px",
              zIndex: 901,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "24px 24px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#e8f4f8",
                  }}
                >
                  🛒 Keranjang Belanja
                </h2>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "13px",
                    color: "rgba(180,220,230,0.5)",
                  }}
                >
                  {cartItems.length === 0
                    ? "Belum ada produk"
                    : `${cartItems.length} jenis produk`}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#c8e6ec",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Items */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {cartItems.length === 0 ? (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    paddingTop: "60px",
                  }}
                >
                  <div style={{ fontSize: "56px", opacity: 0.4 }}>🐟</div>
                  <p
                    style={{
                      color: "rgba(180,220,230,0.4)",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    Keranjang kosong.
                    <br />
                    Yuk tambahkan produk!
                  </p>
                  {orders.length > 0 && (
                    <button
                      onClick={handleViewOrders}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "12px",
                        border: "1px solid rgba(93,232,212,0.3)",
                        background: "rgba(93,232,212,0.08)",
                        color: "#5de8d4",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      📦 Lihat Pesanan Saya ({orders.length})
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "14px",
                        padding: "12px",
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "10px",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <ImageWithFallback
                          src={item.product.gambar}
                          alt={item.product.nama}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#e2eff3",
                            margin: "0 0 2px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.product.nama}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#5de8d4",
                            fontWeight: 700,
                            margin: "0 0 8px",
                          }}
                        >
                          {item.product.hargaLabel} / {item.product.satuan}
                        </p>
                        {/* Qty control */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            onClick={() =>
                              updateQty(item.product.id, item.qty - 1)
                            }
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "6px",
                              background: "rgba(93,232,212,0.1)",
                              border: "1px solid rgba(93,232,212,0.25)",
                              color: "#5de8d4",
                              fontSize: "14px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            −
                          </button>
                          <span
                            style={{
                              minWidth: "20px",
                              textAlign: "center",
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#e8f4f8",
                            }}
                          >
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(item.product.id, item.qty + 1)
                            }
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "6px",
                              background: "rgba(93,232,212,0.1)",
                              border: "1px solid rgba(93,232,212,0.25)",
                              color: "#5de8d4",
                              fontSize: "14px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            +
                          </button>
                          <span
                            style={{
                              fontSize: "12px",
                              color: "rgba(180,220,230,0.5)",
                              marginLeft: "4px",
                            }}
                          >
                            {item.product.satuan}
                          </span>
                        </div>
                      </div>

                      {/* Subtotal + remove */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "8px",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#5de8d4",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Rp{" "}
                          {(
                            item.product.harga * item.qty
                          ).toLocaleString("id-ID")}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "rgba(255,80,80,0.5)",
                            fontSize: "12px",
                            cursor: "pointer",
                            padding: "2px 4px",
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {/* Orders shortcut */}
                  {orders.length > 0 && (
                    <button
                      onClick={handleViewOrders}
                      style={{
                        width: "100%",
                        padding: "10px 20px",
                        borderRadius: "12px",
                        border: "1px solid rgba(93,232,212,0.2)",
                        background: "rgba(93,232,212,0.05)",
                        color: "#5de8d4",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      📦 Lihat Pesanan Aktif ({orders.length})
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Footer – Summary & Checkout */}
            {cartItems.length > 0 && (
              <div
                style={{
                  padding: "16px 24px 24px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      color: "rgba(180,220,230,0.6)",
                    }}
                  >
                    <span>Subtotal</span>
                    <span>{totalLabel}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      color: "rgba(180,220,230,0.6)",
                    }}
                  >
                    <span>Estimasi Ongkir</span>
                    <span>Rp {ongkir.toLocaleString("id-ID")}</span>
                  </div>
                  <div
                    style={{
                      height: "1px",
                      background: "rgba(255,255,255,0.08)",
                      margin: "4px 0",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#e8f4f8",
                    }}
                  >
                    <span>Total</span>
                    <span style={{ color: "#5de8d4" }}>{grandTotal}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background:
                      "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 800,
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                    boxShadow: "0 8px 24px rgba(13,148,136,0.35)",
                  }}
                >
                  Checkout →
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
