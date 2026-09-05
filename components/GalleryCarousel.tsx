import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ArtworkCard from "./ArtWorkCard";
import type { ArtworkItem, GalleryTheme } from "../lib/types";

interface Props {
  items: ArtworkItem[];
  theme: GalleryTheme;
  editing?: boolean;
  onAdd?: () => void;
}

export default function GalleryCarousel({ items, theme, editing, onAdd }: Props) {
  const [index, setIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const drag = useRef({ x: 0, active: false, moved: false });
  const animeMod = useRef<typeof import("animejs") | null>(null);

  const count = items.length;

  const applyLayout = (active: number, instant = false) => {
    const spacing = typeof window !== "undefined" && window.innerWidth < 640 ? 155 : 230;
    const anime = animeMod.current;

    items.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const offset = i - active;
      const abs = Math.abs(offset);
      const x = offset * spacing;
      const rotateY = offset * -12;
      const z = abs === 0 ? 56 : -abs * 70;
      const scale = abs === 0 ? 1 : Math.max(0.86, 1 - abs * 0.06);
      const opacity = abs > 3 ? 0 : Math.max(0.42, 1 - abs * 0.16);

      if (anime && !instant) {
        anime.animate(el, {
          x,
          rotateY,
          z,
          scale,
          opacity,
          duration: 480,
          ease: "out(3)",
        });
      } else {
        el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
      }
      el.style.pointerEvents = abs === 0 || abs === 1 ? "auto" : "none";
      el.style.zIndex = String(30 - abs);
    });
  };

  useEffect(() => {
    let mounted = true;
    import("animejs").then((mod) => {
      if (!mounted) return;
      animeMod.current = mod;
      applyLayout(index);
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (index >= count && count > 0) setIndex(count - 1);
  }, [count, index]);

  useEffect(() => {
    applyLayout(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items]);

  const go = (next: number) => {
    if (count === 0) return;
    setIndex((next + count) % count);
  };

  const onPointerDown = (event: React.PointerEvent) => {
    drag.current = { x: event.clientX, active: true, moved: false };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    if (Math.abs(event.clientX - drag.current.x) > 12) {
      drag.current.moved = true;
    }
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.x;
    const swiped = drag.current.moved && Math.abs(dx) > 40;
    drag.current.active = false;
    if (swiped) {
      if (dx > 0) go(index - 1);
      else go(index + 1);
    }
  };

  return (
    <div className="relative w-full">
      <div
        data-gallery-stage="true"
        className="relative mx-auto h-[430px] sm:h-[500px] max-w-5xl touch-pan-y"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 48%" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => {
          (event.currentTarget as HTMLElement).setAttribute("data-moved", drag.current.moved ? "1" : "0");
          onPointerUp(event);
        }}
        onPointerCancel={() => {
          drag.current.active = false;
        }}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
          if (event.deltaX > 24) go(index + 1);
          else if (event.deltaX < -24) go(index - 1);
        }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 -ml-[130px] sm:-ml-[170px] -mt-[190px] sm:-mt-[220px] will-change-transform"
              style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              onClick={(event) => {
                if (drag.current.moved) {
                  event.preventDefault();
                  event.stopPropagation();
                  return;
                }
                if (i !== index) {
                  event.preventDefault();
                  event.stopPropagation();
                  setIndex(i);
                }
              }}
            >
              <ArtworkCard item={item} theme={theme} suppressOpen={editing || i !== index} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 -mt-4 pb-2">
        <button
          type="button"
          aria-label="Previous artwork"
          onClick={() => go(index - 1)}
          className="w-12 h-12 rounded-full border border-[#c9c1b4] bg-[#f7f1e8] text-[#3d3832] shadow-sm hover:bg-[#efe6d8] transition-colors"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <p className="text-sm font-semibold tracking-wide text-stone-700 dark:text-stone-200 min-w-[5rem] text-center">
          {count ? `${index + 1} / ${count}` : "0"}
        </p>
        <button
          type="button"
          aria-label="Next artwork"
          onClick={() => go(index + 1)}
          className="w-12 h-12 rounded-full border border-[#c9c1b4] bg-[#f7f1e8] text-[#3d3832] shadow-sm hover:bg-[#efe6d8] transition-colors"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {editing && onAdd ? (
        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={() => {
              onAdd();
              setTimeout(() => setIndex(items.length), 50);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-amber-50 dark:bg-amber-100 dark:text-stone-900 text-sm font-semibold tracking-wide shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add a painting to this gallery
          </button>
        </div>
      ) : (
        <p className="text-center text-sm font-medium text-stone-600 dark:text-stone-400 pb-2">
          Tap a painting to enlarge · swipe or use arrows
        </p>
      )}
    </div>
  );
}
