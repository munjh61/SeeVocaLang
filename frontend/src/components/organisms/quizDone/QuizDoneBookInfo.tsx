import { Div } from "../../atoms/div/Div";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import BookOpen from "../../../asset/book.svg?react";

type Props = {
  bookname: string;
  size: number;
};

export const QuizDoneBookInfo = ({ bookname, size }: Props) => {
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
      <Text children={`${size}개 문제를 풀었어요!`} />
    </Div>
  );
};
