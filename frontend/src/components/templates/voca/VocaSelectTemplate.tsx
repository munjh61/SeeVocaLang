import { BookSecondHeader } from "../../organisms/vocaSecondheader/VocaSecondheader";
import { SearchbarSegment } from "../../organisms/searchbarSegment/SearchbarSegment";
import {
  VocaCard,
  type VocaCardProps,
} from "../../organisms/vocaCard/VocaCard";

type VocaDataProps = {
  vocaDatas: VocaCardProps[];
};

export const BookSelectTemplate = ({ vocaDatas }: VocaDataProps) => {
  const searchFunction = (v: string) => {
    console.log(v);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col px-5 w-full gap-4">
        <SearchbarSegment
          iconColor={"blue"}
          onSearch={searchFunction}
          className="w-full h-20"
          segmentControl={{
            options: [
              { value: "book", label: "단어장으로 검색하기" },
              { value: "word", label: "단어로 검색하기" },
            ],
          }}
        />
        <BookSecondHeader />
        <div className="flex flex-row gap-4">
          {vocaDatas.map(data => {
            return <VocaCard {...data} />;
          })}
        </div>
      </div>
    </div>
  );
};
