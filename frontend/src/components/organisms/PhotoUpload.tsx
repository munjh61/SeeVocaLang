import CameraIcon from "../../asset/camera.svg?react";
import UploadIcon from "../../asset/image_upload.svg?react";
import { Button } from "../atoms/button/Button.tsx";
import { Icon } from "../atoms/icon/Icon.tsx";
import { Text } from "../atoms/text/Text.tsx";

export const PhotoUpload = () => {
  return (
    <section className="flex flex-col items-center justify-center flex-1/2 m-2 gap-5 bg-blue-100 rounded-md shadow-md">
      <Button
        bgColor={"gradientPurple"}
        rounded={"full"}
        className={"relative w-20 h-20"}
      >
        <Icon icon={CameraIcon} color={"white"} size={"lg"}></Icon>
        <span className="absolute top-0 right-0 bg-yellow-400 text-white text-xs px-1.5 py-0.5 rounded-full">
          ✨
        </span>
      </Button>

      <div>
        <Text color={"black"} weight={"bold"} size={"xl"}>
          사진을 선택해 주세요
        </Text>
        <Text color={"muted"} size={"xs"}>
          AI가 분석하여 맞춤 학습을 제공합니다
        </Text>
      </div>

      <Button
        bgColor={"gradientPurple"}
        textColor={"white"}
        size={"xl5"}
        className={"gap-2 rounded-md"}
      >
        <Icon icon={UploadIcon} color={"white"} size={"md"}></Icon>
        사진 업로드
      </Button>

      <section>
        <Text color={"muted"} size={"xs"}>
          📷 지원 형식: JPG, PNG, WEBP
        </Text>
        <Text color={"muted"} size={"xs"}>
          🔍 최대 크기: 10MB
        </Text>
        <Text color={"muted"} size={"xs"}>
          ⚡ 즉시 AI 분석 시작
        </Text>
      </section>
    </section>
  );
};
