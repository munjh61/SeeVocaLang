/**
 * ProfileCard
 * - 좌측 카드: 프로필 수정 버튼, 프로필 이미지, 유저 기본 정보 및 단어/폴더 통계 표시
 * - props:
 *   - userInfo: 유저 정보(폴백용)
 *   - statistics: 통계 응답
 *   - onOpenModal: 프로필 수정 모달 열기 콜백
 */

import WantedImg1 from "../../../asset/png/background/wanted_img1.png";
import DefaultProfileImg from "../../../asset/png/default_profile.png";
import { BgCard } from "../../molecules/BgCard";
import { StatsNote } from "../../molecules/StateNote";
import type { UserInfo } from "../../../api/userInfo";
import type { StatisticsResponse } from "../../../api/MyPageApi";
import { TapePair, TapeCorners } from "./Tape.tsx"; // ✅ TapePair + TapeCorners
import { useAuthStore } from "../../../stores/AuthStore"; // ✅ 스토어 구독

type Props = {
  userInfo: UserInfo | null;
  statistics: StatisticsResponse | null;
  onOpenModal: () => void;
};

export function ProfileCard({ userInfo, statistics, onOpenModal }: Props) {
  // ✅ store.user 우선, 없으면 props.userInfo 폴백
  const authUser = useAuthStore(s => s.user);
  const ui = authUser ?? userInfo ?? null;

  // ✅ 캐시 버스터(서버가 동일 URL을 반환해도 즉시 갱신되도록)
  const rawSrc = ui?.profileImage || DefaultProfileImg;
  const imgSrc =
    typeof rawSrc === "string" && /^https?:\/\//.test(rawSrc)
      ? `${rawSrc}${rawSrc.includes("?") ? "&" : "?"}t=${Date.now()}`
      : rawSrc;

  return (
    <BgCard
      src={WantedImg1}
      ratio={1}
      className="w-full"
      contentClassName="p-4 overflow-visible"
    >
      <div className="h-full w-full flex flex-col overflow-auto px-15 pb-5">
        {/* 프로필 수정 버튼 */}
        <div className="relative mb-4 flex justify-start pt-5">
          <button
            type="button"
            onClick={onOpenModal}
            className="relative select-none px-5 py-3 md:px-6 md:py-3.5
               rounded-md bg-amber-200/90 border border-amber-400/70
               text-amber-900 text-sm md:text-base font-extrabold tracking-wide
               shadow [box-shadow:0_3px_0_#b45309,0_10px_16px_rgba(0,0,0,.12)]
               -rotate-1 transition hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l8.06-8.06.92.92-8.06 8.06zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
              프로필 수정
            </span>

            <TapePair
              size="md"
              classNameLeft="-top-2 -left-4"
              classNameRight="-bottom-2 -right-4"
              angleLeft={-45}
              angleRight={-40}
            />
          </button>
        </div>

        {/* 프로필 이미지 */}
        <div className="relative mx-auto my-2 w-fit">
          <div className="relative -rotate-1 rounded-2xl border border-amber-200/70 bg-amber-50/70 p-3 shadow">
            <img
              src={imgSrc}
              alt="프로필 이미지"
              className="block w-50 h-50 rounded-full object-cover ring-1 ring-amber-200 shadow-sm"
              draggable={false}
            />

            {/* 종이 모서리 접힘 효과 */}
            <span
              aria-hidden
              className="absolute -top-1 -right-1 h-4 w-4 bg-white/60 rotate-45 shadow-sm"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />

            {/* ✅ 프레임 내부 코너 테이프 */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[60]"
            >
              <TapeCorners
                classNameTL="-top-1 -left-7"
                classNameTR="-top-1 -right-7"
                classNameBL="-bottom-1 -left-6"
                classNameBR="-bottom-1 -right-6"
                angleTL={-45}
                angleTR={40}
                angleBL={40}
                angleBR={-45}
              />
            </div>
          </div>
        </div>

        {/* 유저 정보 + 단어/폴더 통계 */}
        <ul className="mt-10 space-y-2 relative overflow-visible">
          <StatsNote
            items={[
              { label: "닉네임", value: ui?.nickname || "Pino" },
              { label: "생년월일", value: ui?.birthday || "1996-09-19" },
              { label: "이메일", value: ui?.email || "미연동" },
            ]}
          />
          <StatsNote
            items={[
              {
                label: "총 단어 갯수",
                value: statistics?.content.totalWordsCount ?? 0,
              },
            ]}
          />
          <StatsNote
            items={[
              {
                label: "총 폴더 갯수",
                value: statistics?.content.totalFoldersCount ?? 0,
              },
            ]}
          />
        </ul>
      </div>
    </BgCard>
  );
}
