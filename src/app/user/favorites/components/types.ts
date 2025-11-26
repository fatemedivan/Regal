export type FavouriteProductProps = {
  id: number;
  img: string;
  title: string;
  price: number;
  finalPrice: number;
  offPercent: number;
  isMore: boolean;
  colors: string[];
  disLikeProduct: (id: number) => Promise<void>;
};
