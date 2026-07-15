import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import MarketplaceView from "../sections/Marketplace/MarketplaceView";
import AISmartMarketplace from "../components/AISmartMarketplace/AISmartMarketplace";
import CartSidebar from "../components/Cart/CartSidebar";

export default function Marketplace() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main
        className="pt-20"
        style={{
          background: "#0b4553",
          minHeight: "100vh",
        }}
      >
        <MarketplaceView onCartOpen={() => setCartOpen(true)} />
      </main>
      <Footer />
      <AISmartMarketplace />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}