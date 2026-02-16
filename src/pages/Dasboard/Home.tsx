import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteLogo from "../../components/SiteLogo";
import instance from "../../hooks/instance";
import { API_URL } from "../../hooks/URL";

interface CategoryType {
  id: number;
  name: string;
}

interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    instance.get<CategoryType[]>(API_URL.categories).then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    instance
      .get<ProductType[]>(API_URL.products, {
        params: {
          title: search.trim() || undefined,
          categoryId: categoryId || undefined,
        },
      })
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [search, categoryId]);

  return (
    <div className="min-h-screen text-slate-100 bg-[linear-gradient(135deg,#060816_0%,#0a1030_45%,#05070f_100%)]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[30%] min-w-[280px] max-w-[380px] border-r border-white/10 bg-[linear-gradient(180deg,rgba(8,10,30,0.95),rgba(6,8,18,0.95))] p-6 lg:block">
          <div className="flex items-center gap-3">
            <SiteLogo />
            <div>
              <p className="text-lg font-semibold leading-none">Admin Panel</p>
              <p className="mt-1 text-sm text-slate-400">Dashboard</p>
            </div>
          </div>

          <p className="mt-10 text-xs font-semibold tracking-widest text-slate-500">MENU</p>

          <nav className="mt-4 space-y-3">
            <Link to="/" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5">  <span className="size-2 rounded-full bg-white/35" /> Home </Link>
            <Link to="/products" className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-sm">  <span className="size-2 rounded-full bg-violet-400" />  Products </Link>
            <Link to="/category" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5">
              <span className="size-2 rounded-full bg-white/35" />   Category   </Link>
          </nav>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[linear-gradient(90deg,rgba(109,40,217,0.45),rgba(79,70,229,0.35),rgba(0,0,0,0.25))] backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
              <div className="flex items-center gap-3">
                <button className="grid size-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#6d28d9,#4f46e5)] text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]" aria-label="Back" title="Back" type="button">  {"<"}   </button>
                <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
              </div>
              <button className="rounded-2xl bg-[linear-gradient(135deg,#6d28d9,#7c3aed)] px-6 py-3 text-sm font-semibold shadow-lg shadow-violet-500/15 active:scale-[0.98]" type="button">  Log out</button>
            </div>
          </header>

          <section className="mx-auto max-w-6xl px-5 pt-6">
            <div className="grid gap-5 md:grid-cols-[1fr,1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur">
                <input value={search} onChange={(e) => { setLoading(true); setSearch(e.target.value); }} placeholder="Qidirish" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
              </div>

              <div className="rounded-2xl border border-violet-400/40 bg-white/5 px-5 py-4 shadow-sm backdrop-blur">
                <select value={categoryId} onChange={(e) => { setLoading(true); setCategoryId(e.target.value); }} className="w-full bg-transparent text-sm outline-none">
                  <option value="" className="bg-[#0b1220]">    All Categories  </option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id} className="bg-[#0b1220]">
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-6">
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="h-48 rounded-xl bg-white/10" />
                    <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
                    <div className="mt-2 h-3 w-full rounded bg-white/10" />
                    <div className="mt-2 h-3 w-2/3 rounded bg-white/10" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur">
                    <img  src={item.images?.[0] || "https://placehold.co/600x400?text=No+Image"}     alt={item.title}  className="h-52 w-full object-cover" onError={(e) => {   (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image"; }} />
                    <div className="p-4">
                      <h3 className="line-clamp-1 text-base font-semibold">{item.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-300">{item.description}</p>
                      <p className="mt-3 text-sm font-semibold text-violet-300">${item.price}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
