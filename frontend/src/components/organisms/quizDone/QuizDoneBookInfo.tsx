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
    <Div bg="white" align={"center"} className="w-full rounded-3xl p-2">
      <Div align={"center"}>
        <Icon icon={BookOpen} color="blue" size="sm" />
        <Text size="base" weight="medium" color="gray">
          완료한 단어장
        </Text>
        <Text size="xl" weight="bold" color="gray" children={bookname} />
      </Div>
      <Div align={"center"} className="grid grid-cols-2 w-full">
        <Div align={"center"}>
          <Text size="sm" color="gray">
            푼 문제 수
          </Text>
          <Text
            size="lg"
            color="orange"
            className="font-bold"
            children={`${size} 개`}
          />
        </Div>
        <Div align={"center"}>
          <Text size="sm" color="gray">
            최대 연속 정답 수
          </Text>
          <Text
            size="lg"
            color="green"
            className="font-bold"
            children={`${result} 개`}
          />
        </Div>
      </Div>
    </Div>
  );
};
