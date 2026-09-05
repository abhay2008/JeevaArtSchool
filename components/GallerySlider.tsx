import React, { useRef, useState, useEffect, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GallerySlider({ children, className = "" }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = sliderRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.clientWidth * 0.75;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full group/slider py-2">
      {/* Left Navigation Chevron Button (Desktop & Tablet) */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={`hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-black/5 dark:border-white/10 text-slate-800 dark:text-white transition-all duration-200 hover:scale-110 active:scale-95 ${
          !canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-90 hover:opacity-100"
        }`}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
      </button>

      {/* Horizontal Cards Container */}
      <div
        ref={sliderRef}
        className={`w-full flex space-x-4 sm:space-x-6 overflow-x-auto p-4 sm:p-6 snap-x snap-mandatory gallery-scrollbar scroll-smooth items-stretch ${className}`}
      >
        {children}
      </div>

      {/* Right Navigation Chevron Button (Desktop & Tablet) */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={`hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-black/5 dark:border-white/10 text-slate-800 dark:text-white transition-all duration-200 hover:scale-110 active:scale-95 ${
          !canScrollRight ? "opacity-0 pointer-events-none" : "opacity-90 hover:opacity-100"
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
      </button>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden flex items-center justify-center space-x-1.5 pt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 select-none">
        <span>← Swipe horizontally to explore →</span>
      </div>
    </div>
  );
}
