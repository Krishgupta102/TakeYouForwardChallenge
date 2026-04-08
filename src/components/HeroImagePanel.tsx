"use client";

import React from "react";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  X,
} from "lucide-react";

interface HeroImagePanelProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onReset: () => void;
  onClearSelection: () => void;
  hasSelection: boolean;
}

export function HeroImagePanel({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onReset,
  onClearSelection,
  hasSelection,
}: HeroImagePanelProps) {
  return (
    <div className="relative w-full h-[220px] sm:h-[290px] md:h-[360px] overflow-hidden rounded-t-3xl group">
      {/* Hero background image */}
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop"
        alt="Mountain landscape calendar header"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      />

      {/* Layered gradient: dark at bottom for text legibility, none at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      {/* Subtle left-side vignette so text on right always has contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

      {/* ── Top Controls ── */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        {/* Today button */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all duration-200 text-xs font-semibold tracking-wide shadow-sm"
        >
          <CalendarDays className="w-3.5 h-3.5" />
          Today
        </button>

        {/* Nav cluster */}
        <div className="flex items-center gap-2">
          {hasSelection && (
            <button
              onClick={onClearSelection}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/80 hover:bg-rose-500 active:bg-rose-600 text-white backdrop-blur-md border border-rose-400/30 transition-all duration-200 text-xs font-semibold tracking-wide shadow-sm"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}

          <div className="flex items-center gap-1 bg-black/25 backdrop-blur-md rounded-full border border-white/15 p-1">
            <button
              onClick={onPrevMonth}
              className="p-1.5 rounded-full hover:bg-white/20 active:bg-white/30 text-white transition-all duration-150"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNextMonth}
              className="p-1.5 rounded-full hover:bg-white/20 active:bg-white/30 text-white transition-all duration-150"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Month / Year Overlay (bottom-right, refined hierarchy) ── */}
      <div className="absolute bottom-14 sm:bottom-16 md:bottom-20 right-6 sm:right-8 text-right z-10 select-none">
        {/* Year — smaller, lighter, spaced */}
        <div
          className="text-white/70 text-sm sm:text-base md:text-lg font-light tracking-[0.35em] uppercase"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
        >
          {format(currentDate, "yyyy")}
        </div>
        {/* Month — bold, strong, never clips */}
        <div
          className="text-white text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none tracking-tight"
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          {format(currentDate, "MMMM")}
        </div>
      </div>

      {/* ── Decorative blue accent glow (mimics reference diagonal) ── */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-sky-500/25 blur-3xl rounded-full pointer-events-none" />

      {/* ── Inner page / bottom wave — smoother single curve ── */}
      <svg
        className="absolute bottom-0 left-0 w-full text-white z-10 pointer-events-none"
        style={{ height: "60px" }}
        preserveAspectRatio="none"
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0,40 C240,70 480,0 720,28 C960,56 1200,10 1440,36 L1440,60 L0,60 Z"
        />
      </svg>
    </div>
  );
}
