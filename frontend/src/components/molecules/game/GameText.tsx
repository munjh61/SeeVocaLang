import { Text } from "../../atoms/text/Text";
type GameTextProps = {
  label?: string;
  data?: string | number | null | undefined;
};

export const GameText = ({ label, data }: GameTextProps) => {
  return (
    <Text
      font={"outline"}
      size={"base"}
      className="w-fit sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl"
    >
      {label} : {data}
    </Text>
  );
};
