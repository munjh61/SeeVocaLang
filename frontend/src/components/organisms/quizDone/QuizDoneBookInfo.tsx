import { Div } from "../../atoms/div/Div";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import BookOpen from "../../../asset/book.svg?react";

type Props = {
  bookname: string;
};

export const BookInfoCard = ({ bookname }: Props) => {
  return (
    <Div
      bg="white"
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg"
    >
      <Div className="flex items-center gap-3 mb-4">
        <Icon icon={BookOpen} color="blue" size="sm" />
        <Text size="base" weight="medium" color="gray">
          완료한 단어장
        </Text>
      </Div>
      <Text
        size="xl"
        weight="bold"
        color="gray"
        className="mb-2"
        children={bookname}
      />
      <Text size="base" weight="medium" color="blue">
        모든 단어를 완벽하게 맞췄어요!
      </Text>
    </Div>
  );
};
