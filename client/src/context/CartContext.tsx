import { createContext, useContext, useState, ReactNode } from "react";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */

export interface CartProduct {
  id: string;           // e.g. "fresh-1" | "industri-2"
  nama: string;
  harga: number;        // numeric only (no "Rp" prefix)
  hargaLabel: string;   // display string "Rp 125.000"
  satuan: string;       // "Kg" | "Gram"
  gambar: string;
  kategori: string;
  tag?: string;
}

export interface CartItem {
  product: CartProduct;
  qty: number;          // in units (e.g. 1 = 1 Kg)
}

export type OrderStatus =
  | "confirmed"
  | "packed"
  | "shipped"
  | "arrived"
  | "delivered";

export interface Order {
  id: string;
  items: CartItem[];
  totalHarga: number;
  alamat: {
    nama: string;
    telepon: string;
    alamat: string;
    kota: string;
    catatan: string;
  };
  metodePembayaran: string;
  createdAt: Date;
  status: OrderStatus;
  kurir: string;
  noResi: string;
  estimasiTiba: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  orders: Order[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: CartProduct, qty: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  placeOrder: (
    alamat: Order["alamat"],
    metodePembayaran: string
  ) => Order;
}

/* ─────────────────────────────────────────
   CONTEXT
───────────────────────────────────────── */

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce(
    (sum, i) => sum + i.product.harga * i.qty,
    0
  );

  function addToCart(product: CartProduct, qty: number) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { product, qty }];
    });
  }

  function removeFromCart(productId: string) {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function updateQty(productId: string, qty: number) {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, qty } : i
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function placeOrder(
    alamat: Order["alamat"],
    metodePembayaran: string
  ): Order {
    const kurirList = ["JNE", "SiCepat", "J&T Express", "Anteraja", "Pos Indonesia"];
    const kurir = kurirList[Math.floor(Math.random() * kurirList.length)];
    const noResi = `PE${Date.now().toString().slice(-8)}`;
    const tiba = new Date();
    tiba.setDate(tiba.getDate() + Math.floor(Math.random() * 3) + 2);
    const estimasiTiba = tiba.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const newOrder: Order = {
      id: noResi,
      items: [...cartItems],
      totalHarga: cartTotal,
      alamat,
      metodePembayaran,
      createdAt: new Date(),
      status: "confirmed",
      kurir,
      noResi,
      estimasiTiba,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Simulate status progression
    const stages: OrderStatus[] = ["packed", "shipped", "arrived"];
    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setOrders((prev) =>
          prev.map((o) => (o.id === noResi ? { ...o, status: stage } : o))
        );
      }, (idx + 1) * 8000); // every 8 seconds for demo
    });

    return newOrder;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
