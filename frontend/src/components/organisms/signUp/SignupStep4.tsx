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
  progressBar: React.ReactNode;
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
  progressBar,
}: SignupStep4Props) => {
  const handleCheckNickname = async () => {
    if (!nickname || nickname.trim().length < 2) return;
    setChecking(true);
    setError("");

    const result = await checkNicknameDuplicate(nickname.trim());
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

  // 입력/버튼 공통 반응형 사이즈
  const fieldBase =
    "w-full rounded-md px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base lg:px-5 lg:py-3 lg:text-lg";

  return (
    // ✅ 중앙정렬/뷰포트 관리는 SignupFlow에서 처리. 여기서는 카드만 렌더.
    <div
      className="
        w-full
        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
        bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl
        p-6 sm:p-8 lg:p-12
        flex flex-col gap-6
      "
    >
      {/* 진행바 + 타이틀 */}
      <div className="flex flex-col items-center justify-center gap-6">
        {progressBar}
        <Text
          size="xl"
          color="black"
          weight="extrabold"
          className="text-center text-lg sm:text-xl lg:text-2xl"
        >
          닉네임 설정
        </Text>
      </div>

      {/* 닉네임 입력 */}
      <Input
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={handleInputChange}
        border={error ? "red" : "lightgray"}
        text="gray"
        scale="signup"
        className={`${fieldBase} m-0`}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleCheckNickname();
          }
        }}
      />

      {/* 중복 확인 */}
      <Button
        size="signup"
        onClick={handleCheckNickname}
        disabled={checking || nickname.trim().length < 2}
        rounded="lg"
        className={`
          ${fieldBase}
          !w-full bg-gray-200 text-gray-800 font-medium
          disabled:opacity-50
        `}
      >
        {checking ? "확인 중..." : "중복 확인"}
      </Button>

      {/* 결과/에러 메시지 */}
      {error && (
        <Text color="red" size="xs">
          {error}
        </Text>
      )}
      {isValid && !error && nickname.trim() !== "" && (
        <Text color="green" size="xs" className="px-2">
          ✅ 사용 가능한 닉네임입니다
        </Text>
      )}

      {/* 하단 버튼 */}
      <div className="flex flex-col justify-between gap-2 w-full mt-2">
        <Button
          size="signup"
          onClick={onComplete}
          disabled={!isValid}
          rounded="lg"
          className="
            w-full bg-blue-500 text-white font-semibold
            text-sm sm:text-base lg:text-lg
            px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3
            disabled:opacity-50
          "
        >
          회원가입 완료
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
