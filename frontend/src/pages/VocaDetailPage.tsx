import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { VocaDetailTemplate } from "../components/templates/voca/VocaDetailTemplate";
// import VocaCardSample from "../components/templates/voca/SampleVocaCard";
import { useEffect, useState } from "react";
import type { VocaCardProps } from "../components/organisms/vocaCard/VocaCard";
import { getWords } from "../api/FolderAPI";
import { LoadingPage } from "../components/templates/loadingTemplate/LoadingTemplate";
import { getTodayQuiz } from "../api/TodayQuizAPI";

function VocaDetailPage() {
  const nav = useNavigate();
  const location = useLocation();
  const { folderId } = useParams<{ folderId: string }>();
  const [vocas, setVocas] = useState<VocaCardProps[] | null>();
  const [error, setError] = useState<string | null>(null);

  const {
    name = "오늘의 단어장",
    description = "오늘도 화이팅",
    isTodayMission = false,
  } = (location.state as {
    name?: string;
    description?: string;
    isTodayMission?: boolean;
  }) ?? {};

  useEffect(() => {
    let mounted = true;
    if (!isTodayMission && name == "오늘의 단어장") {
      nav("/folder");
    }
    (async () => {
      try {
        if (isTodayMission) {
          const vocas = await getTodayQuiz();
          if (mounted) setVocas(vocas);
        } else {
          const vocas = await getWords(Number(folderId));
          if (mounted) setVocas(vocas);
        }
      } catch (e) {
        if (mounted && e instanceof Error) {
          console.error(e);
          setError((e.message = "불러오기 실패"));
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [folderId]);

  if (error) return <div>에러: {error}</div>;
  if (!vocas) return <LoadingPage />;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow overflow-y-auto">
        <VocaDetailTemplate
          folderId={Number(folderId)}
          vocaCardDatas={vocas}
          name={name}
          description={description}
          isTodayMission={isTodayMission}
        />
      </div>
      <Navigation loc="folder" />
    </div>
  );
}

export default VocaDetailPage;
