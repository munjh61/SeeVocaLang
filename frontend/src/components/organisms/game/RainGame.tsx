import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { shuffle } from "lodash-es";
import { QuizButton } from "../../molecules/quizButton/QuizButton";
import type { VocaCardProps } from "../vocaCard/VocaCard";
import { LoadingPage } from "../../templates/loadingTemplate/LoadingTemplate";
import { RainGameOverModal } from "../../molecules/game/RainGameOverModal";
import { HpBar } from "../../molecules/game/HpBar";
import { GameText } from "../../molecules/game/GameText";
import { Missile } from "../../molecules/game/Missile";
import deck from "../../../asset/png/deck.png";
import boom from "../../../asset/png/boom.png";
import battleship from "../../../asset/png/battleship.png";
import enemy1 from "../../../asset/png/pirate_enemy_crocodile.png";
import enemy2 from "../../../asset/png/pirate_enemy_monkey.png";
import enemy3 from "../../../asset/png/pirate_enemy_squirrel.png";
import penguin from "../../../asset/png/pirate_knife.png";
import cannon from "../../../asset/png/cannon.png";
import bombSfx from "../../../asset/sfx/bomb.wav";
import { useNavigate } from "react-router-dom";

type RainGameProps = {
  vocas: VocaCardProps[];
  totalCount?: number; // 한 라운드에 낼 문제 수 (기본 10)
};

