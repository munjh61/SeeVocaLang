import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizTemplate } from "../components/templates/quiz/QuizTemplate";
import VocaCardSample from "../components/templates/voca/SampleVocaCard";

function QuizPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <QuizTemplate vocaCardDatas={VocaCardSample} />
      </div>
      <Navigation loc="book" />
    </div>
  );
}
export default QuizPage;
