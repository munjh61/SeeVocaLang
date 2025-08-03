import { Navigation } from "../components/organisms/nav/Navigation";
import VocaSampleDatas from "../components/templates/voca/VocaBookSample";
import { BookSelectTemplate } from "../components/templates/voca/VocaBookSelectTemplate";

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
