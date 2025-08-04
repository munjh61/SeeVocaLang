import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { VocaDetailTemplate } from "../components/templates/voca/VocaDetailTemplate";
import VocaCardSample from "../components/templates/voca/VocaCardSample";
import { IconButton } from "../components/molecules/iconButton/IconButton";

function VocaDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <VocaDetailTemplate
          bookId={Number(bookId)}
          vocaCardDatas={VocaCardSample}
        />
      </div>
      <div className="fixed bottom-16 left-[44%] flex flex-row gap-3 z-50">
        <IconButton
          ButtonVariant={{
            bgColor: "gradientPurple",
            textColor: "white",
          }}
          buttonValue={() => navigate(-1)}
        >
          뒤로 가기
        </IconButton>
        <IconButton
          ButtonVariant={{
            bgColor: "gradientPurple",
            textColor: "white",
          }}
          path={`/quiz?bookId=${bookId}`}
        >
          퀴즈 풀기
        </IconButton>
      </div>
      <Navigation loc="book" />
    </div>
  );
}

export default VocaDetailPage;
