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
    <div
      className="
        flex flex-col items-center justify-center
        gap-6 sm:gap-7
        bg-white/65
        px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12
        rounded-2xl shadow-2xl backdrop-blur-lg
        w-full max-w-sm sm:max-w-md lg:max-w-lg
        mx-4 sm:mx-auto
      "
    >
      {/* 로고 + 타이틀 */}
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-5">
        <img
          src={LogoImg}
          alt="로고"
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
        />
        <Text className="text-blue-500 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center">
          씨보랭(SVL)
        </Text>
      </div>

      {/* 서브 텍스트 */}
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <Text color="muted" size="xs" className="sm:text-sm">
          스마트한 방법으로 영단어를 마스터하세요
        </Text>
        <Text size="sm" className="text-blue-500 sm:text-base">
          AI와 함께하는 맞춤형 학습
        </Text>
      </div>

      {/* 버튼 */}
      <div className="flex flex-col items-center gap-3 w-full">
        <Button
          size="onboard"
          textColor="white"
          className="bg-blue-500 rounded-xl w-full sm:w-3/4 lg:w-2/3"
          onClick={onLogin}
        >
          로그인
        </Button>
        <Button
          size="onboard"
          textColor="blue"
          className="border-2 border-blue-500 text-blue-500 rounded-xl w-full sm:w-3/4 lg:w-2/3"
          bgColor="white"
          onClick={onSignup}
        >
          회원가입
        </Button>
      </div>

      {/* 소셜 로그인 */}
      <div className="mt-2 sm:mt-3 w-full">
        <SocialLoginRow />
      </div>
    </div>
  );
}
