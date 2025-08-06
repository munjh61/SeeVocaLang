import { useSignupForm } from "../../../hooks/SignupForm.ts";
import { useState } from "react";
import { SignupStep1 } from "./SignupStep1.tsx";
import { SignupStep2 } from "./SignupStep2.tsx";
import { SignupStep3 } from "./SignupStep3.tsx";
import { SignupStep4 } from "./SignupStep4.tsx";
import { registerUser } from "../../../api/SignupApi.ts";
import { useNavigate } from "react-router-dom";

type Step = 1 | 2 | 3 | 4;

export const SignupFlow = () => {
  const navigate = useNavigate();

  // ──────────────────────────────────────────────
  //  1. 스텝 상태 및 이동 함수
  // ──────────────────────────────────────────────
  const [step, setStep] = useState<Step>(1);

  const goToNextStep = () =>
    setStep(prev => (prev < 4 ? ((prev + 1) as Step) : prev));

  const goToPrevStep = () =>
    setStep(prev => (prev > 1 ? ((prev - 1) as Step) : prev));

  // ──────────────────────────────────────────────
  //  2. 폼 입력 및 유효성 상태
  // ──────────────────────────────────────────────
  const { form, validation, handleChange, setValidation, resetForm } =
    useSignupForm();

  const [localId, setLocalId] = useState(form.id); // Step2용 별도 ID 입력 상태

  const isFormValid =
    validation.id &&
    validation.password &&
    validation.passwordMatch &&
    validation.nickname;

  // ──────────────────────────────────────────────
  //  3. 중복 체크 및 에러 상태
  // ──────────────────────────────────────────────
  const [idCheckError, setIdCheckError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [showIdErrors, setShowIdErrors] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [checkingNickname, setCheckingNickname] = useState(false);

  // ──────────────────────────────────────────────
  //  4. 회원가입 처리 함수
  // ──────────────────────────────────────────────
  const handleSignup = async () => {
    if (!isFormValid) {
      alert("모든 입력 조건을 만족해주세요.");
      return;
    }

    const signupPayload = {
      loginId: form.id,
      password: form.password,
      nickname: form.nickname,
      birthday: `${form.birthYear}-${form.birthMonth.padStart(2, "0")}-${form.birthDay.padStart(2, "0")}`,
    };

    const res = await registerUser(signupPayload);

    if (res.success) {
      alert("회원가입이 완료되었습니다!");
      resetForm();
      navigate("/game");
    } else {
      alert("회원가입에 실패했습니다.");
    }
  };

  // ──────────────────────────────────────────────
  //  5. 스텝별 컴포넌트 렌더링
  // ──────────────────────────────────────────────
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignupStep1
            name={form.name}
            birthYear={form.birthYear}
            birthMonth={form.birthMonth}
            birthDay={form.birthDay}
            onChange={(field, value) => handleChange(field, value)}
            onNext={goToNextStep}
            onBack={() => {
              resetForm();
              navigate("/game");
            }}
          />
        );
      case 2:
        return (
          <SignupStep2
            id={localId}
            onChange={val => {
              setLocalId(val);
              handleChange("id", val);
            }}
            isValid={validation.id}
            onNext={goToNextStep}
            onBack={goToPrevStep}
            onValidate={isValid =>
              setValidation(prev => ({ ...prev, id: isValid }))
            }
            error={idCheckError}
            setError={setIdCheckError}
            checking={isChecking}
            setChecking={setIsChecking}
            showErrors={showIdErrors}
            setShowErrors={setShowIdErrors}
          />
        );
      case 3:
        return (
          <SignupStep3
            password={form.password}
            passwordCheck={form.passwordCheck}
            onPasswordChange={val => handleChange("password", val)}
            onPasswordCheckChange={val => handleChange("passwordCheck", val)}
            isValid={validation.password && validation.passwordMatch}
            onNext={goToNextStep}
            onBack={goToPrevStep}
          />
        );
      case 4:
        return (
          <SignupStep4
            nickname={form.nickname}
            onChange={val => handleChange("nickname", val)}
            isValid={validation.nickname}
            onValidate={valid =>
              setValidation(prev => ({ ...prev, nickname: valid }))
            }
            onBack={goToPrevStep}
            onComplete={handleSignup}
            error={nicknameError}
            setError={setNicknameError}
            checking={checkingNickname}
            setChecking={setCheckingNickname}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-10 bg-[#F3F4FF] gap-6">
      {renderStep()}
    </div>
  );
};
