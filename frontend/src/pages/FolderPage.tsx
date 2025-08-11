import { useEffect, useState } from "react";
import { getfolders } from "../api/FolderAPI";
import { Navigation } from "../components/organisms/nav/Navigation";
import type { FolderProps } from "../components/organisms/folder/Folder";
import { useAuthStore } from "../stores/AuthStore";
import { LoadingPage } from "../components/templates/loadingTemplate/LoadingTemplate";
import { FolderTemplate } from "../components/templates/voca/FolderTemplate";
import type { VocaCardProps } from "../components/organisms/vocaCard/VocaCard";
import { getAllWords } from "../api/WordAPI";

function FolderPage() {
  const [folders, setFolders] = useState<FolderProps[] | null>(null);
  const [vocas, setVocas] = useState<VocaCardProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuthStore.getState().user?.userId ?? 1; // TODO: 로그인 정보에서 가져오기

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const folders = await getfolders(userId);
        const vocas = await getAllWords();
        if (mounted) {
          setFolders(folders);
          setVocas(vocas);
        }
      } catch (e) {
        if (mounted && e instanceof Error)
          setError(e?.message ?? "불러오기 실패");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId]);

  if (error) return <div>에러: {error}</div>;
  if (!folders) return <LoadingPage />;

  return (
    <div className="flex flex-col h-screen">
      <div className="grow overflow-y-auto">
        <FolderTemplate folderDatas={folders} vocaDatas={vocas} />
      </div>
      <Navigation loc="folder" />
    </div>
  );
}

export default FolderPage;
