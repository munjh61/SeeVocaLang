import { Navigation } from "../components/organisms/nav/Navigation";
import { QuizDoneTemplate } from "../components/templates/quiz/QuizDoneTemplate";

function TestPageMoon() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow overflow-y-auto">
        <QuizDoneTemplate bookname={"연습용"} size={10} result={7} day={10} />
      </div>
      <Navigation loc="book" />
    </div>
  );
}
export default TestPageMoon;
