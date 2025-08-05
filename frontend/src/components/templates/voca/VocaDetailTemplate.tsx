import { useState } from "react";
import { ToggleButton } from "../../molecules/toggleButton/ToggleButton";
import {
  VocaCard,
  type VocaCardProps,
} from "../../organisms/vocaCard/VocaCard";
import hangul from "hangul-js";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "../../organisms/searchbarSegment/Searchbar";

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
        <Searchbar iconColor="blue" onSearch={searchFunction} />
        <div className="flex flex-row gap-2">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
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
