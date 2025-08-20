import { PASSWORD_REGEX } from "../../../types/Regex.ts";
import { Input } from "../../atoms/input/Input.tsx";
import { Text } from "../../atoms/text/Text.tsx";
import { Button } from "../../atoms/button/Button.tsx";

type SignupStep3Props = {
  password: string;
  passwordCheck: string;
  onPasswordChange: (val: string) => void;
  onPasswordCheckChange: (val: string) => void;
  isValid: boolean;
  onNext: () => void;
  onBack: () => void;
  progressBar: React.ReactNode;
};

export const SignupStep3 = ({
  password,
  passwordCheck,
  onPasswordChange,
  onPasswordCheckChange,
  isValid,
  onNext,
  onBack,
  progressBar,
}: SignupStep3Props) => {
  const isPasswordValid = PASSWORD_REGEX.test(password);
  const isMatch = password === passwordCheck;

  const showPasswordError = password.length > 0 && !isPasswordValid;
  const showMatchError = passwordCheck.length > 0 && !isMatch;

  const handleNext = () => {
    if (!isValid || !isPasswordValid || !isMatch) return;
    onNext();
  };

  // 인풋/버튼 공통 반응형 사이즈
  const fieldBase =
    "w-full rounded-md px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base lg:px-5 lg:py-3 lg:text-lg";

  return (
    // ✅ 중앙 정렬/뷰포트 관리는 상위(SignupFlow)에서 처리 — 여기서는 카드만
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
          비밀번호 설정
        </Text>
      </div>

      {/* 비밀번호 입력 */}
      <div className="flex flex-col gap-1">
        <Input
          type="password"
          scale="signup"
          placeholder="비밀번호 (영문+숫자+특수문자, 8자 이상)"
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
          border={showPasswordError ? "red" : "lightgray"}
          text="gray"
          className={`${fieldBase} m-0`}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              // 포커스가 첫 번째 인풋일 경우 다음 인풋으로 자연스럽게 포커스 이동을 유도할 수도 있음
            }
          }}
        />
        {showPasswordError && (
          <Text color="red" size="xs">
            비밀번호는 영문+숫자+특수문자를 포함한 8자 이상이어야 합니다.
          </Text>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex flex-col gap-1">
        <Input
          type="password"
          scale="signup"
          placeholder="비밀번호 다시 입력"
          value={passwordCheck}
          onChange={e => onPasswordCheckChange(e.target.value)}
          border={showMatchError ? "red" : "lightgray"}
          text="gray"
          className={`${fieldBase} m-0`}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleNext();
            }
          }}
        />
        {showMatchError && (
          <Text color="red" size="xs">
            비밀번호가 일치하지 않습니다.
          </Text>
        )}
        {password && passwordCheck && isMatch && !showPasswordError && (
          <Text color="green" size="xs" className="px-2">
            ✅ 비밀번호가 일치합니다
          </Text>
        )}
      </div>

      {/* 안내 */}
      <div className="flex flex-col px-2">
        <Text color="black" weight="bold" size="sm">
          비밀번호 생성 가이드
        </Text>
        <Text color="muted" size="xs">
          - 영문, 숫자, 특수문자 조합 8자 이상
        </Text>
        <Text color="muted" size="xs">
          - 대소문자를 혼용하면 더 안전합니다
        </Text>
        <Text color="muted" size="xs">
          - 개인정보와 관련된 내용은 피해주세요
        </Text>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col justify-between gap-2 w-full mt-2">
        <Button
          size="signup"
          onClick={handleNext}
          rounded="lg"
          disabled={!isPasswordValid || !isMatch}
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
