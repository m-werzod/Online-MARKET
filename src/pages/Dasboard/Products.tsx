import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import type { CategoryType, ProductsType } from "../../@types";
import DashboardLayout from "../../components/DashboardLayout";
import ProductCard from "../../components/ProductCard";
import instance from "../../hooks/instance";
import { API_URL } from "../../hooks/URL";

type SortType = "latest" | "priceAsc" | "priceDesc";

const PRODUCTS_PER_PAGE = 6;

function waitSearchDelay() {
  const delay = Math.floor(Math.random() * 1001) + 1000;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<ProductsType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get("search") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "all");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [page, setPage] = useState(1);

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
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const nextParams = new URLSearchParams();
    if (debouncedSearch) {
      nextParams.set("search", debouncedSearch);
    }
    if (categoryId !== "all") {
      nextParams.set("categoryId", categoryId);
    }
    setSearchParams(nextParams, { replace: true });
  }, [debouncedSearch, categoryId, setSearchParams]);

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
          setError("Could not load products.");
          setProducts([]);
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
  }, [debouncedSearch, categoryId]);

  function handleSearchChange(value: string) {
    setLoading(true);
    setError("");
    setPage(1);
    setSearch(value);
  }

  function handleCategoryChange(value: string) {
    setLoading(true);
    setError("");
    setPage(1);
    setCategoryId(value);
  }

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "priceAsc":
        return list.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return list.sort((a, b) => b.price - a.price);
      case "latest":
      default:
        return list.sort((a, b) => b.id - a.id);
    }
  }, [products, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage, sortedProducts]);

  const startItem = sortedProducts.length === 0 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length);

  return (
    <DashboardLayout title="Products" subtitle="Explore, sort and paginate your catalog">
      <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-sm backdrop-blur sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.4fr,1fr,1fr]">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-300">
              <Search size={13} />
              Search
            </span>
            <div className="flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/40 px-3 focus-within:border-violet-300/40 focus-within:ring-2 focus-within:ring-violet-400/30">
              <Search size={16} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by product title..."
                className="h-full w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
              {search && (
                <button
                  onClick={() => handleSearchChange("")}
                  type="button"
                  className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
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
              Sort
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 text-sm text-slate-100 outline-none transition focus:border-violet-300/40 focus:ring-2 focus:ring-violet-400/30"
            >
              <option value="latest">Latest</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
            </select>
          </label>
        </div>
      </section>

      <section className="mt-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-300">
            Showing <span className="font-semibold text-white">{startItem}</span>-
            <span className="font-semibold text-white">{endItem}</span> of{" "}
            <span className="font-semibold text-white">{sortedProducts.length}</span>
          </p>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
            Page {currentPage} / {totalPages}
          </div>
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, idx) => (
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
          <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 p-6 text-center text-rose-100">
            {error}
          </div>
        )}

        {!loading && !error && pagedProducts.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">No products on this filter</p>
            <p className="mt-1 text-sm text-slate-300">Try changing category or search text.</p>
          </div>
        )}

        {!loading && !error && pagedProducts.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pagedProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!loading && !error && sortedProducts.length > 0 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(1, Math.min(totalPages, prev - 1)))}
              disabled={currentPage === 1}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((prev) => Math.max(1, Math.min(totalPages, prev + 1)))}
              disabled={currentPage === totalPages}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Products;
