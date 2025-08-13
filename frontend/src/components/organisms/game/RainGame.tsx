import { useEffect, useMemo, useRef, useState } from "react";
import { shuffle } from "lodash-es";
import { QuizButton } from "../../molecules/quizButton/QuizButton";
import type { VocaCardProps } from "../vocaCard/VocaCard";
import { LoadingPage } from "../../templates/loadingTemplate/LoadingTemplate";
import { HpBar } from "../../molecules/game/HpBar";
import { GameText } from "../../molecules/game/GameText";
import city from "../../../asset/png/city.jpg";
import { Missile } from "../../molecules/game/Missile";
import boom from "../../../asset/png/boom.png"; // ✨ 폭발 이미지

type RainGameProps = {
  vocas: VocaCardProps[];
  totalCount?: number; // 한 라운드에 낼 문제 수 (기본 10)
};

export const RainGame = ({ vocas, totalCount = 10 }: RainGameProps) => {
  /** -------------------------
   *  상수
   * ------------------------- */
  const MAX_LIVES = 5;
  const IMG_W = 520;
  const IMG_H = 400; // Missile 렌더 높이와 맞춰야 함
  const INITIAL_SPEED = 2; // px/frame
  const SPEED_UP = 1.1; // 정답 시 속도 ×1.1

  const HEAD_PEEK = 12; // 처음에 보일 머리 부분 폭(px)
  const START_X = -IMG_W + HEAD_PEEK;

  const BOOM_W = 160;
  const BOOM_H = 160;
  const BOOM_DURATION = 350; // ms

  /** -------------------------
   *  한 라운드에 사용할 문제 풀(pool)
   * ------------------------- */
  const pool = useMemo(
    () => shuffle(vocas).slice(0, Math.min(totalCount, vocas.length)),
    [vocas, totalCount]
  );

  /** -------------------------
   *  라운드/진행 상태
   * ------------------------- */
  const [roundData, setRoundData] = useState<VocaCardProps[]>(() =>
    shuffle(pool)
  );
  const [round, setRound] = useState(1);
  const [idx, setIdx] = useState(0);

  /** -------------------------
   *  가로 이동 (X축)
   * ------------------------- */
  const [x, setX] = useState(START_X);
  const xRef = useRef(START_X);
  const speedRef = useRef(INITIAL_SPEED);

  /** -------------------------
   *  게임 상태
   * ------------------------- */
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const endedRef = useRef(false);

  /** -------------------------
   *  기타 참조
   * ------------------------- */
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [boomVisible, setBoomVisible] = useState(false);
  const boomTimerRef = useRef<number | null>(null);

  const current = roundData[idx];

  /** -------------------------
   *  보기(8지선다) 구성
   * ------------------------- */
  const options = useMemo(() => {
    if (!current) return [];
    const uniq = Array.from(new Map(pool.map(v => [v.nameEn, v])).values());
    const wrong = shuffle(uniq.filter(v => v.nameEn !== current.nameEn))
      .slice(0, 7)
      .map(v => ({ en: v.nameEn, ko: v.nameKo }));
    return shuffle([{ en: current.nameEn, ko: current.nameKo }, ...wrong]);
  }, [current, pool]);

  /** -------------------------
   *  라운드 관리
   * ------------------------- */
  useEffect(() => {
    if (!running) return;
    if (lives > 0 && idx >= roundData.length) {
      startNewRound();
    }
  }, [idx, roundData.length, lives, running]);

  const resetToStartX = () => {
    xRef.current = START_X;
    setX(START_X);
  };

  const startNewRound = () => {
    setRound(r => r + 1);
    setRoundData(shuffle(pool));
    setIdx(0);
    resetToStartX();
    // speedRef.current = INITIAL_SPEED; // 선택
  };

  /** -------------------------
   *  게임 종료 체크
   * ------------------------- */
  useEffect(() => {
    if (!running) return;
    if (lives <= 0) {
      setRunning(false);
      if (!endedRef.current) {
        endedRef.current = true;
        alert(`끝! 총 정답: ${score}개 (라운드 ${round} 진행 중 종료)`);
      }
    }
  }, [lives, running, score, round]);

  /** -------------------------
   *  폭발 표시 헬퍼
   * ------------------------- */
  const showBoom = () => {
    setBoomVisible(true);
    if (boomTimerRef.current) {
      window.clearTimeout(boomTimerRef.current);
    }
    boomTimerRef.current = window.setTimeout(() => {
      setBoomVisible(false);
      boomTimerRef.current = null;
    }, BOOM_DURATION);
  };

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (boomTimerRef.current) window.clearTimeout(boomTimerRef.current);
    };
  }, []);

  /** -------------------------
   *  가로 이동 루프
   * ------------------------- */
  useEffect(() => {
    if (!running || !current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const step = () => {
      const w = containerRef.current?.clientWidth ?? 0;
      if (w <= 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const next = xRef.current + speedRef.current;

      // 오른쪽 벽 도착
      if (next + IMG_W >= w) {
        showBoom(); // ✨ 폭발 표시
        setLives(l => l - 1); // 목숨 감소
        setIdx(i => i + 1); // 다음 문제
        resetToStartX(); // 다음 문제도 머리부터
        return;
      }

      xRef.current = next;
      setX(next);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [idx, running, current]);

  /** -------------------------
   *  보기 클릭
   * ------------------------- */
  const handleClick = (isAnswer: boolean) => {
    if (!running || !current) return;

    if (isAnswer) {
      setScore(s => s + 1);
      speedRef.current = speedRef.current * SPEED_UP;
      setIdx(i => i + 1);
      resetToStartX();

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    } else {
      // 오답 패널티를 주려면 아래 사용
      // setLives(l => l - 1);
    }
  };

  /** -------------------------
   *  로딩/데이터 없음 처리
   * ------------------------- */
  if (!current && running) {
    return <LoadingPage />;
  }

  /** -------------------------
   *  UI
   * ------------------------- */
  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      {/* 상단 정보바 */}
      <div className="flex items-center gap-4">
        <GameText label="SCORE" data={score} />
        <HpBar hp={Math.max(0, lives)} maxHp={MAX_LIVES} />
        <GameText label="ROUND" data={round} />
        <GameText label="SPEED" data={speedRef.current.toFixed(2)} />
      </div>

      {/* 움직이는 영역 */}
      <div
        ref={containerRef}
        className="relative grow rounded-md overflow-hidden h-[60vh] min-h-[420px] bg-center bg-cover"
        style={{ backgroundImage: `url(${city})` }}
      >
        {/* 미사일 */}
        {current && (
          <div
            key={`${round}-${idx}-${current.nameEn}`}
            className="absolute top-3/5 -translate-y-1/2 transition-none"
            style={{ left: x }}
          >
            <Missile
              imageUrl={current.imageUrl}
              nameEn={current.nameEn}
              width={IMG_W}
              height={IMG_H}
            />
          </div>
        )}

        {boomVisible && (
          <img
            src={boom}
            alt="boom"
            className="absolute bottom-0 -translate-y-1/2 right-2 pointer-events-none select-none"
            style={{ width: BOOM_W, height: BOOM_H }}
            draggable={false}
          />
        )}
      </div>

      {/* 보기 버튼 (8개) */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2">
        {options.map(opt => (
          <QuizButton
            key={opt.en}
            en={opt.en}
            ko={opt.ko}
            lang="en"
            answer={opt.en === current?.nameEn}
            onClick={handleClick}
            cooltime={0}
          />
        ))}
      </div>
    </div>
  );
};
