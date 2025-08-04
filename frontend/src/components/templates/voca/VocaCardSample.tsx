import type { VocaCardProps } from "../../organisms/vocaCard/VocaCard";
import apple from "../../../asset/png/apple.png";

const VocaCardSample: VocaCardProps[] = [
  {
    wordId: 1,
    imgUrl: apple,
    audioUrl: "https://example.com/audio/apple.mp3",
    nameEn: "apple",
    nameKo: "사과",
    onDelete: () => {}, // 더미 함수
  },
  {
    wordId: 2,
    imgUrl: apple,
    audioUrl: "https://example.com/audio/banana.mp3",
    nameEn: "banana",
    nameKo: "바나나",
    onDelete: () => {},
  },
  {
    wordId: 3,
    imgUrl: apple,
    audioUrl: "https://example.com/audio/coffee.mp3",
    nameEn: "coffee",
    nameKo: "커피",
    onDelete: () => {},
  },
];

export default VocaCardSample;
