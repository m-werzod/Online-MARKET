import { useEffect, useState } from "react";
import { ArrowLeft, Boxes, Heart, ShoppingCart, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProductsType } from "../../@types";
import DashboardLayout from "../../components/DashboardLayout";
import NotFound from "../NotFound";
import instance from "../../hooks/instance";
import { API_URL } from "../../hooks/URL";
import { useProductActions } from "../../context/product-actions-context";

const fallbackImage =
  "https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-svg-download-png-2809510.png";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLiked, isInCart, toggleLike, toggleCart } = useProductActions();
  const [product, setProduct] = useState<ProductsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const productId = Number(id);

    if (!Number.isFinite(productId) || productId <= 0) {
      setNotFound(true);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    instance
      .get<ProductsType>(`${API_URL.products}/${productId}`)
      .then((res) => {
        if (!cancelled) {
          setProduct(res.data);
          setNotFound(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProduct(null);
          setNotFound(true);
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
  }, [id]);

  if (!loading && notFound) {
    return <NotFound />;
  }

  return (
    <DashboardLayout title="Product Details" subtitle="Full product information and actions">
      {loading && (
        <div className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <div className="h-64 rounded-2xl bg-white/10 sm:h-80" />
          <div className="mt-4 h-5 w-2/3 rounded bg-white/10" />
          <div className="mt-3 h-4 w-full rounded bg-white/10" />
          <div className="mt-2 h-4 w-5/6 rounded bg-white/10" />
        </div>
      )}

      {!loading && product && (
        <section className="grid gap-4 lg:grid-cols-[1.05fr,1fr]">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
            <img
              src={product.images?.[0] || fallbackImage}
              onError={(event) => {
                (event.target as HTMLImageElement).src = fallbackImage;
              }}
              alt={product.title}
              className="h-72 w-full object-cover sm:h-[420px]"
            />
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-indigo-300/25 bg-indigo-500/20 px-3 py-1 text-xs text-indigo-100">
                <Tag size={13} />
                {product.category?.name || "Uncategorized"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
                <Boxes size={13} />#{product.id}
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {product.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {product.description}
            </p>

            <p className="mt-5 text-2xl font-semibold text-emerald-300 sm:text-3xl">
              ${product.price.toLocaleString()}
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-white/15"
                type="button"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button
                onClick={() => toggleLike(product.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  isLiked(product.id)
                    ? "border-rose-300/30 bg-rose-500/25 text-rose-100 hover:bg-rose-500/35"
                    : "border-white/20 bg-white/10 text-slate-100 hover:bg-white/15"
                }`}
                type="button"
              >
                <Heart size={16} fill={isLiked(product.id) ? "currentColor" : "none"} />
                {isLiked(product.id) ? "Liked" : "Like"}
              </button>

              <button
                onClick={() => toggleCart(product.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  isInCart(product.id)
                    ? "border-emerald-300/30 bg-emerald-500/25 text-emerald-100 hover:bg-emerald-500/35"
                    : "border-white/20 bg-white/10 text-slate-100 hover:bg-white/15"
                }`}
                type="button"
              >
                <ShoppingCart size={16} />
                {isInCart(product.id) ? "In Cart" : "Add Cart"}
              </button>
            </div>

            {product.images?.length > 1 && (
              <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {product.images.slice(1, 5).map((img, index) => (
                  <img
                    key={`${img}-${index}`}
                    src={img}
                    onError={(event) => {
                      (event.target as HTMLImageElement).src = fallbackImage;
                    }}
                    alt={`${product.title} ${index + 2}`}
                    className="h-20 w-full rounded-xl border border-white/10 object-cover"
                  />
                ))}
              </div>
            )}
          </article>
        </section>
      )}
    </DashboardLayout>
  );
};

export default ProductDetails;
