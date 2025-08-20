import { useEffect, useMemo, useRef, useState } from "react";
import { shuffle } from "lodash-es";
import { Div } from "../../atoms/div/Div";
import { Button } from "../../atoms/button/Button";
import { Text } from "../../atoms/text/Text";
import type { VocaCardProps } from "../vocaCard/VocaCard";
import penguin from "../../../asset/png/pirate_rope_hang.png";
import hangmanBg from "../../../asset/png/background/hangman_background.png";
import { HpBar } from "../../molecules/game/HpBar";
import { GameText } from "../../molecules/game/GameText";
import { HangmanGameOverModal } from "../../molecules/game/HangManModal";
import { useNavigate } from "react-router-dom";
import xMark from "../../../asset/png/pirate_skull.png";
import penguinHead from "../../../asset/png/default_profile.png";
import wood from "../../../asset/png/background/wood_background.jpg";

/**
 * - 실패 시 정답 공개(못 맞춘 글자는 빨강)
 * - 종료(성공/실패) 시 모달: 예=다른 단어로 재시작, 아니오=/game 이동
 * - 펭귄은 스테이지 가로 정중앙, 낙하는 스테이지 실측 높이에 맞춰 보정
 */

type HangManProps = {
  vocas: VocaCardProps[];
  maxWrong?: number; // 기본 5
};

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ===== 높이 정책 =====
const STAGE_MIN_H = 520; // px
const STAGE_VH = 70; // vh
const STAGE_MAX_H = 760; // px
const stageBoxStyle = {
  minHeight: STAGE_MIN_H,
  height: `${STAGE_VH}vh`,
  maxHeight: STAGE_MAX_H,
} as const;

// ===== 표시/동작 조정값 =====
const PENGUIN_W_CSS = "clamp(96px, 10vw, 160px)";
const ANCHOR_Y = 140; // 시작 시 보일 기준 높이(px)
const LOST_EXTRA = 160; // 바닥 아래로 더 떨어지는 여유(px)

