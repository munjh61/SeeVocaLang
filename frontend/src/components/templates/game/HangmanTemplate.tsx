import { useEffect, useState } from "react";
import type { VocaCardProps } from "../../organisms/vocaCard/VocaCard";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../loadingTemplate/LoadingTemplate";
import { getTodayQuiz } from "../../../api/TodayQuizAPI";
import { HangMan } from "../../organisms/game/HangMan";
// import { SampleData } from "../../../stores/Sample";

export const HangManTemplate = () => {
  const nav = useNavigate();
  const [vocas, setVocas] = useState<VocaCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getTodayQuiz();
        if (mounted) setVocas(Array.isArray(data) ? data : []);
        // if (vocas.length === 0) setVocas(SampleData);
      } catch (e) {
        if (!mounted) return;
        const msg = e instanceof Error ? e.message : "불러오기 실패";
        setError(msg);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    alert("오류가 발생했습니다.");
    nav(-1);
  }

  if (vocas.length === 0) return <LoadingPage />;
  return <HangMan vocas={vocas} />;
};
