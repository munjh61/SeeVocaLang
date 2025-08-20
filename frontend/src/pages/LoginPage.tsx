import { Login } from "../components/organisms/Login.tsx";
import BackgroundLayer from "../components/organisms/onboarding/BackgroundLayer.tsx";
import BackgroundImg from "../asset/png/background/summer_background_20_without_text.jpg";

export const LoginPage = () => {
  return (
    <BackgroundLayer src={BackgroundImg}>
      <Login />
    </BackgroundLayer>
  );
};
