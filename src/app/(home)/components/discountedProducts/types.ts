export interface DiscountedProduct {
  id: string;
  title: string;
  price: number;
  img: string;
  isLiked: boolean;
  colors: string[];
  offPercent: number;
  finalPrice: number;
  sizes: string[];
}
export type DiscountedProductsProps = {
  discountedProducts: DiscountedProduct[];
};
