/**
 * MyPageTemplate (상위 템플릿)
 * - 상태는 최소화하고, 훅(useMyPageData)으로 데이터 로드
 * - 좌측(ProfileCard), 우측(CalendarStatsCard), 그리고 ProfileModal을 관리
 */

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

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileCard
          userInfo={userInfo}
          statistics={statistics}
          onOpenModal={openModal}
        />
        <CalendarStatsCard days={days} statistics={statistics} />
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
