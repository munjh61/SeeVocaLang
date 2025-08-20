import * as React from "react";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm text-gray-600 cursor-pointer ${className ?? ""}`}
    >
      {children}
    </label>
  );
};
