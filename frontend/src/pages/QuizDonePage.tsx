import { useLocation } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizDoneTemplate } from "../components/templates/quiz/QuizDoneTemplate";

function QuizDonePage() {
  const location = useLocation();
  const { name, size, result } = location.state || {};
  const day = 1;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow overflow-y-auto">
        <QuizDoneTemplate name={name} size={size} result={result} day={day} />
      </div>
      <Navigation loc="folder" />
    </div>
  );
}

export default QuizDonePage;
