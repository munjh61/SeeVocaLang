import { IconInput } from "../../layout/book/IconInput";
import { SegmentControl } from "../../layout/book/SegmentControl";
import type { ComponentProps } from "react";

type IconInputProps = ComponentProps<typeof IconInput>;
type SegmentControlProps = ComponentProps<typeof SegmentControl>;

type SearchbarSegmentProps = {
  iconInput: Pick<
    IconInputProps,
    "icon" | "inputProps" | "inputVariant" | "iconVariant" | "inputValue"
  >;
  segmentControl?: Pick<
    SegmentControlProps,
    "options" | "defaultValue" | "onChange"
  >;
};

export const SearchbarSegment = ({
  iconInput,
  segmentControl,
}: SearchbarSegmentProps) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 shadow-md">
      <IconInput {...iconInput} />
      {segmentControl && <SegmentControl {...segmentControl} />}
    </div>
  );
};

// 사용 방법
// import searchSvg from "../asset/search.svg?react";
// import { SearchbarSegment } from "../components/molecules/book/SearchbarSegment";

// function TestPageMoon() {
//   const handleSearch = (value: string) => {
//     console.log(value);
//   };
//   return (
//     <div>
//       <SearchbarSegment
//         iconInput={{
//           icon: searchSvg,
//           iconVariant: { color: "blue" },
//           inputProps: {
//             placeholder: "검색어를 입력하세요",
//           },
//           inputVariant: { scale: "md" },
//           inputValue: handleSearch,
//         }}
//         segmentControl={{
//           options: [
//             { label: "영어", value: "en" },
//             { label: "한글", value: "ko" },
//           ],
//           defaultValue: "en",
//           onChange: v => console.log("선택됨:", v),
//         }}
//       />
//     </div>
//   );
// }
// export default TestPageMoon;
