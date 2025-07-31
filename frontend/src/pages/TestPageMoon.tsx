import apple from "../asset/png/apple.png";
import { Input } from "../components/atoms/input/Input";
import { IconInput } from "../components/molecules/iconInput/IconInput";
import { SearchbarSegment } from "../components/organisms/searchbarSegment/SearchbarSegment";
import { VocaCard } from "../components/organisms/vocaCard/VocaCard";
import book from "../asset/book.svg?react";

function TestPageMoon() {
  // const handleSearch = (value: string) => {
  //   console.log(value);
  // };
  return (
    <>
      <SearchbarSegment
        onSearch={v => console.log(v)}
        segmentControl={{
          options: [
            { label: "영어", value: "en" },
            { label: "한글", value: "ko" },
          ],
          defaultValue: "en",
          onChange: v => console.log(v),
        }}
      />
      <VocaCard
        thumbnail={apple}
        name="제목제목제목제목제목"
        description="설명설명설명설명설명설명설명설명설명설명설명설명"
      />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
      <VocaCard thumbnail={apple} name="제목" description="설명" />
    </>
  );
}
export default TestPageMoon;
