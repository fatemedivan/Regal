import { ReactNode } from "react";

export type DesktopViewProductsProps = {
  setSearchValue: (v: string) => void;
  searchValue: string;
  handleSortChange: (option: SortOption) => void;
  totalProducts: number;
  selectedSortOption: SortOption;
  notFound: boolean;
  renderedProducts: ReactNode;
};
export type SortOption = { id: number; title: string; value: string };
