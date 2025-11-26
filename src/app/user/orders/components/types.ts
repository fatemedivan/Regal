export type OrderDetailsCard = {
  status: Status;
  deliveryType: "pickup" | "delivery";
  paymentMethod: "online" | "stroe";
  deliveryStatus?: string;
  date: string;
  address?: string;
  receivingTime?: string;
  orderItems: any;
};
type Status =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";
