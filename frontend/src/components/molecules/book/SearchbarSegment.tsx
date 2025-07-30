import { IconInput } from "../../layout/book/IconInput";
import { SegmentControl } from "../../layout/book/SegmentControl";
import type { ComponentProps } from "react";

type IconInputProps = ComponentProps<typeof IconInput>;
type SegmentControlProps = ComponentProps<typeof SegmentControl>;

type SearchbarSegmentProps = {
  iconInput: IconInputProps;
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
// import book from "../asset/nav_book.svg?react";
// import { SearchbarSegment } from "../components/molecules/book/SearchbarSegment";

// function TestPageMoon() {
//   const handleSearch = (value: string) => {
//     console.log(value);
//   };
//   return (
//     <SearchbarSegment
//       iconInput={{
//         iconVariant: {
//           icon: book,
//           color: "blue",
//         },
//         inputProps: {
//           placeholder: "검색어를 입력하세요",
//           onChange: () => handleSearch,
//         },
//         inputVariant: {
//           scale: "md",
//           text: "gray",
//         },
//       }}
//       segmentControl={{
//         options: [
//           { label: "영어", value: "en" },
//           { label: "한글", value: "ko" },
//         ],
//         defaultValue: "en",
//         onChange: value => console.log("선택됨:", value),
//       }}
//     />
//   );
// }
// export default TestPageMoon;
