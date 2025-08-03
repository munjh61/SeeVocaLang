// router/Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import TestPageMoon from "../pages/TestPageMoon.tsx";
import TestPageKwon from "../pages/TestPageKwon.tsx";
import TestPageDoh from "../pages/TestPageDoh.tsx";
import BookPage from "../pages/BookPage.tsx";
import GamePage from "../pages/GamePage.tsx";
import FriendPage from "../pages/FriendPage.tsx";
import MyPage from "../pages/MyPage.tsx";
import { SignupFlow } from "../components/organisms/signUp/SignupFlow.tsx";
import VocaDetailPage from "../pages/VocaDetailPage.tsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/moon" element={<TestPageMoon />} />
        <Route path="/kwon" element={<TestPageKwon />} />
        <Route path="/doh" element={<TestPageDoh />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/book/:bookId" element={<VocaDetailPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/friend" element={<FriendPage />} />
        <Route path="/signup" element={<SignupFlow />} />
      </Routes>
    </BrowserRouter>
  );
};
