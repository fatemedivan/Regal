export type ProductCardProps = {
  id: number;
  img: string;
  title: string;
  price: number;
  finalPrice: number;
  offPercent: number;
  isMore: boolean;
  colors: string[];
  favorites: boolean;
};
