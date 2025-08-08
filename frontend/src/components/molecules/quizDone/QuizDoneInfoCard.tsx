import type { ComponentProps, ComponentType, SVGProps } from "react";
import { Div } from "../../atoms/div/Div";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";

type TextComponentProps = ComponentProps<typeof Text>;
type DivComponentProps = ComponentProps<typeof Div>;

type QuizDoneInfoCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  data: string;
  titleColor?: DivComponentProps["color"];
  dataColor?: TextComponentProps["color"];
};

export const QuizDoneInfoCard = ({
  icon,
  title,
  titleColor,
  data,
  dataColor,
}: QuizDoneInfoCardProps) => {
  return (
    <Div className="w-full">
      <Div
        align={"center"}
        className="flex flex-row justify-center rounded-t-md p-2"
        bg={titleColor}
      >
        <Icon icon={icon} color="white" size="sm" />
        <Text size="sm" weight="medium" color="white" font={"outline"}>
          {title}
        </Text>
      </Div>
      <Text
        size={data.length < 10 ? "xxl" : "xl"}
        weight="bold"
        color={dataColor}
        align={"center"}
        children={data}
        font={"outline"}
        className="bg-white/80 rounded-b-md p-2"
      />
    </Div>
  );
};
