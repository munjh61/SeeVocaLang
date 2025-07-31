import { ImageBox } from "../components/molecules/imagebox/Imagebox";
import apple from "../asset/png/apple.png";
import { VocaCard } from "../components/organisms/vocaCard/VocaCard";

function TestPageMoon() {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <>
      <VocaCard thumbnail={apple} name="제목" description="설명"></VocaCard>
    </>
  );
}
export default TestPageMoon;
