// FriendResultModal.tsx
import { FriendModal } from "../../atoms/modal/friendmodal"
import { Button } from "../../atoms/button/Button"

type Props = {
  /** 선호: isOpen */
  isOpen?: boolean;
  /** 호환: open */
  open?: boolean;
  title: string;
  message?: string;
  onClose: () => void;
};

export const FriendResultModal = ({ isOpen, open, title, message, onClose }: Props) => {
  const visible = typeof isOpen === "boolean" ? isOpen : !!open;
  return (
    <FriendModal
      isOpen={visible}
      onClose={onClose}
      containerClassName="w-[min(92vw,420px)] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
      zIndex={500}
    >
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        {message && <p className="text-sm text-black/70">{message}</p>}
        <div className="mt-6 flex justify-end">
          <Button bgColor="black" textColor="white" size="sm" className="px-4 rounded-xl" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </FriendModal>
  );
};
