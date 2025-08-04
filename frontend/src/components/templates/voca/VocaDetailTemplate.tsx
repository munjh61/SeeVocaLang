import { useState } from "react";
import { ToggleButton } from "../../molecules/toggleButton/ToggleButton";
import { SearchbarSegment } from "../../organisms/searchbarSegment/SearchbarSegment";
import {
  VocaCard,
  type VocaCardProps,
} from "../../organisms/vocaCard/VocaCard";
import hangul from "hangul-js";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { useNavigate } from "react-router-dom";

type VocaDetailTemplateProps = {
  bookId: number;
  vocaCardDatas?: VocaCardProps[];
};

export const VocaDetailTemplate = ({
  bookId,
  vocaCardDatas = [],
}: VocaDetailTemplateProps) => {
  const navigate = useNavigate();
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
      <div>
        <div className="flex flex-row">
          <div className="flex py-4 pl-4 bg-gray-100 rounded-r-sm">
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
          </div>
          <SearchbarSegment
            iconColor="blue"
            onSearch={searchFunction}
            className="w-full h-20 rounded-r-none"
          />
          <div className="flex flex-row gap-2 py-4 pr-4 bg-gray-100 rounded-r-sm">
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
            <IconButton
              ButtonVariant={{
                bgColor: "purple",
                textColor: "white",
              }}
              path={`/quiz?bookId=${bookId}`}
              className="w-30"
            >
              퀴즈 풀기
            </IconButton>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center bg-[#F3F4FF] py-10 px-5 h-full">
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
      <h1>확인용... {bookId}번의 단어장.</h1>
    </div>
  );
};
