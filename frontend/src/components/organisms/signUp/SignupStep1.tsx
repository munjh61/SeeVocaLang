import { Input } from "../../atoms/input/Input.tsx";
import { SelectBox } from "../../atoms/Select.tsx";
import { Button } from "../../atoms/button/Button.tsx";
import { useState } from "react";
import { Text } from "../../atoms/text/Text.tsx";
import { Logo } from "../../atoms/Logo.tsx";

type SignupStep1Props = {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  onChange: (
    field: "name" | "birthYear" | "birthMonth" | "birthDay",
    value: string
  ) => void;
  onNext: () => void;
  onBack: () => void;
};

export const SignupStep1 = ({
  name,
  birthYear,
  birthMonth,
  birthDay,
  onChange,
  onNext,
  onBack,
}: SignupStep1Props) => {
  const [showErrors, setShowErrors] = useState(false);

  const isNameValid = name.trim() !== "";
  const isYearValid = birthYear.trim() !== "";
  const isMonthValid = birthMonth.trim() !== "";
  const isDayValid = birthDay.trim() !== "";

  const isFilled = isNameValid && isYearValid && isMonthValid && isDayValid;

  const handleNext = () => {
    if (!isFilled) {
      setShowErrors(true);
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={"flex flex-col items-center justify-center gap-6 mb-5"}>
        <Logo />
        <Text
          size={"xl"}
          color={"black"}
          weight={"extrabold"}
          className={"text-center"}
        >
          이름 / 생년월일
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <Input
          scale={"signup"}
          border={showErrors && !isNameValid ? "red" : "lightgray"}
          text={"gray"}
          placeholder={"이름"}
          value={name}
          onChange={e => {
            onChange("name", e.target.value);
            setShowErrors(false);
          }}
          className={"m-0 px-3"}
        />
        {showErrors && !isNameValid && (
          <Text color={"red"} size={"xs"}>
            이름을 입력해주세요.
          </Text>
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col flex-1 gap-1">
          <SelectBox
            value={birthYear}
            onChange={e => {
              onChange("birthYear", e.target.value);
              setShowErrors(false);
            }}
            options={Array.from({ length: 50 }, (_, i) => `${2024 - i}`)}
            placeholder="YYYY년"
            className={showErrors && !isYearValid ? "border-red-500" : ""}
          />
          {showErrors && !isYearValid && (
            <Text color={"red"} size={"xs"}>
              년도를 선택해주세요.
            </Text>
          )}
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <SelectBox
            value={birthMonth}
            onChange={e => {
              onChange("birthMonth", e.target.value);
              setShowErrors(false);
            }}
            options={Array.from({ length: 12 }, (_, i) =>
              (i + 1).toString().padStart(2, "0")
            )}
            placeholder="MM월"
            className={showErrors && !isMonthValid ? "border-red-500" : ""}
          />
          {showErrors && !isMonthValid && (
            <Text color={"red"} size={"xs"}>
              월을 선택해주세요.
            </Text>
          )}
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <SelectBox
            value={birthDay}
            onChange={e => {
              onChange("birthDay", e.target.value);
              setShowErrors(false);
            }}
            options={Array.from({ length: 31 }, (_, i) =>
              (i + 1).toString().padStart(2, "0")
            )}
            placeholder="DD일"
            className={showErrors && !isDayValid ? "border-red-500" : ""}
          />
          {showErrors && !isDayValid && (
            <Text color={"red"} size={"xs"}>
              일을 선택해주세요.
            </Text>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between mt-4 gap-2">
        <Button
          size={"signup"}
          onClick={handleNext}
          rounded={"lg"}
          className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
        >
          다음
        </Button>
        <Button
          size={"signup"}
          border={"blue"}
          onClick={onBack}
          rounded={"lg"}
          textColor={"blue"}
        >
          &lt; 돌아가기
        </Button>
      </div>
    </div>
  );
};
