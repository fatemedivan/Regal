import React from "react";
import Image from "next/image";
import { SelectedFilterTagsProps } from "./types";
import { FilterType, SingleOptionType } from "../../hooks/types";

const SelectedFilterTags: React.FC<SelectedFilterTagsProps> = React.memo(
  ({ selectedFilters, onRemoveFilter }) => {
    const handleRemove = (option: SingleOptionType, type: FilterType) => {
      if (typeof onRemoveFilter === "function") {
        onRemoveFilter(option, type);
      }
    };

    const isPriceOption = (
      option: SingleOptionType
    ): option is { min: number; max: number } => {
      return (
        typeof option === "object" &&
        option !== null &&
        "min" in option &&
        "max" in option
      );
    };

    if (!selectedFilters || selectedFilters.length === 0) {
      return null;
    }

    return (
      <div className="flex items-center flex-wrap gap-1 mt-7 mx-5 mb-6">
        {selectedFilters.map((item, index) => (
          <div
            key={item.type + index}
            className="px-3 py-2 max-w-max rounded-100 border border-neutral-gray-4 bg-neutral-gray-1 flex items-center gap-2"
          >
            {item.type === "color" && typeof item.option === "string" ? (
              <div className="flex items-center gap-2">
                <p className="text-neutral-gray-13 text-sm leading-5">رنگ:</p>
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor:
                      typeof item.option === "string" ? item.option : undefined,
                  }}
                ></div>
              </div>
            ) : item.type === "price" && isPriceOption(item.option) ? (
              <p className="text-neutral-gray-13 text-sm leading-5">
                قیمت: {item.option.min.toLocaleString()} تا{" "}
                {item.option.max.toLocaleString()}
              </p>
            ) : (
              <p className="text-neutral-gray-13 text-sm leading-5">
                {item.filterTitle === "سایزبندی" ? "سایز" : item.filterTitle}:
                {typeof item.option === "string" ? item.option : ""}
              </p>
            )}
            <Image
              onClick={() => handleRemove(item.option, item.type)}
              width={12}
              height={12}
              src="/img/close-icon-filter.svg"
              alt="حذف فیلتر"
              className="cursor-pointer hover:opacity-70 transition-opacity"
            />
          </div>
        ))}
      </div>
    );
  }
);
SelectedFilterTags.displayName = "SelectedFilterTags";

export default SelectedFilterTags;
