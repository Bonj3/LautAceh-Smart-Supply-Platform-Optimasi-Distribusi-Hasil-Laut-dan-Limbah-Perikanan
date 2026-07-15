import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCart, Order, OrderStatus } from "../context/CartContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ─── Status progression config ─── */
const STAGES: {
  key: OrderStatus;
  label: string;
  icon: string;
  desc: string;
}[] = [
  {
    key: "confirmed",
    label: "Pesanan Dikonfirmasi",
    icon: "✅",
    desc: "Pesanan kamu telah diterima dan sedang diverifikasi.",
  },
  {
    key: "packed",
    label: "Produk Dikemas Nelayan",
    icon: "🐟",
    desc: "Nelayan sedang menyiapkan dan mengemas produk segar untuk kamu.",
  },
  {
    key: "shipped",
    label: "Dalam Perjalanan",
    icon: "🚚",
    desc: "Paket sudah diserahkan ke kurir dan sedang dalam pengiriman.",
  },
  {
    key: "arrived",
    label: "Tiba di Kota Tujuan",
    icon: "📦",
    desc: "Paket telah tiba di gudang kota tujuan, segera diantar.",
  },
  {
    key: "delivered",
    label: "Terkirim",
    icon: "🏠",
    desc: "Paket berhasil diterima. Selamat menikmati!",
  },
];

function getStageIndex(status: OrderStatus) {
  return STAGES.findIndex((s) => s.key === status);
}

/* ─── Order not found ─── */
function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: "60px" }}>📦</div>
      <h2 style={{ color: "#e8f4f8", fontSize: "22px", margin: 0 }}>
        Pesanan Tidak Ditemukan
      </h2>
      <p style={{ color: "rgba(180,220,230,0.5)", margin: 0 }}>
        Nomor pesanan mungkin sudah tidak tersedia di sesi ini.
      </p>
      <button
        onClick={onBack}
        style={{
          marginTop: "8px",
          padding: "12px 28px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, #0d9488, #0891b2)",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Ke Marketplace
      </button>
    </div>
  );
}

