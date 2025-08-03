import { useState } from "react";
import { ToggleButton } from "../../molecules/toggleButton/ToggleButton";
import { SearchbarSegment } from "../../organisms/searchbarSegment/SearchbarSegment";
import {
  VocaCard,
  type VocaCardProps,
} from "../../organisms/vocaCard/VocaCard";

type VocaDetailTemplateProps = {
  bookId: number;
  vocaCardDatas?: VocaCardProps[];
};

export const VocaDetailTemplate = ({
  bookId,
  vocaCardDatas = [],
}: VocaDetailTemplateProps) => {
  const [searchKey, setSearchKey] = useState("");

  // 여기서 전체 단어 상태 관리
  const [vocaList, setVocaList] = useState<VocaCardProps[]>(vocaCardDatas);

  const searchFunction = () => {};
  const deleteFunction = (wordId: number) => {
    setVocaList(prev => prev.filter(card => card.wordId !== wordId));
  };

  return (
    <div className="flex flex-col px-5 w-full gap-4">
      <h1>확인용... {bookId}번의 단어장.</h1>
      <div className="flex flex-row">
        <SearchbarSegment
          iconColor="blue"
          onSearch={searchFunction}
          className="w-full h-20"
        />
        <ToggleButton selected={false}>한글가리기</ToggleButton>
        <ToggleButton selected={false}>영어가리기</ToggleButton>
      </div>
      <div className="flex flex-wrap gap-4 justify-start">
        {vocaList.map(card => (
          <VocaCard
            key={card.wordId}
            {...card}
            onDelete={() => deleteFunction(card.wordId!)}
          />
        ))}
      </div>
    </div>
  );
};
