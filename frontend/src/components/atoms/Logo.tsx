import { Icon } from "./icon/Icon.tsx";
import BookIcon from "../../asset/book.svg?react";
export const Logo = () => {
  return (
    <label
      htmlFor="upload-file"
      className="relative w-20 h-20 bg-gradient-to-r from-[#8197F2] to-[#9568EF] rotate-[6deg] text-white rounded-xl flex items-center justify-center cursor-pointer active:scale-95"
    >
      <Icon icon={BookIcon} color="white" size="lg" />
      <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-yellow-400 text-white text-xs px-1.5 py-1 rounded-full">
            ★
          </span>
    </label>
  )
}