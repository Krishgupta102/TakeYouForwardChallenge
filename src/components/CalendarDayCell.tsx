import React from "react";
import {
  format,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  isAfter,
  getDay,
} from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarDayCellProps {
  date: Date;
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
}

export function CalendarDayCell({
  date,
  currentMonth,
  startDate,
  endDate,
  hoverDate,
  onClick,
  onMouseEnter,
}: CalendarDayCellProps) {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isDateToday = isToday(date);
  const dayOfWeek = getDay(date); // 0 = Sun, 6 = Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const isStart = !!startDate && isSameDay(date, startDate);
  const isEnd = !!endDate && isSameDay(date, endDate);
  const isSelected = isStart || isEnd;

  // Effective end for hover preview
  const effectiveEnd = endDate ?? hoverDate;

  // Date falls strictly between start and end (confirmed range)
  const isBetweenConfirmed =
    !!startDate &&
    !!endDate &&
    isAfter(date, startDate) &&
    isBefore(date, endDate);

  // Date falls in hover preview range (before end is confirmed)
  const isBetweenHover =
    !!startDate &&
    !endDate &&
    !!hoverDate &&
    isAfter(hoverDate, startDate) && // only show strip when hover is *after* start
    isAfter(date, startDate) &&
    isBefore(date, hoverDate);

  const isInRange = isBetweenConfirmed || isBetweenHover;

  // Should the left/right range bridges be shown on start/end cells?
  const showRightBridgeOnStart =
    isStart &&
    !!effectiveEnd &&
    (isBefore(startDate, effectiveEnd) || isAfter(startDate, effectiveEnd)
      ? false
      : false) &&
    !isSameDay(startDate, effectiveEnd) &&
    !isBefore(effectiveEnd, startDate);

  // simpler: show bridge from centre→right on start cell when range extends right
  const startHasRange =
    isStart && !!effectiveEnd && !isSameDay(startDate!, effectiveEnd) && !isBefore(effectiveEnd, startDate!);
  // show bridge from left→centre on end cell
  const endHasRange = isEnd && !!startDate;

  return (
    <div
      onClick={() => onClick(date)}
      onMouseEnter={() => onMouseEnter(date)}
      className="relative flex items-center justify-center cursor-pointer h-10 sm:h-11"
    >
      {/* ── Range strip background (in-between cells) ── */}
      {isInRange && (
        <div className="range-bg absolute inset-y-[6px] left-0 right-0 bg-sky-100" />
      )}

      {/* ── Right-half bridge from start date into range ── */}
      {startHasRange && (
        <div className="range-bg absolute inset-y-[6px] left-1/2 right-0 bg-sky-100" />
      )}

      {/* ── Left-half bridge from range into end date ── */}
      {endHasRange && (
        <div className="range-bg absolute inset-y-[6px] left-0 right-1/2 bg-sky-100" />
      )}

      {/* ── Day number circle ── */}
      <div
        className={cn(
          "day-cell-inner relative z-10 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-sm font-medium select-none",

          // Inactive-month dates: very muted
          !isCurrentMonth && "text-slate-300 cursor-default",

          // Current-month default
          isCurrentMonth && !isSelected && !isDateToday && "text-slate-700",

          // Weekend subtle tint (only current month, not selected)
          isCurrentMonth && !isSelected && isWeekend && "text-slate-500",

          // Hover state for unselected current-month cells
          isCurrentMonth && !isSelected && "hover:bg-slate-100 hover:scale-105",

          // Today ring (when not selected)
          isDateToday && !isSelected && "ring-2 ring-sky-400 ring-offset-1 text-sky-600 font-semibold bg-sky-50",

          // Selected start / end — strong filled accent
          isSelected &&
            "bg-sky-500 text-white font-bold shadow-lg shadow-sky-500/40 ring-2 ring-sky-300 ring-offset-1 scale-110",

          // In-between confirmed range — very light fill to differentiate from hover
          isInRange && !isSelected && "text-sky-700 font-medium"
        )}
      >
        {format(date, "d")}
      </div>
    </div>
  );
}
