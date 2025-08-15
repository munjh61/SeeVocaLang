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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-white/85 shadow-xl rounded-2xl p-10 pt-5  justify-center gap-5 px-6">
        <div className={"flex flex-col items-center justify-center gap-6 mb-5"}>
          {progressBar}
          <Text
            size="xl"
            color="black"
            weight="extrabold"
            className="text-center"
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
            className="m-0 px-3"
          />
          {showPasswordError && (
            <Text color="red" size="xs">
              비밀번호는 영문+숫자를 포함한 8자 이상이어야 합니다.
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
            className="m-0 px-3"
          />
          {showMatchError && (
            <Text color="red" size="xs">
              비밀번호가 일치하지 않습니다.
            </Text>
          )}
          {password && passwordCheck && isMatch && !showPasswordError && (
            <Text color="green" size="xs" className={"px-2"}>
              ✅ 비밀번호가 일치합니다
            </Text>
          )}
        </div>

        <div className={"flex flex-col px-2"}>
          <Text color="black" weight={"bold"} size="sm">
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
        <div className="flex flex-col justify-between mt-4 gap-2">
          <Button
            size="signup"
            onClick={handleNext}
            rounded={"lg"}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!isPasswordValid || !isMatch}
          >
            다음
          </Button>
          <Button
            size="signup"
            border="blue"
            rounded={"lg"}
            onClick={onBack}
            textColor="blue"
            bgColor={"white"}
            className={"border-2"}
          >
            &lt; 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};
