import { useEffect, useState } from "react";
import { VocaBookSecondHeader } from "../../organisms/vocaBook/VocaSecondheader";
import {
  VocaBookCard,
  type VocaBookProps,
} from "../../organisms/vocaBook/VocaBook";
import hangul from "hangul-js";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "../../molecules/searchbar/Searchbar";
import { QuizBookSelectModal } from "../../organisms/vocaBook/QuizBookSelectModal";
import { VocaFormModal } from "../../organisms/vocaBook/VocaFormModal";
import {
  createBook,
  deleteBook,
  getWords,
  updateBook,
} from "../../../api/BookAPI";

/** 🔑 props는 '배열' 자체로 받는다. (중요!)
 *  getBooks가 VocaBookProps[] 를 반환한다는 가정 하에 동일하게 맞춤
 */
type BookSelectTemplateProps = {
  vocaBookDatas: VocaBookProps[]; // ← 배열 타입 (선택 아님)
};

export const BookSelectTemplate = ({
  vocaBookDatas,
}: BookSelectTemplateProps) => {
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isToggle, setIsToggle] = useState(true);
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  /** 🧠 내부 상태: prop으로 받은 목록을 로컬 편집하기 위해 별도 상태로 보관 */
  const [vocaList, setVocaList] = useState<VocaBookProps[]>(vocaBookDatas);

  /** 📌 prop 변경 시 내부 상태 동기화 (API 재호출 등으로 상위에서 배열이 바뀔 수 있음) */
  useEffect(() => {
    setVocaList(vocaBookDatas);
  }, [vocaBookDatas]);

  // 모달 공통 핸들러
  const closeModal = () => {
    setModalType(null);
    setSelectedId(null);
    setTitle("");
    setSubtitle("");
  };

  const openEditModal = (folderId: number) => {
    const selected = vocaList.find(item => item.folderId === folderId);
    if (!selected) return;
    setTitle(selected.name);
    setSubtitle(selected.description);
    setSelectedId(folderId);
    setModalType("update");
  };

  const openCreateModal = () => {
    setTitle("");
    setSubtitle("");
    setSelectedId(null);
    setModalType("create");
  };

  const handleSubmit = async () => {
    try {
      if (modalType === "create") {
        // 1) 서버에 생성 요청
        const created = await createBook(title, subtitle);
        // 2) VocaBookProps 객체로 만들기
        const newItem: VocaBookProps = {
          folderId: created.folderId ?? created.folderId,
          name: created.name ?? title,
          description: created.description ?? subtitle,
          favorite: Boolean(created.favorite),
          thumbnailUrl: created.thumbnailUrl ?? null,
        };
        // 3) 목록에 반영(낙관적 업데이트)
        setVocaList(prev => [...prev, newItem]);
      } else if (modalType === "update" && selectedId !== null) {
        // 1) 서버에 수정 요청
        await updateBook(selectedId, title, subtitle);
        // 2) 목록에 반영(낙관적 업데이트)
        setVocaList(prev =>
          prev.map(item =>
            item.folderId === selectedId
              ? { ...item, name: title, description: subtitle }
              : item
          )
        );
      }

      // 성공 시에만 모달 닫기
      closeModal();
    } catch (e) {
      console.error(e);
      // TODO: 토스트로 "생성 실패" 같은 에러 UI 표시
    }
  };
  const handleDelete = async () => {
    if (selectedId !== null) {
      await deleteBook(selectedId);
      setVocaList(prev => prev.filter(item => item.folderId !== selectedId));
      closeModal();
    }
  };

  // 즐겨찾기 토글
  const toggleFavorite = (folderId: number) => {
    setVocaList(prev =>
      prev.map(item =>
        item.folderId === folderId
          ? { ...item, favorite: !item.favorite }
          : item
      )
    );
  };

  // 검색/필터링
  const filteredList = vocaList.filter(voca => {
    const isMatched = hangul.search(voca.name, searchKey) > -1;
    return isFavoriteOnly ? voca.favorite && isMatched : isMatched;
  });

  const searchFunction = (v: string) => setSearchKey(v);

  // 단어장 불러오기
  const handleLearnClick = async (folderId: number) => {
    const list = await getWords(folderId);
    console.log("📦 학습용 단어 리스트:", list);
  };

  // 퀴즈 이동 모달
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      {/* 생성/수정 폼 모달 */}
      <VocaFormModal
        isOpen={modalType !== null}
        onClose={closeModal}
        folderId={selectedId}
        formType={modalType}
        title={title}
        subtitle={subtitle}
        onChangeTitle={setTitle}
        onChangeSubtitle={setSubtitle}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      />

      {/* 퀴즈 선택 모달 */}
      <QuizBookSelectModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        vocaList={vocaList}
      />

      {/* 상단 툴바 */}
      <div className="flex flex-col p-2 w-full gap-2">
        <div className="flex flex-row gap-2 p-4 bg-gray-100 rounded-md">
          <IconButton
            ButtonVariant={{
              bgColor: "purple",
              textColor: "white",
              size: "xxxl",
            }}
            buttonValue={() => navigate(-1)}
            className="w-30"
          >
            뒤로 가기
          </IconButton>

          <Searchbar iconColor="blue" onSearch={searchFunction} />

          <IconButton
            ButtonVariant={{ bgColor: "purple", textColor: "white" }}
            buttonValue={() => setQuizModalOpen(true)}
            className="w-30"
          >
            퀴즈 풀기
          </IconButton>
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-4 bg-[#F3F4FF] p-4 h-full rounded-md">
          <VocaBookSecondHeader
            isToggle={isToggle}
            onClickToggle={() => setIsToggle(prev => !prev)}
            onClickCreate={openCreateModal}
            onClickFavorite={() => setIsFavoriteOnly(prev => !prev)}
          />

          {/* 카드 목록 */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                          lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
          >
            {filteredList.map(data => (
              <VocaBookCard
                key={data.folderId}
                {...data}
                onLearnClick={handleLearnClick}
                onEditClick={openEditModal}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
