export interface ProductImage {
  id: string;
  imageUrl: string;
}

export type ProductColor = { id: number; hexCode: string };
export type ProductSize = { id: number; name: string };

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountedPrice?: number | null;
  isDiscounted?: boolean;
  categoryId?: string;
  categoryName?: string;
  images: ProductImage[];
  imageUrl?: string | null;
  offPercent?: number;
  isLiked?: boolean;
  productColors?: ProductColor[];
  productSizes?: ProductSize[];
  createdAt?: string;
  updatedAt?: string;
  relatedProducts?: SimilarProduct[];
}

export interface SimilarProduct {
  id: string;
  title: string;
  img: string;
  finalPrice: number;
  price: number;
  offPercent: number;
  isLiked: boolean;
  colors: ProductColor[];
  sizes: ProductSize[];
}
