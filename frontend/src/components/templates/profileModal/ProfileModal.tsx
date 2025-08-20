import { Modal } from "../../atoms/modal/modal";
import { Input } from "../../atoms/input/Input";
import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import UploadIcon from "../../../asset/image_upload.svg?react";
import MailIcon from "../../../asset/mail.svg?react";
import { useState, useEffect, useMemo } from "react";
import { FileUploadModalFlow } from "../../organisms/fileUpload/FileUploadModalFlow";
import type { UserInfo } from "../../../api/userInfo";
import DefaultProfileImg from "../../../asset/png/default_profile.png";
import {
  checkPassword,
  getEmailCode,
  sendEmailCode,
  updateProfile,
} from "../../../api/MyPageApi";
import { TapePair } from "../../organisms/mypage/Tape.tsx";
import { useAuthStore } from "../../../stores/AuthStore";

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userInfo?: UserInfo | null;
  onUpdateUserInfo: (updatedInfo: UserInfo) => void;
};

export const ProfileModal = ({
  isOpen,
  onClose,
  userInfo,
  onUpdateUserInfo,
}: ProfileModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false); // 파일 업로더 용도
  const [imageURL, setImageURL] = useState<string | null>(null); // 미리보기 소스 (blob 또는 서버 URL)
  const [imgNonce, setImgNonce] = useState<number>(0); // 캐시 버스터
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailStep, setEmailStep] = useState<
    "idle" | "input" | "sent" | "completed"
  >("idle");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // ✅ 알림(확인) 모달 상태 (alert 대체)
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState<string>("");
  const [noticeMessage, setNoticeMessage] = useState<string>("");
  const [noticeOnConfirm, setNoticeOnConfirm] = useState<() => void>(
    () => () => {}
  );

  // 모달 열릴 때 현재 props로 초기화 + 캐시 버스터 갱신
  useEffect(() => {
    if (isOpen) {
      setIsVerified(false);
      setIsPasswordChanged(false);
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      setEmailCode("");
      setEmailStep(userInfo?.email ? "completed" : "idle");
      setNickname(userInfo?.nickname ?? "");
      setEmail(userInfo?.email ?? "");
      setImageURL(userInfo?.profileImage ?? null); // 서버 URL(또는 null)
      setProfileFile(null);
      setIsSaving(false);
      setImgNonce(Date.now()); // 🔥 모달 열 때마다 캐시 버스터 갱신
    }
  }, [isOpen, userInfo]);

  // 로컬 object URL 정리(우리가 만든 blob만 정리)
  useEffect(() => {
    return () => {
      if (imageURL?.startsWith("blob:")) URL.revokeObjectURL(imageURL);
    };
  }, [imageURL]);

  const handleVerifyPassword = async () => {
    const success = await checkPassword(currentPassword);
    if (success) {
      setIsVerified(true);
      setNoticeTitle("확인 완료");
      setNoticeMessage("현재 비밀번호가 확인되었습니다.");
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
    } else {
      setNoticeTitle("확인 실패");
      setNoticeMessage("현재 비밀번호가 일치하지 않습니다.");
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
    }
  };

  const handleVerifyEmailCode = async () => {
    const success = await sendEmailCode(email, emailCode);
    if (success) {
      setEmailStep("completed");
      setNoticeTitle("이메일 인증");
      setNoticeMessage("✅ 이메일 인증이 완료되었습니다.");
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
    } else {
      setNoticeTitle("이메일 인증");
      setNoticeMessage("❌ 인증번호가 올바르지 않습니다.");
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
    }
  };

  // 변경 여부 계산
  const willChangePwd = useMemo(
    () => isVerified && isPasswordChanged && newPassword.trim().length > 0,
    [isVerified, isPasswordChanged, newPassword]
  );
  const hasNicknameChange = useMemo(
    () => (nickname?.trim() ?? "") !== (userInfo?.nickname ?? ""),
    [nickname, userInfo?.nickname]
  );
  const hasProfileImageChange = !!profileFile;
  const hasChanges =
    hasNicknameChange || hasProfileImageChange || willChangePwd;

  // HTTP(S) 경로만 캐시 버스터 부착
  const previewSrc = useMemo(() => {
    if (!imageURL) return DefaultProfileImg;
    if (imageURL.startsWith("blob:")) return imageURL; // blob은 그대로
    if (/^https?:\/\//.test(imageURL)) {
      return `${imageURL}${imageURL.includes("?") ? "&" : "?"}t=${imgNonce}`;
    }
    return imageURL;
  }, [imageURL, imgNonce]);

  const changeProfile = async () => {
    if (!hasChanges) {
      setNoticeTitle("안내");
      setNoticeMessage("변경 사항이 없습니다.");
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
      return;
    }
    if (willChangePwd) {
      if (!currentPassword.trim()) {
        setNoticeTitle("입력 필요");
        setNoticeMessage("현재 비밀번호를 입력해주세요.");
        setNoticeOnConfirm(() => () => setNoticeOpen(false));
        setNoticeOpen(true);
        return;
      }
      if (newPassword !== confirmPassword) {
        setNoticeTitle("비밀번호 불일치");
        setNoticeMessage("새 비밀번호가 일치하지 않습니다.");
        setNoticeOnConfirm(() => () => setNoticeOpen(false));
        setNoticeOpen(true);
        return;
      }
    }

    setIsSaving(true);
    try {
      const success = await updateProfile(
        willChangePwd ? currentPassword : "",
        willChangePwd ? newPassword : "",
        nickname ?? "",
        profileFile
      );

      if (!success) {
        setNoticeTitle("실패");
        setNoticeMessage("❌ 프로필 수정에 실패했습니다. 다시 시도해주세요.");
        setNoticeOnConfirm(() => () => setNoticeOpen(false));
        setNoticeOpen(true);
        return;
      }

      setNoticeTitle("성공");
      setNoticeMessage("✅ 프로필 수정이 완료되었습니다.");
      setNoticeOnConfirm(() => async () => {
        setNoticeOpen(false);

        // 1) 서버 최신 유저 정보로 스토어 갱신
        const latest = await useAuthStore.getState().refreshUser();

        // 2) 부모에도 서버 값 전달 (blob 절대 전달 X)
        if (latest && userInfo) {
          onUpdateUserInfo({
            ...userInfo,
            userId: latest.userId,
            loginId: latest.loginId,
            nickname: latest.nickname,
            email: latest.email ?? null,
            birthday: latest.birthday ?? null,
            profileImage: latest.profileImage ?? undefined,
          });
        }

        // 3) 모달 내부 미리보기 또한 서버 URL로 교체 + 캐시 버스터 갱신
        if (latest?.profileImage) {
          setImageURL(latest.profileImage);
          setImgNonce(Date.now());
        }

        onClose();
      });
      setNoticeOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* 모달 패널 자체를 해적 분위기 배경으로 감싸기 */}
        <div className="pirate-modal rounded-2xl p-5 md:p-6">
          {/* 🪵 목재 헤더 + 밧줄 */}
          <div className="wood-header relative rounded-xl overflow-hidden">
            <div className="rope absolute left-0 right-0 top-0" />
            <div className="flex justify-center items-center gap-3 py-3">
              <span aria-hidden className="text-2xl">
                🏴‍☠️
              </span>
              <Text size="xl" color="white" weight="bold">
                프로필 편집
              </Text>
              <span aria-hidden className="text-xl opacity-90">
                ⚓
              </span>
            </div>
            <div className="rope absolute left-0 right-0 bottom-0" />
          </div>

          {/* 2열 그리드 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-start">
            {/* ========== Left Column ========== */}
            <div className="space-y-6">
              {/* 📸 프로필 사진 카드 (양피지 + 못) */}
              <div className="relative bg-parchment rounded-xl p-6 flex flex-col items-center shadow-md border border-amber-200/60">
                <span className="nail left-3 top-3" />
                <span className="nail right-3 top-3" />

                <div className="relative w-32 h-32">
                  <div className="w-full h-full rounded-full border-4 border-amber-300 bg-amber-50 overflow-hidden">
                    {previewSrc ? (
                      <img
                        src={previewSrc}
                        alt="프로필"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={DefaultProfileImg}
                        alt="프로필"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <label
                    htmlFor="profile-upload"
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#8b5e34] hover:bg-[#6d4728] flex items-center justify-center shadow-md cursor-pointer ring-2 ring-[#a47e4e]"
                  >
                    <Icon icon={UploadIcon} color="white" size="sm" />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileFile(file);
                        const newImageURL = URL.createObjectURL(file);
                        setImageURL(prev => {
                          if (prev?.startsWith("blob:"))
                            URL.revokeObjectURL(prev);
                          return newImageURL;
                        });
                        // blob 미리보기라 캐시버스터 필요 없음
                      }
                    }}
                  />
                </div>
                <Text size="xs" color="gray" className="mt-3">
                  클릭하여 프로필 이미지를 변경하세요
                </Text>
              </div>

              {/* 🏷️ 닉네임 카드 */}
              <div className="relative bg-parchment rounded-xl p-4 border border-amber-200/60 shadow-sm">
                <span className="nail left-3 top-3" />
                <span className="nail right-3 top-3" />
                <div className="flex items-center gap-2 mb-2">
                  <Text size="sm" weight="bold" className="pl-5">
                    닉네임
                  </Text>
                </div>
                <Input
                  placeholder="닉네임"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  className="bg-amber-50/60 border-amber-200/70"
                />
              </div>
            </div>

            {/* ========== Right Column ========== */}
            <div className="space-y-6">
              {/* ✉️ 이메일 인증 */}
              <div className="relative bg-parchment rounded-xl p-4 border border-amber-200/60">
                <TapePair
                  size="sm"
                  angleLeft={-45}
                  angleRight={45}
                  classNameLeft="top-2 -left-6"
                  classNameRight="top-2 -right-6"
                />
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon={MailIcon} color="orange" size="sm" />
                  <Text size="sm" weight="bold">
                    이메일 인증
                  </Text>
                </div>

                {emailStep === "idle" && (
                  <>
                    <Text size="xs" color="gray" className="mb-3">
                      이메일을 연동하여 계정을 보호하세요
                    </Text>
                    <Button
                      className="pirate-btn pirate-btn--gold w-full"
                      onClick={() => setEmailStep("input")}
                    >
                      이메일 연동 시작하기
                    </Button>
                  </>
                )}

                {emailStep === "input" && (
                  <>
                    <Input
                      type="email"
                      placeholder="연동할 이메일 주소를 입력하세요"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="mb-4 bg-amber-50/60 border-amber-200/70"
                    />
                    <div className="flex gap-2">
                      <Button
                        className="pirate-btn pirate-btn--teal w-full"
                        onClick={async () => {
                          const success = await getEmailCode(email);
                          if (success) {
                            setEmailStep("sent");
                            setNoticeTitle("인증 메일 발송");
                            setNoticeMessage(
                              "입력하신 주소로 인증 메일을 발송했습니다."
                            );
                            setNoticeOnConfirm(
                              () => () => setNoticeOpen(false)
                            );
                            setNoticeOpen(true);
                          } else {
                            setNoticeTitle("발송 실패");
                            setNoticeMessage(
                              "이메일 인증 코드 발송에 실패했습니다. 이메일을 다시 확인해주세요."
                            );
                            setNoticeOnConfirm(
                              () => () => setNoticeOpen(false)
                            );
                            setNoticeOpen(true);
                          }
                        }}
                      >
                        인증 메일 발송
                      </Button>
                      <Button
                        className="pirate-btn pirate-btn--rum w-full"
                        onClick={() => setEmailStep("idle")}
                      >
                        취소
                      </Button>
                    </div>
                  </>
                )}

                {emailStep === "sent" && (
                  <>
                    <div className="bg-purple-100 border border-purple-300 text-sm rounded-lg p-3 mb-3 space-y-1">
                      <p>
                        <strong>{email}</strong>로 인증번호를 발송했습니다.
                      </p>
                      <p className="text-xs text-gray-600">
                        이메일을 확인하고 6자리 인증번호를 입력해주세요.
                      </p>
                    </div>
                    <Text size="sm" weight="bold" className="mb-1">
                      인증번호 (6자리)
                    </Text>
                    <Input
                      placeholder="123456"
                      value={emailCode}
                      onChange={e => setEmailCode(e.target.value)}
                      maxLength={6}
                      className="bg-amber-50/60 border-amber-200/70"
                    />
                    <div className="flex gap-2 mt-3">
                      <Button
                        className="pirate-btn pirate-btn--emerald w-full"
                        onClick={handleVerifyEmailCode}
                      >
                        인증번호 확인
                      </Button>
                      <Button
                        className="pirate-btn pirate-btn--rum w-full"
                        onClick={() => setEmailStep("input")}
                      >
                        취소
                      </Button>
                    </div>
                  </>
                )}

                {emailStep === "completed" && (
                  <div className="bg-green-100 border border-green-400 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 text-white rounded-full p-3 shadow-md" />
                      <div>
                        <p className="font-bold text-[#333]">{email}</p>
                        <p className="text-sm text-green-700 mt-1">
                          인증 완료된 이메일
                        </p>
                      </div>
                    </div>
                    <Button className="pirate-btn pirate-btn--emerald">
                      연동완료
                    </Button>
                  </div>
                )}
              </div>

              {/* 🔐 비밀번호 변경 */}
              <div className="relative bg-parchment rounded-xl p-4 border border-amber-200/60">
                <span className="nail left-3 top-3" />
                <span className="nail right-3 top-3" />
                <Text size="sm" weight="bold" className="mb-3 pl-5">
                  비밀번호 변경
                </Text>
                <div className="flex-1 flex-col gap-4 space-y-3">
                  {!isVerified ? (
                    <>
                      <Input
                        type="password"
                        placeholder="현재 비밀번호"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className="bg-amber-50/60 border-amber-200/70"
                      />
                      <Button
                        className="pirate-btn pirate-btn--cannon w-full"
                        onClick={handleVerifyPassword}
                      >
                        현재 비밀번호 확인
                      </Button>
                    </>
                  ) : isPasswordChanged ? (
                    <Text
                      size="sm"
                      color="green"
                      weight="bold"
                      className="text-center"
                    >
                      비밀번호 변경 준비가 완료되었습니다.
                    </Text>
                  ) : (
                    <>
                      <Text size="xs" weight="normal">
                        새로운 비밀번호는 8~12자리로 입력해주세요
                      </Text>
                      <Input
                        type="password"
                        placeholder="새 비밀번호"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="bg-amber-50/60 border-amber-200/70"
                      />
                      <Input
                        type="password"
                        placeholder="새 비밀번호 확인"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="bg-amber-50/60 border-amber-200/70"
                      />
                      <Button
                        className="pirate-btn pirate-btn--crimson w-full"
                        onClick={() => {
                          if (newPassword !== confirmPassword) {
                            setNoticeTitle("비밀번호 불일치");
                            setNoticeMessage(
                              "새 비밀번호가 일치하지 않습니다."
                            );
                            setNoticeOnConfirm(
                              () => () => setNoticeOpen(false)
                            );
                            setNoticeOpen(true);
                            return;
                          }
                          setIsPasswordChanged(true);
                          setNoticeTitle("확인 완료");
                          setNoticeMessage("비밀번호가 일치합니다.");
                          setNoticeOnConfirm(() => () => setNoticeOpen(false));
                          setNoticeOpen(true);
                        }}
                      >
                        새비밀번호 확인
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 저장 영역 */}
            <div className="md:col-span-full">
              <Button
                className={`wax-button w-full flex justify-center items-center gap-2 px-6 py-3 text-lg font-extrabold tracking-wide ${
                  isSaving || !hasChanges ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={changeProfile}
                disabled={isSaving || !hasChanges}
              >
                <Text color="white" weight="bold">
                  {isSaving ? "저장 중..." : "프로필 저장하기"}
                </Text>
              </Button>
              {!hasChanges && (
                <Text size="xs" color="gray" className="mt-2 text-center">
                  변경된 내용이 없습니다.
                </Text>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* 파일 업로드 플로우 (이미지 분석 등) */}
      <FileUploadModalFlow
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <Modal
        isOpen={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        closeOnOverlayClick={false}
        panelClassName="w-full max-w-sm sm:max-w-md rounded-2xl"
      >
        <div className="p-4 sm:p-6">
          {noticeTitle && (
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {noticeTitle}
            </h3>
          )}
          <p className="text-sm sm:text-base text-gray-700 mb-6 whitespace-pre-line">
            {noticeMessage}
          </p>
          <div className="flex justify-center">
            <button
              onClick={noticeOnConfirm}
              className="rounded-lg bg-blue-500 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5"
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
