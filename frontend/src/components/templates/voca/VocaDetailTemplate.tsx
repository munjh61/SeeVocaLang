import { useState } from "react";
import { ToggleButton } from "../../molecules/toggleButton/ToggleButton";
import {
  VocaCard,
  type VocaCardProps,
} from "../../organisms/vocaCard/VocaCard";
import hangul from "hangul-js";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "../../molecules/searchbar/Searchbar";
import { Div } from "../../atoms/div/Div";
import { deleteWordAtThisFolder } from "../../../api/FolderAPI";
import sea from "../../../asset/png/sea.png";
import cave from "../../../asset/png/cave.png";

type VocaDetailTemplateProps = {
  folderId: number;
  name: string;
  description: string;
  isTodayMission: boolean;
  vocaCardDatas?: VocaCardProps[];
};

export const VocaDetailTemplate = ({
  folderId,
  name,
  description,
  vocaCardDatas = [],
}: VocaDetailTemplateProps) => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [blurEn, setblurEn] = useState(false);
  const [blurKo, setblurKo] = useState(false);

  // 여기서 전체 단어 상태 관리
  const [vocaList, setVocaList] = useState<VocaCardProps[]>(vocaCardDatas);

  const searchFunction = (v: string) => setSearchKey(v);
  const deleteFunction = async (wordId: number) => {
    if (wordId) {
      await deleteWordAtThisFolder(wordId, folderId);
      setVocaList(prev => prev.filter(card => card.wordId !== wordId));
    }
  };

  const filteredVocaList = vocaList.filter(voca => {
    return (
      voca.nameEn.includes(searchKey) ||
      hangul.search(voca.nameKo, searchKey) > -1
    );
  });

  return (
    <Div align={"center"} className="w-full h-full p-2">
      <div className="flex flex-row gap-2 p-4 bg-gray-100 rounded-md w-full">
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
          ButtonVariant={{
            bgColor: "purple",
            textColor: "white",
          }}
          path={`/quiz/${folderId}`}
          state={{ name, description }}
          className="w-30"
        >
          퀴즈 풀기
        </IconButton>
      </div>
      <Div
        className="flex flex-col gap-4 p-4 grow w-full  "
        style={{
          backgroundImage: `url(${cave}), url(${sea})`,
          backgroundSize: "cover, cover",
          backgroundPosition: "top, center",
          backgroundRepeat: "no-repeat, repeat",
        }}
      >
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-10">
          {filteredVocaList.map(card => (
            <VocaCard
              key={card.wordId}
              {...card}
              blurEn={blurEn}
              blurKo={blurKo}
              onDelete={() => deleteFunction(card.wordId!)}
              folders={card.folders}
            />
          ))}
        </div>
      </Div>
    </Div>
  );
};
