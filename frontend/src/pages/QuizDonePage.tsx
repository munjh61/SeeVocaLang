import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizDoneTemplate } from "../components/templates/quiz/QuizDoneTemplate";
import { useEffect, useState } from "react";
import { getQuizStatus } from "../api/TodayQuizAPI";
import { LoadingPage } from "../components/templates/loadingTemplate/LoadingTemplate";

function QuizDonePage() {
  const location = useLocation();
  const { name, size, result } = location.state || {};
  const [streakDay, setStreakDay] = useState(1);
  const [totalDay, setTotalDay] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getQuizStatus();
        setStreakDay(res?.streakDaysCount ?? 1);
        setTotalDay(res?.totalDaysCount ?? 1);
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
  const isInvalid = (v: unknown) => v == null || Number.isNaN(v);

  if (isInvalid(streakDay) || isInvalid(totalDay)) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow overflow-y-auto">
        <QuizDoneTemplate
          name={name}
          size={size}
          result={result}
          streakDay={streakDay}
          totalDay={totalDay}
        />
      </div>
      <Navigation loc="folder" />
    </div>
  );
}

export default QuizDonePage;
