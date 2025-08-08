import { useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizTemplate } from "../components/templates/quiz/QuizTemplate";
import VocaCardSample from "../components/templates/voca/SampleVocaCard";
import FolderSampleDatas from "../components/templates/voca/SampleFolder";

function QuizPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const folderData = FolderSampleDatas.filter(
    data => data.folderId === Number(folderId)
  )[0];
  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow overflow-y-auto">
        <QuizTemplate
          name={folderData.name}
          description={folderData.description}
          vocaCardDatas={VocaCardSample}
        />
      </div>
      <Navigation loc="folder" />
    </div>
  );
}
export default QuizPage;
