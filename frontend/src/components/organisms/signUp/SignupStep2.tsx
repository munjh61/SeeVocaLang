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
}: SignupStep2Props) => {
  const isIdFormatValid = ID_REGEX.test(id);

  useEffect(() => {
    if (isValid) {
      setShowErrors(false);
    }
  }, [id, isValid, setShowErrors]);

  const handleCheckDuplicate = async () => {
    if (!isIdFormatValid) {
      setError(
        "아이디는 5~20자의 영문, 숫자, 밑줄 또는 하이픈만 사용할 수 있습니다."
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-white/70 rounded-2xl p-10 pt-5  justify-center gap-5 px-6">
        <Text
          size="xl"
          color="black"
          weight="extrabold"
          className="text-center mb-10"
        >
          아이디 설정
        </Text>

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
            className="m-0 px-3"
          />
          {showErrors && !isIdFormatValid && (
            <Text color="red" size="xs">
              아이디는 5~20자의 영문, 숫자, 밑줄(_), 하이픈(-)만 가능합니다.
            </Text>
          )}
        </div>

        <Button
          size="signup"
          onClick={handleCheckDuplicate}
          disabled={checking || id.trim() === ""}
          rounded={"lg"}
          className="bg-gray-200 text-gray-800"
        >
          {checking ? "확인 중..." : "중복 확인"}
        </Button>

        {error && (
          <Text color="red" size="xs">
            {error}
          </Text>
        )}
        {isValid && !error && (
          <Text color="green" size="xs" className={"px-2"}>
            ✅ 사용 가능한 아이디입니다
          </Text>
        )}

        <div className={"flex flex-col px-2"}>
          <Text color="black" weight={"bold"} size="sm">
            아이디 생성 가이드
          </Text>
          <Text color="muted" size="xs">
            - 영문, 숫자 조합 4-20자
          </Text>
          <Text color="muted" size="xs">
            - 첫 글자는 영문으로 시작
          </Text>
          <Text color="muted" size="xs">
            - 특수문자는 사용할 수 없습니다
          </Text>
        </div>

        <div className="flex flex-col justify-between mt-4 gap-2">
          <Button
            size="signup"
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
            rounded={"lg"}
            disabled={!isValid || !isIdFormatValid}
          >
            다음
          </Button>
          <Button
            size="signup"
            border="blue"
            rounded={"lg"}
            onClick={onBack}
            textColor="blue"
          >
            &lt; 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};
