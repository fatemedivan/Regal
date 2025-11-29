export type CartItemMobileProps = {
  item: any;
  onUpdate: (itemId: string, newQuantity: number) => Promise<boolean>;
  onDelete: (itemId: string) => Promise<boolean>;
};
