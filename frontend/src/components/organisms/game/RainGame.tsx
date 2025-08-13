import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { shuffle } from "lodash-es";
import { QuizButton } from "../../molecules/quizButton/QuizButton";
import type { VocaCardProps } from "../vocaCard/VocaCard";
import { LoadingPage } from "../../templates/loadingTemplate/LoadingTemplate";
import { HpBar } from "../../molecules/game/HpBar";
import { GameText } from "../../molecules/game/GameText";
import city from "../../../asset/png/city.jpg";
import { Missile } from "../../molecules/game/Missile";
import boom from "../../../asset/png/boom.png";

type RainGameProps = {
  vocas: VocaCardProps[];
  totalCount?: number; // 한 라운드에 낼 문제 수 (기본 10)
};

export const RainGame = ({ vocas, totalCount = 10 }: RainGameProps) => {
  /** -------------------------
   *  상수 (게임 밸런스/연출)
   * ------------------------- */
  const MAX_LIVES = 5;
  const INITIAL_SPEED = 2; // px/frame
  const SPEED_UP = 1.1; // 정답 시 속도 ×1.1

  // ✨ 미사일 기본 비율(가로:세로) — 이전 고정치(130x100) 기준
  const MISSILE_ASPECT = 100 / 130; // ≈ 0.769

  // ✨ 머리만 보이게: 미사일 너비의 일정 비율만 보여주기
  const HEAD_PEEK_RATIO = 0.1; // 미사일 너비의 10%
  const HEAD_PEEK_MIN = 8; // 최소 머리 노출 px
  const HEAD_PEEK_MAX = 24; // 최대 머리 노출 px

  // 폭발(boom) 연출
  const BOOM_DURATION = 350; // ms (잠깐만 보이게)

  /** -------------------------
   *  한 라운드에 사용할 문제 풀(pool)
   * ------------------------- */
  const pool = useMemo(
    () => shuffle(vocas).slice(0, Math.min(totalCount, vocas.length)),
    [vocas, totalCount]
  );

  /** -------------------------
   *  라운드/문제 진행
   * ------------------------- */
  const [roundData, setRoundData] = useState<VocaCardProps[]>(() =>
    shuffle(pool)
  );
  const [round, setRound] = useState(1);
  const [idx, setIdx] = useState(0);
  const current = roundData[idx];

  /** -------------------------
   *  컨테이너 & 크기 상태(✨ 반응형)
   * ------------------------- */
  const containerRef = useRef<HTMLDivElement>(null);

  // ✨ 미사일/폭발을 컨테이너 비율로 계산
  const [missileSize, setMissileSize] = useState({ w: 520, h: 400 }); // 초기값(예전 고정치)
  const [boomSize, setBoomSize] = useState({ w: 160, h: 160 }); // 정사각 추천

  // ✨ 머리만 보이게 위한 px 계산 함수
  const headPeekPx = useCallback(
    (w: number) =>
      Math.min(Math.max(w * HEAD_PEEK_RATIO, HEAD_PEEK_MIN), HEAD_PEEK_MAX),
    []
  );

  // ✨ 시작 X좌표(머리만 보이도록 음수에서 시작)
  const startXFor = useCallback(
    (missileW: number) => -missileW + headPeekPx(missileW),
    [headPeekPx]
  );

  /** -------------------------
   *  가로 이동(X축) & 속도
   * ------------------------- */
  // 초기 x는 초기 missileSize 기준으로 세팅
  const [x, setX] = useState(startXFor(missileSize.w));
  const xRef = useRef(startXFor(missileSize.w));
  const speedRef = useRef(INITIAL_SPEED);

  /** -------------------------
   *  게임 상태
   * ------------------------- */
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const endedRef = useRef(false); // StrictMode 중복 alert 방지

  /** -------------------------
   *  RAF/타이머 참조
   * ------------------------- */
  const rafRef = useRef<number | null>(null);
  const [boomVisible, setBoomVisible] = useState(false);
  const boomTimerRef = useRef<number | null>(null);

  /** -------------------------
   *  보기(8지선다)
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
   *  컨테이너 기준 크기 계산 (✨ 핵심)
   *  - 미사일: 컨테이너 너비의 ~11% (클램프)
   *  - 폭발:  컨테이너 너비의 ~18% (클램프)
   * ------------------------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;

      // ✨ 미사일 너비: 컨테이너 너비의 33%, [80, 220]로 클램프
      const missileW = Math.round(Math.min(Math.max(cw * 0.33, 80), 220));
      const missileH = Math.round(missileW * MISSILE_ASPECT);
      setMissileSize({ w: missileW, h: missileH });

      // ✨ 폭발은 정사각: 컨테이너 너비 18%, [120, ch*0.4]
      const boomSide = Math.round(Math.min(Math.max(cw * 0.18, 120), ch * 0.4));
      setBoomSize({ w: boomSide, h: boomSide });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [MISSILE_ASPECT]);

  /** -------------------------
   *  라운드/문제 관리
   * ------------------------- */
  useEffect(() => {
    if (!running) return;
    if (lives > 0 && idx >= roundData.length) {
      startNewRound();
    }
  }, [idx, roundData.length, lives, running]);

  const resetToStartX = useCallback(() => {
    const sx = startXFor(missileSize.w); // ✨ 현재 미사일 너비 기준
    xRef.current = sx;
    setX(sx);
  }, [missileSize.w, startXFor]);

  const startNewRound = () => {
    setRound(r => r + 1);
    setRoundData(shuffle(pool)); // 재셔플
    setIdx(0);
    resetToStartX(); // ✨ 새 라운드도 머리부터
    // speedRef.current = INITIAL_SPEED; // 라운드마다 초기화하려면 해제
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
   *  폭발 표시 & 타이머 관리
   * ------------------------- */
  const showBoom = () => {
    setBoomVisible(true);
    if (boomTimerRef.current) window.clearTimeout(boomTimerRef.current);
    boomTimerRef.current = window.setTimeout(() => {
      setBoomVisible(false);
      boomTimerRef.current = null;
    }, BOOM_DURATION);
  };
  useEffect(() => {
    return () => {
      if (boomTimerRef.current) window.clearTimeout(boomTimerRef.current);
    };
  }, []);

  /** -------------------------
   *  가로 이동 루프 (requestAnimationFrame)
   *  - 충돌 판정도 ✨ missileSize.w 기반
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

      // ✨ 오른쪽 벽 도착 (동적 미사일 너비 고려)
      if (next + missileSize.w >= w) {
        showBoom(); // 💥 폭발 잠깐 표시
        setLives(l => l - 1); // 목숨 감소
        setIdx(i => i + 1); // 다음 문제
        resetToStartX(); // 다음도 머리부터
        return; // 이번 프레임 종료
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
  }, [idx, running, current, missileSize.w, resetToStartX]);

  /** -------------------------
   *  보기 클릭 (정답 시: 점수+속도업+다음문제+위치리셋)
   * ------------------------- */
  const handleClick = (isAnswer: boolean) => {
    if (!running || !current) return;

    if (isAnswer) {
      setScore(s => s + 1);
      speedRef.current = speedRef.current * SPEED_UP;
      setIdx(i => i + 1);
      resetToStartX();

      // 중복 RAF 방지
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    } else {
      // 오답 패널티를 주려면:
      // setLives(l => l - 1);
    }
  };

  /** -------------------------
   *  로딩/데이터 없음 처리
   * ------------------------- */
  if (!current && running) return <LoadingPage />;

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

      {/* 움직이는 영역 (배경 포함) */}
      <div
        ref={containerRef}
        className="relative grow rounded-md overflow-hidden h-[60vh] min-h-[420px] bg-center bg-cover"
        style={{ backgroundImage: `url(${city})` }}
      >
        {/* 미사일 (세로 중앙 고정 + 가로 이동) */}
        {current && (
          <div
            key={`${round}-${idx}-${current.nameEn}`}
            className="absolute top-1/2 -translate-y-1/2 transition-none"
            style={{ left: x }}
          >
            {/* 자산이 왼쪽을 향하면 머리부터 보이게 하려면 래퍼에 scale-x-[-1] */}
            <Missile
              imageUrl={current.imageUrl}
              nameEn={current.nameEn}
              width={missileSize.w} // ✨ 동적 너비
              height={missileSize.h} // ✨ 동적 높이 (비율 유지)
            />
          </div>
        )}

        {/* 💥 폭발 이미지: 오른쪽 가장자리에서 잠깐 표시 (정사각) */}
        {boomVisible && (
          <img
            src={boom}
            alt="boom"
            className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none select-none"
            style={{ width: boomSize.w, height: boomSize.h }}
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
