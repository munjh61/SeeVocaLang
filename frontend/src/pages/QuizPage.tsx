import { useLocation, useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizTemplate } from "../components/templates/quiz/QuizTemplate";
import { useEffect, useState } from "react";
import type { VocaCardProps } from "../components/organisms/vocaCard/VocaCard";
import { getWords } from "../api/FolderAPI";
import { LoadingPage } from "../components/templates/loadingTemplate/LoadingTemplate";

function QuizPage() {
  const { folderId } = useParams<{ folderId: string }>();

  const [vocas, setVocas] = useState<VocaCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  // location.state가 없을 수도 있으니 기본값
  const location = useLocation();
  const {
    name = "",
    description = "",
    isTodayMission = false,
  } = (location.state as {
    name?: string;
    description?: string;
    isTodayMission?: boolean;
  }) ?? {};

  useEffect(() => {
    let mounted = true;
    if (!folderId) return;

    (async () => {
      try {
        const data = await getWords(Number(folderId));
        if (mounted) setVocas(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!mounted) return;
        const msg = e instanceof Error ? e.message : "불러오기 실패";
        setError(msg);
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
        <QuizTemplate
          name={name}
          description={description}
          vocaCardDatas={vocas}
          isTodayMission={isTodayMission}
        />
      </div>
      <Navigation loc="folder" />
    </div>
  );
}
export default QuizPage;
