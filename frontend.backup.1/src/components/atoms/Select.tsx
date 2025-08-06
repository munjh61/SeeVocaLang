import React from "react";

type SelectBoxProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
  className?: string;
};

export const SelectBox = ({
  value,
  onChange,
  options,
  placeholder = "선택",
  className = "",
}: SelectBoxProps) => {
  return (
    <div className="relative inline-block w-full">
      <select
        value={value}
        onChange={onChange}
        className={`w-full appearance-none border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
        ▼
      </div>
    </div>
  );
};