export const HangMan = ({ vocas, maxWrong = 5 }: HangManProps) => {
  const nav = useNavigate();

  // 단어 풀 준비
  const [pool, setPool] = useState<string[]>([]);
  useEffect(() => {
    const list = shuffle(
      (vocas ?? []).map(v => (v.nameEn ?? "").trim()).filter(Boolean)
    );
    setPool(list);
    setCurrentIdx(0);
  }, [vocas]);

  // 현재 문제
  const [currentIdx, setCurrentIdx] = useState(0);
  const answerRaw = pool[currentIdx] ?? "";
  const answer = useMemo(() => answerRaw.toUpperCase(), [answerRaw]);

  // 상태
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  // 스테이지/이미지 실측
  const [imgH, setImgH] = useState(0);
  const [imgW, setImgW] = useState(0);
  const [imgReady, setImgReady] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageH, setStageH] = useState<number>(STAGE_MIN_H);

  // 게임 종료 모달
  const [isOverModalOpen, setIsOverModalOpen] = useState(false);

  // 스테이지 높이 추적
  useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setStageH(Math.round(e.contentRect.height));
    });
    ro.observe(el);
    setStageH(Math.round(el.getBoundingClientRect().height));
    return () => ro.disconnect();
  }, []);

  // 시작 오프셋
  const initialOffsetY = useMemo(() => {
    if (!imgH) return 0;
    return -(imgH - ANCHOR_Y);
  }, [imgH]);

  // 낙하 계산
  const STEP = Math.round(stageH / (maxWrong + 1));
  const stepDown = wrongCount * STEP;
  const lostY = initialOffsetY + stageH + imgH + LOST_EXTRA;
  const currentY = status === "lost" ? lostY : initialOffsetY + stepDown;

  // HpBar
  const hp = Math.max(0, maxWrong - wrongCount);

  // 단어 렌더
  const renderWord = () => {
    const chars = answerRaw.split("");
    const done = status !== "playing";
    return (
      <div className="flex justify-center gap-4 text-2xl font-mono">
        {chars.map((ch, i) => {
          const up = ch.toUpperCase();
          const isAlpha = /[A-Z]/.test(up);
          if (!isAlpha) {
            return (
              <span key={i} className="whitespace-pre">
                {ch}
              </span>
            );
          }
          if (!done) {
            return (
              <span key={i} className="tracking-[0.6em]">
                {guessed.has(up) ? up : "_"}
              </span>
            );
          }
          if (status === "lost") {
            const className = guessed.has(up)
              ? "text-black"
              : "text-red-600 font-semibold";
            return (
              <span key={i} className={`tracking-[0.6em] ${className}`}>
                {up}
              </span>
            );
          }
          return (
            <span key={i} className="tracking-[0.6em]">
              {up}
            </span>
          );
        })}
      </div>
    );
  };

  // 승리 판정(알파벳이 1개 이상 있을 때만)
  useEffect(() => {
    if (status !== "playing") return;
    const lettersArr = answer.match(/[A-Z]/g) ?? [];
    if (lettersArr.length === 0) return;
    const letters = new Set(lettersArr);
    const allHit = Array.from(letters).every(l => guessed.has(l));
    if (allHit) setStatus("won");
  }, [answer, guessed, status]);

  // 실패 판정
  useEffect(() => {
    if (status !== "playing") return;
    if (wrongCount >= maxWrong) setStatus("lost");
  }, [wrongCount, maxWrong, status]);

  // 종료 시 모달 오픈(정답 보이도록 300ms 지연)
  useEffect(() => {
    if (status === "playing") return;
    const t = setTimeout(() => setIsOverModalOpen(true), 300);
    return () => clearTimeout(t);
  }, [status]);

  // 입력
  const onGuess = (letter: string) => {
    if (status !== "playing") return;
    const up = letter.toUpperCase();
    if (guessed.has(up)) return;
    setGuessed(prev => new Set(prev).add(up));
    if (!answer.includes(up)) setWrongCount(c => c + 1);
  };

  // 다시하기(예)
  const handleRestart = () => {
    setIsOverModalOpen(false);
    if (pool.length > 0) {
      let next = currentIdx;
      if (pool.length === 1) next = 0;
      else {
        do {
          next = Math.floor(Math.random() * pool.length);
        } while (next === currentIdx);
      }
      setCurrentIdx(next);
    }
    setGuessed(new Set());
    setWrongCount(0);
    setStatus("playing");
  };

  // 나가기(아니오)
  const handleExit = () => {
    setIsOverModalOpen(false);
    nav("/main");
  };

  if (!answerRaw) {
    return (
      <Div align="center" className="w-full h-full items-center justify-center">
        <Text size="xl">게임을 시작할 단어가 없습니다.</Text>
      </Div>
    );
  }

  const stageMaxW = imgW ? Math.round(imgW * 4) : undefined;
  const winOrLose = status === "won";

  return (
    <Div className="w-full h-full p-4 bg-cover bg-repeat">
      <div className="w-[80%] mx-auto flex flex-col gap-4">
        <div className="w-full flex items-center gap-4 flex-wrap justify-center">
          <GameText label="LIVES" />
          <HpBar hp={hp} maxHp={maxWrong} />
          <GameText label="오답" data={`${wrongCount}/${maxWrong}`} />
        </div>

        {/* 본문: 왼쪽(이미지) / 오른쪽(카드) */}
        <div className="gap-6 items-stretch grid md:grid-cols-1 lg:grid-cols-2">
          {/* 왼쪽(이미지) */}
          <div
            ref={stageRef}
            className="relative flex-1 basis-0 rounded-xl border border-green-500/40 overflow-hidden w-full"
            style={{
              ...stageBoxStyle,
              maxWidth: stageMaxW ? `${stageMaxW}px` : undefined,
            }}
          >
            <img src={hangmanBg} className="w-full h-full" />
            <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none select-none">
              <img
                src={penguin}
                alt="penguin"
                style={{
                  width: PENGUIN_W_CSS,
                  height: "auto",
                  transform: `translateY(${currentY}px)`,
                  transition:
                    status === "lost"
                      ? "transform 500ms cubic-bezier(0.2,0.8,0.2,1)"
                      : "transform 350ms ease-out",
                  willChange: "transform",
                  visibility: imgReady ? "visible" : "hidden",
                }}
                onLoad={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setImgH(rect.height);
                  setImgW(rect.width);
                  setImgReady(true);
                }}
                draggable={false}
              />
            </div>
          </div>

          {/* 오른쪽 */}
          <div
            className="w-full bg-white rounded-2xl shadow-lg px-6 bg-cover"
            style={{ height: `${stageH}px`, backgroundImage: `url(${wood})` }}
          >
            <div className="h-full flex flex-col justify-center py-5 gap-6">
              <div className="w-full text-center">{renderWord()}</div>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Text font={"hakgyo"} color="red" size={"xxl"}>
                  선택된 알파벳
                </Text>
                {Array.from(guessed).length === 0 ? (
                  <span className="text-sm text-gray-400">없음</span>
                ) : (
                  Array.from(guessed)
                    .sort()
                    .map(ch => (
                      <span
                        key={ch}
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs"
                      >
                        {ch}
                      </span>
                    ))
                )}
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                {ALPHABETS.map(ch => {
                  const picked = guessed.has(ch);
                  const isCorrect = picked && answer.includes(ch);
                  const isWrong = picked && !answer.includes(ch);
                  const disabled = picked || status !== "playing";

                  // ✅ 아이콘 소스 결정
                  const iconSrc = isWrong
                    ? xMark
                    : isCorrect
                      ? penguinHead
                      : null;

                  return (
                    <Button
                      key={ch}
                      font={"hakgyo"}
                      size={"xxxl"} // ← 원하던 'size' 자유롭게 사용 가능
                      onClick={() => onGuess(ch)}
                      className={[
                        "h-10 text-sm inline-flex items-center justify-center",
                        "bg-center bg-no-repeat", // 배경 아이콘 중앙정렬
                        picked ? "opacity-60 cursor-not-allowed" : "",
                        // isWrong ? "bg-red-200 text-red-800" : "",
                        // isCorrect ? "bg-green-200 text-green-800" : "",
                        iconSrc ? "text-transparent" : "", // ← 아이콘일 때 텍스트 숨김(자리는 유지)
                      ].join(" ")}
                      style={
                        iconSrc
                          ? {
                              backgroundImage: `url(${iconSrc})`,
                              backgroundSize: "1.25rem 1.25rem",
                            }
                          : undefined
                      }
                      disabled={disabled}
                      aria-pressed={picked}
                      aria-label={
                        picked
                          ? isCorrect
                            ? `${ch} (정답)`
                            : `${ch} (오답)`
                          : ch
                      }
                    >
                      {/* 텍스트는 항상 남겨두고, 아이콘일 때만 투명 처리됨 */}
                      {ch}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 종료 모달 */}
      <HangmanGameOverModal
        isOpen={isOverModalOpen}
        answer={answerRaw} // 또는 answer.toUpperCase()로 보여도 OK
        winOrLose={winOrLose}
        onYes={handleRestart} // onClose도 동일하게 다시하기
        onNo={handleExit} // /game 이동
      />
    </Div>
  );
};
