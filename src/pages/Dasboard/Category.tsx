import { useEffect, useMemo, useState } from "react";
import { Boxes, Search, Tags } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CategoryType, ProductsType } from "../../@types";
import DashboardLayout from "../../components/DashboardLayout";
import PATH from "../../components/Path";
import instance from "../../hooks/instance";
import { API_URL } from "../../hooks/URL";

const fallbackCategoryImage =
  "https://placehold.co/640x420/0b1220/e2e8f0?text=Category";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      instance.get<CategoryType[]>(API_URL.categories),
      instance.get<ProductsType[]>(API_URL.products),
    ])
      .then(([categoriesRes, productsRes]) => {
        if (!cancelled) {
          setCategories(categoriesRes.data);
          setProducts(productsRes.data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([]);
          setProducts([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const productCountByCategory = useMemo(() => {
    const counts = new Map<number, number>();
    for (const product of products) {
      const id = product.category?.id;
      if (!id) {
        continue;
      }

      counts.set(id, (counts.get(id) || 0) + 1);
    }
    return counts;
  }, [products]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = query
      ? categories.filter((category) => category.name.toLowerCase().includes(query))
      : categories;

    return [...list].sort(
      (a, b) => (productCountByCategory.get(b.id) || 0) - (productCountByCategory.get(a.id) || 0),
    );
  }, [categories, search, productCountByCategory]);

  const topCategory = filteredCategories[0];
  const topCategoryCount = topCategory ? productCountByCategory.get(topCategory.id) || 0 : 0;

  return (
    <DashboardLayout title="Category" subtitle="Browse categories and jump to filtered products">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-slate-400">Categories</p>
          <p className="mt-2 text-2xl font-semibold text-white">{filteredCategories.length}</p>
          <p className="mt-1 text-xs text-slate-300">Visible from search</p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-slate-400">Total Products</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">{products.length}</p>
          <p className="mt-1 text-xs text-slate-300">Across all categories</p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur sm:col-span-2 xl:col-span-1">
          <p className="text-xs uppercase tracking-wider text-slate-400">Top Category</p>
          <p className="mt-2 text-lg font-semibold text-violet-200">
            {topCategory?.name || "No category"}
          </p>
          <p className="mt-1 text-xs text-slate-300">{topCategoryCount} products</p>
        </article>
      </section>

      <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-sm backdrop-blur sm:p-5">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-300">
            <Search size={13} />
            Search Category
          </span>
          <div className="flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/40 px-3 focus-within:border-violet-300/40 focus-within:ring-2 focus-within:ring-violet-400/30">
            <Search size={16} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type category name..."
              className="h-full w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>
        </label>
      </section>

      <section className="mt-6">
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-3">
                <div className="h-40 rounded-2xl bg-white/10" />
                <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
                <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredCategories.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">No category found</p>
            <p className="mt-1 text-sm text-slate-300">Try a different keyword.</p>
          </div>
        )}

        {!loading && filteredCategories.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((category) => {
              const productCount = productCountByCategory.get(category.id) || 0;
              return (
                <article
                  key={category.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-violet-300/30 hover:shadow-[0_20px_36px_rgba(76,29,149,0.25)]"
                >
                  <img
                    src={category.image || fallbackCategoryImage}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackCategoryImage;
                    }}
                    alt={category.name}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-base font-semibold text-white">{category.name}</h3>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <Boxes size={13} />
                        {productCount} products
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Tags size={13} />
                        #{category.id}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`${PATH.products}?categoryId=${category.id}`)}
                      type="button"
                      className="mt-4 w-full rounded-xl border border-violet-200/20 bg-violet-500/20 px-3 py-2 text-sm font-medium text-violet-100 transition hover:bg-violet-500/30"
                    >
                      Open Products
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Category;
