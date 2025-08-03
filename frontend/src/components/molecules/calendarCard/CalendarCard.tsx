import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 적용

type CalendarCardProps = {
  className?: string;
};

export const CalendarCard = ({ className = "" }: CalendarCardProps) => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className={`p-4 rounded-xl shadow-md bg-white ${className}`}>
      <Calendar
        onChange={(value) => setDate(value as Date)}
        value={date}
        locale="ko-KR" // 한글화
      />

    </div>
  );
};
