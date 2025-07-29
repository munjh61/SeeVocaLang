import { MainPageButton } from "../components/molecules/main/MainButton.tsx";
import StarIcon from "../asset/star_empty.svg?react";
import { Icon } from "../components/atoms/icon.tsx";
import { Text } from "../components/atoms/Text.tsx";
import { Button } from "../components/atoms/Button.tsx";
function TestPageDoh() {
  return (
    <MainPageButton
      bgColor={"gradientPurple"}
      icon={<Icon icon={StarIcon} color={"white"} />}
      title={
        <Text
          size={"lg"}
          children={"제목"}
          color={"white"}
          weight={"bold"}
        ></Text>
      }
      subtitle={<Text size={"sm"} children={"부제목"} color={"white"}></Text>}
      action={
        <Button bgColor={"transparent"} size={"md"} textColor={"white"}>
          버튼
        </Button>
      }
      className={"flex justify-start px-3 py-2 gap-10 w-1/2"}
    />
  );
}
export default TestPageDoh;
