import type { VocaCardProps } from "../../organisms/vocaCard/VocaCard";
import apple from "../../../asset/png/apple.png";
import bear from "../../../asset/png/bear.png";
import duck from "../../../asset/png/duck.png";
import fish from "../../../asset/png/fish.png";
import fox from "../../../asset/png/fox.png";
import hippo from "../../../asset/png/hippo.png";
import owl from "../../../asset/png/owl.png";
import squirrel from "../../../asset/png/squirrel.png";
import crocodile from "../../../asset/png/crocodile.webp";

const VocaCardSample: VocaCardProps[] = [
  {
    wordId: 1,
    imgUrl: apple,
    nameEn: "apple",
    nameKo: "사과",
    books: [
      { id: 1, name: "단어장1" },
      { id: 2, name: "과일" },
    ],
  },
  {
    wordId: 2,
    imgUrl: bear,
    nameEn: "bear",
    nameKo: "곰",
    books: [
      { id: 1, name: "단어장1" },
      { id: 2, name: "동물" },
      { id: 3, name: "포유류" },
    ],
  },
  {
    wordId: 3,
    imgUrl: duck,
    nameEn: "duck",
    nameKo: "오리",
  },
  {
    wordId: 4,
    imgUrl: fish,
    nameEn: "fish",
    nameKo: "물고기",
  },
  {
    wordId: 5,
    imgUrl: fox,
    nameEn: "fox",
    nameKo: "여우",
  },
  {
    wordId: 6,
    imgUrl: hippo,
    nameEn: "hippo",
    nameKo: "하마",
  },
  {
    wordId: 7,
    imgUrl: owl,
    nameEn: "owl",
    nameKo: "부엉이",
  },
  {
    wordId: 8,
    imgUrl: squirrel,
    nameEn: "squirrel",
    nameKo: "다람쥐",
  },
  {
    wordId: 9,
    imgUrl: crocodile,
    nameEn: "Tralalero Tralala",
    nameKo: "트랄랄레로 트랄랄라",
  },
];

export default VocaCardSample;
