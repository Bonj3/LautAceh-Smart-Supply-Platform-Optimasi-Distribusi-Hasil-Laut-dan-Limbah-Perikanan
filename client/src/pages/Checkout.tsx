import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const PAYMENT_METHODS = [
  { id: "transfer", label: "Transfer Bank", icon: "🏦", desc: "BCA / Mandiri / BNI / BRI" },
  { id: "qris", label: "QRIS", icon: "📱", desc: "Semua aplikasi dompet digital" },
  { id: "cod", label: "Bayar di Tempat (COD)", icon: "💵", desc: "Bayar saat barang tiba" },
];

export default function Checkout() {
  const { cartItems, cartTotal, placeOrder } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    alamat: "",
    kota: "",
    catatan: "",
  });
  const [payment, setPayment] = useState("transfer");
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ongkir = cartTotal > 0 ? 15000 : 0;
  const grandTotal = cartTotal + ongkir;

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.telepon.trim()) e.telepon = "Nomor telepon wajib diisi";
    if (!form.alamat.trim()) e.alamat = "Alamat wajib diisi";
    if (!form.kota.trim()) e.kota = "Kota wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    // Simulate a brief processing delay
    await new Promise((res) => setTimeout(res, 1200));

    const selectedPayment =
      PAYMENT_METHODS.find((m) => m.id === payment)?.label ?? payment;

    const order = placeOrder(form, selectedPayment);
    navigate(`/orders/${order.id}`, { state: { fresh: true } });
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            background:
              "linear-gradient(180deg, #0a2e3c 0%, #062a36 60%, #041e28 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            paddingTop: "80px",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          <div style={{ fontSize: "64px" }}>🛒</div>
          <h2 style={{ color: "#e8f4f8", fontSize: "22px", margin: 0 }}>
            Keranjang Kosong
          </h2>
          <p style={{ color: "rgba(180,220,230,0.5)", margin: 0 }}>
            Tambahkan produk sebelum checkout.
          </p>
          <button
            onClick={() => navigate("/marketplace")}
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
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #0a2e3c 0%, #062a36 60%, #041e28 100%)",
          paddingTop: "88px",
          paddingBottom: "60px",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
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
            <span style={{ color: "#e8f4f8" }}>Checkout</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "32px",
              alignItems: "flex-start",
            }}
            className="checkout-layout"
          >
            {/* ── Left: Form ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#e8f4f8",
                    margin: "0 0 24px",
                  }}
                >
                  📍 Alamat Pengiriman
                </h2>

                <form
                  id="checkout-form"
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                    className="form-row"
                  >
                    <FormField
                      label="Nama Lengkap"
                      name="nama"
                      value={form.nama}
                      error={errors.nama}
                      onChange={handleChange}
                      placeholder="Contoh: Ahmad Rizky"
                    />
                    <FormField
                      label="Nomor Telepon"
                      name="telepon"
                      type="tel"
                      value={form.telepon}
                      error={errors.telepon}
                      onChange={handleChange}
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </div>

                  <FormField
                    label="Alamat Lengkap"
                    name="alamat"
                    value={form.alamat}
                    error={errors.alamat}
                    onChange={handleChange}
                    placeholder="Jl. Teuku Umar No. 12, Lamlagang"
                    multiline
                  />

                  <FormField
                    label="Kota / Kabupaten"
                    name="kota"
                    value={form.kota}
                    error={errors.kota}
                    onChange={handleChange}
                    placeholder="Banda Aceh"
                  />

                  <FormField
                    label="Catatan untuk Kurir (opsional)"
                    name="catatan"
                    value={form.catatan}
                    onChange={handleChange}
                    placeholder="Taruh di depan pagar, dll."
                    multiline
                  />
                </form>
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(93,232,212,0.15)",
                  borderRadius: "20px",
                  padding: "28px",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#e8f4f8",
                    margin: "0 0 20px",
                  }}
                >
                  💳 Metode Pembayaran
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        border:
                          payment === m.id
                            ? "1.5px solid rgba(93,232,212,0.5)"
                            : "1px solid rgba(255,255,255,0.08)",
                        background:
                          payment === m.id
                            ? "rgba(93,232,212,0.08)"
                            : "rgba(255,255,255,0.03)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={payment === m.id}
                        onChange={() => setPayment(m.id)}
                        style={{ accentColor: "#5de8d4", width: "16px", height: "16px" }}
                      />
                      <span style={{ fontSize: "22px" }}>{m.icon}</span>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#e8f4f8",
                          }}
                        >
                          {m.label}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "rgba(180,220,230,0.45)",
                          }}
                        >
                          {m.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right: Order Summary ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                position: "sticky",
                top: "96px",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(93,232,212,0.15)",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "20px 20px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#e8f4f8",
                    }}
                  >
                    Ringkasan Pesanan
                  </h3>
                </div>

                {/* Items */}
                <div
                  style={{
                    padding: "12px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxHeight: "260px",
                    overflowY: "auto",
                  }}
                >
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
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
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#c8e6ec",
                            margin: "0 0 2px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.product.nama}
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "rgba(180,220,230,0.45)",
                            margin: 0,
                          }}
                        >
                          {item.qty} {item.product.satuan} ×{" "}
                          {item.product.hargaLabel}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: "13px",
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

                {/* Totals */}
                <div
                  style={{
                    padding: "14px 20px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <PriceLine
                    label="Subtotal"
                    value={`Rp ${cartTotal.toLocaleString("id-ID")}`}
                  />
                  <PriceLine
                    label="Ongkos Kirim"
                    value={`Rp ${ongkir.toLocaleString("id-ID")}`}
                  />
                  <div
                    style={{
                      height: "1px",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  />
                  <PriceLine
                    label="Total Pembayaran"
                    value={`Rp ${grandTotal.toLocaleString("id-ID")}`}
                    bold
                  />
                </div>

                {/* Submit */}
                <div style={{ padding: "8px 20px 20px" }}>
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                    form="checkout-form"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "14px",
                      border: "none",
                      background: isSubmitting
                        ? "rgba(13,148,136,0.5)"
                        : "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 800,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      letterSpacing: "0.5px",
                      boxShadow: isSubmitting
                        ? "none"
                        : "0 8px 24px rgba(13,148,136,0.35)",
                      transition: "all 0.3s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          style={{
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTopColor: "#fff",
                            borderRadius: "50%",
                            animation: "checkout-spin 0.7s linear infinite",
                          }}
                        />
                        Memproses...
                      </>
                    ) : (
                      "Bayar Sekarang 🚀"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @keyframes checkout-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 840px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

/* ── Sub-components ── */

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}

function FormField({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
}: FormFieldProps) {
  const base: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${error ? "rgba(255,80,80,0.5)" : "rgba(93,232,212,0.2)"}`,
    borderRadius: "10px",
    color: "#e8f4f8",
    fontSize: "14px",
    outline: "none",
    fontFamily: "'Inter', system-ui, sans-serif",
    resize: multiline ? ("vertical" as const) : ("none" as const),
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "rgba(180,220,230,0.7)",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          style={base}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={base}
        />
      )}
      {error && (
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "rgba(255,80,80,0.8)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function PriceLine({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: bold ? "14px" : "13px",
          color: bold ? "#e8f4f8" : "rgba(180,220,230,0.55)",
          fontWeight: bold ? 700 : 400,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: bold ? "16px" : "13px",
          color: bold ? "#5de8d4" : "rgba(180,220,230,0.7)",
          fontWeight: bold ? 800 : 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}
