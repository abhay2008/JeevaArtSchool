import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useSite } from "../context/SiteContext";
import { useArtModal } from "./ArtModal";
import { useIntro } from "../context/IntroContext";
import { ensureShowcase, itemsToShowcase, type ShowcaseArtwork } from "../lib/showcaseArtworks";

export type TransitionAnim = "rollup" | "dissolve" | "swipe" | "fade";
export type { ShowcaseArtwork };

interface MediumTheme {
  id: string;
  name: string;
  pill: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBorder: string;
  glow: string;
}

const MEDIUM_THEMES: Record<string, MediumTheme> = {
  acrylic: {
    id: "acrylic",
    name: "Acrylic Painting",
    pill: "Acrylic",
    accent: "#f97316",
    badgeBg: "bg-orange-500/15 dark:bg-orange-500/20",
    badgeText: "text-orange-700 dark:text-orange-300",
    badgeBorder: "border-orange-400/40",
    cardBorder: "border-orange-500/30 dark:border-orange-500/40",
    glow: "rgba(249, 115, 22, 0.22)",
  },
  watercolour: {
    id: "watercolour",
    name: "Watercolour Wash",
    pill: "Watercolours",
    accent: "#0284c7",
    badgeBg: "bg-sky-500/15 dark:bg-sky-500/20",
    badgeText: "text-sky-700 dark:text-sky-300",
    badgeBorder: "border-sky-400/40",
    cardBorder: "border-sky-500/30 dark:border-sky-500/40",
    glow: "rgba(2, 132, 199, 0.22)",
  },
  tanjore: {
    id: "tanjore",
    name: "Tanjore Gold Foil",
    pill: "Tanjore",
    accent: "#eab308",
    badgeBg: "bg-amber-500/15 dark:bg-amber-500/20",
    badgeText: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-400/40",
    cardBorder: "border-yellow-500/30 dark:border-yellow-500/40",
    glow: "rgba(234, 179, 8, 0.25)",
  },
  oil: {
    id: "oil",
    name: "Classic Oil Painting",
    pill: "Oil Painting",
    accent: "#10b981",
    badgeBg: "bg-emerald-500/15 dark:bg-emerald-500/20",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    badgeBorder: "border-emerald-400/40",
    cardBorder: "border-emerald-500/30 dark:border-emerald-500/40",
    glow: "rgba(16, 185, 129, 0.22)",
  },
  pencil: {
    id: "pencil",
    name: "Pencil Shading",
    pill: "Pencil",
    accent: "#8b5cf6",
    badgeBg: "bg-violet-500/15 dark:bg-violet-500/20",
    badgeText: "text-violet-700 dark:text-violet-300",
    badgeBorder: "border-violet-400/40",
    cardBorder: "border-violet-500/30 dark:border-violet-500/40",
    glow: "rgba(139, 92, 246, 0.22)",
  },
  charcoal: {
    id: "charcoal",
    name: "Charcoal Shading",
    pill: "Charcoal",
    accent: "#71717a",
    badgeBg: "bg-stone-500/15 dark:bg-stone-500/25",
    badgeText: "text-stone-700 dark:text-stone-300",
    badgeBorder: "border-stone-400/40",
    cardBorder: "border-stone-400/30 dark:border-stone-500/40",
    glow: "rgba(113, 113, 122, 0.22)",
  },
  student: {
    id: "student",
    name: "Emerging Artists",
    pill: "Students",
    accent: "#14b8a6",
    badgeBg: "bg-teal-500/15 dark:bg-teal-500/20",
    badgeText: "text-teal-700 dark:text-teal-300",
    badgeBorder: "border-teal-400/40",
    cardBorder: "border-teal-500/30 dark:border-teal-500/40",
    glow: "rgba(20, 184, 166, 0.22)",
  },
};

const ANIMATION_TYPES: TransitionAnim[] = ["rollup", "dissolve", "swipe", "fade"];

