import { Button } from "../../atoms/button/Button"
import { Icon } from "../../atoms/icon/Icon"
import { Text } from "../../atoms/text/Text"
import { CalendarCard } from "../../molecules/calendarCard/CalendarCard"
import { EduCard } from "../../molecules/eduCard/EduCard"
import { MyScoreCard } from "../../molecules/eduCard/MyScoreCard"
import { MyPageHeader } from "../../molecules/myPage/MyPageHeader"
import EditIcon from "../../../asset/edit-line.svg?react"
import ThunderIcon from "../../../asset/thunder.svg?react"
import BookIcon from "../../../asset/book.svg?react"
import CalendarIcon from "../../../asset/calendar.svg?react"
import TrophyIcon from "../../../asset/trophy.svg?react"
import ProfileIcon from "../../../asset/profile.svg?react"
import Calendar from "../../../asset/calicon.svg?react"
import { useEffect, useState } from "react"
import { ProfileModal } from "../profileModal/ProfileModal"
export const MyPageTemplate = ()=>{
   const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // 예시: 백엔드 API로부터 이미지 URL 받기
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => {
        setProfileImage(data.profileImageUrl); // 예: "https://example.com/images/user123.jpg"
      })
      .catch((err) => {
        console.error("프로필 이미지 로딩 실패:", err);
      });
  }, []);
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
             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
           <Icon icon={ProfileIcon} color="white" className="w-5 h-5" />
         </div>
            }
          />
          
        <div className="flex flex-col gap-10 p-4">  
          <div className="flex items-center gap-5">
            <Button
              bgColor={"gradientPurple"}
              rounded={"full"}
              className={"relative w-20 h-20"}
            >
          {profileImage ? (
        <img
          src={profileImage}
          alt="프로필 이미지"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="text-white text-sm">No Image</span>
      )}
        </Button>
    <div className="flex flex-col gap-1">
      <Text size="xl" weight="extrabold" color="black">줄리언 홀란드</Text>
      <Text size="sm" weight="normal" color="gray">생년월일: 1996.09.19</Text>
      <Text size="sm" weight="normal" color="gray">이메일: dojin8351@gmail.com</Text>
    </div>
  </div>
  
  <div className="flex justify-center">
    <Button bgColor={"profileButton"} textColor={"white"} size={"long"} onClick={openModal}>
      <div className="flex items-center whitespace-nowrap gap-2">
    <Icon icon={EditIcon} color={"white"} />
    <Text size={"base"} color="white" weight={"medium"}>프로필 편집</Text>
  </div>
    </Button>
  </div>
  <ProfileModal isOpen={isModalOpen} onClose={closeModal} />
</div>
</div>


   
        <div className="bg-white rounded-xl shadow">
          <MyPageHeader
            title="학습 캘린더"
            subtitle="2024년 12월"
            bgColor="from-green-400 to-green-600"
            rightElement={
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
           <Icon icon={Calendar} color="white" className="w-5 h-5" />
         </div>
            }
          />
          <div className="p-4">
            <CalendarCard/>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow">
          <MyPageHeader
            title="소셜 로그인 연동"
            subtitle="계정 연결 관리"
            bgColor="from-purple-500 to-indigo-500"
          />
          <div className="p-4">
              <Text size={"lg"} weight={"extrabold"}>소셜로그인 구현안되면 여기 어캄?</Text>

          </div>
        </div>

 
        <div className="bg-white rounded-xl shadow">
          <MyPageHeader
            title="학습 통계"
            subtitle="나의 학습 현황"
            bgColor="from-purple-500 to-pink-500"
            rightElement={
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
           <Icon icon={TrophyIcon} color="white" className="w-5 h-5" />
         </div>
            }
          />
          <div className="flex flex-col gap-4 p-4">
            <EduCard icon={<Icon icon={ThunderIcon} color={"white"}/>} mainTitle="7일" subTitle="연속 학습일수" bgColor={"red"}/>
            <EduCard icon={<Icon icon={BookIcon} color={"white"}/>} mainTitle="87일" subTitle="누적 학습일수" bgColor={"blue"}/>
            <EduCard icon={<Icon icon={CalendarIcon} color={"white"}/>} mainTitle="12일" subTitle="이번달 학습일수" bgColor={"green"}/>            
            <MyScoreCard wordCount="156" percent="89%" text1="학습한 단어" text2="정답률" bgColor={"white"}/>
          </div>
        </div>
      </div>
    </div>
    )
}

