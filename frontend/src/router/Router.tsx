// router/Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import TestPageMoon from "../pages/TestPageMoon.tsx";
import TestPageKwon from "../pages/TestPageKwon.tsx";
import TestPageDoh from "../pages/TestPageDoh.tsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/moon" element={<TestPageMoon />} />
        <Route path="/kwon" element={<TestPageKwon />} />
        <Route path="/doh" element={<TestPageDoh />} />
      </Routes>
    </BrowserRouter>
  );
};
