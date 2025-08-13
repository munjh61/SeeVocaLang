// import { useEffect, useMemo, useRef, useState } from "react";
// import { shuffle } from "lodash-es";
// import { QuizButton } from "../../molecules/quizButton/QuizButton";
// import type { VocaCardProps } from "../vocaCard/VocaCard";
// import { LoadingPage } from "../../templates/loadingTemplate/LoadingTemplate";
// import { HpBar } from "../../molecules/game/hpBar";
// import { GameText } from "../../molecules/game/GameText";
// import city from "../../../asset/png/city.jpg";
// import { Missile } from "../../molecules/game/Missile";

// type RainGameProps = {
//   vocas: VocaCardProps[];
//   totalCount?: number; // 한 라운드에 낼 문제 수 (기본 10)
//   fallSpeed?: number; // (이제 사용 안 함) - 속도는 무조건 2에서 시작
// };

// export const RainGame = ({ vocas, totalCount = 10 }: RainGameProps) => {
//   /** -------------------------
//    *  상수 & 상태
//    * ------------------------- */
//   const MAX_LIVES = 5;
//   const IMG_W = 130;
//   const IMG_H = 100; // 실제 이미지 렌더 높이와 맞춰야함
//   const INITIAL_SPEED = 2;
//   const SPEED_UP = 1.1;

//   // 한 라운드에 사용할 문제 풀(pool)
//   const pool = useMemo(
//     () => shuffle(vocas).slice(0, Math.min(totalCount, vocas.length)),
//     [vocas, totalCount]
//   );

//   // 현재 라운드 문제 순서
//   const [roundData, setRoundData] = useState<VocaCardProps[]>(() =>
//     shuffle(pool)
//   );
//   const [round, setRound] = useState(1); // 라운드 표시용 (UI 선택)
//   const [idx, setIdx] = useState(0);

//   // 낙하 위치/게임 진행
//   const [y, setY] = useState(0);
//   const [lives, setLives] = useState(MAX_LIVES);
//   const [score, setScore] = useState(0);
//   const [running, setRunning] = useState(true);

//   /** -------------------------
//    *  refs (애니메이션/중복 방지/속도)
//    * ------------------------- */
//   const containerRef = useRef<HTMLDivElement>(null);
//   const rafRef = useRef<number | null>(null);
//   const yRef = useRef(0);
//   const endedRef = useRef(false);
//   const speedRef = useRef(INITIAL_SPEED); // ✅ 현재 속도(프레임당 px)

//   const current = roundData[idx];

//   /** -------------------------
//    *  보기(8지선다) 구성
//    * ------------------------- */
//   const options = useMemo(() => {
//     if (!current) return [];
//     // nameEn 기준 중복 제거
//     const uniq = Array.from(new Map(pool.map(v => [v.nameEn, v])).values());
//     const wrong = shuffle(uniq.filter(v => v.nameEn !== current.nameEn))
//       .slice(0, 7)
//       .map(v => ({ en: v.nameEn, ko: v.nameKo }));
//     return shuffle([{ en: current.nameEn, ko: current.nameKo }, ...wrong]);
//   }, [current, pool]);

//   /** -------------------------
//    *  라운드 관리
//    *  - 문제를 다 소진했고(lives>0) 게임이 아직 running이면 다음 라운드 시작
//    * ------------------------- */
//   useEffect(() => {
//     if (!running) return;
//     if (lives > 0 && idx >= roundData.length) {
//       startNewRound();
//     }
//   }, [idx, roundData.length, lives, running]);

//   const startNewRound = () => {
//     // 다음 라운드로
//     setRound(r => r + 1);
//     setRoundData(shuffle(pool)); // ✅ 재셔플
//     setIdx(0);

//     // 위치/속도 초기화는 하지 않음(요구사항 X). 원하면 주석 해제
//     yRef.current = 0;
//     setY(0);
//     // speedRef.current = INITIAL_SPEED; // <- 라운드마다 속도 초기화하고 싶으면 사용
//   };

