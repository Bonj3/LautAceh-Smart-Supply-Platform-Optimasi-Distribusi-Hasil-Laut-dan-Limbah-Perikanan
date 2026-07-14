import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes"; // Mengambil kamus URL dari temanmu

// Import halaman-halamannya
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import Portal from "./pages/Portal";
import Category from "./pages/Category";
import Penjual from "./pages/Penjual";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* URL: "/" */}
        <Route path={routes.home} element={<Home />} />

        {/* URL: "/marketplace" */}
        <Route path={routes.marketplace} element={<Marketplace />} />

        {/* URL: "/contact" */}
        <Route path={routes.contact} element={<Contact />} />

        {/* URL: "/portal" */}
        <Route path={routes.portal} element={<Portal />} />

        {/* URL: "/category" */}
        <Route path={routes.category} element={<Category />} />

        {/* URL: "/penjual" */}
        <Route path={routes.penjual} element={<Penjual />} />

        {/* Catatan: Untuk Education dan Dashboard bisa kamu tambahkan 
            nanti kalau file halamannya sudah dibuat */}
      </Routes>
    </BrowserRouter>
  );
}