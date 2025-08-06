import { QuizTemplate } from "../components/templates/quiz/QuizTemplate";
import VocaCardSample from "../components/templates/voca/SampleVocaCard";

function TestPageMoon() {
  return (
    <>
      <QuizTemplate
        name="테스트 단어장" // ✅ 추가
        description="빌드 테스트용 mock 데이터입니다." // ✅ 추가
        vocaCardDatas={VocaCardSample}
      />
    </>
  );
}

export default TestPageMoon;
