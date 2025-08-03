import { useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { VocaDetailTemplate } from "../components/templates/voca/VocaDetailTemplate";

function VocaDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <VocaDetailTemplate workId={Number(bookId)} />
      </div>
      <Navigation loc="book" />
    </div>
  );
}

export default VocaDetailPage;
