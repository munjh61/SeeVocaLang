import { useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { VocaDetailTemplate } from "../components/templates/voca/VocaDetailTemplate";
import VocaCardSample from "../components/templates/voca/VocaCardSample";

function VocaDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <VocaDetailTemplate
          bookId={Number(bookId)}
          vocaCardDatas={VocaCardSample}
        />
      </div>
      <Navigation loc="book" />
    </div>
  );
}

export default VocaDetailPage;
