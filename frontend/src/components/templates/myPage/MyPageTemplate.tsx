import { useState, useCallback } from "react";
import { ProfileModal } from "../profileModal/ProfileModal.tsx";
import { useMyPageData } from "../../../hooks/UseMyPageData.ts";
import type { UserInfo } from "../../../api/userInfo.ts";
import { ProfileCard } from "../../organisms/mypage/ProfileCard.tsx";
import { CalendarStatsCard } from "../../organisms/mypage/CalendarStatsCard.tsx";

export const MyPageTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo, setUserInfo, statistics, days } = useMyPageData();

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleUpdateUserInfo = useCallback(
    (updated: UserInfo) => {
      // 모달 내 업데이트 이후 상위 상태 반영
      setUserInfo(updated);
    },
    [setUserInfo]
  );

  const CARD_W = "w-full max-w-[700px] md:w-[700px]";
  const CARD_H = "md:h-[520px]";

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="grid w-fit mx-auto grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${CARD_W} ${CARD_H}`}>
            <ProfileCard
              userInfo={userInfo}
              statistics={statistics}
              onOpenModal={openModal}
            />
          </div>

          <div className={`${CARD_W} ${CARD_H}`}>
            <CalendarStatsCard days={days} statistics={statistics} />
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userInfo={userInfo}
        onUpdateUserInfo={handleUpdateUserInfo}
      />
    </div>
  );
};
