import { ToggleButton } from "../../molecules/toggleButton/ToggleButton";
import { SearchbarSegment } from "../../organisms/searchbarSegment/SearchbarSegment";

type VocaDetailTemplateProps = {
  workId: number;
};

export const VocaDetailTemplate = ({ workId }: VocaDetailTemplateProps) => {
  const searchFunction = () => {};

  return (
    <div className="flex flex-col px-5 w-full gap-4">
      <h1>{workId}번의 단어장입니다.</h1>
      <div className="flex flex-row">
        <SearchbarSegment
          iconColor="blue"
          onSearch={searchFunction}
          className="w-full h-20"
        />
        <ToggleButton selected={false}>한글가리기</ToggleButton>
        <ToggleButton selected={false}>영어가리기</ToggleButton>
      </div>
    </div>
  );
};
