import { Button } from "../components/atoms/button/Button";
import { CalendarCard } from "../components/molecules/calendarCard/CalendarCard";
import { MyPageHeader } from "../components/molecules/myPage/MyPageHeader";

function MyPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 프로필 */}
        <div className="bg-white rounded-xl shadow">
          <MyPageHeader
            title="프로필"
            subtitle="내 정보 관리"
            bgColor="from-purple-500 to-blue-500"
            rightElement={
              <Button bgColor={"blue"} textColor={"white"} size={"md"}>수정</Button>
            }
          />
          {/* 프로필 콘텐츠 (예: 사용자 정보 등) */}
          <div className="p-4">{
          /* 내용 들어갈 자리 */}
          </div>
        </div>

        {/* 학습 캘린더 */}
        <div className="bg-white rounded-xl shadow">
          <MyPageHeader
            title="학습 캘린더"
            subtitle="2024년 12월"
            bgColor="from-green-400 to-green-600"
          />
          <div className="p-4">
            <CalendarCard/>
          </div>
        </div>

        {/* 소셜 로그인 연동 */}
        <div className="bg-white rounded-xl shadow">
          <MyPageHeader
            title="소셜 로그인 연동"
            subtitle="계정 연결 관리"
            bgColor="from-purple-500 to-indigo-500"
          />
          <div className="p-4">{/* 로그인 연동 정보 */}</div>
        </div>

        {/* 학습 통계 */}
        <div className="bg-white rounded-xl shadow">
          <MyPageHeader
            title="학습 통계"
            subtitle="나의 학습 현황"
            bgColor="from-purple-500 to-pink-500"
            rightElement={
              <button className="text-white hover:opacity-80 transition">
                <i className="fa-regular fa-clock" />
              </button>
            }
          />
          <div className="p-4">{/* 통계 정보 */}</div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
