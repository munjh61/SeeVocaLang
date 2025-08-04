import type { VocaCardProps } from "../../organisms/vocaCard/VocaCard";
import apple from "../../../asset/png/apple.png";
import bear from "../../../asset/png/bear.png";
import duck from "../../../asset/png/duck.png";
import fish from "../../../asset/png/fish.png";
import fox from "../../../asset/png/fox.png";
import pig from "../../../asset/png/pig.png";

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
    imgUrl: pig,
    audioUrl: "https://example.com/audio/laptop.mp3",
    nameEn: "pig",
    nameKo: "돼지",
  },
  {
    wordId: 7,
    imgUrl: apple,
    audioUrl: "https://example.com/audio/clock.mp3",
    nameEn: "clock",
    nameKo: "시계",
  },
  {
    wordId: 8,
    imgUrl: apple,
    audioUrl: "https://example.com/audio/phone.mp3",
    nameEn: "phone",
    nameKo: "핸드폰",
  },
];

export default VocaCardSample;
