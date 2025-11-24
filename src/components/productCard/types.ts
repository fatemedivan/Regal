export type ProductCardProps = {
  id: string | number;
  img: string;
  title: string;
  price: number;
  finalPrice: number;
  offPercent: number;
  isMore: boolean;
  colors: string[];
  favorites: boolean;
};
