export type BasketDetailsCardProps = {
  step: number;
  count: number;
  totalPric: number;
  cart: any;
  addOrders?: () => Promise<void>;
  deleteCart?: () => Promise<void>;
  isLoading?: boolean;
  selectedAddressId?: number;
};