export const RainGame = ({ vocas, totalCount = 10 }: RainGameProps) => {
  /** -------------------------
   *  상수 (게임 밸런스/연출)
   * ------------------------- */
  const MAX_LIVES = 5;
  const INITIAL_SPEED = 5; // px/frame
  const SPEED_UP = 1.1; // 정답 시 속도 ×1.1

  // 미사일 가로:세로 비 (이전 130x100 → h/w)
  const MISSILE_ASPECT = 100 / 130; // ≈ 0.769

  const MISSILE_W_RATIO = 0.42; // 컨테이너 너비의 42%
  const MISSILE_H_FRAC = 0.62; // 컨테이너 높이의 62% 이내
  const MISSILE_W_MIN = 360; // 최소 360px
  const MISSILE_W_MAX = 960; // 최대 960px (원하면 더 키워도 됨)

  // 머리만 보이게(너비의 일부만)
  const HEAD_PEEK_RATIO = 0.12; // 너비의 12%
  const HEAD_PEEK_MIN = 16;
  const HEAD_PEEK_MAX = 64;

  // 폭발(boom) 연출
  const BOOM_DURATION = 350; // ms
  const BOOM_W_RATIO = 0.3; // 컨테이너 너비 30%
  const BOOM_MIN = 160; // 최소 160px
  const BOOM_MAX_H_FACTOR = 0.6; // 세로의 60%를 상한
  // 다시하기
  const [gameOverOpen, setGameOverOpen] = useState(false);

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
  const enemySrc = useMemo(() => {
    if (round === 1) return enemy2; // monkey
    if (round === 2) return enemy1; // crocodile
    return enemy3; // squirrel
  }, [round]);

  /** -------------------------
   *  컨테이너 & 크기 상태(반응형)
   * ------------------------- */
  const containerRef = useRef<HTMLDivElement>(null);

  // 미사일/폭발 동적 크기 (초깃값)
  const [missileSize, setMissileSize] = useState({
    w: 360,
    h: Math.round(360 * MISSILE_ASPECT),
  });
  const [boomSize, setBoomSize] = useState({ w: 200, h: 200 });

  // 머리만 보이게 위한 px 계산
  const headPeekPx = useCallback(
    (w: number) =>
      Math.min(Math.max(w * HEAD_PEEK_RATIO, HEAD_PEEK_MIN), HEAD_PEEK_MAX),
    []
  );

  // 시작 X좌표(머리만 보이도록 음수에서 시작)
  const startXFor = useCallback(
    (w: number) => -w + headPeekPx(w),
    [headPeekPx]
  );

  /** -------------------------
   *  가로 이동(X축) & 속도
   * ------------------------- */
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
   *  크기 계산 (컨테이너 기준) + 안정화
   *  - 라운드 전환 등 미세 진동에 흔들리지 않도록 스레숄드 & RAF
   * ------------------------- */
  const lastWRef = useRef(0);
  const lastHRef = useRef(0);
  const computeRafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const computeNow = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (!cw || !ch) return;

      // 미세 변동 무시 (6px 이내면 스킵)
      if (
        Math.abs(cw - lastWRef.current) < 6 &&
        Math.abs(ch - lastHRef.current) < 6
      )
        return;
      lastWRef.current = cw;
      lastHRef.current = ch;

      // ▶ 미사일 너비: 너비/높이 한계를 모두 고려해서 "가장 큰 값"
      const wByWidth = cw * MISSILE_W_RATIO; // 너비 기준
      const hLimit = ch * MISSILE_H_FRAC; // 높이 상한
      const wByHeight = hLimit / MISSILE_ASPECT; // 높이 상한을 만족하는 최대 너비
      let missileW = Math.min(wByWidth, wByHeight); // 두 제약 중 작은 쪽 사용

      // 클램프 + 컨테이너 90% 초과 금지
      missileW = Math.round(
        Math.min(
          Math.max(missileW, MISSILE_W_MIN),
          Math.min(MISSILE_W_MAX, cw * 0.9)
        )
      );
      const missileH = Math.round(missileW * MISSILE_ASPECT);
      setMissileSize({ w: missileW, h: missileH });

      // ▶ 폭발(정사각): 너비 비율 vs 높이 상한(세로 60%) 중 작은 쪽
      const boomByW = cw * BOOM_W_RATIO;
      const boomByH = ch * BOOM_MAX_H_FACTOR;
      const boomSide = Math.round(
        Math.min(Math.max(boomByW, BOOM_MIN), boomByH)
      );
      setBoomSize({ w: boomSide, h: boomSide });
    };

    const scheduleCompute = () => {
      if (computeRafIdRef.current)
        cancelAnimationFrame(computeRafIdRef.current);
      computeRafIdRef.current = requestAnimationFrame(computeNow);
    };

    // 최초 1회 + 관찰 시작
    scheduleCompute();
    const ro = new ResizeObserver(scheduleCompute);
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (computeRafIdRef.current)
        cancelAnimationFrame(computeRafIdRef.current);
    };
  }, [
    MISSILE_ASPECT,
    MISSILE_W_RATIO,
    MISSILE_H_FRAC,
    BOOM_W_RATIO,
    BOOM_MAX_H_FACTOR,
  ]);

  /** -------------------------
   *  라운드/문제 관리
   * ------------------------- */
  useEffect(() => {
    if (!running) return;
    if (lives > 0 && idx >= roundData.length) startNewRound();
  }, [idx, roundData.length, lives, running]);

  const resetToStartX = useCallback(() => {
    const sx = startXFor(missileSize.w);
    xRef.current = sx;
    setX(sx);
  }, [missileSize.w, startXFor]);

  const startNewRound = () => {
    setRound(r => r + 1);
    setRoundData(shuffle(pool)); // 재셔플
    setIdx(0);
    resetToStartX(); // 새 라운드도 머리부터
    // speedRef.current = INITIAL_SPEED; // 원하면 라운드마다 속도 초기화
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
        setGameOverOpen(true);
      }
    }
  }, [lives, running]);

  // 게임 리셋 (다시하기)
  const resetGame = useCallback(() => {
    setScore(0);
    setRound(1);
    setRoundData(shuffle(pool)); // 문제 재셔플
    setIdx(0);
    setLives(MAX_LIVES);

    speedRef.current = INITIAL_SPEED; // 속도 초기화
    endedRef.current = false; // 중복 종료 방지 플래그 초기화
    setRunning(true);
    resetToStartX();

    // 남아있을 수 있는 RAF 정리 (중복 루프 방지)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    setGameOverOpen(false);
  }, [pool, resetToStartX]);
  const nav = useNavigate();
  const handleExit = () => {
    setGameOverOpen(false);
    nav("/main");
  };

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

      // 오른쪽 벽 도착 (동적 미사일 너비 고려)
      if (next + missileSize.w >= w) {
        new Audio(bombSfx).play().catch(() => {}); // 폭팔소리
        showBoom(); // 폭발 잠깐 표시
        setLives(l => l - 1); // 목숨 감소
        setIdx(i => i + 1); // 다음 문제
        resetToStartX(); // 다음도 머리부터
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
    <div
      className="flex flex-col gap-4 w-full grow p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${deck})` }}
    >
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
        className="relative grow rounded-md overflow-hidden flex min-h-0"
      >
        {/* 미사일 (세로 중앙 고정 + 가로 이동) */}
        {current && (
          <div
            key={`${round}-${idx}-${current.nameEn}`}
            className="absolute top-1/2 -translate-y-1/2 transition-none z-20"
            style={{ left: x }}
          >
            {/* 에셋이 왼쪽을 향하면 머리부터 보이게 하려면 래퍼에 scale-x-[-1] */}
            <Missile
              imageUrl={current.imageUrl}
              nameEn={current.nameEn}
              width={missileSize.w}
              height={missileSize.h}
            />
          </div>
        )}
        <div className="w-full h-full grid grid-cols-3">
          <div className="relative h-full">
            <img
              src={battleship}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            />
            <img
              src={enemySrc}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none h-1/2 max-h-full"
            />
          </div>
          <div />
          <div className="relative h-full">
            <img
              src={cannon}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
              alt=""
            />
            <img
              src={penguin}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none h-[70%] max-h-full"
              alt=""
            />
            {/* 폭발 이미지: 오른쪽 가장자리에서 잠깐 표시 (정사각) */}
            {boomVisible && (
              <img
                src={boom}
                alt="boom"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
                style={{
                  width: boomSize.w * (MAX_LIVES - lives),
                  height: boomSize.h,
                }}
                draggable={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* 보기 버튼 (8개) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-1">
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
      <RainGameOverModal
        isOpen={gameOverOpen}
        score={score}
        round={round}
        speed={Number(speedRef.current)}
        onRetry={resetGame}
        onClose={handleExit}
      />
    </div>
  );
};
