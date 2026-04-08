# Interactive Wall Calendar

A highly polished, responsive, and visually impressive calendar component built using **Next.js**, **TypeScript**, and **Tailwind CSS**. Designed specifically with the aesthetic of a physical hanging wall calendar, this project fulfills the Frontend Engineering Challenge requirements.

## 🚀 Getting Started

### Installation
Ensure you have Node.js installed. Navigate into the project directory and run:

```bash
npm install
```

### Running Locally
Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

## ✨ Features Summary

### Design & Aesthetic
- **Premium UI**: Crafted to mirror a contemporary wall calendar, featuring soft drop shadows, a hanging string effect, and modern typography.
- **Hero Image Integration**: Large, atmospheric hero image at the top with seamlessly integrated, overlaid dynamic Month/Year typography.
- **Responsive Layout**: Designed specifically to reflow from an atmospheric desktop two-column view (notes left, grid right) into a coherent, fully responsive vertical layout for mobile devices.
- **Micro-interactions**: Subtle hover states, smooth scaling on the calendar dates, and an immersive background effect.

### Interactive Components
- **Date Range Selection**: Sophisticated click behavior:
  - 1st Click: Selects the start date.
  - 2nd Click: Selects the end date. (Automatically swaps if the end date is prior to the start date).
  - 3rd Click: Re-initializes a new selection.
- **Hover Previews**: While selecting an end date, moving the mouse over the grid highlights the potential date range.
- **Visual Range Connections**: Soft highlighting spans across multiple days to visually connect start and end dates.

### Data Management
- **Contextual Note-Taking**: 
  - Standard notes are bound to the currently viewed **Month** (e.g., "Notes for January 2024").
  - If a Date Range is highlighted, the notes panel dynamically bridges into a **Range-specific** mode, enabling notes bound exclusively to that specific date span.
- **localStorage Persistence**: Notes are instantly saved to the browser's `localStorage` utilizing a custom `useLocalStorage` React Hook, ensuring data persists across reloads seamlessly.

## 🏗️ Design Decisions & Architecture

- **`date-fns` over Moment.js**: Chosen for its functional nature, immutability, and significantly better tree-shaking capabilities, maintaining an optimized bundle size.
- **Component Modularity**: The design was heavily compartmentalized to ensure pure, single-purpose components:
  - `HeroImagePanel`: Isolates image layout and navigation buttons.
  - `CalendarGrid` & `CalendarDayCell`: Extracts complex grid mathematics and state-based styling away from the core logic.
  - `WallCalendar`: Acts strictly as the orchestrator/smart-component managing React state.
- **Tailwind `cn` utility**: Leveraged `clsx` and `tailwind-merge` to build extensible, programmatic css class manipulations without dealing with conflicting standard rules.
- **Frontend-Only**: Strictly adheres to the zero-backend constraint, offloading data persistence natively to the browser.
