import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import MarketplaceView from "../sections/Marketplace/MarketplaceView";

export default function Marketplace() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <MarketplaceView />
      </div>
      <Footer />
    </>
  );
}