import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";

type MessageCardProps = {
  result: number;
};

export const MessageCard = ({ result }: MessageCardProps) => {
  return (
    <Div
      bg="white"
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg text-center"
    >
      <Text size="xl" weight="bold" color="purple" className="mb-3">
        🌟 대단해요! 🌟
      </Text>
      <Text size="lg" weight="medium" color="purple" className="mb-2">
        일주일 연속 학습! 정말 대단해요!
      </Text>
      <Text size="base" color="gray" className="mb-3">
        엄마 아빠께 자랑해보세요!
      </Text>
      <Text
        size="sm"
        color="gray"
        children={`연속으로 {result} 문제 맞췄어요.`}
      ></Text>
    </Div>
  );
};
