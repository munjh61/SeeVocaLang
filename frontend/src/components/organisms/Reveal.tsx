import React from "react";
import { useReveal } from "../../hooks/UseReveal.ts";

type Props = {
  from?: "left" | "right";
  children: React.ReactNode;
  className?: string;
};

export default function Reveal({ from = "right", children, className }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const hiddenShift = from === "left" ? "-translate-x-10" : "translate-x-10";

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-x-0" : `opacity-0 ${hiddenShift}`,
        className || "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
