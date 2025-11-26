import React from "react";
import { FilterOptionProps } from "./types";

const FilterOption: React.FC<FilterOptionProps> = React.memo(
  ({ option, filterType, isSelected, onOptionChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onOptionChange(option, e.target.checked);
    };

    return (
      <label className="relative cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          className="peer hidden"
          checked={isSelected}
          onChange={handleChange}
        />
        {filterType === "color" && (
          <>
            <div
              style={{ backgroundColor: option }}
              className="w-8 h-8 rounded-sm flex justify-center items-center relative before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
            ></div>
            <div
              style={{ borderColor: option }}
              className="absolute -top-1 -left-1 w-10 h-10 rounded-md border-2 opacity-0 peer-checked:opacity-100"
            ></div>
          </>
        )}
        {filterType === "size" && (
          <>
            <div className="w-8 h-8 text-neutral-gray-11 flex items-center justify-center rounded-sm border border-neutral-gray-4 peer-checked:bg-cognac-shade-4 peer-checked:text-white text-xs leading-4.5 pt-1">
              {option}
            </div>
            <div className="absolute -top-1 -left-1 w-10 h-10 rounded-lg border-3 border-cognac-shade-4 opacity-0 peer-checked:opacity-100 transition-all"></div>
          </>
        )}
        {filterType !== "size" && filterType !== "color" && (
          <>
            <div className="w-5 h-5 border border-neutral-gray-4 rounded-sm relative flex items-center justify-center before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"></div>
            <p className="peer-checked:text-black text-sm leading-5">
              {option}
            </p>
          </>
        )}
      </label>
    );
  }
);

export default FilterOption;
