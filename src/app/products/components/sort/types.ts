import { SortOption } from "../desktopViewProducts/types";

export type SortProps = {
  handleCloseSort: ()=>void
  selectedSortOption: SortOption
  handleSortChange: (option: SortOption)=>void
  sortOptions: SortOption[]
  isPending: Boolean
};