//   /** -------------------------
//    *  게임 종료 체크
//    *  - 목숨 0이면 종료
//    * ------------------------- */
//   useEffect(() => {
//     if (!running) return;
//     if (lives <= 0) {
//       setRunning(false);
//       if (!endedRef.current) {
//         endedRef.current = true; // StrictMode 중복 방지
//         alert(`끝! 총 정답: ${score}개 (라운드 ${round} 진행 중 종료)`);
//       }
//     }
//   }, [lives, running, score, round]);

//   /** -------------------------
//    *  떨어지는 루프 (requestAnimationFrame)
//    *  - 속도는 speedRef.current를 사용
//    * ------------------------- */
//   useEffect(() => {
//     if (!running || !current) return;

//     if (rafRef.current) {
//       cancelAnimationFrame(rafRef.current);
//       rafRef.current = null;
//     }

//     const step = () => {
//       const h = containerRef.current?.clientHeight ?? 0;
//       if (h <= 0) {
//         rafRef.current = requestAnimationFrame(step);
//         return;
//       }

//       const next = yRef.current + speedRef.current; // ✅ 현재 속도 반영

//       // 땅에 닿았는지 판정
//       if (next + IMG_H >= h) {
//         setLives(l => l - 1); // 목숨 감소
//         setIdx(i => i + 1); // 다음 문제
//         yRef.current = 0;
//         setY(0);
//         return; // 이 프레임 종료 → 다음 effect에서 새 문제 루프 시작
//       }

//       // 계속 떨어뜨리기
//       yRef.current = next;
//       setY(next);
//       rafRef.current = requestAnimationFrame(step);
//     };

//     rafRef.current = requestAnimationFrame(step);

//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = null;
//     };
//   }, [idx, running, current]);

//   /** -------------------------
//    *  보기 클릭
//    *  - 정답: 점수 +1, 속도 ×1.1, 다음 문제, 위치 리셋
//    * ------------------------- */
//   const handleClick = (isAnswer: boolean) => {
//     if (!running || !current) return;

//     if (isAnswer) {
//       setScore(s => s + 1);
//       speedRef.current = speedRef.current * SPEED_UP;

//       // 다음 문제 전환
//       setIdx(i => i + 1);

//       // 위치 초기화
//       yRef.current = 0;
//       setY(0);

//       // 안전하게 기존 RAF 취소 (중복 방지)
//       if (rafRef.current) {
//         cancelAnimationFrame(rafRef.current);
//         rafRef.current = null;
//       }
//     } else {
//       // 오답 패널티를 주려면 여기에서 setLives(l => l - 1) 등 추가 가능
//     }
//   };

//   /** -------------------------
//    *  로딩/데이터 없음 처리
//    * ------------------------- */
//   if (!current && running) {
//     return <LoadingPage />;
//   }

//   /** -------------------------
//    *  UI
//    * ------------------------- */
//   return (
//     <div className="flex flex-col gap-4 w-full h-full p-4">
//       {/* 상단 정보바 */}
//       <div className="flex items-center gap-4">
//         <GameText label="SCORE" data={score} />
//         <HpBar hp={Math.max(0, lives)} maxHp={MAX_LIVES} />
//         <GameText label="ROUND" data={round} />
//         <GameText label="SPEED" data={speedRef.current.toFixed(2)} />
//       </div>

//       {/* 떨어지는 영역 */}
//       <div
//         ref={containerRef}
//         className={`relative grow rounded-md overflow-hidden h-[60vh] min-h-[420px] bg-center bg-cover`}
//         style={{ backgroundImage: `url(${city})` }}
//       >
//         {current && (
//           <div
//             key={`${round}-${idx}-${current.nameEn}`}
//             className="absolute left-1/2 -translate-x-1/2 transition-none"
//             style={{ top: y }}
//           >
//             <Missile
//               imageUrl={current.imageUrl}
//               nameEn={current.nameEn}
//               width={IMG_W}
//               height={IMG_H}
//             />
//           </div>
//         )}
//       </div>

//       {/* 보기 버튼 (8개) */}
//       <div className="grid grid-cols-4 grid-rows-2 gap-2">
//         {options.map(opt => (
//           <QuizButton
//             key={opt.en}
//             en={opt.en}
//             ko={opt.ko}
//             lang="en"
//             answer={opt.en === current?.nameEn}
//             onClick={handleClick}
//             cooltime={0}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
