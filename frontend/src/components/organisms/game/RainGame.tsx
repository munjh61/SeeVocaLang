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
  const gameData = useMemo(
    () => shuffle(vocas).slice(0, Math.min(totalCount, vocas.length)),
    [vocas, totalCount]
  );

  const [idx, setIdx] = useState(0);
  const [y, setY] = useState(0); // 현재 떨어지는 Y 좌표
  const [lives, setLives] = useState(3); // 목숨
  const [score, setScore] = useState(0); // 맞춘 개수
  const [running, setRunning] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const current = gameData[idx];

  // 보기(8지선다) 구성
  const options = useMemo(() => {
    if (!current) return [];
    const uniq = gameData.filter(
      (v, i, arr) => v && arr.findIndex(x => x.nameEn === v.nameEn) === i
    );
    const wrong = shuffle(uniq.filter(v => v.nameEn !== current.nameEn))
      .slice(0, 7)
      .map(v => ({ en: v.nameEn, ko: v.nameKo }));
    return shuffle([{ en: current.nameEn, ko: current.nameKo }, ...wrong]);
  }, [current, gameData]);

  // 게임 종료 체크
  useEffect(() => {
    if (!running) return;
    if (lives <= 0 || idx >= gameData.length) {
      setRunning(false);
      // 종료 알림
      alert(`끝! 맞춘 개수: ${score}/${gameData.length}`);
      // 필요하면 여기서 상위로 콜백 or 페이지 이동
    }
  }, [lives, idx, gameData.length, running, score]);

  // 떨어지는 루프 (requestAnimationFrame)
  useEffect(() => {
    if (!running || !current) return;

    const step = () => {
      setY(prev => {
        const next = prev + fallSpeed;
        const h = containerRef.current?.clientHeight ?? 0;
        const imgH = 200; // 이미지 높이 가정(레이아웃에 맞춰 조정)
        if (next + imgH >= h) {
          // 땅에 닿음 → 목숨 감소 + 다음 문제
          setLives(l => l - 1);
          nextWord();
          return 0;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // idx가 바뀌면 새 루프가 시작되도록 의존성에 idx 포함
  }, [idx, running, current, fallSpeed]);

  // 다음 문제로 즉시 전환 (정답이든 땅이든 호출)
  const nextWord = () => {
    setIdx(i => i + 1);
    setY(0);
  };

  const handleClick = (isAnswer: boolean) => {
    if (!running || !current) return;
    if (isAnswer) {
      setScore(s => s + 1);
      // ✅ 정답이면 즉시 다음 문제
      nextWord();
    } else {
      // 오답이면 그냥 유지(원하면 패널티 로직 추가 가능)
      // 예: setLives(l => Math.max(0, l - 1));
    }
  };

  if (!current) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        문제를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      {/* 상단 정보바 */}
      <div className="flex items-center justify-between">
        <div>점수: {score}</div>
        <div>
          목숨: {"❤".repeat(lives)} {"🤍".repeat(Math.max(0, 3 - lives))}
        </div>
        <div>
          {idx + 1} / {gameData.length}
        </div>
      </div>

      {/* 떨어지는 영역 */}
      <div
        ref={containerRef}
        className="relative grow rounded-md bg-sky-100 overflow-hidden"
      >
        {/* 떨어지는 이미지(또는 카드). key에 idx를 넣어 문제 전환 시 확실히 새로 마운트 */}
        <div
          key={`${idx}-${current.nameEn}`}
          className="absolute left-1/2 -translate-x-1/2 transition-none"
          style={{ top: y }}
        >
          {/* 필요 시 실제 이미지로 교체 */}
          <img
            src={current.imageUrl}
            alt={current.nameEn}
            className="w-[260px] h-[200px] object-cover rounded-md shadow-lg"
            draggable={false}
          />
        </div>
      </div>

      {/* 보기 버튼 (8개) */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2">
        {options.map(opt => (
          <QuizButton
            key={opt.en}
            en={opt.en}
            ko={opt.ko}
            lang="en"
            answer={opt.en === current.nameEn}
            onClick={handleClick}
            cooltime={0} // ✅ 즉시 반응, 다음으로 바로 넘어가도록
          />
        ))}
      </div>
    </div>
  );
};
