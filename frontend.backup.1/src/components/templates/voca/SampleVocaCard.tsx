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
    audioUrl: "https://example.com/audio/apple.mp3",
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
    audioUrl: "https://example.com/audio/banana.mp3",
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
    audioUrl: "https://example.com/audio/coffee.mp3",
    nameEn: "duck",
    nameKo: "오리",
  },
  {
    wordId: 4,
    imgUrl: fish,
    audioUrl: "https://example.com/audio/cup.mp3",
    nameEn: "fish",
    nameKo: "물고기",
  },
  {
    wordId: 5,
    imgUrl: fox,
    audioUrl: "https://example.com/audio/keyboard.mp3",
    nameEn: "fox",
    nameKo: "여우",
  },
  {
    wordId: 6,
    imgUrl: hippo,
    audioUrl: "https://example.com/audio/laptop.mp3",
    nameEn: "hippo",
    nameKo: "하마",
  },
  {
    wordId: 7,
    imgUrl: owl,
    audioUrl: "https://example.com/audio/owl.mp3",
    nameEn: "owl",
    nameKo: "부엉이",
  },
  {
    wordId: 8,
    imgUrl: squirrel,
    audioUrl: "https://example.com/audio/squirrel.mp3",
    nameEn: "squirrel",
    nameKo: "다람쥐",
  },
  {
    wordId: 9,
    imgUrl: crocodile,
    audioUrl: "https://example.com/audio/crocodile.mp3",
    nameEn: "Tralalero Tralala",
    nameKo: "트랄랄레로 트랄랄라",
  },
];

export default VocaCardSample;
