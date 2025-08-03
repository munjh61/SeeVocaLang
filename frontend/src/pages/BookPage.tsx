import { Navigation } from "../components/organisms/nav/Navigation";
import VocaSampleDatas from "../components/templates/voca/VocaSample";
import { BookSelectTemplate } from "../components/templates/voca/VocaSelectTemplate";

function BookPage() {
  return (
    <div className="flex flex-col align-center">
      <h1>단어장 페이지</h1>
      <BookSelectTemplate vocaDatas={VocaSampleDatas} />
      <Navigation loc="book" />
    </div>
  );
}

export default BookPage;
