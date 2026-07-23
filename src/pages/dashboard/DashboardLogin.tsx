import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { pipelineAuth } from "@/services/pipelineAuth";

export default function DashboardLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await pipelineAuth.login(email, password);
    setLoading(false);
    if (res.ok) navigate(from, { replace: true });
    else setError(res.error ?? "Login failed.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07080d] px-5">
      <Helmet>
        <title>Sign in — Sales Pipeline | Boostmysites</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div
        className="w-full max-w-[400px] rounded-2xl border border-white/12 p-8"
        style={{ background: "linear-gradient(180deg, rgba(30,42,80,0.5) 0%, rgba(8,12,28,0.9) 100%)" }}
      >
        <div className="mb-6 flex items-center gap-3">
          <img src="/bms-logo.png" alt="Boostmysites" className="size-9 rounded-lg bg-white p-1" />
          <div>
            <h1 className="text-lg font-semibold text-white">Sales Pipeline</h1>
            <p className="text-[12px] text-white/50">Boostmysites internal dashboard</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="text-[13px] text-white/70">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 p-3 text-sm text-white placeholder:text-white/40 focus:border-[#4b78ff] focus:outline-none"
              placeholder="you@boostmysites.com"
            />
          </label>
          <label className="text-[13px] text-white/70">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 p-3 text-sm text-white placeholder:text-white/40 focus:border-[#4b78ff] focus:outline-none"
              placeholder="••••••••"
            />
          </label>
          {error ? <p className="text-[13px] text-red-300/90">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-[#4b78ff] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d63d8] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
