export type BasketDetailsCardProps = {
  step: number;
  count: number;
  totalPric: number;
  cart: any;
  addOrders?: () => Promise<void>;
  deleteCart?: () => void;
  isLoading?: boolean;
  selectedAddressId?: number;
};
