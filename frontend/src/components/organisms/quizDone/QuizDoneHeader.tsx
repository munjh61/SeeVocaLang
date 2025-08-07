import Trophy from "../../../asset/trophy.svg?react";
import { Div } from "../../atoms/div/Div";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";

export const QuizDoneHeader = () => {
  return (
    <Div className="text-center">
      <Div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full mb-6">
        <Icon icon={Trophy} size="lg" color="white" />
      </Div>
      <Text size="xl" weight="bold" color="purple" className="text-4xl mb-2">
        🎉 축하해요! 🎉
      </Text>
    </Div>
  );
};
