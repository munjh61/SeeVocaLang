import { Div } from "../../atoms/div/Div";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import BookOpen from "../../../asset/book.svg?react";

type Props = {
  bookname: string;
  size: number;
  result: number;
};

export const QuizDoneBookInfo = ({ bookname, size, result }: Props) => {
  return (
    <Div
      bg="white"
      className="flex flex-col gap-2 items-center bg-white/80 rounded-3xl p-2"
    >
      <Div className="flex items-center gap-3">
        <Icon icon={BookOpen} color="blue" size="sm" />
        <Text size="base" weight="medium" color="gray">
          완료한 단어장
        </Text>
      </Div>
      <Text size="xl" weight="bold" color="gray" children={bookname} />
      <Div>
        <Text
          size="base"
          color="gray"
          children={`${size}개 문제를 풀었어요!`}
        />
        <Text
          size="sm"
          color="gray"
          children={`연속으로 ${result} 문제 맞췄어요.`}
        ></Text>
      </Div>
    </Div>
  );
};
