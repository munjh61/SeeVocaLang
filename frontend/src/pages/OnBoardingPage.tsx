import { useNavigate } from "react-router-dom";
import BackgroundLayer from "../components/organisms/onboarding/BackgroundLayer";
import HeroCard from "../components/organisms/onboarding/HeroCard";
import IntroCard from "../components/organisms/onboarding/IntroCard";
import Reveal from "../components/organisms/Reveal";
import Bino from "../asset/png/pirate-bino_onboat.png";
import BGImage from "../asset/png/background/summer_background_20_without_text.jpg";

export function OnBoardingPage() {
  const navigate = useNavigate();

  return (
    <BackgroundLayer src={BGImage}>
      {/* === 히어로 섹션 === */}
      <section
        className="
          relative min-h-[90vh]
          flex flex-col items-center justify-center
          px-6 py-16
        "
      >
        {/* HeroCard: 중앙 정렬 */}
        <HeroCard
          onLogin={() => navigate("/login")}
          onSignup={() => navigate("/signUp")}
        />

        {/* 오른쪽 아래 데코 이미지 */}
        <img
          src={Bino}
          alt="망원경 해적"
          draggable={false}
          className="
            absolute right-0 bottom-0
            w-32 sm:w-48 md:w-64 lg:w-[320px]
            max-w-[360px]
            pointer-events-none select-none
          "
        />

        {/* 스크롤 힌트 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-sm animate-bounce">
          ↓ 아래로 스크롤
        </div>
      </section>

      {/* === 소개 섹션 === */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
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
        </div>
      </section>

      <div className="h-16 sm:h-20 lg:h-24" />
    </BackgroundLayer>
  );
}
