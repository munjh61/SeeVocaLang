import { Modal } from "../../atoms/modal/modal";
import { Input } from "../../atoms/input/Input";
import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import UploadIcon from "../../../asset/image_upload.svg?react";
import MailIcon from "../../../asset/mail.svg?react";
import { useState, useEffect } from "react";
import { FileUploadModalFlow } from "../../organisms/fileUpload/FileUploadModalFlow";

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  // 메모리 누수 방지용 clean-up
  useEffect(() => {
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* 타이틀 */}
        <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-t-xl px-6 py-4 text-center">
          <div className="flex justify-center items-center gap-2">
            <Text size="xl" weight="bold"> 프로필 편집</Text>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* 프로필 이미지 변경 */}
          <div className="bg-purple-50 rounded-xl p-6 flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full border-2 border-purple-300 bg-gray-100 overflow-hidden flex items-center justify-center">
              {imageURL ? (
                <img src={imageURL} alt="프로필 미리보기" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">이미지</span>
              )}

              {/* 업로드 버튼 */}
              <label
                htmlFor="profile-upload"
                className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center shadow-md cursor-pointer"
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
            <Text size="sm" color="gray" className="mt-2">
              📸 클릭하여 프로필 이미지를 변경하세요
            </Text>
          </div>

          {/* 닉네임 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Text size="sm" weight="bold">닉네임</Text>
            </div>
            <Input placeholder="김철수" />
          </div>

          {/* 이메일 연동 상태 */}
          <div className="bg-orange-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Icon icon={MailIcon} className="w-4 h-4 text-orange-500" />
                <Text size="sm" weight="bold">이메일 연동</Text>
              </div>
              <span className="text-xs bg-orange-300 text-white px-2 py-0.5 rounded-full">🔒 미연동</span>
            </div>
            <Text size="xs" color="gray" className="mb-2">이메일을 연동하여 계정을 보호하세요</Text>
            <Button bgColor="orange" size="md" className="w-full">📩 이메일 연동 시작하기</Button>
          </div>

          {/* 이메일 인증 */}
          <div className="bg-purple-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon={MailIcon} className="w-4 h-4 text-purple-500" />
              <Text size="sm" weight="bold">이메일 인증</Text>
            </div>
            <Input placeholder="연동할 이메일 주소를 입력하세요" className="mb-2" />
            <div className="flex gap-2">
              <Button bgColor="purple" size="sm" className="flex-1">📨 인증 메일 발송</Button>
              <Button bgColor="purple" size="sm" className="flex-1">❌ 취소</Button>
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-8">
          <Button color="pp" size="md" className="w-full flex justify-center items-center gap-2">
            <Text color="black" weight="bold">🎉 프로필 저장하기</Text>
          </Button>
        </div>
      </Modal>

      <FileUploadModalFlow
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
