import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import TestPageMoon from "../pages/TestPageMoon.tsx";
import TestPageKwon from "../pages/TestPageKwon.tsx";
import TestPageDoh from "../pages/TestPageDoh.tsx";
import GamePage from "../pages/GamePage.tsx";
import FriendPage from "../pages/FriendPage.tsx";
import MyPage from "../pages/MyPage.tsx";
import { SignupFlow } from "../components/organisms/signUp/SignupFlow.tsx";
import VocaDetailPage from "../pages/VocaDetailPage.tsx";
import { LoginPage } from "../pages/LoginPage.tsx";
import QuizPage from "../pages/QuizPage.tsx";
import QuizDonePage from "../pages/QuizDonePage.tsx";
import { PrivateRoute } from "../components/common/PrivateRoute.tsx";
import { OnBoardingPage } from "../pages/OnBoardingPage.tsx";
import FolderPage from "../pages/FolderPage.tsx";
import OAuthSuccess from "./OAuthSuccess.tsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인/회원가입은 공개 라우트 */}
        <Route path={"/"} element={<OnBoardingPage />} />
        <Route path="/signup" element={<SignupFlow />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth2/success" element={<OAuthSuccess />} />

        {/*  프라이빗 라우트 그룹 */}
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
      </Routes>
    </BrowserRouter>
  );
};
