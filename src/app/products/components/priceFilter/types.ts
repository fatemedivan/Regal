export type PriceFilterProps = {
  isOpen: boolean;
  onToggle: () => void;
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (v: number) => void;
  onMaxPriceChange: (v: number) => void;
  onApply: () => void;
  defaultMinPrice: number;
  defaultMaxPrice: number;
  isApplying?: boolean;
};
