export type LikedProductWithProduct = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    discountedPrice: number | null;
    isDiscounted: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    images: { imageUrl: string }[];
  };
};
