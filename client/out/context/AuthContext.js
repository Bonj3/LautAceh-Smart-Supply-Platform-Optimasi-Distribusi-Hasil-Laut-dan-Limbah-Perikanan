"use strict";
import { jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
export const DUMMY_USERS = [
  {
    email: "nelayan@pasai.com",
    password: "123456",
    user: {
      name: "Muhammad Rafli",
      email: "nelayan@pasai.com",
      role: "seller"
    }
  },
  {
    email: "pembeli@pasai.com",
    password: "123456",
    user: {
      name: "Siti Nurhaliza",
      email: "pembeli@pasai.com",
      role: "buyer"
    }
  }
];
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    await new Promise((r) => setTimeout(r, 1200));
    if (!email || !password) {
      return { success: false, error: "Email dan password harus diisi" };
    }
    const found = DUMMY_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found.user);
      return { success: true };
    }
    if (email.includes("@") && password.length >= 4) {
      setUser({
        name: email.split("@")[0],
        email,
        role: "buyer"
      });
      return { success: true };
    }
    return { success: false, error: "Email atau password salah" };
  };
  const register = async (name, email, password, role) => {
    await new Promise((r) => setTimeout(r, 1200));
    if (!name || !email || !password) {
      return { success: false, error: "Semua kolom harus diisi" };
    }
    setUser({ name, email, role });
    return { success: true };
  };
  const logout = () => {
    setUser(null);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, isLoggedIn: !!user, login, register, logout }, children });
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
