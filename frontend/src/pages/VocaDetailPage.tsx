import { useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { VocaDetailTemplate } from "../components/templates/voca/VocaDetailTemplate";
import VocaCardSample from "../components/templates/voca/SampleVocaCard";

function VocaDetailPage() {
  const { folderId } = useParams<{ folderId: string }>();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow overflow-y-auto">
        <VocaDetailTemplate
          folderId={Number(folderId)}
          vocaCardDatas={VocaCardSample}
        />
      </div>
      <Navigation loc="book" />
    </div>
  );
}

export default VocaDetailPage;
