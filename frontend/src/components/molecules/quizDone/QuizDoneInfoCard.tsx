import type { ComponentProps, ComponentType, SVGProps } from "react";
import { Div } from "../../atoms/div/Div";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";

type TextComponentProps = ComponentProps<typeof Text>;
type DivComponentProps = ComponentProps<typeof Div>;

type QuizDoneInfoCardProps = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
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
        {icon && <Icon icon={icon} color="white" size="sm" />}
        <Text
          size="md"
          weight="medium"
          color="white"
          font={"hakgyo"}
          onlyOneLine={"yes"}
          align={"center"}
          className="sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl"
        >
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
        className="bg-white/80 rounded-b-md p-2 sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
      />
    </Div>
  );
};
