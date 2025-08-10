import { useParams } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { VocaDetailTemplate } from "../components/templates/voca/VocaDetailTemplate";
// import VocaCardSample from "../components/templates/voca/SampleVocaCard";
import { useEffect, useState } from "react";
import type { VocaCardProps } from "../components/organisms/vocaCard/VocaCard";
import { getWords } from "../api/FolderAPI";
import { LoadingPage } from "../components/templates/loadingTemplate/LoadingTemplate";

function VocaDetailPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const [vocas, setVocas] = useState<VocaCardProps[] | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const vocas = await getWords(Number(folderId));
        if (mounted) setVocas(vocas);
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
        <VocaDetailTemplate folderId={Number(folderId)} vocaCardDatas={vocas} />
      </div>
      <Navigation loc="folder" />
    </div>
  );
}

export default VocaDetailPage;
