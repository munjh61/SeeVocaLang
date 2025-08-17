import { useEffect } from "react";
import { checkIdDuplicate } from "../../../api/user/SignupApi.ts";
import { Input } from "../../atoms/input/Input.tsx";
import { Text } from "../../atoms/text/Text.tsx";
import { Button } from "../../atoms/button/Button.tsx";
import { ID_REGEX } from "../../../types/Regex.ts";

type SignupStep2Props = {
  id: string;
  onChange: (value: string) => void;
  isValid: boolean;
  onNext: () => void;
  onBack: () => void;
  onValidate: (result: boolean) => void;
  error: string;
  setError: (val: string) => void;
  checking: boolean;
  setChecking: (val: boolean) => void;
  showErrors: boolean;
  setShowErrors: (val: boolean) => void;
  progressBar: React.ReactNode;
};

export const SignupStep2 = ({
  id,
  onChange,
  isValid,
  onNext,
  onBack,
  onValidate,
  error,
  setError,
  checking,
  setChecking,
  showErrors,
  setShowErrors,
  progressBar,
}: SignupStep2Props) => {
  const isIdFormatValid = ID_REGEX.test(id);

  useEffect(() => {
    if (isValid) setShowErrors(false);
  }, [id, isValid, setShowErrors]);

  const handleCheckDuplicate = async () => {
    if (!isIdFormatValid) {
      setError(
        "아이디는 5~20자의 영문, 숫자, 밑줄(_), 하이픈(-)만 가능합니다."
      );
      return;
    }

    setChecking(true);
    setError("");

    const result = await checkIdDuplicate(id);
    if (result) {
      onValidate(true);
    } else {
      onValidate(false);
      setError("이미 사용 중인 아이디입니다.");
    }

    setChecking(false);
  };

  const handleNext = () => {
    if (!isIdFormatValid || !isValid) {
      setShowErrors(true);
      return;
    }
    onNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    onValidate(false);
    setShowErrors(false);
    setError("");
  };

  // 반응형 입력/선택/버튼 공통 사이즈
  const fieldBase =
    "w-full rounded-md px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base lg:px-5 lg:py-3 lg:text-lg";

  return (
    // 중앙 정렬은 부모(SignupFlow)가 담당 — 여기선 카드만
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
          아이디 설정
        </Text>
      </div>

      {/* 아이디 입력 */}
      <div className="flex flex-col gap-1">
        <Input
          scale="signup"
          border={
            showErrors && (!isIdFormatValid || !isValid) ? "red" : "lightgray"
          }
          text="gray"
          placeholder="아이디"
          value={id}
          onChange={handleInputChange}
          className={`${fieldBase} m-0`}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCheckDuplicate();
            }
          }}
        />
        {showErrors && !isIdFormatValid && (
          <Text color="red" size="xs">
            아이디는 5~20자의 영문, 숫자, 밑줄(_), 하이픈(-)만 가능합니다.
          </Text>
        )}
      </div>

      {/* 중복 확인 버튼 */}
      <Button
        size="signup"
        onClick={handleCheckDuplicate}
        disabled={checking || id.trim() === ""}
        rounded="lg"
        className={`
          ${fieldBase} 
          !w-full bg-gray-200 text-gray-800 font-medium
          disabled:opacity-50
        `}
      >
        {checking ? "확인 중..." : "중복 확인"}
      </Button>

      {/* 결과 메시지 */}
      {error && (
        <Text color="red" size="xs">
          {error}
        </Text>
      )}
      {isValid && !error && id.trim() !== "" && (
        <Text color="green" size="xs" className="px-2">
          ✅ 사용 가능한 아이디입니다
        </Text>
      )}

      {/* 가이드 (정책과 일치시킴) */}
      <div className="flex flex-col px-2">
        <Text color="black" weight="bold" size="sm">
          아이디 생성 가이드
        </Text>
        <Text color="muted" size="xs">
          - 5~20자, 영문/숫자/밑줄(_)/하이픈(-) 허용
        </Text>
        <Text color="muted" size="xs">
          - 영문/숫자 조합을 권장합니다
        </Text>
      </div>

      {/* 다음/뒤로 */}
      <div className="flex flex-col justify-between gap-2 w-full mt-2">
        <Button
          size="signup"
          onClick={handleNext}
          rounded="lg"
          disabled={!isValid || !isIdFormatValid}
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
          rounded="lg"
          onClick={onBack}
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
  );
};
