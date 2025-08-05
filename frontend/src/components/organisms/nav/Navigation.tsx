import home from "../../../asset/nav_home.svg?react";
import game from "../../../asset/nav_game.svg?react";
import book from "../../../asset/nav_book.svg?react";
import friend from "../../../asset/nav_friend.svg?react";
import setting from "../../../asset/nav_setting.svg?react";
import { useState } from "react";
import { Nav } from "../../molecules/nav/Nav";

type NavProps = {
  loc: string;
};

const navItems = [
  { icon: home, label: "홈", value: "home", path: "/" },
  { icon: game, label: "게임", value: "game", path: "/game" },
  { icon: book, label: "단어장", value: "book", path: "/book" },
  { icon: friend, label: "친구", value: "friend", path: "/friend" },
  { icon: setting, label: "마이페이지", value: "mypage", path: "/mypage" },
];

export const Navigation = ({ loc }: NavProps) => {
  const [select, setSelect] = useState(loc);

  return (
    <div className="flex justify-around bg-white">
      {navItems.map(({ icon, label, value, path }) => (
        <Nav
          key={value}
          icon={icon}
          onoff={select === value}
          onClick={() => setSelect(value)}
          path={path}
        >
          {label}
        </Nav>
      ))}
    </div>
  );
};
