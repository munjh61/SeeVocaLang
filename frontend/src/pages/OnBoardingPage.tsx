import { useNavigate } from "react-router-dom";
import BackgroundLayer from "../components/organisms/onboarding/BackgroundLayer";
import HeroCard from "../components/organisms/onboarding/HeroCard";
import IntroCard from "../components/organisms/onboarding/IntroCard";
import Reveal from "../components/organisms/Reveal";
import Bino from "../asset/png/pirate-bino_onboat.png";
import BGImage from "../asset/png/background/summer_background_20_without_text.jpg";
import BinoRopeImg from "../asset/rope/bino_rope.png";
import AlgRopeImg from "../asset/rope/alg_rope.png";
import FoxRopeImg from "../asset/rope/fox_rope.png";
import MonkeyRopeImg from "../asset/rope/monkey_rope.png";

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
          {/* Row 1 */}
          <Reveal from="right">
            {/* 행 자체를 화면 중앙에 고정 */}
            <div className="flex justify-center">
              {/* 실제 컨텐츠 너비만큼만 차지해서 중앙 정렬 */}
              <div className="flex items-center gap-0 max-w-fit">
                <img
                  src={FoxRopeImg}
                  alt="여우 줄다리기"
                  draggable={false}
                  className="block shrink-0 w-32 sm:w-40 md:w-52 lg:w-64"
                />
                <IntroCard
                  align="right"
                  edgeAttach
                  subtitle="AI 기반 학습"
                  title="내 일상 사진으로 시작하는 영어 학습"
                  desc="내가 찍은 일상 사진 하나로, 나만의 맞춤형 영어 학습을 경험해 보세요!"
                />
              </div>
            </div>
          </Reveal>

          {/* Row 2 */}
          <Reveal from="left">
            <div className="flex justify-center">
              <div className="flex items-center max-w-fit">
                <IntroCard
                  align="left"
                  subtitle="나만의 단어장 & 복습 게임"
                  title="게임으로 즐기는 영단어 복습"
                  desc="저장한 단어들을 다양한 게임 형식으로 복습하고,
        더 재미있고 효과적인 영어 학습을 즐겨보세요!"
                  className="-mr-4 sm:-mr-6 md:-mr-2"
                />
                <img
                  src={MonkeyRopeImg}
                  alt="원숭이 줄다리기"
                  draggable={false}
                  className="block shrink-0 w-32 sm:w-40 md:w-52 lg:w-64"
                />
              </div>
            </div>
          </Reveal>

          {/* Row 3 */}
          <Reveal from="right">
            <div className="flex justify-center">
              <div className="flex items-center gap-0 max-w-fit">
                <img
                  src={AlgRopeImg}
                  alt="밧줄 잡은 앵무"
                  draggable={false}
                  className="block shrink-0 w-32 sm:w-40 md:w-52 lg:w-64"
                />
                <IntroCard
                  align="right"
                  edgeAttach
                  subtitle="오늘의 학습 & 학습 통계"
                  title="매일 새로운 오늘의 단어와 내 학습 통계"
                  desc="한눈에 확인하는 학습 기록, 공부할 때마다 쌓여가는 성취를 눈으로 확인하세요!"
                />
              </div>
            </div>
          </Reveal>

          {/* Row 4 */}
          <Reveal from="left">
            <div className="flex justify-center">
              <div className="flex items-center gap-0 max-w-fit">
                <IntroCard
                  align="left"
                  edgeAttach
                  subtitle="단어장 공유"
                  title="함께 하면 2배로 즐거운 영어 공부"
                  desc="친구와 단어장을 공유하며 함께 성장하는 학습 메이트가 되어보세요!"
                />
                <img
                  src={BinoRopeImg}
                  alt="망원경 밧줄"
                  draggable={false}
                  className="block shrink-0 w-32 sm:w-40 md:w-52 lg:w-64"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-16 sm:h-20 lg:h-24" />
    </BackgroundLayer>
  );
}
