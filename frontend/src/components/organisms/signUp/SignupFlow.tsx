import { useSignupForm } from "../../../hooks/SignupForm.ts";
import { useState } from "react";
import { SignupStep1 } from "./SignupStep1.tsx";
import { SignupStep2 } from "./SignupStep2.tsx";
import { SignupStep3 } from "./SignupStep3.tsx";
import { SignupStep4 } from "./SignupStep4.tsx";
import { registerUser } from "../../../api/user/SignupApi.ts";
import { useNavigate } from "react-router-dom";
import BackgroundLayer from "../onboarding/BackgroundLayer.tsx";
import { ProgressBar } from "../../molecules/progressbar/ProgressBar.tsx";
import BackgroundImg from "../../../asset/png/background/summer_background_20_without_text.jpg";
import { Modal } from "../../atoms/modal/modal.tsx";

type Step = 1 | 2 | 3 | 4;

export const SignupFlow = () => {
  const navigate = useNavigate();

  // ── 1) 스텝 상태 ─────────────────────────────────────────
  const [step, setStep] = useState<Step>(1);
  const goToNextStep = () =>
    setStep(prev => (prev < 4 ? ((prev + 1) as Step) : prev));
  const goToPrevStep = () =>
    setStep(prev => (prev > 1 ? ((prev - 1) as Step) : prev));

  // ── 2) 폼/유효성 ─────────────────────────────────────────
  const { form, validation, handleChange, setValidation, resetForm } =
    useSignupForm();
  const [localId, setLocalId] = useState(form.id);

  const isFormValid =
    validation.id &&
    validation.password &&
    validation.passwordMatch &&
    validation.nickname;

  // ── 3) 중복 체크/에러 ────────────────────────────────────
  const [idCheckError, setIdCheckError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [showIdErrors, setShowIdErrors] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [checkingNickname, setCheckingNickname] = useState(false);

  // ── 4) 모달 상태 ────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<() => void>(
    () => () => {}
  );

  const handleSignup = async () => {
    if (!isFormValid) {
      setModalTitle("입력 확인");
      setModalMessage("❌ 모든 입력 조건을 만족해주세요.");
      setModalOnConfirm(() => () => setModalOpen(false));
      setModalOpen(true);
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
      setModalTitle("회원가입 완료");
      setModalMessage("✅ 회원가입이 완료되었습니다!");
      setModalOnConfirm(() => () => {
        setModalOpen(false);
        resetForm();
        navigate("/main");
      });
      setModalOpen(true);
    } else {
      setModalTitle("회원가입 실패");
      setModalMessage("❌ 회원가입에 실패했습니다. 다시 시도해주세요.");
      setModalOnConfirm(() => () => setModalOpen(false));
      setModalOpen(true);
    }
  };

  // ── 6) 스텝 렌더 ────────────────────────────────────────
  const progress = (
    <ProgressBar current={step} total={4} height={8} percentageView={false} />
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignupStep1
            progressBar={progress}
            name={form.name}
            birthYear={form.birthYear}
            birthMonth={form.birthMonth}
            birthDay={form.birthDay}
            onChange={(field, value) => handleChange(field, value)}
            onNext={goToNextStep}
            onBack={() => {
              resetForm();
              navigate("/");
            }}
          />
        );
      case 2:
        return (
          <SignupStep2
            progressBar={progress}
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
            progressBar={progress}
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
            progressBar={progress}
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
    <BackgroundLayer src={BackgroundImg}>
      {/* 중앙 정렬 & 안전한 높이/스크롤 */}
      <main className="w-full min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
        <div className="w-full flex items-center justify-center">
          {renderStep()}
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        closeOnOverlayClick={false}
        panelClassName="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl"
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            {modalTitle}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-6">
            {modalMessage}
          </p>

          <div className="flex justify-center">
            <button
              onClick={modalOnConfirm}
              className="
                bg-blue-500 hover:bg-blue-400 text-white font-semibold
                text-sm sm:text-base
                px-4 py-2 sm:px-5 sm:py-2.5
                rounded-lg mt-3
              "
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </BackgroundLayer>
  );
};
