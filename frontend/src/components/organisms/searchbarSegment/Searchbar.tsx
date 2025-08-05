import { IconInput } from "../../molecules/iconInput/IconInput.tsx";
import type { ComponentProps } from "react";
import searchSVG from "../../../asset/search.svg?react";
import type { Icon } from "../../atoms/icon/Icon.tsx";

type SearchbarProps = {
  iconColor?: ComponentProps<typeof Icon>["color"];
  placeholder?: string;
  onSearch?: (keyword: string) => void;
  className?: string;
};

export const Searchbar = ({
  onSearch,
  iconColor,
  placeholder,
  className,
}: SearchbarProps) => {
  return (
    <IconInput
      iconVariant={{ icon: searchSVG, color: iconColor, size: "searchbar" }}
      inputVariant={{ scale: "xl", text: "gray" }}
      inputProps={{ placeholder: placeholder }}
      inputValue={onSearch}
      onChange={onSearch}
      className={className}
    />
  );
};
