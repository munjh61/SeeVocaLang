import book from "../asset/nav_book.svg?react";
import { IconButton } from "../components/layout/book/IconButton";

function TestPageMoon() {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <IconButton
      ButtonVariant={{
        bgColor: "blue",
        children: "",
        size: "md",
        textColor: "white",
      }}
      IconVariant={{ icon: book, color: "white" }}
    >
      학습하기
    </IconButton>
  );
}
export default TestPageMoon;
