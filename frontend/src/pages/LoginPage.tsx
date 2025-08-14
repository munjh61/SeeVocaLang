import { Login } from "../components/organisms/Login.tsx";
import BackgroundLayer from "../components/organisms/onboarding/BackgroundLayer.tsx";

export const LoginPage = () => {
  return (
    <BackgroundLayer>
      <Login />
    </BackgroundLayer>
  );
};
