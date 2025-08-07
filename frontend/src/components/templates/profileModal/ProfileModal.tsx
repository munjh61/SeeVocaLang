import { Modal } from "../../atoms/modal/modal";
import { Input } from "../../atoms/input/Input";
import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import UploadIcon from "../../../asset/image_upload.svg?react";
import MailIcon from "../../../asset/mail.svg?react";
import { useState, useEffect } from "react";
import { FileUploadModalFlow } from "../../organisms/fileUpload/FileUploadModalFlow";

const LOGIN_USER_PASSWORD = "test1234";

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailStep, setEmailStep] = useState<"idle" | "input" | "sent" | "completed">("idle");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const TEST_CODE = "123456";

  useEffect(() => {
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  const handleVerifyPassword = () => {
    if (currentPassword === LOGIN_USER_PASSWORD) {
      setIsVerified(true);
    } else {
      alert("현재 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleVerifyEmailCode = () => {
    if (emailCode === TEST_CODE) {
      alert("이메일 인증이 완료되었습니다.");
      setEmailStep("completed");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-t-xl px-6 py-4 text-center">
          <div className="flex justify-center items-center gap-2">
            <Text size="xl" color="white" weight="bold">
              프로필 편집
            </Text>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div className="bg-purple-50 rounded-xl p-6 flex flex-col items-center">
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full border-4 border-purple-300 bg-gray-100 overflow-hidden">
                {imageURL ? (
                  <img src={imageURL} alt="프로필" className="w-full h-full object-cover" />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                    이미지
                  </span>
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center shadow-md cursor-pointer"
              >
                <Icon icon={UploadIcon} color="white" size="sm" />
              </label>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const newImageURL = URL.createObjectURL(file);
                    setImageURL(newImageURL);
                  }
                }}
              />
            </div>
            <Text size="sm" color="gray" className="mt-3">
              📸 클릭하여 프로필 이미지를 변경하세요
            </Text>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Text size="sm" weight="bold">닉네임</Text>
            </div>
            <Input placeholder="김철수" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>

          <div className="bg-orange-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon={MailIcon} className="w-4 h-4 text-orange-500" />
              <Text size="sm" weight="bold">✨ 이메일 인증</Text>
            </div>

            {emailStep === "idle" && (
              <>
                <Text size="xs" color="gray" className="mb-2">이메일을 연동하여 계정을 보호하세요</Text>
                <Button bgColor="orange" size="md" className="w-full" onClick={() => setEmailStep("input")}>📩 이메일 연동 시작하기</Button>
              </>
            )}

            {emailStep === "input" && (
              <>
                <Input type="email" placeholder="✉️ 연동할 이메일 주소를 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
                <div className="flex gap-2">
                  <Button bgColor="gradientPurple" className="w-full" onClick={() => setEmailStep("sent")}>✨ 인증 메일 발송</Button>
                  <Button bgColor="orange" className="w-full" onClick={() => setEmailStep("idle")}>❌ 취소</Button>
                </div>
              </>
            )}

            {emailStep === "sent" && (
              <>
                <div className="bg-purple-100 border border-purple-300 text-sm rounded-lg p-3 mb-3 space-y-1">
                  <p>📧 <strong>{email}</strong>로 인증번호를 발송했습니다.</p>
                  <p className="text-xs text-gray-600">✉️ 이메일을 확인하고 6자리 인증번호를 입력해주세요.</p>
                </div>
                <Text size="sm" weight="bold" className="mb-1">🔢 인증번호 (6자리)</Text>
                <Input placeholder="123456" value={emailCode} onChange={(e) => setEmailCode(e.target.value)} maxLength={6} />
                <Text size="xs" color="gray" className="mt-1"> 인증이 완료되었습니다.</Text>
                <div className="flex gap-2 mt-3">
                  <Button bgColor="green" className="w-full" onClick={handleVerifyEmailCode}>✅ 인증번호 확인</Button>
                  <Button bgColor="orange" className="w-full" onClick={() => setEmailStep("input")}>✖️ 취소</Button>
                </div>
              </>
            )}

            {emailStep === "completed" && (
              <div className="bg-green-100 border border-green-400 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white rounded-full p-3 shadow-md">✉️</div>
                  <div>
                    <p className="font-bold text-[#333]">{email}</p>
                    <p className="text-sm text-green-700 mt-1">☑ 인증 완료된 이메일</p>
                  </div>
                </div>
                <Button  size={"md"} bgColor="green"><Text className="font-medium">🎉 연동완료</Text></Button>
              </div>
            )}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <Text size="sm" weight="bold" className="mb-3">🔐 비밀번호 변경</Text>
            <div className="space-y-3">
              {!isVerified ? (
                <>
                  <Input type="password" placeholder="현재 비밀번호" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                  <Button bgColor="gray" size="sm" className="w-full" onClick={handleVerifyPassword}>✅ 현재 비밀번호 확인</Button>
                </>
              ) : isPasswordChanged ? (
                <Text size="sm" color="green" weight="bold" className="text-center">🔒 비밀번호 변경 완료하였습니다.</Text>
              ) : (
                <>
                  <Input type="password" placeholder="새 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <Input type="password" placeholder="새 비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <Button bgColor="purple" size="sm" className="w-full" onClick={() => {
                    if (newPassword !== confirmPassword) {
                      alert("새 비밀번호가 일치하지 않습니다.");
                      return;
                    }
                    alert("비밀번호가 일치하였습니다.");
                    setIsPasswordChanged(true);
                  }}>🔒 새비밀번호 확인</Button>
                </>
              )}
            </div>
          </div>

          <div className="mt-8">
            <Button bgColor="gradientPurple" size="md" className="w-full flex justify-center items-center gap-2" onClick={() => {
              console.log({ nickname, email, emailCode, newPassword: isPasswordChanged ? newPassword : undefined, imageURL });
            }}>
              <Text color="black" weight="bold">프로필 저장하기</Text>
            </Button>
          </div>
        </div>
      </Modal>

      <FileUploadModalFlow isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
