import type { CategoryType } from "./CategoryType";

export interface ProductsType {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: CategoryType;
}
