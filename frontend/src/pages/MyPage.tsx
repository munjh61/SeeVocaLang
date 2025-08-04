import { Button } from "../components/atoms/button/Button";
import { Icon } from "../components/atoms/icon/Icon";
import { CalendarCard } from "../components/molecules/calendarCard/CalendarCard";
import { MyPageHeader } from "../components/molecules/myPage/MyPageHeader";
import TrophyIcon from "../asset/trophy.svg?react"
import CameraIcon from "../asset/camera.svg?react"
import { EduCard } from "../components/molecules/eduCard/EduCard";
import ThunderIcon from "../asset/thunder.svg?react"
import BookIcon from "../asset/book.svg?react"
import CalendarIcon from "../asset/calendar.svg?react"
import { MyScoreCard } from "../components/molecules/eduCard/MyScoreCard";
import { Text } from "../components/atoms/text/Text";
import UploadIcon from "../asset/image_upload.svg?react"
import { Navigation } from "../components/organisms/nav/Navigation";
import { MyPageTemplate } from "../components/templates/myPage/MyPageTemplate";

function MyPage() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto">
          <MyPageTemplate />
        </div>
        <Navigation loc="mypage" />
      </div>
    </>
  );
}

export default MyPage;
