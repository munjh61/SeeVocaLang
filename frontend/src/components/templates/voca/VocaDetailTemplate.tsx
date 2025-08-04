import { useState } from "react";
import { ToggleButton } from "../../molecules/toggleButton/ToggleButton";
import { SearchbarSegment } from "../../organisms/searchbarSegment/SearchbarSegment";
import {
  VocaCard,
  type VocaCardProps,
} from "../../organisms/vocaCard/VocaCard";
import hangul from "hangul-js";

type VocaDetailTemplateProps = {
  bookId: number;
  vocaCardDatas?: VocaCardProps[];
};

export const VocaDetailTemplate = ({
  bookId,
  vocaCardDatas = [],
}: VocaDetailTemplateProps) => {
  const [searchKey, setSearchKey] = useState("");
  const [blurEn, setblurEn] = useState(false);
  const [blurKo, setblurKo] = useState(false);

  // 여기서 전체 단어 상태 관리
  const [vocaList, setVocaList] = useState<VocaCardProps[]>(vocaCardDatas);

  const searchFunction = (v: string) => setSearchKey(v);
  const deleteFunction = (wordId: number) => {
    setVocaList(prev => prev.filter(card => card.wordId !== wordId));
  };

  const filteredList = vocaList.filter(voca => {
    return (
      voca.nameEn.includes(searchKey) ||
      hangul.search(voca.nameKo, searchKey) > -1
    );
  });

  return (
    <div className="flex flex-col px-5 w-full gap-4">
      <h1>확인용... {bookId}번의 단어장.</h1>
      <div className="flex flex-row">
        <SearchbarSegment
          iconColor="blue"
          onSearch={searchFunction}
          className="w-full h-20"
        />
        <div className="flex flex-row gap-2 py-4 bg-gray-100 shadow-md rounded-sm">
          <ToggleButton
            selected={blurEn}
            onClick={() => setblurEn(prev => !prev)}
          >
            영어가리기
          </ToggleButton>
          <ToggleButton
            selected={blurKo}
            onClick={() => setblurKo(prev => !prev)}
          >
            한글가리기
          </ToggleButton>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center bg-[#F3F4FF] py-10 px-5">
        {filteredList.map(card => (
          <VocaCard
            key={card.wordId}
            {...card}
            blurEn={blurEn}
            blurKo={blurKo}
            onDelete={() => deleteFunction(card.wordId!)}
            books={card.books}
          />
        ))}
      </div>
    </div>
  );
};
