import { useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizTemplate } from "../components/templates/quiz/QuizTemplate";
import VocaCardSample from "../components/templates/voca/SampleVocaCard";
import VocaBookSampleDatas from "../components/templates/voca/SampleVocaBook";

function QuizPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const bookData = VocaBookSampleDatas.filter(
    data => data.id === Number(bookId)
  )[0];
  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow overflow-y-auto">
        <QuizTemplate
          name={bookData.name}
          description={bookData.description}
          vocaCardDatas={VocaCardSample}
        />
      </div>
      <Navigation loc="book" />
    </div>
  );
}
export default QuizPage;
