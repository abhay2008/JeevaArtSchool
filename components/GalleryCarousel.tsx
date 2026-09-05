import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ArtworkCard from "./ArtWorkCard";
import { prefetchArtwork } from "./ArtModal";
import { registerBrowseCarousel } from "../lib/browseNav";
import type { ArtworkItem, GalleryTheme } from "../lib/types";

interface Props {
  items: ArtworkItem[];
  theme: GalleryTheme;
  editing?: boolean;
  onAdd?: () => void;
}

function cardSpacing() {
  if (typeof window === "undefined") return 260;
  const w = window.innerWidth;
  if (w >= 1280) return 340;
  if (w >= 1024) return 310;
  if (w >= 640) return 260;
  return 200;
}

export default function GalleryCarousel({ items, theme, editing, onAdd }: Props) {
  const [index, setIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const animeMod = useRef<typeof import("animejs") | null>(null);
  const drag = useRef({
    active: false,
    locked: false,
    moved: false,
    startX: 0,
    startY: 0,
    offset: 0,
    lastX: 0,
    lastT: 0,
    vx: 0,
  });

  const count = items.length;
  const countRef = useRef(count);
  indexRef.current = index;
  countRef.current = count;

  const applyLayout = useCallback((active: number, extraX = 0, instant = false) => {
    const spacing = cardSpacing();
    const anime = animeMod.current;

    items.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const offset = i - active;
      const abs = Math.abs(offset);
      const x = offset * spacing + extraX;
      const rotateY = offset * -12 - extraX / 28;
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
          duration: 420,
          ease: "out(3)",
        });
      } else {
        el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
      }
      el.style.pointerEvents = abs === 0 ? "none" : abs <= 3 ? "auto" : "none";
      el.style.zIndex = String(30 - abs);
    });
  }, [items]);

  useEffect(() => {
    let mounted = true;
    import("animejs").then((mod) => {
      if (!mounted) return;
      animeMod.current = mod;
      applyLayout(indexRef.current);
    });
    return () => {
      mounted = false;
    };
  }, [applyLayout]);

  useEffect(() => {
    if (index >= count && count > 0) setIndex(count - 1);
  }, [count, index]);

  useEffect(() => {
    applyLayout(index);
    const current = items[index];
    prefetchArtwork(current?.image);
    prefetchArtwork(items[(index + 1) % items.length]?.image);
    prefetchArtwork(items[(index - 1 + items.length) % items.length]?.image);
  }, [index, items, applyLayout]);

  useEffect(() => {
    const onResize = () => applyLayout(indexRef.current, 0, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyLayout]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    return registerBrowseCarousel({
      el,
      next: () => {
        const n = countRef.current;
        if (!n) return;
        setIndex((i) => (i + 1) % n);
      },
      prev: () => {
        const n = countRef.current;
        if (!n) return;
        setIndex((i) => (i - 1 + n) % n);
      },
    });
  }, []);

  const go = (next: number) => {
    if (count === 0) return;
    setIndex((next + count) % count);
  };

  const selectCardAtPoint = (clientX: number, clientY: number) => {
    const hits = document.elementsFromPoint(clientX, clientY);
    for (const node of hits) {
      const wrap = (node as HTMLElement).closest?.("[data-card-index]");
      if (wrap instanceof HTMLElement) {
        const next = Number(wrap.dataset.cardIndex);
        if (!Number.isNaN(next) && next !== indexRef.current) {
          setIndex(next);
          return;
        }
        if (next === indexRef.current) return;
      }
    }
    const stage = stageRef.current;
    if (!stage || count === 0) return;
    const rect = stage.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    if (x > 72) setIndex((indexRef.current + 1) % count);
    else if (x < -72) setIndex((indexRef.current - 1 + count) % count);
  };

  const finishDrag = (clientX?: number, clientY?: number) => {
    const spacing = cardSpacing();
    const { offset, vx, moved } = drag.current;
    drag.current.active = false;
    drag.current.locked = false;
    const stage = stageRef.current;
    if (stage) {
      stage.setAttribute("data-moved", moved ? "1" : "0");
      if (moved) window.setTimeout(() => stage.setAttribute("data-moved", "0"), 120);
    }

    if (!moved) {
      applyLayout(indexRef.current);
      if (typeof clientX === "number" && typeof clientY === "number") {
        selectCardAtPoint(clientX, clientY);
      }
      return;
    }

    let next = indexRef.current;
    if (offset < -spacing * 0.18 || vx < -0.55) next += 1;
    else if (offset > spacing * 0.18 || vx > 0.55) next -= 1;
    next = (next + count) % count;
    if (next === indexRef.current) applyLayout(indexRef.current);
    else setIndex(next);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onTouchMove = (event: TouchEvent) => {
      if (!drag.current.active) return;
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - drag.current.startX;
      const dy = touch.clientY - drag.current.startY;

      if (!drag.current.locked) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        if (Math.abs(dx) > Math.abs(dy)) {
          drag.current.locked = true;
          drag.current.moved = true;
        } else {
          drag.current.active = false;
          return;
        }
      }

      event.preventDefault();
      const now = performance.now();
      const dt = Math.max(8, now - drag.current.lastT);
      drag.current.vx = (touch.clientX - drag.current.lastX) / dt;
      drag.current.lastX = touch.clientX;
      drag.current.lastT = now;
      drag.current.offset = dx;
      applyLayout(indexRef.current, dx, true);
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [applyLayout]);

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = {
      active: true,
      locked: false,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      offset: 0,
      lastX: event.clientX,
      lastT: performance.now(),
      vx: 0,
    };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!drag.current.active || event.pointerType === "touch") return;
    const dx = event.clientX - drag.current.startX;
    const dy = event.clientY - drag.current.startY;
    if (!drag.current.locked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dx) <= Math.abs(dy)) return;
      drag.current.locked = true;
      drag.current.moved = true;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    }
    const now = performance.now();
    const dt = Math.max(8, now - drag.current.lastT);
    drag.current.vx = (event.clientX - drag.current.lastX) / dt;
    drag.current.lastX = event.clientX;
    drag.current.lastT = now;
    drag.current.offset = dx;
    applyLayout(indexRef.current, dx, true);
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    finishDrag(event.clientX, event.clientY);
  };

  return (
    <div className="relative w-full">
      <div
        ref={stageRef}
        data-gallery-stage="true"
        className="relative mx-auto h-[430px] sm:h-[540px] lg:h-[620px] xl:h-[700px] max-w-6xl cursor-grab active:cursor-grabbing select-none"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 48%",
          touchAction: "pan-y",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
          event.preventDefault();
          if (event.deltaX > 18) go(index + 1);
          else if (event.deltaX < -18) go(index - 1);
        }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              className="absolute left-1/2 top-1/2 -ml-[130px] sm:-ml-[170px] lg:-ml-[200px] xl:-ml-[220px] -mt-[190px] sm:-mt-[230px] lg:-mt-[270px] xl:-mt-[300px] will-change-transform"
              data-card-index={i}
              style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
            >
              <ArtworkCard
                item={item}
                theme={theme}
                isActive={i === index}
                allowOpen={!editing}
                onSelect={() => {
                  if (stageRef.current?.getAttribute("data-moved") === "1") return;
                  setIndex(i);
                }}
              />
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
          Swipe or click a card to bring it forward · click the painting to enlarge
        </p>
      )}
    </div>
  );
}
