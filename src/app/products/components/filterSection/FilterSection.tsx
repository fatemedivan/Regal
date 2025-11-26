import React from "react";
import Image from "next/image";

import { FilterSectionProps } from "./types";
import FilterOptions from "../filterOptions/FilterOptions";

const FilterSection: React.FC<FilterSectionProps> = React.memo(
  ({ filter, isOpen, onToggle, selectedFilters, onOptionChange }) => {
    const handleCheckboxChange = (option: string, checked: boolean) => {
      onOptionChange(option, checked, filter);
    };

    return (
      <li>
        <div
          onClick={() => onToggle(filter.id)}
          className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
        >
          <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">
            {filter.title}
          </p>
          <Image
            width={16}
            height={16}
            src={isOpen ? "/img/arrow-up.svg" : "/img/arrow-down-3.svg"}
            alt=""
          />
        </div>

        {isOpen && (
          <FilterOptions
            filter={filter}
            selectedFilters={selectedFilters}
            onOptionChange={handleCheckboxChange}
          />
        )}
      </li>
    );
  }
);

FilterSection.displayName = "FilterSection";
export default FilterSection;
