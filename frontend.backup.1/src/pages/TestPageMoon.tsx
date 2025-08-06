import { QuizTemplate } from "../components/templates/quiz/QuizTemplate";
import VocaCardSample from "../components/templates/voca/SampleVocaCard";

function TestPageMoon() {
  return (
    <>
      <QuizTemplate vocaCardDatas={VocaCardSample}></QuizTemplate>
    </>
  );
}
export default TestPageMoon;
