import { useState } from "react";
import { VocaBookSecondHeader } from "../../organisms/vocaSecondheader/VocaSecondheader";
import { SearchbarSegment } from "../../organisms/searchbarSegment/SearchbarSegment";
import {
  VocaBookCard,
  type VocaBookCardProps,
} from "../../organisms/vocaBookCard/VocaBookCard";
import { Modal } from "../../atoms/modal/modal";
import { VocaForm } from "../../organisms/vocaEditModal/vocaBookForm";

export type VocaBookDataProps = {
  vocaDatas: VocaBookCardProps[];
};

export const BookSelectTemplate = ({ vocaDatas }: VocaBookDataProps) => {
  const searchFunction = (v: string) => console.log(v);

  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isToggle, setIsToggle] = useState(true);
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);

  // 여기서 전체 단어장 상태 관리
  const [vocaList, setVocaList] = useState<VocaBookCardProps[]>(vocaDatas);

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
    closeModal();
  };

  const toggleFavorite = (id: number) => {
    setVocaList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const filteredList = isFavoriteOnly
    ? vocaList.filter(voca => voca.favorite)
    : vocaList;

  return (
    <div className="flex flex-col justify-center">
      {modalType && (
        <Modal isOpen={true} onClose={closeModal}>
          <VocaForm
            formType={modalType}
            title={title}
            subtitle={subtitle}
            onChangeTitle={setTitle}
            onChangeSubtitle={setSubtitle}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}

      <div className="flex flex-col px-5 w-full gap-4">
        <SearchbarSegment
          iconColor="blue"
          onSearch={searchFunction}
          className="w-full h-20"
          segmentControl={{
            options: [
              { value: "book", label: "단어장으로 검색하기" },
              { value: "word", label: "단어로 검색하기" },
            ],
          }}
        />

        <VocaBookSecondHeader
          isToggle={isToggle}
          onClickToggle={() => setIsToggle(prev => !prev)}
          onClickCreate={openCreateModal}
          onClickFavorite={() => setIsFavoriteOnly(prev => !prev)}
        />

        <div className="gap-4">
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
  );
};
