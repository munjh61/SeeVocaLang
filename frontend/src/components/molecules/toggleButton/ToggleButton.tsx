import { useState, type ReactNode } from "react";
import { Button } from "../../atoms/button/Button";
import xMark from "../../../asset/png/xMark.png";
import bg from "../../../asset/png/background/wood_background.jpg";

type ToggleButton = {
  selected: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export const ToggleButton = ({ selected, children, onClick }: ToggleButton) => {
  const [isSelected, setIsSelected] = useState(selected);
  const handleOnClick = () => {
    onClick?.();
    setIsSelected(prev => !prev);
  };
  return (
    <div
      className="inline-flex bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Button
        textColor={"white"}
        font={"hakgyo"}
        className={"flex-wrap p-2 relative z-0"}
        onClick={() => {
          if (!isSelected) handleOnClick();
        }}
      >
        {isSelected && (
          <img src={xMark} className="absolute z-10" onClick={handleOnClick} />
        )}
        <span className="whitespace-nowrap">{children}</span>
      </Button>
    </div>
  );
};
