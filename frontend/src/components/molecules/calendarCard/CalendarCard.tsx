import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../style/calendar.css";

export const CalendarCard = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className={`w-full`}>
      <Calendar
        onChange={value => setDate(value as Date)}
        value={date}
        locale="en-US"
      />
    </div>
  );
};
