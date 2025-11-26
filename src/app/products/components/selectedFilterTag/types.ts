import { FilterOptionType, FilterType, SingleOptionType } from "../../hooks/types";

export type SelectedFilterTagsProps = {
  selectedFilters: FilterOptionType[];
  onRemoveFilter?: (
    option: SingleOptionType,
    type: FilterType
  ) => void;
};
