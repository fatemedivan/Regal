import { FilterType } from "../../hooks/types";

export type FilterOptionProps = {
  option: string;
  filterType: FilterType;
  isSelected: boolean;
  onOptionChange: (option: string, checked: boolean) => void;
};
