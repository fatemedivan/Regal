import { ReactNode } from "react";

export type UserPannelProps = {
  children: ReactNode;
  rout: Route;
  isHadAddress?: boolean;
  setSelectedOrderType?: (v: string) => void;
  selectedOrderType?: string;
  setSelectedOrderTypeValue?: (v: string) => void;
  selectedOrderTypeValue?: string;
  orderTypes?: OrderType[];
  getAddresses?: () => void;
};
type Route = "edit" | "profile" | "order" | "favorites" | "addresses";
type OrderType = {
  value: string;
  label: string;
};
