export type FilterOptionType = {
  type: FilterType;
  option: SingleOptionType;
  filterTitle?: string;
};

export type SingleOptionType = string | { min: number; max: number };
export type ParentFilter = {
  id: number;
  title: string;
  type: FilterType;
  isOpen: boolean;
  options?: string[];
};

export type FilterType =
  | "clothes"
  | "color"
  | "size"
  | "price"
  | "isDiscounted";

export type FilterItem = {
  id: number;
  title: string;
  options: string[];
  isOpen: boolean;
  type: FilterType;
};
