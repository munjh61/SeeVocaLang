import { useState } from "react";
import { BookSecondHeader } from "../../organisms/vocaSecondheader/VocaSecondheader";
import { SearchbarSegment } from "../../organisms/searchbarSegment/SearchbarSegment";
import {
  VocaCard,
  type VocaCardProps,
} from "../../organisms/vocaCard/VocaCard";
import { Modal } from "../../atoms/modal/modal";
import { VocaForm } from "../../organisms/vocaEditModal/vocaForm";

export type VocaDataProps = {
  vocaDatas: VocaCardProps[];
};

export const BookSelectTemplate = ({ vocaDatas }: VocaDataProps) => {
  const searchFunction = (v: string) => console.log(v);

  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isToggle, setIsToggle] = useState(true);
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);

  const closeModal = () => {
    setModalType(null);
    setSelectedId(null);
    setTitle("");
    setSubtitle("");
  };

  const openEditModal = (id: number) => {
    const selected = vocaDatas.find(item => item.id === id);
    if (!selected) return;
    setTitle(selected.name);
    setSubtitle(selected.description);
    setSelectedId(id);
    setModalType("update");
  };

  const openCreateModal = () => {
    console.log("현재 modalType:", modalType);
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

  const filteredData = vocaDatas.filter(voca =>
    isFavoriteOnly ? voca.favorite : true
  );

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

        <BookSecondHeader
          isToggle={isToggle}
          onClickToggle={() => setIsToggle(prev => !prev)}
          onClickCreate={openCreateModal}
          onClickFavorite={() => setIsFavoriteOnly(prev => !prev)}
        />

        <div className="gap-4">
          {filteredData.map(data => (
            <VocaCard key={data.id} {...data} onEditClick={openEditModal} />
          ))}
        </div>
      </div>
    </div>
  );
};
