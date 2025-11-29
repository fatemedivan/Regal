export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductColor {
  id: string;
  color: {
    id: string;
    name: string;
    hexCode?: string;
  };
}

export interface ProductSize {
  id: string;
  size: {
    id: string;
    name: string;
  };
}

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
  colors?: string[];
  sizes?: string[];
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
  colors: string[];
  sizes: string[];
}
