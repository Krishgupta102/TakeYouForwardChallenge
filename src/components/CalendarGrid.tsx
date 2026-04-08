import React from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
} from "date-fns";
import { CalendarDayCell } from "./CalendarDayCell";

interface CalendarGridProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onDayClick: (date: Date) => void;
  onDayMouseEnter: (date: Date) => void;
}

export function CalendarGrid({
  currentMonth,
  startDate,
  endDate,
  hoverDate,
  onDayClick,
  onDayMouseEnter,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  // Build week-day header labels (Sun … Sat)
  const weekDayLabels: React.ReactNode[] = [];
  const referenceWeekStart = startOfWeek(currentMonth, { weekStartsOn: 0 });
  for (let i = 0; i < 7; i++) {
    const d = addDays(referenceWeekStart, i);
    const isSat = i === 6;
    const isSun = i === 0;
    weekDayLabels.push(
      <div
        key={i}
        className={[
          "flex justify-center items-center pb-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest",
          isSat || isSun ? "text-sky-400" : "text-slate-400",
        ].join(" ")}
      >
        {format(d, "EEE")}
      </div>
    );
  }

  // Build grid rows
  const rows: React.ReactNode[] = [];
  let days: React.ReactNode[] = [];
  let day = gridStart;

  while (day <= gridEnd) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      days.push(
        <CalendarDayCell
          key={cloneDay.toISOString()}
          date={cloneDay}
          currentMonth={currentMonth}
          startDate={startDate}
          endDate={endDate}
          hoverDate={hoverDate}
          onClick={onDayClick}
          onMouseEnter={onDayMouseEnter}
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7" key={day.toISOString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div
      className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-8 select-none"
      onMouseLeave={() => onDayMouseEnter(new Date(0))} // clear hover on grid exit
    >
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1 border-b border-slate-100 pb-1">
        {weekDayLabels}
      </div>

      {/* Day rows */}
      <div className="flex flex-col gap-0.5">{rows}</div>
    </div>
  );
}
