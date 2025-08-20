import { useEffect, useRef } from "react";
import { Button } from "../../atoms/button/Button";
import { FriendModal } from "../../atoms/modal/friendmodal";

type FriendAddCompleteModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
};

export const FriendAddCompleteModal = ({ isOpen, onConfirm }: FriendAddCompleteModalProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  // 열리면 확인 버튼 포커스
  useEffect(() => {
    if (isOpen) btnRef.current?.focus();
  }, [isOpen]);

  return (
    <FriendModal
      isOpen={isOpen}
      onClose={onConfirm}              
      blurBackdrop={false}                
      zIndex={200}
      containerClassName="
        w-[min(92vw,420px)] rounded-2xl bg-white
        shadow-2xl ring-1 ring-black/10
      "
    >
      <div className="p-6 flex flex-col items-center text-center gap-3">
        <div className="text-4xl text-green-500" aria-hidden>
          ✅
        </div>
        <h2 className="text-lg font-bold break-keep">친구 추가 완료</h2>
        <p className="text-sm text-gray-600 break-keep">
          친구 추가가 성공적으로 완료되었습니다.
        </p>

        <Button
          onClick={onConfirm}
          className="mt-2 px-6 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 active:scale-[0.99] transition"
        >
          확인
        </Button>
      </div>
    </FriendModal>
  );
};
