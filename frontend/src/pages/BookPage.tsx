// BookPage.tsx
import { useEffect, useState } from "react";
import { getBooks } from "../api/BookAPI";
import { Navigation } from "../components/organisms/nav/Navigation";
import { BookSelectTemplate } from "../components/templates/voca/VocaBookSelectTemplate";

// API 응답을 화면에서 쓰는 타입(카드 컴포넌트가 기대하는 형태)
import type { VocaBookProps } from "../components/organisms/vocaBook/VocaBook";
import { useAuthStore } from "../stores/AuthStore";

function BookPage() {
  const [books, setBooks] = useState<VocaBookProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuthStore.getState().user?.userId ?? 1; // TODO: 로그인 정보에서 가져오기

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const content = await getBooks(userId);
        const mapped: VocaBookProps[] = content.map((b: VocaBookProps) => ({
          folderId: b.folderId, // 서버 키 이름에 맞춰 변경
          name: b.name,
          description: b.description ?? "",
          favorite: Boolean(b.favorite),
          thumbnailUrl: b.thumbnailUrl ?? null,
        }));

        if (mounted) setBooks(mapped);
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
  if (!books) return <div>로딩 중…</div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="grow overflow-y-auto">
        <BookSelectTemplate vocaBookDatas={books} />
      </div>
      <Navigation loc="book" />
    </div>
  );
}

export default BookPage;
