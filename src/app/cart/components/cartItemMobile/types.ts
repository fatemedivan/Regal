export type CartItemMobileProps = {
  item: any;
  onUpdate: (itemId: number, newQuantity: number) => Promise<void>;
  onDelete: (itemId: number) => Promise<void>;
};
