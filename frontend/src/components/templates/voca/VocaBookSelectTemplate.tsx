import { useState } from "react";
import { VocaBookSecondHeader } from "../../organisms/vocaBook/VocaSecondheader";
import {
  VocaBookCard,
  type VocaBookProps,
} from "../../organisms/vocaBook/VocaBook";
import { Modal } from "../../atoms/modal/modal";
import { VocaForm } from "../../organisms/vocaBook/vocaBookForm";
import hangul from "hangul-js";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "../../organisms/searchbarSegment/Searchbar";
import { QuizBookSelectModal } from "../../organisms/vocaBook/QuizBookSelectModal";
import { VocaFormModal } from "../../organisms/vocaBook/VocaFormModal";

export type VocaBookDataProps = {
  vocaBookDatas?: VocaBookProps[];
};

export const BookSelectTemplate = ({
  vocaBookDatas = [],
}: VocaBookDataProps) => {
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isToggle, setIsToggle] = useState(true);
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  // 여기서 전체 단어장 상태 관리
  const [vocaList, setVocaList] = useState<VocaBookProps[]>(vocaBookDatas);

  // 추가 수정 삭제 모달
  const closeModal = () => {
    setModalType(null);
    setSelectedId(null);
    setTitle("");
    setSubtitle("");
  };

  const openEditModal = (id: number) => {
    const selected = vocaList.find(item => item.id === id);
    if (!selected) return;
    setTitle(selected.name);
    setSubtitle(selected.description);
    setSelectedId(id);
    setModalType("update");
  };

  const openCreateModal = () => {
    setTitle("");
    setSubtitle("");
    setSelectedId(null);
    setModalType("create");
  };

  const handleSubmit = () => {
    console.log(`${modalType === "create" ? "생성" : "수정"} 요청`, {
      id: selectedId,
      title,
      subtitle,
    });
    if (modalType === "create") {
      const newId = Math.max(...vocaList.map(v => v.id), 0) + 1; // ID 자동 증가, 나중에 서버 붙이면 번호 가져와야함
      const newItem: VocaBookProps = {
        id: newId,
        name: title,
        description: subtitle,
        favorite: false,
      };
      setVocaList(prev => [...prev, newItem]);
    } else if (modalType === "update" && selectedId !== null) {
      setVocaList(prev =>
        prev.map(item =>
          item.id === selectedId
            ? { ...item, name: title, description: subtitle }
            : item
        )
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      console.log(`삭제 요청`, {
        id: selectedId,
        title,
        subtitle,
      });
      setVocaList(prev => prev.filter(item => item.id !== selectedId));
      closeModal();
    }
  };

  // 즐겨찾기
  const toggleFavorite = (id: number) => {
    setVocaList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const filteredList = vocaList.filter(voca => {
    const isMatched = hangul.search(voca.name, searchKey) > -1;
    return isFavoriteOnly ? voca.favorite && isMatched : isMatched;
  });
  // 검색
  const searchFunction = (v: string) => {
    setSearchKey(v);
  };

  // 퀴즈 이동 모달
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      <VocaFormModal
        isOpen={modalType !== null}
        onClose={closeModal}
        bookId={selectedId}
        formType={modalType}
        title={title}
        subtitle={subtitle}
        onChangeTitle={setTitle}
        onChangeSubtitle={setSubtitle}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      />
      <QuizBookSelectModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        vocaList={vocaList}
      />

      <div className="flex flex-col px-5 w-full gap-4">
        <div className="flex flex-row gap-4 p-4 bg-gray-100">
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
          <Searchbar iconColor="blue" onSearch={searchFunction}></Searchbar>
          <IconButton
            ButtonVariant={{
              bgColor: "purple",
              textColor: "white",
            }}
            buttonValue={() => setQuizModalOpen(true)}
            className="w-30"
          >
            퀴즈 풀기
          </IconButton>
        </div>
        <div className="flex flex-col gap-4 bg-[#F3F4FF] p-4 h-full">
          <VocaBookSecondHeader
            isToggle={isToggle}
            onClickToggle={() => setIsToggle(prev => !prev)}
            onClickCreate={openCreateModal}
            onClickFavorite={() => setIsFavoriteOnly(prev => !prev)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredList.map(data => (
              <VocaBookCard
                key={data.id}
                {...data}
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
