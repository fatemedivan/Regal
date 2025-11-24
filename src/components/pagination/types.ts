export type PaginationProps = {
  currentPage: number;
  latestPage: number;
  onPageChange: (page: number) => void;
};
