import apple from "../asset/png/apple.png";
import { VocaCard } from "../components/organisms/vocaCard/VocaCard";

function TestPageMoon() {
  return (
    <>
      <VocaCard imgUrl={apple} nameEn="Apple" nameKo="사과" />
    </>
  );
}
export default TestPageMoon;
