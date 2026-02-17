import type { FC } from "react";
import type { ProductsType } from "../@types";
import { EllipsisVertical, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PATH from "./Path";
import { useProductActions } from "../context/product-actions-context";

const ProductCard: FC<{ item: ProductsType }> = ({ item }) => {
  const navigate = useNavigate();
  const { isLiked, isInCart, toggleLike, toggleCart } = useProductActions();
  const errorImg =
    "https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-svg-download-png-2809510.png";
  const firstImage = item.images?.[0] || errorImg;
  const liked = isLiked(item.id);
  const inCart = isInCart(item.id);

  function handleMoreClick() {
    navigate(PATH.productDetailsById(item.id));
  }

  return (
    <article className="w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-56 overflow-hidden">
        <img
          onError={(evt) => {
            (evt.target as HTMLImageElement).src = errorImg;
          }}
          src={firstImage}
          alt={item.title}
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/20">
          {item.category?.name || "Uncategorized"}
        </span>
        <button
          onClick={handleMoreClick}
          className="absolute top-3 right-3 cursor-pointer rounded-full border border-indigo-400/20 bg-indigo-500/30 p-1 text-indigo-300 duration-300 hover:bg-indigo-600 hover:text-white"
          title="More details"
          type="button"
        >
          <EllipsisVertical size={15} />
        </button>
        <button
          onClick={() => toggleLike(item.id)}
          className={`absolute top-10 right-3 cursor-pointer rounded-full border p-1 duration-300 ${
            liked
              ? "border-rose-300/40 bg-rose-500/40 text-rose-100 hover:bg-rose-500/55"
              : "border-indigo-400/20 bg-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white"
          }`}
          title={liked ? "Unlike" : "Like"}
          type="button"
        >
          <Heart size={15} fill={liked ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => toggleCart(item.id)}
          className={`absolute right-3 top-[68px] cursor-pointer rounded-full border p-1 duration-300 ${
            inCart
              ? "border-emerald-300/40 bg-emerald-500/40 text-emerald-100 hover:bg-emerald-500/55"
              : "border-indigo-400/20 bg-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white"
          }`}
          title={inCart ? "Remove from cart" : "Add to cart"}
          type="button"
        >
          <ShoppingCart size={15} />
        </button>
      </div>
      <div className="p-4 flex-col justify-between">
        <h3 className="text-white font-semibold text-base line-clamp-1">{item.title}</h3>
        <p className="text-slate-400 text-sm mt-2 line-clamp-4">{item.description}</p>
        <div className="flex items-center mt-5 justify-between">
          <span className="text-indigo-200 font-semibold text-lg">{item.price.toLocaleString()} $</span>
          <span className="text-xs text-slate-200">#{item.id}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
