import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin | Swar Shah";
    if (user) navigate("/admin", { replace: true });
  }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
      toast.success("Welcome back.");
      navigate("/admin");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" data-testid="admin-login-page">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <form onSubmit={submit} className="relative w-full max-w-md rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-8 md:p-10" data-testid="admin-login-form">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white mb-6">
          <Lock size={16} />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-white">Admin sign in</h1>
        <p className="text-sm text-zinc-500 mt-2">Blog CMS access · authorized users only</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="text-xs text-zinc-400 mb-2 block">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" data-testid="admin-email" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-2 block">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" data-testid="admin-password" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition disabled:opacity-60" data-testid="admin-login-submit">
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
