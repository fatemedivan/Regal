import { ReactNode } from "react";
import { SortOption } from "../desktopViewProducts/types";

export type MobileViewProductsPros = {
  totalProducts: number;
  notFound: boolean;
  renderedProducts: ReactNode;
  handleSortChange: (option: SortOption) => void;
  selectedSortOption: SortOption;
  sortOptions: SortOption[];
  isPending: boolean;
  setIsMobileLoading: (v: boolean) => void;
};
