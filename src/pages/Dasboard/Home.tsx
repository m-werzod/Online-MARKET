import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import type { CategoryType, ProductsType } from "../../@types";
import DashboardLayout from "../../components/DashboardLayout";
import ProductCard from "../../components/ProductCard";
import instance from "../../hooks/instance";
import { API_URL } from "../../hooks/URL";

type SortType = "latest" | "nameAsc" | "priceAsc" | "priceDesc";

function waitSearchDelay() {
  const delay = Math.floor(Math.random() * 1001) + 1000;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const Home = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sortBy, setSortBy] = useState<SortType>("latest");

  useEffect(() => {
    let cancelled = false;

    instance
      .get<CategoryType[]>(API_URL.categories)
      .then((res) => {
        if (!cancelled) {
          setCategories(res.data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (debouncedSearch) {
          await waitSearchDelay();
        }

        const res = await instance.get<ProductsType[]>(API_URL.products, {
          params: {
            title: debouncedSearch || undefined,
            categoryId: categoryId === "all" ? undefined : categoryId,
          },
        });

        if (!cancelled) {
          setProducts(res.data);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
          setError("Products could not be loaded. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, categoryId, refreshKey]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortBy) {
      case "nameAsc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "priceAsc":
        return list.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return list.sort((a, b) => b.price - a.price);
      case "latest":
      default:
        return list.sort((a, b) => b.id - a.id);
    }
  }, [products, sortBy]);

  const metrics = useMemo(() => {
    const total = sortedProducts.length;
    const avgPrice = total
      ? Math.round(sortedProducts.reduce((sum, item) => sum + item.price, 0) / total)
      : 0;
    const maxPrice = total ? Math.max(...sortedProducts.map((item) => item.price)) : 0;

    return {
      total,
      avgPrice,
      maxPrice,
    };
  }, [sortedProducts]);

  const activeCategoryName = useMemo(() => {
    if (categoryId === "all") {
      return "All categories";
    }

    return categories.find((category) => String(category.id) === categoryId)?.name || "Unknown";
  }, [categories, categoryId]);

  function handleSearchChange(value: string) {
    setLoading(true);
    setError("");
    setSearch(value);
  }

  function handleCategoryChange(value: string) {
    setLoading(true);
    setError("");
    setCategoryId(value);
  }

  function handleRetry() {
    setLoading(true);
    setError("");
    setRefreshKey((value) => value + 1);
  }

  function handleResetFilters() {
    setLoading(true);
    setError("");
    setSearch("");
    setCategoryId("all");
    setSortBy("latest");
  }

  return (
    <DashboardLayout title="Home" subtitle="Products overview with smart filters">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-slate-400">Visible Products</p>
          <p className="mt-2 text-2xl font-semibold text-white">{metrics.total}</p>
          <p className="mt-1 text-xs text-slate-300">After current filters</p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-slate-400">Average Price</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">
            ${metrics.avgPrice.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-300">Across visible items</p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur sm:col-span-2 xl:col-span-1">
          <p className="text-xs uppercase tracking-wider text-slate-400">Highest Price</p>
          <p className="mt-2 text-2xl font-semibold text-violet-300">
            ${metrics.maxPrice.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-300">{activeCategoryName}</p>
        </article>
      </section>

      <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-sm backdrop-blur sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.4fr,1fr,1fr]">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-300">
              <Search size={13} />
              Search Product
            </span>
            <div className="flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/40 px-3 focus-within:border-violet-300/40 focus-within:ring-2 focus-within:ring-violet-400/30">
              <Search size={16} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Type product title..."
                className="h-full w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
              {search && (
                <button
                  onClick={() => handleSearchChange("")}
                  type="button"
                  className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-300">
              Category
            </span>
            <select
              value={categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 text-sm text-slate-100 outline-none transition focus:border-violet-300/40 focus:ring-2 focus:ring-violet-400/30"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-300">
              <SlidersHorizontal size={13} />
              Sort By
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 text-sm text-slate-100 outline-none transition focus:border-violet-300/40 focus:ring-2 focus:ring-violet-400/30"
            >
              <option value="latest">Latest</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition ${categoryId === "all" ? "border-violet-300/40 bg-violet-500/25 text-violet-100" : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`}
            type="button"
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(String(category.id))}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition ${categoryId === String(category.id) ? "border-violet-300/40 bg-violet-500/25 text-violet-100" : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Products Result ({sortedProducts.length})
          </h2>
          <button
            onClick={handleResetFilters}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Sparkles size={14} />
            Reset Filters
          </button>
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-3">
                <div className="h-56 rounded-2xl bg-white/10" />
                <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
                <div className="mt-2 h-3 w-full rounded bg-white/10" />
                <div className="mt-2 h-3 w-2/3 rounded bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 p-6 text-center">
            <p className="text-sm text-rose-100">{error}</p>
            <button
              onClick={handleRetry}
              type="button"
              className="mt-3 rounded-xl border border-rose-200/30 bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-50 transition hover:bg-rose-500/30"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && sortedProducts.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">No products found</p>
            <p className="mt-1 text-sm text-slate-300">
              Change search or category to find matching products.
            </p>
            <button
              onClick={handleResetFilters}
              type="button"
              className="mt-4 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/15"
            >
              Clear Filters
            </button>
          </div>
        )}

        {!loading && !error && sortedProducts.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sortedProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Home;
