import type { ChangeEvent } from "react";
import SearchIcon from "../../../asset/search.svg?react";
import { Input } from "../../atoms/input/Input";

type FriendSearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const FriendSearchBar = ({
  value,
  onChange,
  placeholder = "닉네임으로 검색하기...",
}: FriendSearchBarProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl">
  <div className="
    group flex items-center gap-3
    rounded-full border-2 border-[#2b1e12]
    bg-white/85 backdrop-blur-sm
    px-5 py-3
    shadow-[0_6px_0_#2b1e12] ring-1 ring-black/10
    focus-within:ring-2 focus-within:ring-[#f4c430]
  ">
    <SearchIcon className="w-5 h-5 text-[#2b1e12]/80 group-focus-within:text-[#2b1e12]" />
    <Input
      type="text"
      scale="sm"
      text="black"
      className="
        w-full bg-transparent outline-none
        placeholder:text-[#2b1e12]/70
        font-outline placeholder:font-outline
      "
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label="친구 닉네임 검색"
    />
  </div>
</div>
  );
};
