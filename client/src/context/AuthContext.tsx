import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  role: "buyer" | "seller";
  avatar?: string;
}

// Dummy users for testing
export const DUMMY_USERS: { email: string; password: string; user: User }[] = [
  {
    email: "nelayan@pasai.com",
    password: "123456",
    user: {
      name: "Muhammad Rafli",
      email: "nelayan@pasai.com",
      role: "seller",
    },
  },
  {
    email: "pembeli@pasai.com",
    password: "123456",
    user: {
      name: "Siti Nurhaliza",
      email: "pembeli@pasai.com",
      role: "buyer",
    },
  },
];

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: "buyer" | "seller") => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200));

    if (!email || !password) {
      return { success: false, error: "Email dan password harus diisi" };
    }

    // Check dummy users
    const found = DUMMY_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found.user);
      return { success: true };
    }

    // For any other email/password combo, create a dummy session
    if (email.includes("@") && password.length >= 4) {
      setUser({
        name: email.split("@")[0],
        email,
        role: "buyer",
      });
      return { success: true };
    }

    return { success: false, error: "Email atau password salah" };
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "buyer" | "seller"
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200));

    if (!name || !email || !password) {
      return { success: false, error: "Semua kolom harus diisi" };
    }

    // Dummy: auto-register and log in
    setUser({ name, email, role });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
