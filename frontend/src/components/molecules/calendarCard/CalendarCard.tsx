import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../style/calendar.css";

interface CalendarCardProps {
  days: string[]; // API에서 받은 날짜 문자열 배열 ("YYYY-MM-DD")
}

export const CalendarCard = ({ days }: CalendarCardProps) => {
  const [date, setDate] = useState<Date | null>(new Date());

  const daysSet = new Set(days);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileClassName = ({
    date: tileDate,
    view,
  }: {
    date: Date;
    view: string;
  }) => {
    if (view === "month") {
      const dateStr = formatDate(tileDate);
      if (daysSet.has(dateStr)) {
        return "highlight";
      }
    }
    return "";
  };
  return (
    <div className={`w-full`}>
      <Calendar
        onChange={value => setDate(value as Date)}
        value={date}
        locale="en-US"
        tileClassName={tileClassName}
      />
    </div>
  );
};