export default function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isFresh = (location.state as { fresh?: boolean } | null)?.fresh;

  const [showConfetti, setShowConfetti] = useState(isFresh ?? false);
  const [order, setOrder] = useState<Order | undefined>(
    orders.find((o) => o.id === orderId)
  );

  // Track order updates from context
  useEffect(() => {
    const found = orders.find((o) => o.id === orderId);
    setOrder(found);
  }, [orders, orderId]);

  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  const currentIndex = order ? getStageIndex(order.status) : -1;

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #0a2e3c 0%, #062a36 60%, #041e28 100%)",
          paddingTop: "88px",
          paddingBottom: "80px",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* Celebration overlay */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              key="confetti"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                  background:
                    "linear-gradient(135deg, #0d9488, #0891b2)",
                  borderRadius: "24px",
                  padding: "32px 48px",
                  textAlign: "center",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: "52px", marginBottom: "12px" }}>
                  🎉
                </div>
                <h2
                  style={{
                    color: "#fff",
                    fontSize: "22px",
                    fontWeight: 800,
                    margin: "0 0 6px",
                  }}
                >
                  Pesanan Berhasil!
                </h2>
                <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>
                  Terima kasih sudah berbelanja di PasaiEungkot
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "28px",
              fontSize: "13px",
              color: "rgba(180,220,230,0.5)",
            }}
          >
            <button
              onClick={() => navigate("/marketplace")}
              style={{
                background: "none",
                border: "none",
                color: "#5de8d4",
                cursor: "pointer",
                fontSize: "13px",
                padding: 0,
              }}
            >
              Marketplace
            </button>
            <span>›</span>
            <span style={{ color: "#e8f4f8" }}>Lacak Pesanan</span>
          </div>

          {!order ? (
            <NotFound onBack={() => navigate("/marketplace")} />
          ) : (
            <>
              {/* Header card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(93,232,212,0.2)",
                  borderRadius: "20px",
                  padding: "24px 28px",
                  marginBottom: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(180,220,230,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      margin: "0 0 4px",
                    }}
                  >
                    Nomor Pesanan
                  </p>
                  <h1
                    style={{
                      fontSize: "24px",
                      fontWeight: 900,
                      color: "#5de8d4",
                      margin: "0 0 4px",
                      letterSpacing: "1px",
                    }}
                  >
                    #{order.noResi}
                  </h1>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(180,220,230,0.4)",
                      margin: 0,
                    }}
                  >
                    {order.createdAt.toLocaleString("id-ID", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(180,220,230,0.5)",
                      margin: "0 0 4px",
                    }}
                  >
                    Kurir
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#e8f4f8",
                      margin: "0 0 2px",
                    }}
                  >
                    {order.kurir}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(180,220,230,0.4)",
                      margin: 0,
                    }}
                  >
                    {order.metodePembayaran}
                  </p>
                </div>
                <div
                  style={{
                    padding: "10px 20px",
                    borderRadius: "100px",
                    background:
                      order.status === "delivered"
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(93,232,212,0.1)",
                    border:
                      order.status === "delivered"
                        ? "1px solid rgba(34,197,94,0.4)"
                        : "1px solid rgba(93,232,212,0.3)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color:
                        order.status === "delivered" ? "#4ade80" : "#5de8d4",
                    }}
                  >
                    {STAGES.find((s) => s.key === order!.status)?.icon}{" "}
                    {STAGES.find((s) => s.key === order!.status)?.label}
                  </span>
                </div>
              </motion.div>

              {/* ── Timeline ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(93,232,212,0.15)",
                  borderRadius: "20px",
                  padding: "28px",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 28px",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#e8f4f8",
                  }}
                >
                  🗺️ Status Pengiriman
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                  }}
                >
                  {STAGES.map((stage, idx) => {
                    const isDone = idx <= currentIndex;
                    const isActive = idx === currentIndex;
                    const isLast = idx === STAGES.length - 1;

                    return (
                      <div
                        key={stage.key}
                        style={{
                          display: "flex",
                          gap: "16px",
                          position: "relative",
                        }}
                      >
                        {/* Connector line */}
                        {!isLast && (
                          <div
                            style={{
                              position: "absolute",
                              left: "19px",
                              top: "40px",
                              bottom: 0,
                              width: "2px",
                              height: "calc(100% - 12px)",
                              background: isDone
                                ? "linear-gradient(to bottom, #5de8d4, rgba(93,232,212,0.3))"
                                : "rgba(255,255,255,0.08)",
                              transition: "background 0.6s ease",
                            }}
                          />
                        )}

                        {/* Icon circle */}
                        <div style={{ flexShrink: 0, paddingBottom: isLast ? 0 : "28px" }}>
                          <motion.div
                            initial={false}
                            animate={{
                              scale: isActive ? [1, 1.1, 1] : 1,
                            }}
                            transition={
                              isActive
                                ? { repeat: Infinity, duration: 1.8 }
                                : {}
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              background: isDone
                                ? isActive
                                  ? "linear-gradient(135deg, #0d9488, #0891b2)"
                                  : "rgba(93,232,212,0.2)"
                                : "rgba(255,255,255,0.05)",
                              border: isDone
                                ? isActive
                                  ? "2px solid #5de8d4"
                                  : "2px solid rgba(93,232,212,0.5)"
                                : "2px solid rgba(255,255,255,0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "18px",
                              boxShadow: isActive
                                ? "0 0 20px rgba(93,232,212,0.4)"
                                : "none",
                              transition: "all 0.5s ease",
                            }}
                          >
                            {isDone && !isActive ? (
                              <span style={{ fontSize: "16px" }}>✓</span>
                            ) : (
                              <span>{stage.icon}</span>
                            )}
                          </motion.div>
                        </div>

                        {/* Text */}
                        <div
                          style={{
                            paddingBottom: isLast ? 0 : "28px",
                            paddingTop: "8px",
                          }}
                        >
                          <p
                            style={{
                              margin: "0 0 2px",
                              fontSize: "14px",
                              fontWeight: isActive ? 700 : 600,
                              color: isDone ? "#e8f4f8" : "rgba(180,220,230,0.35)",
                              transition: "color 0.4s",
                            }}
                          >
                            {stage.label}
                            {isActive && (
                              <span
                                style={{
                                  marginLeft: "8px",
                                  fontSize: "10px",
                                  padding: "2px 8px",
                                  borderRadius: "100px",
                                  background: "rgba(93,232,212,0.15)",
                                  color: "#5de8d4",
                                  fontWeight: 600,
                                  verticalAlign: "middle",
                                }}
                              >
                                Sekarang
                              </span>
                            )}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "12px",
                              color: isDone
                                ? "rgba(180,220,230,0.55)"
                                : "rgba(180,220,230,0.25)",
                              transition: "color 0.4s",
                              lineHeight: 1.5,
                            }}
                          >
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ETA */}
                <div
                  style={{
                    marginTop: "24px",
                    padding: "14px 18px",
                    background: "rgba(93,232,212,0.07)",
                    border: "1px solid rgba(93,232,212,0.2)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "22px" }}>🗓️</span>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        color: "rgba(180,220,230,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Estimasi Tiba
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#e8f4f8",
                      }}
                    >
                      {order.estimasiTiba}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ── Delivery Address ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(93,232,212,0.15)",
                  borderRadius: "20px",
                  padding: "24px 28px",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 16px",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#e8f4f8",
                  }}
                >
                  📍 Alamat Pengiriman
                </h2>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#c8e6ec",
                  }}
                >
                  {order.alamat.nama}
                </p>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: "13px",
                    color: "rgba(180,220,230,0.6)",
                  }}
                >
                  {order.alamat.telepon}
                </p>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: "13px",
                    color: "rgba(180,220,230,0.6)",
                  }}
                >
                  {order.alamat.alamat}
                </p>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: "13px",
                    color: "rgba(180,220,230,0.6)",
                  }}
                >
                  {order.alamat.kota}
                </p>
                {order.alamat.catatan && (
                  <p
                    style={{
                      marginTop: "8px",
                      fontSize: "12px",
                      color: "rgba(180,220,230,0.4)",
                      fontStyle: "italic",
                    }}
                  >
                    Catatan: {order.alamat.catatan}
                  </p>
                )}
              </motion.div>

              {/* ── Ordered Items ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(93,232,212,0.15)",
                  borderRadius: "20px",
                  padding: "24px 28px",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 16px",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#e8f4f8",
                  }}
                >
                  🐟 Produk Dipesan
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      style={{
                        display: "flex",
                        gap: "14px",
                        alignItems: "center",
                        padding: "12px",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
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
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            margin: "0 0 2px",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#c8e6ec",
                          }}
                        >
                          {item.product.nama}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "rgba(180,220,230,0.45)",
                          }}
                        >
                          {item.qty} {item.product.satuan} ×{" "}
                          {item.product.hargaLabel}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#5de8d4",
                          flexShrink: 0,
                        }}
                      >
                        Rp{" "}
                        {(item.product.harga * item.qty).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div
                  style={{
                    marginTop: "16px",
                    padding: "12px 16px",
                    background: "rgba(93,232,212,0.06)",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#e8f4f8",
                    }}
                  >
                    Total Pembayaran
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "#5de8d4",
                    }}
                  >
                    Rp {(order.totalHarga + 15000).toLocaleString("id-ID")}
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/marketplace")}
                  style={{
                    flex: 1,
                    minWidth: "160px",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    border: "none",
                    background:
                      "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.3px",
                  }}
                >
                  🛍️ Belanja Lagi
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    minWidth: "160px",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    border: "1px solid rgba(93,232,212,0.3)",
                    background: "transparent",
                    color: "#5de8d4",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  🖨️ Cetak Bukti
                </motion.button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
