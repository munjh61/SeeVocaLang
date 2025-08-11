import { Text } from "../components/atoms/text/Text.tsx";
import { Button } from "../components/atoms/button/Button.tsx";
import { useNavigate } from "react-router-dom";
import KaKaoIcon from "../asset/png/kakologo.png";
import NaverIcon from "../asset/png/naverIcon.png";
import GoogleIcon from "../asset/googleIcon.svg";
import { Logo } from "../components/atoms/Logo.tsx";
import { BASE_URL } from "../types/Regex.ts";

const baseurl = BASE_URL;
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
            // OnBoardingPage.tsx (핵심만)
            onClick={() => {
              const finalRedirect =
                "http://ec2-13-125-250-93.ap-northeast-2.compute.amazonaws.com/main";
              const callback = "/oauth2/success";
              document.cookie = `redirect_uri=${encodeURIComponent(callback)}; path=/`;

              // 프론트 콜백에서 읽을 쿠키: 최종 목적지
              document.cookie = `final_redirect=${encodeURIComponent(finalRedirect)}; path=/; SameSite=Lax`;

              // 소셜 로그인 시작
              window.location.href = `${baseurl}/oauth2/authorization/kakao`;
            }}
          />
          <img
            src={NaverIcon}
            alt="네이버 로그인"
            className="w-10 h-10 cursor-pointer"
            onClick={() => {
              const finalRedirect =
                "http://ec2-13-125-250-93.ap-northeast-2.compute.amazonaws.com/main";
              const callback = "/oauth2/success";
              document.cookie = `redirect_uri=${encodeURIComponent(callback)}; path=/`;

              document.cookie = `final_redirect=${encodeURIComponent(finalRedirect)}; path=/; SameSite=Lax`;

              // 소셜 로그인 시작
              window.location.href = `${baseurl}/oauth2/authorization/naver`;
            }}
          />
          <img
            src={GoogleIcon}
            alt="구글 로그인"
            className="w-10 h-10 cursor-pointer"
            onClick={() => {
              const finalRedirect =
                "http://ec2-13-125-250-93.ap-northeast-2.compute.amazonaws.com/main";
              const callback = "/oauth2/success";
              document.cookie = `redirect_uri=${encodeURIComponent(callback)}; path=/`;

              document.cookie = `final_redirect=${encodeURIComponent(finalRedirect)}; path=/; SameSite=Lax`;

              // 소셜 로그인 시작
              window.location.href = `${baseurl}/oauth2/authorization/google`;
            }}
          />
        </div>
      </section>
    </div>
  );
};
