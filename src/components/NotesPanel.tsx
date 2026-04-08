import React, { useRef } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { BookOpen, PenLine, Save } from "lucide-react";

interface NotesPanelProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  notesData: Record<string, string>;
  onNoteChange: (key: string, value: string) => void;
}

export function NotesPanel({
  currentMonth,
  startDate,
  endDate,
  notesData,
  onNoteChange,
}: NotesPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isRangeSelected = !!(startDate && endDate);

  // Keys
  const monthKey = `month-${format(currentMonth, "yyyy-MM")}`;
  let activeKey = monthKey;
  let modeLabel = "Monthly Notes";
  let scopeLabel = format(currentMonth, "MMMM yyyy");
  let placeholder = `Jot down plans or reminders for ${format(currentMonth, "MMMM")}…`;
  let dayCount = 0;

  if (isRangeSelected && startDate && endDate) {
    const rangeKey = `range-${format(startDate, "yyyy-MM-dd")}-to-${format(
      endDate,
      "yyyy-MM-dd"
    )}`;
    activeKey = rangeKey;
    dayCount = differenceInCalendarDays(endDate, startDate) + 1;
    modeLabel = "Range Notes";
    scopeLabel = `${format(startDate, "MMM d")} – ${format(endDate, "MMM d, yyyy")}`;
    placeholder = `Notes for this ${dayCount}-day window…`;
  }

  const currentNotes = notesData[activeKey] ?? "";

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden rounded-bl-3xl bg-[#fafaf8]">
      {/* Red margin line (classic notepad) */}
      <div className="absolute left-[52px] top-0 bottom-0 w-px bg-red-300/60 z-0" />
      {/* Second thin margin line */}
      <div className="absolute left-[54px] top-0 bottom-0 w-px bg-red-200/40 z-0" />

      {/* Punched holes on left edge */}
      <div className="absolute left-[20px] top-[18%] w-5 h-5 rounded-full bg-white border-2 border-slate-200 shadow-inner z-0" />
      <div className="absolute left-[20px] top-[50%] w-5 h-5 rounded-full bg-white border-2 border-slate-200 shadow-inner z-0" />
      <div className="absolute left-[20px] top-[82%] w-5 h-5 rounded-full bg-white border-2 border-slate-200 shadow-inner z-0" />

      {/* ── Header ── */}
      <div className="relative z-10 pl-[68px] pr-5 pt-6 pb-3 border-b border-slate-200/60 flex-shrink-0">
        <div className="flex items-start gap-2">
          {isRangeSelected ? (
            <PenLine className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
          ) : (
            <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          )}
          <div className="min-w-0">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">
              {modeLabel}
            </h3>
            <p className="text-sm font-semibold text-slate-700 leading-snug truncate">
              {scopeLabel}
            </p>
            {isRangeSelected && dayCount > 0 && (
              <p className="text-xs text-sky-500 font-medium mt-0.5">
                {dayCount} {dayCount === 1 ? "day" : "days"} selected
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Textarea ── */}
      <div className="relative z-10 flex-grow px-0 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={currentNotes}
          onChange={(e) => onNoteChange(activeKey, e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          className={[
            "w-full h-full resize-none bg-transparent border-none",
            "pl-[68px] pr-5 py-3",
            "text-sm text-slate-700 placeholder:text-slate-300",
            "focus:outline-none focus:ring-0",
            "leading-[32px]",
          ].join(" ")}
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px)",
            backgroundSize: "100% 32px",
            backgroundPositionY: "12px",
          }}
        />
      </div>

      {/* ── Footer hint ── */}
      <div className="relative z-10 pl-[68px] pr-5 py-2 border-t border-slate-100 flex items-center gap-1.5 flex-shrink-0">
        <Save className="w-3 h-3 text-slate-300" />
        <span className="text-[10px] text-slate-300 font-medium tracking-wide">
          Auto-saved to browser
        </span>
      </div>
    </div>
  );
}
