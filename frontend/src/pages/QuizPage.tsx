import { useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizTemplate } from "../components/templates/quiz/QuizTemplate";
import VocaCardSample from "../components/templates/voca/SampleVocaCard";
import VocaBookSampleDatas from "../components/templates/voca/SampleVocaBook";

function QuizPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const bookData = VocaBookSampleDatas.filter(
    data => data.folderId === Number(folderId)
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
