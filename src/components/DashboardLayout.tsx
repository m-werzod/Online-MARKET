import { useContext, useEffect, useState, type FC, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ChevronLeft,
  CircleHelp,
  Heart,
  House,
  LoaderCircle,
  LogOut,
  Menu,
  ShoppingCart,
  Tags,
  X,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/app-context";
import { useProductActions } from "../context/product-actions-context";
import Modal from "./Modal";
import PATH from "./Path";
import SiteLogo from "./SiteLogo";

interface DashboardLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

interface NavItemType {
  to: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItemType[] = [
  { to: PATH.home, label: "Home", icon: House },
  { to: PATH.products, label: "Products", icon: Boxes },
  { to: PATH.category, label: "Category", icon: Tags },
  { to: PATH.about, label: "About Us", icon: CircleHelp },
];

const DashboardLayout: FC<DashboardLayoutProps> = ({ title, subtitle, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useContext(Context);
  const { likedIds, cartIds } = useProductActions();

  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setOpenMobileMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!openMobileMenu) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openMobileMenu]);

  async function handleLogoutConfirm() {
    if (isLoggingOut) {
      return;
    }

    setOpenLogoutModal(false);
    setIsLoggingOut(true);
    const logoutDelay = Math.floor(Math.random() * 2001) + 1000;

    await new Promise((resolve) => setTimeout(resolve, logoutDelay));
    setToken(null);
    navigate(PATH.login, { replace: true });
  }

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(PATH.home);
  }

  function getNavClass(isActive: boolean) {
    return isActive
      ? "group flex w-full items-center gap-2 rounded-2xl border border-violet-300/30 bg-violet-500/20 px-4 py-2.5 text-sm font-semibold text-violet-100 shadow-[0_8px_22px_rgba(139,92,246,0.25)]"
      : "group flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white";
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#060816_0%,#0a1030_45%,#05070f_100%)] text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-[26%] min-w-[255px] max-w-[320px] border-r border-white/10 bg-[linear-gradient(180deg,rgba(8,10,30,0.96),rgba(6,8,18,0.98))] p-6 xl:block">
          <div className="flex items-center gap-3">
            <SiteLogo />
            <div>
              <p className="text-lg font-semibold leading-none">Admin Panel</p>
              <p className="mt-1 text-xs text-slate-400">Control workspace</p>
            </div>
          </div>

          <p className="mt-10 text-xs font-semibold tracking-widest text-slate-500">MENU</p>
          <nav className="mt-4 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => getNavClass(isActive)}>
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-200/80">Quick Note</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Use search and category filters together to find products faster.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs text-slate-200">
                <Heart size={13} />
                Liked: {likedIds.length}
              </div>
              <div className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs text-slate-200">
                <ShoppingCart size={13} />
                Cart: {cartIds.length}
              </div>
            </div>
          </div>
        </aside>

        <div className={`fixed inset-0 z-40 xl:hidden ${openMobileMenu ? "" : "pointer-events-none"}`}>
          <button
            onClick={() => setOpenMobileMenu(false)}
            className={`absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity ${
              openMobileMenu ? "opacity-100" : "opacity-0"
            }`}
            type="button"
            aria-label="Close menu overlay"
          />

          <aside
            className={`relative h-full w-[84%] max-w-[320px] border-r border-white/10 bg-[linear-gradient(180deg,rgba(8,10,30,0.98),rgba(6,8,18,0.99))] p-4 transition-transform duration-300 ${
              openMobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SiteLogo />
                <div>
                  <p className="text-sm font-semibold leading-none">Admin Panel</p>
                  <p className="mt-1 text-[11px] text-slate-400">Navigation</p>
                </div>
              </div>

              <button
                onClick={() => setOpenMobileMenu(false)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-200"
                type="button"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="mt-6 space-y-2.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpenMobileMenu(false)}
                    className={({ isActive }) => getNavClass(isActive)}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-violet-200/80">Quick Stats</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs text-slate-200">
                  <Heart size={13} />
                  {likedIds.length}
                </div>
                <div className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs text-slate-200">
                  <ShoppingCart size={13} />
                  {cartIds.length}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <main className="flex-1">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[linear-gradient(90deg,rgba(109,40,217,0.35),rgba(79,70,229,0.25),rgba(0,0,0,0.3))] backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setOpenMobileMenu(true)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/10 text-white xl:hidden sm:h-11 sm:w-11 sm:rounded-2xl"
                    type="button"
                    aria-label="Open menu"
                  >
                    <Menu size={18} />
                  </button>

                  <button
                    onClick={handleBack}
                    className="group grid h-10 w-10 place-items-center rounded-xl border border-indigo-200/20 bg-[linear-gradient(135deg,#4f46e5,#7c3aed)] text-white shadow-[0_10px_24px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(124,58,237,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:translate-y-0 active:scale-[0.98] sm:h-11 sm:w-11 sm:rounded-2xl"
                    type="button"
                    aria-label="Back"
                    title="Go Back"
                  >
                    <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5 sm:size-5" />
                  </button>
                  <div className="min-w-0">
                    <h1 className="truncate text-base font-semibold tracking-tight sm:text-2xl">{title}</h1>
                    <p className="hidden truncate text-xs text-slate-300 sm:block sm:text-sm">{subtitle}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => navigate(PATH.products)}
                    type="button"
                    className="inline-flex items-center gap-1 rounded-xl border border-rose-200/20 bg-rose-500/15 px-2 py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/25 sm:px-3"
                    title="Liked products"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-rose-500/30">
                      <Heart size={14} />
                    </span>
                    <span className="hidden sm:inline">Like</span>
                    <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[11px]">{likedIds.length}</span>
                  </button>

                  <button
                    onClick={() => navigate(PATH.products)}
                    type="button"
                    className="inline-flex items-center gap-1 rounded-xl border border-emerald-200/20 bg-emerald-500/15 px-2 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/25 sm:px-3"
                    title="Cart products"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-500/30">
                      <ShoppingCart size={14} />
                    </span>
                    <span className="hidden sm:inline">Karzinka</span>
                    <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[11px]">{cartIds.length}</span>
                  </button>

                  <button
                    onClick={() => setOpenLogoutModal(true)}
                    disabled={isLoggingOut}
                    className="group inline-flex cursor-pointer items-center gap-1 rounded-xl border border-rose-200/20 bg-[linear-gradient(135deg,#ef4444,#db2777)] px-2 py-2 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(244,63,94,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(236,72,153,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                    type="button"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/20">
                      <LogOut size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </span>
                    <span className="hidden sm:inline">Log out</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-6">{children}</div>
        </main>
      </div>

      <Modal open={openLogoutModal} onClose={() => setOpenLogoutModal(false)}>
        <div className="space-y-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-rose-300/25 bg-rose-500/20 text-rose-100 shadow-inner shadow-rose-500/25">
              <LogOut size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Chiqishni tasdiqlaysizmi?</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                Tasdiqlash bosilsa, login sahifasiga qaytasiz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <button
              onClick={() => setOpenLogoutModal(false)}
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-100 transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-[0.98]"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleLogoutConfirm}
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-rose-200/20 bg-[linear-gradient(135deg,#ef4444,#db2777)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(244,63,94,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(236,72,153,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:translate-y-0 active:scale-[0.98]"
            >
              Tasdiqlash
            </button>
          </div>
        </div>
      </Modal>

      {isLoggingOut && (
        <div className="fixed inset-0 z-50 grid place-items-center">
          <div className="absolute inset-0 cursor-wait bg-slate-950/10 backdrop-blur-sm" />
          <div className="relative flex flex-col items-center justify-center text-center">
            <LoaderCircle size={40} className="animate-spin text-violet-200" />
            <h3 className="mt-4 text-lg font-semibold tracking-tight">Logging out...</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
