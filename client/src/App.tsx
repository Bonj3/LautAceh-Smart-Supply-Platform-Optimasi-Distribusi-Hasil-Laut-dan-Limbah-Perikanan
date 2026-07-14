import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";

// Import halaman-halamannya
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* URL: "/" */}
        <Route path={routes.home} element={<Home />} />

        {/* URL: "/marketplace" */}
        <Route path={routes.marketplace} element={<Marketplace />} />

        {/* URL: "/contact" */}
        <Route path={routes.contact} element={<Contact />} />

        {/* URL: "/login" */}
        <Route path={routes.login} element={<Login />} />

        {/* URL: "/register" */}
        <Route path={routes.register} element={<Register />} />

        {/* Catatan: Untuk Education dan Dashboard bisa kamu tambahkan 
            nanti kalau file halamannya sudah dibuat */}
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}