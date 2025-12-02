import { Product } from "@/types/product";

export type ProductsProps = {
  allProducts: Product[];
  totalProducts: number;
  totalProductsPages: number;
};
