import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";

type QuizDoneMessageCardProps = {
  result: number;
  day: number;
};

export const QuizDoneMessageCard = ({
  result,
  day,
}: QuizDoneMessageCardProps) => {
  return (
    <Div
      bg="white"
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg text-center"
    >
      <Text size="xl" weight="bold" color="purple" className="mb-3">
        🌟 대단해요! 🌟
      </Text>
      <Text size="lg" weight="medium" color="purple" className="mb-2">
        {compliment(day)}
      </Text>
      <Text
        size="sm"
        color="gray"
        children={`연속으로 ${result} 문제 맞췄어요.`}
      ></Text>
    </Div>
  );
};

function compliment(day: number): string {
  const defaultMessages = [
    "오늘도 빠지지 않고 학습했어요!🙌",
    "작은 노력이 큰 변화를 만들어요 💪",
    "지금 이 순간에도 성장 중이에요 🌱",
    "매일매일 쌓이는 실력, 눈부셔요 ✨",
    "조용히, 그러나 꾸준히! 진짜 멋져요 😎",
  ];

  let msg: string;
  switch (day) {
    case 1:
      msg = "오늘 첫 시작을 했어요! 멋진 출발이에요 🚀";
      break;
    case 2:
      msg = "2일 연속 학습! 습관 만들기 시작이 좋네요 ✨";
      break;
    case 3:
      msg = "3일 연속! 벌써 꾸준함이 느껴져요 💪";
      break;
    case 7:
      msg = "일주일 연속 학습! 정말 대단해요 🌟";
      break;
    case 10:
      msg = "10일 동안 멈추지 않았어요! 존경스러워요 🙏";
      break;
    case 14:
      msg = "2주 연속! 학습 루틴이 몸에 배고 있어요 🔥";
      break;
    case 21:
      msg = "3주 연속 학습! 성실함이 빛나요 💯";
      break;
    case 28:
      msg = "4주 연속! 한 달의 기적이에요 🎉";
      break;
    case 30:
      msg = "30일 연속 학습! 진짜 최고예요 🏆";
      break;
    case 40:
      msg = "40일째 학습! 인내와 끈기의 승리입니다 🧘‍♂️";
      break;
    case 50:
      msg = "50일 연속 학습! 반백 번 완주, 전설이에요 🌈";
      break;
    case 60:
      msg = "60일 동안 이어진 학습! 정말 멋져요 💎";
      break;
    case 70:
      msg = "70일 연속! AI보다 꾸준한 사람 🤖";
      break;
    case 80:
      msg = "80일 학습! 열정이 넘쳐흘러요 🔥";
      break;
    case 90:
      msg = "90일! 백일의 기적이 코앞이에요 🥳";
      break;
    case 100:
      msg = "100일 연속 학습! 전설이 탄생했습니다 🐉";
      break;
    default:
      const randomIndex = Math.floor(Math.random() * defaultMessages.length);
      msg = defaultMessages[randomIndex];
      break;
  }
  return msg;
}
