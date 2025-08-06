
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
