import searchSvg from "../asset/search.svg?react";
import { SearchbarSegment } from "../components/molecules/book/SearchbarSegment";

function TestPageMoon() {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div>
      <h1>Moon</h1>
      <SearchbarSegment
        iconInput={{
          icon: searchSvg,
          iconVariant: { color: "blue" },
          inputProps: {
            placeholder: "검색어를 입력하세요",
          },
          inputVariant: { scale: "md" },
          inputValue: handleSearch,
        }}
        segmentControl={{
          options: [
            { label: "영어", value: "en" },
            { label: "한글", value: "ko" },
          ],
          defaultValue: "en",
          onChange: v => console.log("선택됨:", v),
        }}
      />
    </div>
  );
}
export default TestPageMoon;
