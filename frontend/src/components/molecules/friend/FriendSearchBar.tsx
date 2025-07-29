// src/components/molecules/friend/FriendSearchBar.tsx
// src/components/molecules/friend/FriendSearchBar.tsx
import type { ChangeEvent } from "react";
import SearchIcon from "../../../asset/search.svg?react";

type FriendSearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const FriendSearchBar = ({
  value,
  onChange,
  placeholder = "이름으로 검색하기...",
}: FriendSearchBarProps) => {
  return (
    <div className="flex items-center gap-2 w-full bg-gray-100 px-4 py-2 rounded-full">
      <SearchIcon className="w-4 h-4 text-gray-500" />
      <input
        type="text"
        className="bg-transparent outline-none text-sm text-gray-800 w-full placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
