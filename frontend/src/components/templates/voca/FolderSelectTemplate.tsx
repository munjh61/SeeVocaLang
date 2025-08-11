import { useEffect, useState } from "react";
import { VocafolderSecondHeader } from "../../organisms/folder/FolderSecondheader";
import { Folder, type FolderProps } from "../../organisms/folder/Folder";
import hangul from "hangul-js";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "../../molecules/searchbar/Searchbar";
import { QuizFolderSelectModal } from "../../organisms/folder/QuizFolderSelectModal";
import { FolderFormModal } from "../../organisms/folder/FolderFormModal";
import {
  addFavorite,
  createfolder,
  deletefolder,
  deleteFavorite,
  updatefolder,
} from "../../../api/FolderAPI";
import { Div } from "../../atoms/div/Div";

type FolderSelectTemplateProps = {
  vocafolderDatas: FolderProps[]; // ← 배열 타입 (선택 아님)
};

export const FolderSelectTemplate = ({
  vocafolderDatas,
}: FolderSelectTemplateProps) => {
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isToggle, setIsToggle] = useState(true);
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const [vocaList, setVocaList] = useState<FolderProps[]>(vocafolderDatas);

  /** prop 변경 시 내부 상태 동기화 (API 재호출 등으로 상위에서 배열이 바뀔 수 있음) */
  useEffect(() => {
    setVocaList(vocafolderDatas);
  }, [vocafolderDatas]);

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
        const created = await createfolder(title, subtitle);
        // 2) VocafolderProps 객체로 만들기
        const newItem: FolderProps = {
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
        await updatefolder(selectedId, title, subtitle);
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
    }
  };
  const deleteFunction = async () => {
    if (selectedId !== null) {
      await deletefolder(selectedId);
      setVocaList(prev => prev.filter(item => item.folderId !== selectedId));
      closeModal();
    }
  };

  const searchFunction = (v: string) => setSearchKey(v);

  // 즐겨찾기 토글
  const toggleFavorite = async (folderId: number, favorite: boolean) => {
    if (favorite) {
      deleteFavorite(folderId);
    } else {
      addFavorite(folderId);
    }
  };

  // 검색/필터링
  const filteredList = vocaList.filter(voca => {
    const isMatched = hangul.search(voca.name, searchKey) > -1;
    return isFavoriteOnly ? voca.favorite && isMatched : isMatched;
  });

  // 퀴즈 이동 모달
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  return (
    <Div align={"center"} className="w-full h-full p-2">
      {/* 생성/수정 폼 모달 */}
      <FolderFormModal
        isOpen={modalType !== null}
        onClose={closeModal}
        folderId={selectedId}
        formType={modalType}
        title={title}
        subtitle={subtitle}
        onChangeTitle={setTitle}
        onChangeSubtitle={setSubtitle}
        onDelete={deleteFunction}
        onSubmit={handleSubmit}
      />

      {/* 퀴즈 선택 모달 */}
      <QuizFolderSelectModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        vocaList={vocaList}
      />

      {/* 상단 툴바 */}
      <Div className="flex flex-row gap-2 p-4 bg-gray-100 rounded-md w-full">
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
      </Div>

      {/* 본문 */}
      <Div
        bg={"sky"}
        className="flex flex-col grow gap-4 p-4 w-full h-full rounded-md"
      >
        <VocafolderSecondHeader
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
            <Folder
              key={data.folderId}
              {...data}
              // onLearnClick={handleLearnClick}
              onEditClick={openEditModal}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </Div>
    </Div>
  );
};
