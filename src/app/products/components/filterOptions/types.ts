import { FilterOptionType, FilterType } from "../../hooks/types";

export type FilterOptionsProps = {
  filter: {
    id: number;
    title: string;
    type: FilterType;
    isOpen: boolean;
    options?: string[];
  };
  selectedFilters: FilterOptionType[];
  onOptionChange: (option: string, checked: boolean) => void;
};
