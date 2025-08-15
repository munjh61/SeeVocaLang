import React from "react";

type Props = {
  src: string;
  children?: React.ReactNode;
};

export default function BackgroundLayer({ children, src }: Props) {
  return (
    <div className="flex flex-col h-screen w-full overflow-x-hidden">
      <img
        src={src}
        alt=""
        aria-hidden
        className="fixed inset-0 -z-20 h-full w-full"
        draggable={false}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/30 to-white/70 pointer-events-none" />
      {children}
    </div>
  );
}
