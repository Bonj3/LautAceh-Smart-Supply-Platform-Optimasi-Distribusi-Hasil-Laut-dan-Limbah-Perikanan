import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react";
import { routes } from "../routes";
import { useAuth, DUMMY_USERS } from "../context/AuthContext";
import logoUrl from "../logoutu.jpeg?url";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(email, password);
    if (result.success) {
      navigate(routes.home);
    } else {
      setError(result.error || "Terjadi kesalahan");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4"
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
      <div className="absolute top-[10%] right-[15%] text-[60px] opacity-10 rotate-12 select-none pointer-events-none">🐟</div>
      <div className="absolute bottom-[15%] left-[10%] text-[80px] opacity-10 -rotate-12 select-none pointer-events-none">🌊</div>

      {/* Back Button */}
      <Link
        to={routes.home}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={18} />
        Kembali ke Beranda
      </Link>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      >
        <div className="flex flex-col items-center mb-8">
          <img
            src={logoUrl}
            alt="PasaiEungkot"
            className="w-16 h-16 rounded-full object-cover shadow-lg mb-4 border-2 border-white/20"
          />
          <h1 className="text-2xl font-bold text-white mb-1">Selamat Datang!</h1>
          <p className="text-sm text-white/60 text-center">
            Masuk untuk mulai mengelola transaksi limbah perikanan Anda.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-xs px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

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
            <div className="flex justify-end mt-2">
              <a href="#" className="text-xs text-[#3CC8D8] hover:text-[#54D9E8] transition-colors">
                Lupa Password?
              </a>
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
                <LogIn size={18} />
                MASUK
              </>
            )}
          </motion.button>
        </form>

        {/* Demo accounts info */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-2 text-center">Akun Demo</p>
          {DUMMY_USERS.map((u) => (
            <button
              key={u.email}
              type="button"
              onClick={() => { setEmail(u.email); setPassword(u.password); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer mb-1 last:mb-0"
            >
              <p className="text-xs text-white/70 font-medium">{u.user.name} <span className="text-white/30">({u.user.role === "seller" ? "Nelayan" : "Pembeli"})</span></p>
              <p className="text-[10px] text-white/40">{u.email}</p>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/50">
          Belum punya akun?{" "}
          <Link to={routes.register} className="text-[#3CC8D8] font-semibold hover:text-[#54D9E8] transition-colors">
            Daftar di sini
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
