export type Product = {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  isDiscounted: boolean;
  offPercent?: number;
  images: { imageUrl: string }[];
  productColors: { color: { hexCode: string } }[];
  isLiked: boolean;
};

export type ProductsProps = {
  allProducts: Product[];
  totalProducts: number;
  totalProductsPages: number;
};
