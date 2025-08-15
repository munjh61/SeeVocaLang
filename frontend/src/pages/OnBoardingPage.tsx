import { useNavigate } from "react-router-dom";
import BackgroundLayer from "../components/organisms/onboarding/BackgroundLayer.tsx";
import HeroCard from "../components/organisms/onboarding/HeroCard.tsx";
import IntroCard from "../components/organisms/onboarding/IntroCard.tsx";
import Reveal from "../components/organisms/Reveal.tsx";
import Bino from "../asset/png/pirate-bino_onboat.png";
import BGImage from "../../src/asset/png/background/summer_background_20_without_text.jpg";

export function OnBoardingPage() {
  const navigate = useNavigate();

  return (
    <BackgroundLayer src={BGImage}>
      {/* === 히어로 섹션 === */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] mt-10 p-10 gap-6 pb-20 ">
        <HeroCard
          onLogin={() => navigate("/login")}
          onSignup={() => navigate("/signUp")}
        />

        {/* 히어로 데코 */}
        <img
          src={Bino}
          alt="망원경 해적"
          className="absolute right-0 bottom-[-1px] w-[32%] max-w-[300px] pointer-events-none"
          draggable={false}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-sm animate-bounce">
          ↓ 아래로 스크롤
        </div>
      </section>

      {/* === 소개 섹션 === */}
      <section className="relative px-6 sm:px-10 py-10 space-y-15">
        <Reveal from="right">
          <IntroCard
            align="right"
            subtitle="AI 기반 학습"
            title="내 실력에 맞춘 맞춤 추천"
            desc="이미지 인식과 난이도 추정으로, 지금 나에게 적절한 단어와 학습량을 자동 추천합니다. 외우기 쉬운 순서대로 큐레이션해 주어 집중력을 아껴줘요."
          />
        </Reveal>

        <Reveal from="left">
          <IntroCard
            align="left"
            subtitle="루틴 & 기록"
            title="루틴 생성과 진도 추적"
            desc="원하는 시간대와 목표에 맞춰 루틴을 만들고, 진행 상황을 자동으로 기록합니다. 다시 학습할 단어는 따로 모아 복습 효율을 높여요."
          />
        </Reveal>
      </section>

      <div className="h-24" />
    </BackgroundLayer>
  );
}
