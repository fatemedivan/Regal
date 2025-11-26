export type CartItemDesktopProps = {
  item: any;
  index: number;
  totalCount: number;
  onUpdate: (itemId: number, newQuantity: number) => Promise<void>;
  onDelete: (itemId: number) => Promise<void>;
};
