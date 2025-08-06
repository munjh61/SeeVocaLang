import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";

export const MessageCard = () => {
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
      <Text size="sm" color="gray">
        📚 클리어한 에픽 카드로 저장하고!
      </Text>
    </Div>
  );
};
