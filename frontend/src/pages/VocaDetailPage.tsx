import { useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { VocaDetailTemplate } from "../components/templates/voca/VocaDetailTemplate";

function VocaDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  return (
    <div className="flex flex-col align-center mt-4 h-screen">
      <VocaDetailTemplate workId={Number(bookId)} />
      <Navigation loc="book" />
    </div>
  );
}

export default VocaDetailPage;
