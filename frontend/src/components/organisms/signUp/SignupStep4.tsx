import { checkNicknameDuplicate } from "../../../api/user/SignupApi.ts";
import { Input } from "../../atoms/input/Input.tsx";
import { Text } from "../../atoms/text/Text.tsx";
import { Button } from "../../atoms/button/Button.tsx";

type SignupStep4Props = {
  nickname: string;
  onChange: (val: string) => void;
  isValid: boolean;
  onValidate: (valid: boolean) => void;
  onComplete: () => void;
  onBack: () => void;
  error: string;
  setError: (val: string) => void;
  checking: boolean;
  setChecking: (val: boolean) => void;
};

export const SignupStep4 = ({
  nickname,
  onChange,
  isValid,
  onValidate,
  onComplete,
  onBack,
  error,
  setError,
  checking,
  setChecking,
}: SignupStep4Props) => {
  const handleCheckNickname = async () => {
    setChecking(true);
    setError("");

    const result = await checkNicknameDuplicate(nickname);
    if (result) {
      onValidate(true);
    } else {
      onValidate(false);
      setError("이미 사용 중인 닉네임입니다.");
    }

    setChecking(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    onValidate(false);
    setError("");
  };

  return (
    <div className="flex flex-col gap-4">
      <Text
        size="xl"
        color="black"
        weight="extrabold"
        className="text-center mb-10"
      >
        닉네임 설정
      </Text>

      <Input
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={handleInputChange}
        border={error ? "red" : "lightgray"}
        text="gray"
        scale="signup"
        className="m-0 px-3"
      />

      <Button
        size="signup"
        onClick={handleCheckNickname}
        disabled={checking || nickname.length < 2}
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
          ✅ 사용 가능한 닉네임입니다
        </Text>
      )}

      <Button
        size="signup"
        onClick={onComplete}
        disabled={!isValid}
        rounded={"lg"}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        회원가입 완료
      </Button>
      <Button
        size="signup"
        border="blue"
        rounded={"lg"}
        onClick={onBack}
        textColor="blue"
      >
        돌아가기
      </Button>
    </div>
  );
};
