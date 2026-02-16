// Home.tsx — FAQAT DESIGN (NO functions, NO state, NO filter logic)
// API data kelganda mappingni o‘zing ulaysan. Hozir static skeleton.

import { Link } from "react-router-dom";
import SiteLogo from "../../components/SiteLogo";

export default function Home() {
  return (
    <div className="min-h-screen text-slate-100 bg-[linear-gradient(135deg,#060816_0%,#0a1030_45%,#05070f_100%)]">
      <div className="flex min-h-screen">
        {/* SIDEBAR ~30% */}
        <aside className="hidden w-[30%] min-w-[280px] max-w-[380px] border-r border-white/10 bg-[linear-gradient(180deg,rgba(8,10,30,0.95),rgba(6,8,18,0.95))] p-6 lg:block">
          <div className="flex items-center gap-3">
          <SiteLogo/>
            <div>
              <p className="text-lg font-semibold leading-none">Admin Panel</p>
              <p className="mt-1 text-sm text-slate-400">Dashboard</p>
            </div>
          </div>

          <p className="mt-10 text-xs font-semibold tracking-widest text-slate-500">MENU</p>

          <nav className="mt-4 space-y-3">
            <Link
              to="/"className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5">
              <span className="size-2 rounded-full bg-white/35" />
              Home
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-sm"
            >
              <span className="size-2 rounded-full bg-violet-400" />
              Products
            </Link>

            <Link to="/category"className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"> <span className="size-2 rounded-full bg-white/35" /> Category</Link>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1">
          {/* HEADER */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[linear-gradient(90deg,rgba(109,40,217,0.45),rgba(79,70,229,0.35),rgba(0,0,0,0.25))] backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
              <div className="flex items-center gap-3">
                <button
                  className="grid size-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#6d28d9,#4f46e5)] text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                  aria-label="Back"
                  title="Back"
                  type="button"
                >
                  ‹
                </button>
                <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
              </div>

              <button
                className="rounded-2xl bg-[linear-gradient(135deg,#6d28d9,#7c3aed)] px-6 py-3 text-sm font-semibold shadow-lg shadow-violet-500/15 active:scale-[0.98]"
                type="button"
              >
                Log out
              </button>
            </div>
          </header>

          {/* SEARCH + CATEGORY */}
          <section className="mx-auto max-w-6xl px-5 pt-6">
            <div className="grid gap-5 md:grid-cols-[1fr,1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur">
                <input
                  placeholder="Qidirish"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="rounded-2xl border border-violet-400/40 bg-white/5 px-5 py-4 shadow-sm backdrop-blur">
                <select className="w-full bg-transparent text-sm outline-none">
                  <option className="bg-[#0b1220]">Miscellaneous</option>
                  <option className="bg-[#0b1220]">Electronics</option>
                  <option className="bg-[#0b1220]">Beauty</option>
                </select>
              </div>
            </div>
          </section>

        
        </main>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
}
