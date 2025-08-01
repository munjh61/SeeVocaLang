import { IconButton } from "../components/molecules/iconButton/IconButton";
import thunder from "../asset/thunder.svg?react";
import { Navigation } from "../components/organisms/nav/Navigation";

function MainPage() {
  return (
    <>
      <h1>Home</h1>
      <IconButton
        IconVariant={{ icon: thunder }}
        path="kwon"
        ButtonVariant={{ bgColor: "gradientPurple" }}
      >
        Kwon
      </IconButton>
      <IconButton
        IconVariant={{ icon: thunder }}
        path="doh"
        ButtonVariant={{ bgColor: "gradientPurple" }}
      >
        Doh
      </IconButton>
      <IconButton
        IconVariant={{ icon: thunder }}
        path="moon"
        ButtonVariant={{ bgColor: "gradientPurple" }}
      >
        Moon
      </IconButton>
      <Navigation loc="home" />
    </>
  );
}
export default MainPage;
