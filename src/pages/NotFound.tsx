import { ArrowLeft, House, SearchX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PATH from "../components/Path";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#05070f_0%,#0b1220_45%,#05070f_100%)] px-4 py-8 text-slate-100 sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-4xl place-items-center">
        <section className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <SearchX size={14} />
            Route not found
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-[linear-gradient(90deg,#c4b5fd_0%,#60a5fa_45%,#34d399_100%)] bg-clip-text text-transparent">
              404
            </span>{" "}
            page missing
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            You are trying to open a page that does not exist or has been moved.
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-white/15"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>

            <Link
              to={PATH.login}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#7c3aed_0%,#6366f1_35%,#22c55e_100%)] px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              <House size={16} />
              Home
            </Link>

            <Link
              to={PATH.products}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-white/15"
            >
              Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
