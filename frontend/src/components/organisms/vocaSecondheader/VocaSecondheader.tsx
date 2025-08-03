import { useState } from "react";
import { IconButton } from "../../molecules/iconButton/IconButton";
import favorite from "../../../asset/star-fill.svg?react";
import book from "../../../asset/book_add.svg?react";
import all from "../../../asset/all.svg?react";
import list from "../../../asset/list.svg?react";

export const BookSecondHeader = () => {
  const [toggle, setToggle] = useState(true);
  const bookListToggle = () => {
    setToggle(prev => !prev);
    console.log("보는 방식 변경");
  };
  const addBook = () => {
    console.log("단어장 추가 모달창");
  };
  return (
    <div className="flex align-center justify-between">
      <div>
        <IconButton
          IconVariant={{ icon: favorite, color: "white", size: "sm" }}
          ButtonVariant={{ bgColor: "yellow", textColor: "white", size: "sm" }}
          className="min-w-25 h-8"
        >
          즐겨찾기
        </IconButton>
      </div>
      <div className="flex">
        <IconButton
          IconVariant={{
            icon: toggle ? all : list,
            size: "sm",
            color: "white",
          }}
          ButtonVariant={{
            bgColor: toggle ? "green" : "orange",
            textColor: "white",
            size: "sm",
          }}
          data={toggle ? "all" : "list"}
          buttonValue={bookListToggle}
          className="min-w-25 h-8"
        >
          {toggle ? "단어장" : "ALL"}
        </IconButton>
        <IconButton
          IconVariant={{ icon: book, size: "sm", color: "white" }}
          ButtonVariant={{
            bgColor: "blue",
            textColor: "white",
            size: "sm",
          }}
          buttonValue={addBook}
          className="min-w-25 h-8"
        >
          단어장 추가하기
        </IconButton>
      </div>
    </div>
  );
};
