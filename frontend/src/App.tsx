import { Button } from "./components/atoms/Button.tsx";
import { Text } from "./components/atoms/Text.tsx";
import { Icon } from "./components/atoms/icon.tsx";
import HomeIcon from "./asset/book.svg?react";
function App() {
  return (
    <>
      <div className={"bg-amber-500"}>
        <Button bgColor={"gradientPurple"} size="xl5" textColor={"white"}>
          사진 업로드
        </Button>

        <Button bgColor={"transparent"} size="md">
          버튼
        </Button>

        <Button
          bgColor={"gradientGreen"}
          size="xl5"
          textColor={"white"}
          className={"text-xs"}
        >
          버튼
        </Button>

        <Button bgColor={"red"} size={"xl5"} textColor={"white"}>
          버튼
        </Button>

        <Button bgColor={"green"} size={"xl5"} textColor={"white"}>
          버튼
        </Button>

        <Button bgColor={"blue"} size={"xl5"} textColor={"white"}>
          버튼
        </Button>

        <Button bgColor={"orange"} size={"xl5"} textColor={"white"}>
          버튼
        </Button>

        <Button bgColor={"gradientOrange"} size={"xl5"} textColor={"white"}>
          버튼
        </Button>
        <Button
          bgColor={"white"}
          size={"word"}
          textColor={"black"}
          className={"border border-blue-700"}
        >
          버튼
        </Button>
        <Text size={"lg"} color={"danger"} align={"center"} weight={"bold"}>
          안녕하세용
        </Text>

        <Icon icon={HomeIcon} size={"md"} color={"blue"}></Icon>
      </div>
    </>
  );
}

export default App;
