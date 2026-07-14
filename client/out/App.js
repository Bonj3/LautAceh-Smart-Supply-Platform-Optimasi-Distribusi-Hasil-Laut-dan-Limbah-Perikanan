"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
export default function App() {
  return /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: routes.home, element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: routes.marketplace, element: /* @__PURE__ */ jsx(Marketplace, {}) }),
    /* @__PURE__ */ jsx(Route, { path: routes.contact, element: /* @__PURE__ */ jsx(Contact, {}) }),
    /* @__PURE__ */ jsx(Route, { path: routes.login, element: /* @__PURE__ */ jsx(Login, {}) }),
    /* @__PURE__ */ jsx(Route, { path: routes.register, element: /* @__PURE__ */ jsx(Register, {}) })
  ] }) }) });
}
