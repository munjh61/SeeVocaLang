import { Icon } from "../components/atoms/icon/Icon.tsx";
import BookIcon from "../asset/nav_book.svg?react";
import { Text } from "../components/atoms/text/Text.tsx";
import { Button } from "../components/atoms/button/Button.tsx";
import { useNavigate } from "react-router-dom";

export const OnBoardingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className={
        "flex flex-col w-full h-full items-center justify-center p-10 bg-[#F3F4FF] gap-6"
      }
    >
      <div className={"flex flex-col items-center justify-center gap-5"}>
        <label
          htmlFor="upload-file"
          className="relative w-20 h-20 bg-gradient-to-r from-[#8197F2] to-[#9568EF] rotate-[6deg] text-white rounded-xl flex items-center justify-center cursor-pointer active:scale-95"
        >
          <Icon icon={BookIcon} color="white" size="lg" />

          <span
            className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4
             bg-yellow-400 text-white text-xs px-1.5 py-1 rounded-full"
          >
            ★
          </span>
        </label>
        <Text className={"text-blue-500 text-4xl font-extrabold"}>
          씨보랭(SVL)
        </Text>
      </div>
      <div className={"flex flex-col items-center justify-center gap-0.5"}>
        <Text
          color={"muted"}
          size={"sm"}
          children={"스마트한 방법으로 영단어를 마스터하세요"}
        />
        <Text
          size={"sm"}
          children={"AI와 함께하는 맞춤형 학습"}
          className={"text-blue-500"}
        />
      </div>

      <Button
        size={"onboard"}
        textColor={"white"}
        className={"bg-blue-500 rounded-xl"}
      >
        로그인
      </Button>

      <Button
        size={"onboard"}
        textColor={"white"}
        color={"white"}
        className={"border border-blue-500 text-blue-500 rounded-xl"}
        onClick={() => navigate("/signUp")}
      >
        회원가입
      </Button>
    </div>
  );
};
