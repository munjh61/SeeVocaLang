import type { ReactNode } from "react";



type PageHeaderProps = {
  title: string;
  subtitle?: string;
  rightSection?: ReactNode; // 버튼이나 검색창 등
};

export const PageHeader = ({ title, subtitle, rightSection }: PageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {rightSection && <div>{rightSection}</div>}
    </div>
  );
};
