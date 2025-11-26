export type ProductColor = { id: number; hexCode: string };
export type ProductSize = { id: number; name: string };
export type RelatedProduct = {
  id: number;
  img: string;
  title: string;
  finalPrice: number;
  colors?: string[];
};
export type Product = {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  percentOff?: number;
  categoryName?: string;
  images?: string[];
  colors?: ProductColor[];
  sizes?: ProductSize[];
  relatedProducts?: RelatedProduct[];
  isLiked?: boolean;
};
