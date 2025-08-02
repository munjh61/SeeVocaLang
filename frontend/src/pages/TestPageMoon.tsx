import apple from "../asset/png/apple.png";
import { SearchbarSegment } from "../components/organisms/searchbarSegment/SearchbarSegment";
import { VocaCard } from "../components/organisms/vocaCard/VocaCard";
import { Navigation } from "../components/organisms/nav/Navigation";

function TestPageMoon() {
  // const handleSearch = (value: string) => {
  //   console.log(value);
  // };
  return (
    <>
      {/* <Nav icon={book} onoff={false}>
        책
      </Nav>
      <Nav icon={book} onoff={true}>
        책
      </Nav> */}
      <Navigation loc="setting" />
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
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="AaaaBAaaaBAaaaB"
        description="AaaaBAaaaBAaaaBAaaaB"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
      <VocaCard
        thumbnail={apple}
        name="제목"
        description="설명"
        favorite={false}
      />
    </>
  );
}
export default TestPageMoon;
