import { useEffect, useMemo, useRef, useState } from "react";
import { shuffle } from "lodash-es";
import { QuizButton } from "../../molecules/quizButton/QuizButton";
import type { VocaCardProps } from "../vocaCard/VocaCard";

type RainGameProps = {
  vocas: VocaCardProps[];
  totalCount?: number; // 몇 문제까지 낼지 (기본 10)
  fallSpeed?: number; // px/frame 정도 (기본 3)
};

export const RainGame = ({
  vocas,
  totalCount = 10,
  fallSpeed = 3,
}: RainGameProps) => {
  /** -------------------------
   *  상수 & 상태
   * ------------------------- */
  const MAX_LIVES = 4;
  const IMG_H = 200; // 실제 이미지 렌더 높이와 맞춰주세요 (아래 <img>의 h-[200px])

  // 퀴즈 데이터 셔플 + 개수 제한
  const gameData = useMemo(
    () => shuffle(vocas).slice(0, Math.min(totalCount, vocas.length)),
    [vocas, totalCount]
  );

  const [idx, setIdx] = useState(0);
  const [y, setY] = useState(0); // 화면에 보여줄 현재 Y 좌표
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);

  /** -------------------------
   *  refs (애니메이션/중복 방지)
   * ------------------------- */
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const yRef = useRef(0); // RAF 루프에서 사용할 실제 Y
  const endedRef = useRef(false); // 종료 alert 중복 방지

  const current = gameData[idx];

  /** -------------------------
   *  보기(8지선다) 구성
   *  - nameEn 중복 제거 → 오답 7개 + 정답 1개 → 셔플
   * ------------------------- */
  const options = useMemo(() => {
    if (!current) return [];
    // nameEn 기준 중복 제거
    const uniq = Array.from(new Map(gameData.map(v => [v.nameEn, v])).values());
    const wrong = shuffle(uniq.filter(v => v.nameEn !== current.nameEn))
      .slice(0, 7)
      .map(v => ({ en: v.nameEn, ko: v.nameKo }));
    return shuffle([{ en: current.nameEn, ko: current.nameKo }, ...wrong]);
  }, [current, gameData]);

  /** -------------------------
   *  게임 종료 체크
   * ------------------------- */
  useEffect(() => {
    if (!running) return;
    if (lives <= 0 || idx >= gameData.length) {
      setRunning(false);
      if (!endedRef.current) {
        endedRef.current = true; // StrictMode 중복 방지
        alert(`끝! 맞춘 개수: ${score}/${gameData.length}`);
      }
    }
  }, [lives, idx, gameData.length, running, score]);

  /** -------------------------
   *  떨어지는 루프 (requestAnimationFrame)
   *  - 충돌 여부를 먼저 계산하고, 충돌 시 그 프레임에서 상태를 "한 번만" 갱신
   *  - setState 콜백 안에서 다른 setState/부수효과 절대 금지
   * ------------------------- */
  useEffect(() => {
    if (!running || !current) return;

    // 이전 RAF가 남아 있으면 취소
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const step = () => {
      const h = containerRef.current?.clientHeight ?? 0;

      // 레이아웃이 아직 0이면 다음 프레임에 재시도
      if (h <= 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const next = yRef.current + fallSpeed;

      // 충돌 판정: 다음 위치 + 이미지 높이 >= 컨테이너 높이
      if (next + IMG_H >= h) {
        // 한 프레임에 정확히 1회만 처리
        setLives(l => l - 1);
        // 다음 문제로 전환 (idx + 1)
        setIdx(i => i + 1);
        // 위치 초기화 (ref + state)
        yRef.current = 0;
        setY(0);
        // 이 프레임에서는 새 RAF 예약하지 않음 → 다음 문제에서 새 effect가 시작
        return;
      }

      // 계속 떨어뜨리기
      yRef.current = next;
      setY(next);
      rafRef.current = requestAnimationFrame(step);
    };

    // 시작
    rafRef.current = requestAnimationFrame(step);

    // 클린업
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [idx, running, current, fallSpeed]);

  /** -------------------------
   *  보기 클릭
   * ------------------------- */
  const handleClick = (isAnswer: boolean) => {
    if (!running || !current) return;
    if (isAnswer) {
      setScore(s => s + 1);
      // 다음 문제로 전환
      setIdx(i => i + 1);
      // 위치 초기화 (ref + state)
      yRef.current = 0;
      setY(0);
      // 혹시 남아있을 수 있는 RAF 취소 (안전장치)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    } else {
      // 오답 패널티를 주고 싶다면 여기에서 setLives(l => l - 1) 등 추가 가능
    }
  };

  /** -------------------------
   *  로딩/데이터 없음 처리
   * ------------------------- */
  if (!current && running) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        문제를 불러오는 중...
      </div>
    );
  }

  /** -------------------------
   *  UI
   * ------------------------- */
  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      {/* 상단 정보바 */}
      <div className="flex items-center justify-between">
        <div>점수: {score}</div>
        <div>
          목숨: {"❤".repeat(Math.max(0, lives))}
          {"🤍".repeat(Math.max(0, MAX_LIVES - lives))}
        </div>
        <div>
          {Math.min(idx + 1, gameData.length)} / {gameData.length}
        </div>
      </div>

      {/* 떨어지는 영역 */}
      <div
        ref={containerRef}
        className="relative grow rounded-md bg-sky-100 overflow-hidden h-[60vh] min-h-[420px]"
      >
        {/* 떨어지는 이미지 */}
        {current && (
          <div
            key={`${idx}-${current.nameEn}`}
            className="absolute left-1/2 -translate-x-1/2 transition-none"
            style={{ top: y }}
          >
            <img
              src={current.imageUrl}
              alt={current.nameEn}
              className="w-[260px] h-[200px] object-cover rounded-md shadow-lg select-none"
              draggable={false}
            />
          </div>
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
            cooltime={0} // 즉시 반응
          />
        ))}
      </div>
    </div>
  );
};
