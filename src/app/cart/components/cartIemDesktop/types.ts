export type CartItemDesktopProps = {
  item: any;
  index: number;
  totalCount: number;
  onUpdate: (itemId: string, newQuantity: number) => Promise<boolean>;
  onDelete: (itemId: string) => Promise<boolean>;
};
