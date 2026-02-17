import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from "react";

interface ProductActionsContextType {
  likedIds: number[];
  cartIds: number[];
  isLiked: (id: number) => boolean;
  isInCart: (id: number) => boolean;
  toggleLike: (id: number) => void;
  toggleCart: (id: number) => void;
}

const LIKED_KEY = "online_market_liked_ids";
const CART_KEY = "online_market_cart_ids";

const ProductActionsContext = createContext<ProductActionsContextType>({
  likedIds: [],
  cartIds: [],
  isLiked: () => false,
  isInCart: () => false,
  toggleLike: () => undefined,
  toggleCart: () => undefined,
});

function readIds(key: string): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const ids = parsed.filter((value): value is number => typeof value === "number");
    return Array.from(new Set(ids));
  } catch {
    return [];
  }
}

function toggleId(ids: number[], targetId: number) {
  if (ids.includes(targetId)) {
    return ids.filter((id) => id !== targetId);
  }

  return [...ids, targetId];
}

export const ProductActionsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [likedIds, setLikedIds] = useState<number[]>(() => readIds(LIKED_KEY));
  const [cartIds, setCartIds] = useState<number[]>(() => readIds(CART_KEY));

  useEffect(() => {
    window.localStorage.setItem(LIKED_KEY, JSON.stringify(likedIds));
  }, [likedIds]);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartIds));
  }, [cartIds]);

  const value = useMemo<ProductActionsContextType>(
    () => ({
      likedIds,
      cartIds,
      isLiked: (id: number) => likedIds.includes(id),
      isInCart: (id: number) => cartIds.includes(id),
      toggleLike: (id: number) => {
        setLikedIds((prev) => toggleId(prev, id));
      },
      toggleCart: (id: number) => {
        setCartIds((prev) => toggleId(prev, id));
      },
    }),
    [likedIds, cartIds],
  );

  return <ProductActionsContext.Provider value={value}>{children}</ProductActionsContext.Provider>;
};

export function useProductActions() {
  return useContext(ProductActionsContext);
}
