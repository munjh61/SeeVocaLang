import { useLocation } from "react-router-dom";
import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizDoneTemplate } from "../components/templates/quiz/QuizDoneTemplate";

function QuizDonePage() {
  const location = useLocation();
  const { bookname, size, result } = location.state || {};
  const day = 1;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow overflow-y-auto">
        <QuizDoneTemplate
          bookname={bookname}
          size={size}
          result={result}
          day={day}
        />
      </div>
      <Navigation loc="book" />
    </div>
  );
}

export default QuizDonePage;
