import React from "react";
import FilterOption from "./FilterOption";

const FilterOptions = React.memo(
  ({ filter, selectedFilters, onOptionChange }) => {
    return (
      <div
        className={`flex ${
          filter.type === "color" || filter.type === "size"
            ? "flex-wrap gap-3"
            : "flex-col gap-4"
        } mb-6`}
      >
        {filter.options.map((option, index) => (
          <FilterOption
            key={index}
            option={option}
            filterType={filter.type}
            isSelected={selectedFilters.some(
              (item) => item.option === option && item.type === filter.type
            )}
            onOptionChange={onOptionChange}
          />
        ))}
      </div>
    );
  }
);

export default FilterOptions;
