import { Text } from "../../atoms/text/Text";
type GameTextProps = {
  label?: string;
  data?: string | number | null | undefined;
};

export const GameText = ({ label, data }: GameTextProps) => {
  return (
    <Text font={"outline"} size={"xxxl"} className="w-fit">
      {label} : {data}
    </Text>
  );
};
