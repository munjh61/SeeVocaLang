import { Text } from "../../atoms/text/Text.tsx";
import { Button } from "../../atoms/button/Button.tsx";
import LogoImg from "../../../asset/png/pirate.png";
import SocialLoginRow from "./SocialLoginRow";

type Props = {
  onLogin: () => void;
  onSignup: () => void;
};

export default function HeroCard({ onLogin, onSignup }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-7 bg-white/65 p-10 pt-5 rounded-2xl shadow-2xl backdrop-blur-lg">
      <div className="flex flex-col items-center justify-center gap-5">
        <img src={LogoImg} className="w-25 h-25" alt={"로고"} />
        <Text className="text-blue-500 text-4xl font-extrabold">
          씨보랭(SVL)
        </Text>
      </div>

      <div className="flex flex-col items-center justify-center gap-0.5">
        <Text color="muted" size="sm">
          스마트한 방법으로 영단어를 마스터하세요
        </Text>
        <Text size="sm" className="text-blue-500">
          AI와 함께하는 맞춤형 학습
        </Text>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button
          size="onboard"
          textColor="white"
          className="bg-blue-500 rounded-xl"
          onClick={onLogin}
        >
          로그인
        </Button>
        <Button
          size="onboard"
          textColor="white"
          className="border-2 border-blue-500 text-blue-500 rounded-xl"
          bgColor="white"
          onClick={onSignup}
        >
          회원가입
        </Button>
      </div>

      <SocialLoginRow />
    </div>
  );
}
