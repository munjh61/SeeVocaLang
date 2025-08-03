import { Navigation } from "../components/organisms/nav/Navigation";

function MyPage() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto">
          <h1>마이페이지 하이</h1>
        </div>
        <Navigation loc="mypage" />
      </div>
    </>
  );
}

export default MyPage;
