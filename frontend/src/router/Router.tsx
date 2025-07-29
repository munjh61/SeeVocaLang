// router/Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "../components/atoms/Button.tsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mainpage" element={<Button children={"버튼"} />} />
      </Routes>
    </BrowserRouter>
  );
};
