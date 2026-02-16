// NotFound.tsx — animated, premium, Tailwind-only (no libs)
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(1200px_700px_at_15%_10%,rgba(56,189,248,0.16),transparent_60%),radial-gradient(900px_520px_at_85%_20%,rgba(168,85,247,0.16),transparent_58%),radial-gradient(1000px_600px_at_50%_110%,rgba(34,197,94,0.12),transparent_58%),linear-gradient(135deg,#05070f_0%,#0b1220_45%,#05070f_100%)] text-slate-100">
      {/* floating blobs */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]" />
      <div className="pointer-events-none absolute left-1/3 bottom-[-120px] h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl animate-[float_14s_ease-in-out_infinite]" />

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/35 backdrop-blur-xl">
            {/* shine */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rotate-12 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

            {/* animated badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]" />
              Route not found
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr,260px] md:items-center">
              {/* left text */}
              <div>
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  <span className="bg-[linear-gradient(90deg,#a78bfa_0%,#60a5fa_35%,#34d399_110%)] bg-clip-text text-transparent">
                    404
                  </span>{" "}
                  page missing.
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Siz ochmoqchi bo‘lgan sahifa yo‘q yoki ko‘chirilgan. Back
                  qiling yoki Home’ga qayting.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => nav(-1)}
                    className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 shadow-sm transition hover:bg-white/10 active:scale-[0.99]"
                  >
                    <span className="grid size-9 place-items-center rounded-xl bg-white/5 transition group-hover:bg-white/10">
                      ←
                    </span>
                    Go back
                  </button>

                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(90deg,#7c3aed_0%,#6366f1_35%,#22c55e_110%)] px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/20 transition hover:brightness-110 active:scale-[0.99]"
                  >
                    Home
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition hover:bg-black/30 active:scale-[0.99]"
                  >
                    Products
                  </Link>
                </div>
              </div>

              {/* right visual */}
              <div className="relative mx-auto w-full max-w-[260px]">
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.18),rgba(99,102,241,0.14),rgba(34,197,94,0.12))] shadow-xl shadow-black/30">
                  {/* orbit ring */}
                  <div className="pointer-events-none absolute inset-[-18%] rounded-full border border-white/10 opacity-60 animate-[spin_9s_linear_infinite]" />
                  <div className="pointer-events-none absolute inset-[-30%] rounded-full border border-white/10 opacity-30 animate-[spin_14s_linear_infinite_reverse]" />

                  {/* bouncing core */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="relative">
                      <div className="absolute -inset-10 rounded-full bg-violet-500/15 blur-2xl animate-pulse" />
                      <div className="grid size-24 place-items-center rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-indigo-500/10 backdrop-blur animate-[float_6s_ease-in-out_infinite]">
                        <span className="text-3xl">✦</span>
                      </div>
                    </div>
                  </div>

                  {/* scan line */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),transparent)] opacity-60 animate-[scan_2.6s_ease-in-out_infinite]" />
                </div>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Tip: URL’ni tekshirib ko‘r.
                </p>
              </div>
            </div>

            {/* footer micro */}
            <div className="mt-8 flex items-center justify-between text-xs text-slate-400">
              <span className="opacity-80">Admin Panel UI</span>
              <span className="opacity-80">v1.0</span>
            </div>
          </div>

          {/* tiny hint bar */}
          <div className="mt-4 text-center text-xs text-slate-500">
            Press <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">Alt</span>{" "}
            + <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">←</span>{" "}
            to go back.
          </div>
        </div>
      </div>
    </div>
  );
}
