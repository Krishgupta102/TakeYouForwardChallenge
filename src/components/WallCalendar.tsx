"use client";

import React, { useState } from "react";
import { addMonths, subMonths, isBefore, isSameDay } from "date-fns";
import { useLocalStorage } from "@/hooks/useLocalStorageSettings";
import { HeroImagePanel } from "./HeroImagePanel";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";

export function WallCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const [notesData, setNotesData] = useLocalStorage<Record<string, string>>(
    "wallCalendarNotes",
    {}
  );

  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleReset = () => setCurrentMonth(new Date());

  const handleClearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  };

  const handleDayClick = (date: Date) => {
    // Epoch sentinel date means "mouse left grid" — ignore
    if (date.getFullYear() === 1970 && date.getMonth() === 0 && date.getDate() === 1) return;

    if (!startDate || (startDate && endDate)) {
      // 1st click or restart
      setStartDate(date);
      setEndDate(null);
      setHoverDate(null);
    } else {
      // 2nd click — finalize range
      if (isSameDay(date, startDate)) {
        // Clicking same day = single-day range
        setEndDate(date);
      } else if (isBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      setHoverDate(null);
    }
  };

  const handleDayMouseEnter = (date: Date) => {
    if (startDate && !endDate) {
      setHoverDate(date);
    }
  };

  const handleNoteChange = (key: string, value: string) => {
    setNotesData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    /* ── Outer card — paper-white with premium layered shadow ── */
    <div className="calendar-card w-full max-w-5xl mx-auto flex flex-col bg-white rounded-3xl ring-1 ring-slate-900/5 relative overflow-visible">

      {/* ── Spiral binding across the top edge ── */}
      <div
        aria-hidden
        className="absolute left-4 right-4 -top-4 flex items-center justify-center gap-[9px] z-50 pointer-events-none"
      >
        {/* Bar behind the coils */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-slate-800 rounded-sm" />
        {/* Individual binding coils */}
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="binding-dot relative z-10" />
        ))}
      </div>

      {/* ── Hero Image ── */}
      <div className="w-full mt-4">
        <HeroImagePanel
          currentDate={currentMonth}
          onNextMonth={handleNextMonth}
          onPrevMonth={handlePrevMonth}
          onReset={handleReset}
          onClearSelection={handleClearSelection}
          hasSelection={!!startDate}
        />
      </div>

      {/* ── Body: Notes (left) + Calendar (right) ── */}
      <div className="flex flex-col sm:flex-row w-full min-h-[420px] flex-1">
        {/* Notes — 32% on desktop, full width on mobile (appears below grid) */}
        <div className="w-full sm:w-[32%] border-t sm:border-t-0 sm:border-r border-slate-100 order-2 sm:order-1">
          <NotesPanel
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            notesData={notesData}
            onNoteChange={handleNoteChange}
          />
        </div>

        {/* Calendar — 68% on desktop */}
        <div className="w-full sm:w-[68%] order-1 sm:order-2 bg-white rounded-br-3xl">
          <CalendarGrid
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayMouseEnter={handleDayMouseEnter}
          />
        </div>
      </div>
    </div>
  );
}
