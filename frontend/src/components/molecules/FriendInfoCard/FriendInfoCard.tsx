import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { AddFriendButton } from "../friendButtons/AddFriendButton";
import { DeleteFriendButton } from "../friendButtons/DeleteFriendButton";
import { RequestFriendButton } from "../friendButtons/RequestFriendButton";
import { acceptFriend, deleteFriend } from "../../../api/FriendPageApi";
import { VocaButton } from "../friendButtons/VocaButton";
import { pirateBtn } from "../../../style/friendpage";
import { Text } from "../../atoms/text/Text";
import { FriendResultModal } from "../friendModal/FriendResultModal";

export type FriendStatus = "NONE" | "REQUEST" | "PENDING" | "APPROVED";

type FriendInfoProps = {
  id: number;
  profileUrl?: string;
  name: string;
  status: FriendStatus;
  onAddFriend?: (id: number) => void;
  onDeleteFriend?: (id: number) => void;
  onAcceptFriend?: (id: number) => void;
};

export const FriendInfoCard = ({
  id,
  profileUrl,
  name,
  status,
  onAddFriend,
  onDeleteFriend,
  onAcceptFriend,
}: FriendInfoProps) => {
  const [mutating, setMutating] = useState<null | "accept" | "refuse">(null);

  // ✅ 결과 모달 상태
  const [result, setResult] = useState<{ open: boolean; title: string; message?: string }>({
    open: false,
    title: "",
    message: "",
  });
  const [afterClose, setAfterClose] = useState<null | (() => void)>(null);

  const showResult = (title: string, message?: string, next?: () => void) => {
    if (next) setAfterClose(() => next);
    setResult({ open: true, title, message });
  };
  const closeResult = () => {
    setResult((r) => ({ ...r, open: false }));
    // 부모 갱신은 모달이 닫힌 뒤 실행
    if (afterClose) {
      afterClose();
      setAfterClose(null);
    }
  };

  const handleAccept = async () => {
    try {
      setMutating("accept");
      const success = await acceptFriend(id);
      if (success) {
        // ✅ 먼저 모달을 띄우고, 부모 갱신은 모달 닫을 때 실행
        showResult("친구 수락 완료", `${name}님을 친구로 추가했어요.`, () => {
          onAcceptFriend?.(id);
        });
      } else {
        showResult("수락 실패", "친구 수락에 실패했어요.");
      }
    } catch {
      showResult("수락 실패", "친구 수락에 실패했어요.");
    } finally {
      setMutating(null);
    }
  };

  const handleRefuse = async () => {
    try {
      setMutating("refuse");
      const success = await deleteFriend(id);
      if (success) {
        showResult("친구 요청 거절", `${name}님의 요청을 거절했어요.`, () => {
          onDeleteFriend?.(id);
        });
      } else {
        showResult("거절 실패", "친구 요청 거절에 실패했습니다.");
      }
    } catch {
      showResult("거절 실패", "친구 요청 거절에 실패했습니다.");
    } finally {
      setMutating(null);
    }
  };

  const renderButton = () => {
    switch (status) {
      case "NONE":
        return (
          <AddFriendButton
            data={id}
            className="whitespace-nowrap break-keep shrink-0"
            onRequestComplete={() => onAddFriend?.(id)}
          />
        );

      case "APPROVED":
        return (
          <div className="flex flex-col gap-2 w-full">
            <VocaButton data={id} className="whitespace-nowrap break-keep shrink-0" />
            <DeleteFriendButton
              data={id}
              className="whitespace-nowrap break-keep shrink-0"
              friendName={name}
              onRequestComplete={() => onDeleteFriend?.(id)}
            />
          </div>
        );

      case "REQUEST":
        return <RequestFriendButton className="whitespace-nowrap break-keep shrink-0" />;

      case "PENDING":
        return (
          <div className="flex gap-2">
            {mutating !== "refuse" && (
              <Button
                bgColor="green"
                size="md"
                textColor="black"
                className={`${pirateBtn} min-w-[96px] h-10 px-4 rounded-full flex items-center justify-center flex-none`}
                onClick={handleAccept}
                disabled={!!mutating}
                aria-busy={mutating === "accept"}
              >
                <Text className="whitespace-nowrap leading-none font-semibold">
                  {mutating === "accept" ? "수락 중..." : "수락"}
                </Text>
              </Button>
            )}

            {mutating !== "accept" && (
              <Button
                bgColor="red"
                size="md"
                textColor="black"
                className={`${pirateBtn} min-w-[96px] h-10 px-4 rounded-full flex items-center justify-center flex-none`}
                onClick={handleRefuse}
                disabled={!!mutating}
                aria-busy={mutating === "refuse"}
              >
                <Text className="whitespace-nowrap leading-none font-semibold">
                  {mutating === "refuse" ? "거절 중..." : "거절"}
                </Text>
              </Button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="
          group mx-auto w-full max-w-4xl
          flex items-center justify-between gap-4
          rounded-2xl border-2 border-[#2b1e12]
          bg-[#fff8e6]/85 backdrop-blur-sm
          px-4 py-3
          shadow-[0_6px_0_#2b1e12] ring-1 ring-black/10
          transition hover:shadow-[0_8px_0_#2b1e12]
          overflow-hidden
        "
      >
        {/* 왼쪽: 아바타 + 이름 */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div
            className="
              w-11 h-11 rounded-full overflow-hidden shrink-0
              ring-2 ring-[#2b1e12] bg-[#fffaf0]
            "
          >
            {profileUrl ? (
              <img src={profileUrl} alt={`${name}의 프로필`} className="w-full h-full object-cover" />
            ) : null}
          </div>

          <div className="min-w-0">
            <span
              className="
                block text-base font-semibold text-[#2b1e12]
                whitespace-nowrap overflow-hidden text-ellipsis
                drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]
              "
              title={name}
            >
              {name}
            </span>
          </div>
        </div>

        {/* 오른쪽: 버튼들 */}
        <div className="ml-4 flex items-center gap-2 flex-none">{renderButton()}</div>
      </div>

      {/* ✅ 결과 모달 */}
      <FriendResultModal
        isOpen={result.open}
        title={result.title}
        message={result.message}
        onClose={closeResult}
      />
    </>
  );
};
