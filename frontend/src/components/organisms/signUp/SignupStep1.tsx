import { Input } from "../../atoms/input/Input.tsx";
import { SelectBox } from "../../atoms/Select.tsx";
import { Button } from "../../atoms/button/Button.tsx";
import { useState } from "react";
import { Text } from "../../atoms/text/Text.tsx";

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
  progressBar: React.ReactNode;
};

export const SignupStep1 = ({
  name,
  birthYear,
  birthMonth,
  birthDay,
  onChange,
  onNext,
  onBack,
  progressBar,
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

  // 공통 반응형 인풋/셀렉트 클래스
  const fieldBase =
    "w-full rounded-md px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base lg:px-5 lg:py-3 lg:text-lg";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div
        className="
          w-full
          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl
          p-6 sm:p-8 lg:p-12
          flex flex-col gap-6
        "
      >
        {/* 상단 진행바 + 타이틀 */}
        <div className="flex flex-col items-center justify-center gap-6">
          {progressBar}
          <Text
            size="xl"
            color="black"
            weight="extrabold"
            className="text-center text-lg sm:text-xl lg:text-2xl"
          >
            이름 / 생년월일
          </Text>
        </div>

        {/* 이름 */}
        <div className="flex flex-col gap-1">
          <Input
            scale="signup"
            border={showErrors && !isNameValid ? "red" : "lightgray"}
            text="gray"
            placeholder="이름"
            value={name}
            onChange={e => {
              onChange("name", e.target.value);
              setShowErrors(false);
            }}
            className={`${fieldBase} m-0`}
          />
          {showErrors && !isNameValid && (
            <Text color="red" size="xs">
              이름을 입력해주세요.
            </Text>
          )}
        </div>

        {/* 생년월일 - 모바일 1열, sm 이상 3열 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 년 */}
          <div className="flex flex-col gap-1">
            <SelectBox
              value={birthYear}
              onChange={e => {
                onChange("birthYear", e.target.value);
                setShowErrors(false);
              }}
              options={Array.from({ length: 50 }, (_, i) => `${2024 - i}`)}
              placeholder="YYYY년"
              className={`${fieldBase} ${
                showErrors && !isYearValid ? "border-red-500" : ""
              }`}
            />
            {showErrors && !isYearValid && (
              <Text color="red" size="xs">
                년도를 선택해주세요.
              </Text>
            )}
          </div>

          {/* 월 */}
          <div className="flex flex-col gap-1">
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
              className={`${fieldBase} ${
                showErrors && !isMonthValid ? "border-red-500" : ""
              }`}
            />
            {showErrors && !isMonthValid && (
              <Text color="red" size="xs">
                월을 선택해주세요.
              </Text>
            )}
          </div>

          {/* 일 */}
          <div className="flex flex-col gap-1">
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
              className={`${fieldBase} ${
                showErrors && !isDayValid ? "border-red-500" : ""
              }`}
            />
            {showErrors && !isDayValid && (
              <Text color="red" size="xs">
                일을 선택해주세요.
              </Text>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col justify-between gap-2 w-full mt-2">
          <Button
            size="signup"
            onClick={handleNext}
            rounded="lg"
            className="
              w-full bg-blue-500 text-white font-semibold
              text-sm sm:text-base lg:text-lg
              px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3
              disabled:opacity-50
            "
          >
            다음
          </Button>
          <Button
            size="signup"
            border="blue"
            onClick={onBack}
            rounded="lg"
            textColor="blue"
            bgColor="white"
            className="
              w-full border-2 font-semibold
              text-sm sm:text-base lg:text-lg
              px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3
            "
          >
            &lt; 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};
