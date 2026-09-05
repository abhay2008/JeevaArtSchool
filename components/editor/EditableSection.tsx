import React, { useRef } from "react";
import { useSite } from "../../context/SiteContext";

const LONG_PRESS_MS = 520;

export default function EditableSection({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { editor, selectSection } = useSite();
  const timer = useRef<number | null>(null);
  const selected = editor.selectedId === id;

  const clearTimer = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const startPress = (event: React.PointerEvent) => {
    if (!editor.enabled) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    clearTimer();
    timer.current = window.setTimeout(() => {
      selectSection(id);
    }, LONG_PRESS_MS);
  };

  if (!editor.enabled) {
    return <>{children}</>;
  }

  return (
    <div
      data-section-id={id}
      onPointerDown={startPress}
      onPointerUp={clearTimer}
      onPointerLeave={clearTimer}
      onPointerCancel={clearTimer}
      className={`relative transition-shadow duration-200 ${
        selected
          ? "ring-2 ring-violet-500 ring-offset-2 ring-offset-transparent shadow-[0_0_0_6px_rgba(139,92,246,0.15)]"
          : "hover:ring-1 hover:ring-violet-400/50"
      }`}
    >
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          selectSection(id);
        }}
        className="absolute top-3 right-3 z-20 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg hover:bg-violet-500"
      >
        Edit
      </button>
      <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
        Hold to edit
      </div>
      {children}
    </div>
  );
}
