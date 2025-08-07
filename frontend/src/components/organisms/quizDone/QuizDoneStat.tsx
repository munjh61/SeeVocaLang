import { Div } from "../../atoms/div/Div";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import Flame from "../../../asset/flower.svg?react";
import Calendar from "../../../asset/calendar.svg?react";

type Props = {
  size: number;
};

export const StatsCard = ({ size }: Props) => {
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const dayOfWeek = days[today.getDay()];

  return (
    <Div
      bg="white"
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg"
    >
      <Div className="grid grid-cols-2 gap-6">
        <Div className="text-center">
          <Div className="flex justify-center items-center gap-2 mb-2">
            <Icon icon={Flame} color="orange" size="sm" />
            <Text size="sm" weight="medium" color="gray">
              연속 학습
            </Text>
          </Div>
          <Text
            size="xxl"
            weight="bold"
            color="orange"
            children={`${size}일째`}
          ></Text>
          <Div className="w-8 h-1 bg-orange-500 rounded-full mx-auto mt-2" />
        </Div>
        <Div className="text-center">
          <Div className="flex justify-center items-center gap-2 mb-2">
            <Icon icon={Calendar} color="green" size="sm" />
            <Text size="sm" weight="medium" color="gray">
              완료일
            </Text>
          </Div>
          <Text size="lg" weight="bold" color="green">
            {dateStr}
          </Text>
          <Text size="sm" weight="medium" color="green">
            {dayOfWeek}
          </Text>
        </Div>
      </Div>
    </Div>
  );
};
