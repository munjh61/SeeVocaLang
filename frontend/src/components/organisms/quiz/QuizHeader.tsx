import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";

type QuizHeaderProps = {
  name: string;
  description: string;
  index: number;
  total: number;
};

export const QuizHeader = ({
  name,
  description,
  index,
  total,
}: QuizHeaderProps) => {
  return (
    <Div
      bg={"gray"}
      className="flex justify-between items-center rounded-md p-4 shadow-md gap-6"
    >
      <Div bg={"purple"} className="p-2" rounded={"md"}>
        <Text
          font={"outline"}
          color="white"
          size={"xxxl"}
          align={"center"}
          className="sm:text-md md:text-lg lg:text-xl xl:text-2xl min-w-48"
          onlyOneLine={"yes"}
          children={name}
        />
      </Div>
      <Div className="p-2 grow invisible lg:visible xl:visible">
        <Text color="gray" onlyOneLine={"yes"} children={description} />
      </Div>
      <Div className="p-2">
        <Text
          font={"outline"}
          size={"xl"}
          onlyOneLine={"yes"}
          children={`${index} 번째 / ${total} 문제`}
          className="sm:text-sm md:text-md lg:text-lg xl:text-xl"
        />
      </Div>
    </Div>
  );
};
