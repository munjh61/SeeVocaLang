import { Text } from "../components/atoms/text/Text.tsx";
import { Button } from "../components/atoms/button/Button.tsx";
import { useNavigate } from "react-router-dom";
import KaKaoIcon from "../asset/png/kakologo.png";
import NaverIcon from "../asset/png/naverIcon.png";
import GoogleIcon from "../asset/googleIcon.svg";
import { Logo } from "../components/atoms/Logo.tsx";

export const OnBoardingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-10 bg-[#F3F4FF] gap-6">
      <div className="flex flex-col items-center justify-center gap-5">
        <Logo />
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

      <Button
        size="onboard"
        textColor="white"
        className="bg-blue-500 rounded-xl"
        onClick={() => navigate("/login")}
      >
        로그인
      </Button>

      <Button
        size="onboard"
        textColor="white"
        className="border border-blue-500 text-blue-500 rounded-xl"
        onClick={() => navigate("/signUp")}
      >
        회원가입
      </Button>

      <section className="flex flex-col gap-5  w-100 h-12 text-lg">
        <div className="flex items-center justify-center w-full gap-4">
          <div className="flex-grow h-px bg-gray-300 opacity-50" />
          <span className="text-gray-400 text-sm font-medium whitespace-nowrap">
            간편로그인
          </span>
          <div className="flex-grow h-px bg-gray-300 opacity-50" />
        </div>

        <div
          className={"flex flex-row gap-5 justify-center items-center w-full"}
        >
          <img
            src={KaKaoIcon}
            alt="카카오 로그인"
            className="w-10 h-10 cursor-pointer"
          />
          <img
            src={NaverIcon}
            alt="네이버 로그인"
            className="w-10 h-10 cursor-pointer"
          />
          <img
            src={GoogleIcon}
            alt="구글 로그인"
            className="w-10 h-10 cursor-pointer"
          />
        </div>
      </section>
    </div>
  );
};
