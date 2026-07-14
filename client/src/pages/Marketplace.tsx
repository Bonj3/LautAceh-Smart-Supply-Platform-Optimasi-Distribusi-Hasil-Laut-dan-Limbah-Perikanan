import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import MarketplaceView from "../sections/Marketplace/MarketplaceView";
import AISmartMarketplace from "../components/AISmartMarketplace/AISmartMarketplace";

export default function Marketplace() {
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
    <MarketplaceView />
</main>
      {/* </div> */}
      <Footer />
      <AISmartMarketplace />
    </>
  );
}