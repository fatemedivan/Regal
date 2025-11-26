import { FilterOptionType, FilterType, ParentFilter } from "../../hooks/types";

export type FilterSectionProps = {
  filter: {
    id: number;
    title: string;
    type: FilterType;
    isOpen: boolean;
    options?: string[];
  };
  isOpen: boolean;
  onToggle: (id: number) => void;
  selectedFilters: FilterOptionType[];
  onOptionChange: (option: string, checked: boolean, filter: ParentFilter) => void;
};
