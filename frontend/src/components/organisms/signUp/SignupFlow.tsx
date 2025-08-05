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
  const { form, validation, handleChange, setValidation, resetForm } =
    useSignupForm();
  const [step, setStep] = useState<Step>(1);
  const navigate = useNavigate();

  const goToNextStep = () =>
    setStep(prev => (prev < 4 ? ((prev + 1) as Step) : prev));

  const goToPrevStep = () =>
    setStep(prev => (prev > 1 ? ((prev - 1) as Step) : prev));

  const [idCheckError, setIdCheckError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [showIdErrors, setShowIdErrors] = useState(false);
  const [localId, setLocalId] = useState(form.id);
  const [nicknameError, setNicknameError] = useState("");
  const [checkingNickname, setCheckingNickname] = useState(false);

  const isFormValid =
    validation.id &&
    validation.password &&
    validation.passwordMatch &&
    validation.nickname;

  const handleSignup = async () => {
    if (!isFormValid || !validation.nickname) {
      alert("모든 입력 조건을 만족해주세요.");
      return;
    }

    const res = await registerUser(form);
    if (res.success) {
      alert("회원가입이 완료되었습니다!");
      resetForm(); // 입력값 초기화
      navigate("/game"); // ✅ game 페이지로 이동
    } else {
      alert("회원가입에 실패했습니다.");
    }
  };

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
