import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, User, UserPlus } from "lucide-react";
import { routes } from "../routes";
import { useAuth } from "../context/AuthContext";
import logoUrl from "../logoutu.jpeg?url";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Semua kolom harus diisi");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      setIsLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("Password minimal 4 karakter");
      setIsLoading(false);
      return;
    }

    const result = await register(name, email, password, role);
    if (result.success) {
      navigate(routes.home);
    } else {
      setError(result.error || "Terjadi kesalahan");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 py-12"
      style={{
        background: "linear-gradient(135deg, #022c35 0%, #055a6e 40%, #0e96b0 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Background Decor */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(60,200,216,0.4) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(8,145,178,0.4) 0%, transparent 40%)`,
        }}
      />
      <div className="absolute top-[10%] left-[15%] text-[60px] opacity-10 -rotate-12 select-none pointer-events-none">🦞</div>
      <div className="absolute bottom-[10%] right-[10%] text-[80px] opacity-10 rotate-12 select-none pointer-events-none">🌊</div>

      {/* Back Button */}
      <Link
        to={routes.home}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={18} />
        Kembali ke Beranda
      </Link>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src={logoUrl}
            alt="PasaiEungkot"
            className="w-16 h-16 rounded-full object-cover shadow-lg mb-4 border-2 border-white/20"
          />
          <h1 className="text-2xl font-bold text-white mb-1">Daftar Akun Baru</h1>
          <p className="text-sm text-white/60 text-center">
            Bergabung dengan ekosistem perikanan sirkular Aceh.
          </p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-xs px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === "buyer"
                  ? "bg-[#3CC8D8] text-white shadow-md"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Pembeli
            </button>
            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === "seller"
                  ? "bg-[#3CC8D8] text-white shadow-md"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Nelayan / Pengepul
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5 ml-1">Nama Lengkap</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={16} className="text-white/40" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#3CC8D8] focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={16} className="text-white/40" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#3CC8D8] focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={16} className="text-white/40" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#3CC8D8] focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5 ml-1">Konfirmasi Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={16} className="text-white/40" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#3CC8D8] focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            style={{
              background: "linear-gradient(135deg, #3CC8D8, #0891b2)",
            }}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus size={18} />
                DAFTAR SEKARANG
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          Sudah punya akun?{" "}
          <Link to={routes.login} className="text-[#3CC8D8] font-semibold hover:text-[#54D9E8] transition-colors">
            Masuk di sini
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
