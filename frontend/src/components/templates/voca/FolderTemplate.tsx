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
import {
  VocaCard,
  type VocaCardProps,
} from "../../organisms/vocaCard/VocaCard";
import { deleteWordAtAllFolder } from "../../../api/WordAPI";
import sea from "../../../asset/png/sea.png";
import { ISLANDS } from "../../common/Islands";
import readingPriate from "../../../asset/png/pirate_looking_paper.png";

type FolderTemplateProps = {
  folderDatas: FolderProps[];
  vocaDatas: VocaCardProps[];
};

export const FolderTemplate = ({
  folderDatas,
  vocaDatas,
}: FolderTemplateProps) => {
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isToggle, setIsToggle] = useState(true);
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const [folderList, setfolderList] = useState<FolderProps[]>(folderDatas);
  const [vocaList, setVocaList] = useState<VocaCardProps[]>(vocaDatas);

  /** prop 변경 시 내부 상태 동기화 (API 재호출 등으로 상위에서 배열이 바뀔 수 있음) */
  useEffect(() => {
    setfolderList(folderDatas);
  }, [folderDatas]);

  // 모달 공통 핸들러
  const closeModal = () => {
    setModalType(null);
    setSelectedId(null);
    setTitle("");
    setSubtitle("");
  };

  const openEditModal = (folderId: number) => {
    const selected = folderList.find(item => item.folderId === folderId);
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
          wordCount: 0,
          thumbnailUrl: created.thumbnailUrl ?? null,
          onEditClick: () => {
            openEditModal(created.folderId);
          },
        };
        // 3) 목록에 반영(낙관적 업데이트)
        setfolderList(prev => [...prev, newItem]);
      } else if (modalType === "update" && selectedId !== null) {
        // 1) 서버에 수정 요청
        await updatefolder(selectedId, title, subtitle);
        // 2) 목록에 반영(낙관적 업데이트)
        setfolderList(prev =>
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
  const deleteFolderFunction = async () => {
    if (selectedId !== null) {
      await deletefolder(selectedId);
      setfolderList(prev => prev.filter(item => item.folderId !== selectedId));
      setVocaList(prev =>
        prev
          .map(card => {
            const nextFolders = (card.folders ?? []).filter(
              f => f.folderId !== selectedId
            );
            return { ...card, folders: nextFolders };
          })
          .filter(card => (card.folders?.length ?? 0) > 0)
      );
      closeModal();
    }
  };

  const deleteWordFunction = async (wordId: number) => {
    // console.log("삭제할 wordId:", wordId);
    if (wordId) {
      await deleteWordAtAllFolder(wordId);
      setVocaList(prev => prev.filter(card => card.wordId !== wordId));
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
  const filteredFolderList = folderList.filter(voca => {
    const isMatched = hangul.search(voca.name, searchKey) > -1;
    return isFavoriteOnly ? voca.favorite && isMatched : isMatched;
  });
  const filteredVocaList = vocaList.filter(voca => {
    return (
      voca.nameEn.includes(searchKey) ||
      hangul.search(voca.nameKo, searchKey) > -1
    );
  });

  // 퀴즈 이동 모달
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  return (
    <Div align={"center"} className="w-full h-full">
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
        onDelete={deleteFolderFunction}
        onSubmit={handleSubmit}
      />

      {/* 퀴즈 선택 모달 */}
      <QuizFolderSelectModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        folderList={folderList}
      />

      {/* 본문 */}
      <Div
        style={{ backgroundImage: `url(${sea})` }}
        className="flex flex-col grow w-full bg-cover relative"
      >
        <img
          src={readingPriate}
          className="absolute left-5 top-5 w-[10%] z-0 pointer-events-none select-none"
        />
        <div className="flex flex-col items-center z-10 gap-6 p-4 grow">
          {/* 상단 툴바 */}
          <Div className="flex flex-row gap-2 p-4 bg-gray-100 rounded-md w-full max-w-5xl">
            <IconButton
              ButtonVariant={{
                bgColor: "purple",
                textColor: "white",
                size: "xl",
                font: "hakgyo",
              }}
              buttonValue={() => navigate(-1)}
              className="w-30"
            >
              뒤로
            </IconButton>

            <Searchbar iconColor="blue" onSearch={searchFunction} />

            <IconButton
              ButtonVariant={{
                bgColor: "purple",
                textColor: "white",
                size: "xl",
                font: "hakgyo",
              }}
              buttonValue={() => setQuizModalOpen(true)}
              className="w-30"
            >
              퀴즈
            </IconButton>
          </Div>
          <VocafolderSecondHeader
            isToggle={isToggle}
            onClickToggle={() => setIsToggle(prev => !prev)}
            onClickCreate={openCreateModal}
            onClickFavorite={() => setIsFavoriteOnly(prev => !prev)}
          />
          <div className="w-[70%]">
            {/* 단어 카드 목록*/}
            {!isToggle && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredVocaList.map(card => {
                  const id = Number(card.wordId);
                  return (
                    <VocaCard
                      key={id}
                      nameEn={card.nameEn}
                      nameKo={card.nameKo}
                      imageUrl={card.imageUrl}
                      folders={card.folders}
                      onDelete={() => deleteWordFunction(id)}
                    />
                  );
                })}
              </div>
            )}
            {/* 단어장 카드 목록 */}
            {isToggle && (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredFolderList.map(data => {
                  const idx = Math.abs(Number(data.folderId)) % ISLANDS.length;
                  return (
                    <Folder
                      key={data.folderId}
                      {...data}
                      islandSrc={ISLANDS[idx]}
                      onEditClick={openEditModal}
                      onToggleFavorite={toggleFavorite}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Div>
    </Div>
  );
};
