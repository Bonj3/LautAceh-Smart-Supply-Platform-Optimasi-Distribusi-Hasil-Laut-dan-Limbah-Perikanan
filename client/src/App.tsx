import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Import halaman-halamannya
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portal from "./pages/Portal";
import Category from "./pages/Category";
import Penjual from "./pages/Penjual";
import News from "./pages/News";
import Faq from "./pages/Faq";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
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

            {/* URL: "/portal" */}
            <Route path={routes.portal} element={<Portal />} />

            {/* URL: "/category" */}
            <Route path={routes.category} element={<Category />} />

            {/* URL: "/penjual" */}
            <Route path={routes.penjual} element={<Penjual />} />

            {/* URL: "/news" */}
            <Route path={routes.news} element={<News />} />

            {/* URL: "/faq" */}
            <Route path={routes.faq} element={<Faq />} />

            {/* URL: "/checkout" */}
            <Route path={routes.checkout} element={<Checkout />} />

            {/* URL: "/orders/:orderId" */}
            <Route path={routes.orderTracking} element={<OrderTracking />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