// Motion variants for each randomized transition animation
const transitionVariants: Record<TransitionAnim, Variants> = {
  rollup: {
    initial: { y: "100%", opacity: 0, scale: 0.95 },
    animate: {
      y: "0%",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  },
  dissolve: {
    initial: { opacity: 0, filter: "blur(14px)", scale: 1.04 },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      filter: "blur(14px)",
      scale: 0.96,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },
  swipe: {
    initial: (dir: number) => ({
      x: dir >= 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.97,
    }),
    animate: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
    },
    exit: (dir: number) => ({
      x: dir >= 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
    }),
  },
  fade: {
    initial: { opacity: 0, scale: 0.97 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 1.03,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  },
};

const CATEGORIES = [
  { id: "all", label: "All Artworks" },
  { id: "acrylic", label: "Acrylic" },
  { id: "watercolour", label: "Watercolours" },
  { id: "tanjore", label: "Tanjore" },
  { id: "oil", label: "Oil Painting" },
  { id: "pencil", label: "Pencil & Charcoal" },
  { id: "student", label: "Emerging Artists" },
];

// Precomputed orientation map for instant render without layout shift
const KNOWN_IMAGE_ORIENTATIONS: Record<string, boolean> = {
  "/uploads/acrylic.jpeg": false, // Landscape (1080x1007)
  "/uploads/acrylicboat.jpeg": false, // Landscape (1031x987)
  "/uploads/coconut.jpeg": false, // Landscape (900x732)
  "/uploads/templewater.jpeg": false, // Landscape (1278x1028)
  "/uploads/studentvasant.jpeg": false, // Landscape (1600x1200)
  "/uploads/tanjore.jpeg": true, // Portrait (1145x1600)
  "/uploads/tanjorekrishna.jpeg": true, // Portrait (716x1052)
  "/uploads/horse.jpeg": true, // Portrait (1200x1599)
  "/uploads/loafwater.jpeg": true, // Portrait (1200x1599)
  "/uploads/pencil1.jpeg": true, // Portrait (1080x1350)
  "/uploads/pencil2.jpeg": true, // Portrait (1080x1225)
  "/uploads/charcoal3.jpeg": true, // Portrait (762x948)
  "/uploads/studentabhay3.jpeg": true, // Portrait (906x1108)
  "/uploads/studentcharu.jpeg": true, // Portrait (480x596)
  "/uploads/tanjoreganesh.jpeg": true, // Portrait (692x795)
  "/uploads/charcoal.jpeg": true, // Portrait (1069x1148)
  "/uploads/mainimage.jpeg": true, // Portrait (1195x1281)
  "/uploads/studentabhinav.jpeg": true, // Portrait (1197x1276)
};

export default function HeroArtworkShowcase() {
  const { content } = useSite();
  const { openArtwork } = useArtModal();
  const { isCritical } = useIntro();

  const [activeCategory, setActiveCategory] = useState("all");

  const allArtworks = useMemo(() => {
    return itemsToShowcase(ensureShowcase(content.showcase));
  }, [content.showcase]);

  const filteredArtworks = useMemo(() => {
    if (activeCategory === "all") return allArtworks;
    if (activeCategory === "pencil") {
      return allArtworks.filter(
        (a) => a.category === "pencil" || a.category === "charcoal"
      );
    }
    return allArtworks.filter((a) => a.category === activeCategory);
  }, [activeCategory, allArtworks]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [currentAnim, setCurrentAnim] = useState<TransitionAnim>("rollup");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Pick a random animation different from the current one
  const pickRandomAnim = useCallback((prevAnim: TransitionAnim): TransitionAnim => {
    const candidates = ANIMATION_TYPES.filter((a) => a !== prevAnim);
    return candidates[Math.floor(Math.random() * candidates.length)] || "rollup";
  }, []);

  const goToNext = useCallback(() => {
    if (filteredArtworks.length === 0) return;
    setDirection(1);
    setCurrentAnim((prev) => pickRandomAnim(prev));
    setCurrentIndex((prev) => (prev + 1) % filteredArtworks.length);
    setProgress(0);
  }, [filteredArtworks.length, pickRandomAnim]);

  const goToPrev = useCallback(() => {
    if (filteredArtworks.length === 0) return;
    setDirection(-1);
    setCurrentAnim((prev) => pickRandomAnim(prev));
    setCurrentIndex((prev) =>
      prev === 0 ? filteredArtworks.length - 1 : prev - 1
    );
    setProgress(0);
  }, [filteredArtworks.length, pickRandomAnim]);

  // Handle category chip click
  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    setCurrentIndex(0);
    setProgress(0);
    setCurrentAnim(pickRandomAnim(currentAnim));
  };

  // Auto-advance timer (4000ms cycle)
  useEffect(() => {
    if (!isPlaying || isHovered || filteredArtworks.length <= 1) return;

    const intervalTime = 4000;
    const tickTime = 100;
    const increment = (tickTime / intervalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + increment;
      });
    }, tickTime);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, filteredArtworks.length, goToNext]);

  // Reset index if category change causes out of bounds
  useEffect(() => {
    if (currentIndex >= filteredArtworks.length) {
      setCurrentIndex(0);
      setProgress(0);
    }
  }, [currentIndex, filteredArtworks.length]);

  const currentArtwork = filteredArtworks[currentIndex] || allArtworks[0];
  const theme = MEDIUM_THEMES[currentArtwork?.category] || MEDIUM_THEMES.acrylic;

  if (!currentArtwork) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-5xl mx-auto text-left"
    >
      {/* Outer Card with Dynamic Ambient Color Coding */}
      <div
        className="relative rounded-2xl border border-stone-200/70 dark:border-white/10 bg-white/50 dark:bg-white/[0.04] backdrop-blur-sm p-3 sm:p-4 overflow-hidden"
      >
        <div className="relative z-10 grid md:grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="col-span-full md:col-span-6">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                if (!currentArtwork) return;
                openArtwork({
                  title: currentArtwork.title,
                  description: currentArtwork.description,
                  image: currentArtwork.image,
                  medium: currentArtwork.medium,
                });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  if (!currentArtwork) return;
                  openArtwork({
                    title: currentArtwork.title,
                    description: currentArtwork.description,
                    image: currentArtwork.image,
                    medium: currentArtwork.medium,
                  });
                }
              }}
              className="group relative z-10 w-full min-h-[240px] h-[52vw] max-h-[420px] md:h-[340px] md:max-h-none rounded-xl bg-[#f3eee6] dark:bg-black/30 cursor-pointer"
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentArtwork.id}
                  custom={direction}
                  variants={transitionVariants[currentAnim]}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading={isCritical(currentArtwork.image) ? "eager" : "lazy"}
                    priority={currentIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="rounded-full bg-stone-900/75 text-amber-50 text-[11px] font-semibold uppercase tracking-wider px-3 py-1">
                  View painting
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-full md:col-span-6 flex flex-col justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
                {currentArtwork.medium}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-white font-semibold mt-1 leading-tight">
                {currentArtwork.title}
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mt-2 line-clamp-2">
                {currentArtwork.description}
              </p>
            </div>

            <div className="hidden md:flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={
                      "px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors " +
                      (isSelected
                        ? "bg-stone-800/90 text-amber-50"
                        : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-white/5")
                    }
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={currentArtwork.href}
                className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 underline underline-offset-4"
              >
                {theme.pill} gallery
              </Link>
              <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                <span className="text-xs font-medium px-2 py-0.5 text-stone-500">
                  {currentIndex + 1} / {filteredArtworks.length}
                </span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-stone-500 hover:bg-stone-200/50"
                >
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button
                  onClick={goToPrev}
                  aria-label="Previous artwork"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-stone-500 hover:bg-stone-200/50"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  onClick={goToNext}
                  aria-label="Next artwork"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-stone-500 hover:bg-stone-200/50"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-px bg-stone-200/80 dark:bg-stone-800 mt-3 overflow-hidden">
          <div
            className="h-full bg-stone-400/70 dark:bg-stone-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
