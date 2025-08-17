import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import MainPage from "../pages/MainPage.tsx";
import { OnBoardingPage } from "../pages/OnBoardingPage.tsx";
import { LoginPage } from "../pages/LoginPage.tsx";
import { SignupFlow } from "../components/organisms/signUp/SignupFlow.tsx";
import OAuthSuccess from "./OAuthSuccess.tsx";
import { PrivateRoute } from "../components/common/PrivateRoute.tsx";
import TestPageMoon from "../pages/TestPageMoon.tsx";
import TestPageKwon from "../pages/TestPageKwon.tsx";
import TestPageDoh from "../pages/TestPageDoh.tsx";
import GamePage from "../pages/GamePage.tsx";
import FriendPage from "../pages/FriendPage.tsx";
import MyPage from "../pages/MyPage.tsx";
import FolderPage from "../pages/FolderPage.tsx";
import VocaDetailPage from "../pages/VocaDetailPage.tsx";
import QuizPage from "../pages/QuizPage.tsx";
import QuizDonePage from "../pages/QuizDonePage.tsx";

function RootRedirect() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  return isLoggedIn ? <Navigate to="/main" replace /> : <OnBoardingPage />;
}

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 루트(/) → 로그인 상태 따라 분기 */}
        <Route path="/" element={<RootRedirect />} />

        {/* 온보딩 페이지는 별도 경로에서도 접근 가능하게 */}
        <Route path="/onboarding" element={<OnBoardingPage />} />

        {/* 로그인/회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupFlow />} />
        <Route path="/oauth2/success" element={<OAuthSuccess />} />

        {/* 프라이빗 라우트 */}
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/moon" element={<TestPageMoon />} />
          <Route path="/kwon" element={<TestPageKwon />} />
          <Route path="/doh" element={<TestPageDoh />} />
          <Route path="/folder" element={<FolderPage />} />
          <Route path="/folder/:folderId" element={<VocaDetailPage />} />
          <Route path="/quiz/:folderId" element={<QuizPage />} />
          <Route path="/done" element={<QuizDonePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/friend" element={<FriendPage />} />
        </Route>

        {/* 잘못된 경로 → 루트로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
