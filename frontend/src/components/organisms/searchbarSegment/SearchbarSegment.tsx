import { IconInput } from "../../molecules/iconInput/IconInput.tsx";
import { SegmentControl } from "../../molecules/segmentControl/SegmentControl.tsx";
import type { ComponentProps } from "react";
import searchSVG from "../../../asset/search.svg?react";
import type { Icon } from "../../atoms/icon/Icon.tsx";

type SegmentControlProps = ComponentProps<typeof SegmentControl>;

type SearchbarSegmentProps = {
  iconColor?: ComponentProps<typeof Icon>["color"];
  placeholder?: string;
  onSearch?: (keyword: string) => void;
  segmentControl?: Pick<
    SegmentControlProps,
    "options" | "defaultValue" | "onChange"
  >;
  className?: string;
};

export const SearchbarSegment = ({
  onSearch,
  segmentControl,
  iconColor,
  placeholder,
  className,
}: SearchbarSegmentProps) => {
  return (
    <div
      className={`flex items-center justify-between p-2 w-full bg-gray-100 shadow-md rounded-sm ${className} `}
    >
      <IconInput
        iconVariant={{ icon: searchSVG, color: iconColor, size: "header" }}
        inputVariant={{ scale: "xl", text: "gray" }}
        inputProps={{ placeholder: placeholder }}
        inputValue={onSearch}
      />
      {segmentControl && <SegmentControl {...segmentControl} />}
    </div>
  );
};

// 사용 방법
// import { SearchbarSegment } from "../components/molecules/book/SearchbarSegment";

// function TestPageMoon() {
//   const handleSearch = (value: string) => {
//     console.log(value);
//   };
//   return (
//     <SearchbarSegment
//       onSearch={v => console.log(v)}
//       segmentControl={{
//         options: [
//           { label: "영어", value: "en" },
//           { label: "한글", value: "ko" },
//         ],
//         defaultValue: "en",
//         onChange: v => console.log(v),
//       }}
//     />
//   );
// }
// export default TestPageMoon;
