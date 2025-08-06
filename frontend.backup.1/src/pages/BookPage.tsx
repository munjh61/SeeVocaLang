import { Navigation } from "../components/organisms/nav/Navigation";
import VocaSampleDatas from "../components/templates/voca/SampleVocaBook";
import { BookSelectTemplate } from "../components/templates/voca/VocaBookSelectTemplate";

function BookPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="grow overflow-y-auto">
        <BookSelectTemplate vocaBookDatas={VocaSampleDatas} />
      </div>
      <Navigation loc="book" />
    </div>
  );
}

export default BookPage;
