import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { useArtModal } from "./ArtModal";
import type { ArtworkItem, GalleryTheme } from "../lib/types";
import { useIntro } from "../context/IntroContext";

const themeStyles: Record<GalleryTheme, string> = {
  acrylic: "from-orange-50 to-amber-100 dark:from-[#3b1a10] dark:to-[#24110b] border-orange-200/70 dark:border-orange-900/40",
  water: "from-sky-50 to-blue-100 dark:from-[#102338] dark:to-[#0a1624] border-sky-200/70 dark:border-sky-900/40",
  tanjore: "from-amber-50 to-yellow-100 dark:from-[#3a320f] dark:to-[#241f09] border-amber-200/70 dark:border-amber-900/40",
  oil: "from-emerald-50 to-green-100 dark:from-[#12301c] dark:to-[#0b1d12] border-emerald-200/70 dark:border-emerald-900/40",
  pencil: "from-violet-50 to-purple-100 dark:from-[#27183d] dark:to-[#1a1028] border-violet-200/70 dark:border-violet-900/40",
  student: "from-teal-50 to-cyan-100 dark:from-[#0d3133] dark:to-[#082224] border-teal-200/70 dark:border-teal-900/40",
};

export default function ArtworkCard({
  item,
  theme,
  onSelect,
  allowOpen = true,
  isActive = false,
}: {
  item: ArtworkItem;
  theme: GalleryTheme;
  onSelect?: () => void;
  allowOpen?: boolean;
  isActive?: boolean;
}) {
  const { openArtwork, prefetchArtwork } = useArtModal();
  const { isCritical } = useIntro();
  const eager = isCritical(item.image) || isActive;

  const swiped = (event: React.MouseEvent) => {
    const stage = (event.currentTarget as HTMLElement).closest("[data-gallery-stage]");
    return stage?.getAttribute("data-moved") === "1";
  };

  return (
    <article
      onClick={(event) => {
        if (swiped(event)) return;
        onSelect?.();
      }}
      className={`group relative flex flex-col rounded-2xl items-center w-[260px] sm:w-[340px] lg:w-[400px] xl:w-[440px] p-4 sm:p-5 lg:p-6 border bg-gradient-to-b shadow-[0_20px_50px_-24px_rgba(60,40,20,0.45)] transition-shadow duration-300 cursor-pointer ${
        isActive ? "pointer-events-none" : ""
      } ${themeStyles[theme]}`}
    >
      <span className="pointer-events-auto text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 mb-1">
        {item.medium}
      </span>
      <h2 className="pointer-events-auto font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white mb-1 text-center">
        {item.title}
      </h2>
      {item.headline ? (
        <p className="pointer-events-auto text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{item.headline}</p>
      ) : null}
      {item.description ? (
        <p className="pointer-events-auto text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2 text-center">{item.description}</p>
      ) : (
        <p className="mb-3 h-4" />
      )}
      <div
        role="button"
        tabIndex={0}
        onClick={(event) => {
          event.stopPropagation();
          if (swiped(event)) return;
          onSelect?.();
          if (!allowOpen) return;
          openArtwork({
            id: item.id,
            title: item.title,
            description: [item.headline, item.description].filter(Boolean).join(" — "),
            image: item.image,
            medium: item.medium,
          });
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          event.stopPropagation();
          onSelect?.();
          if (!allowOpen) return;
          openArtwork({
            id: item.id,
            title: item.title,
            description: [item.headline, item.description].filter(Boolean).join(" — "),
            image: item.image,
            medium: item.medium,
          });
        }}
        onPointerEnter={() => prefetchArtwork(item.image)}
        className="pointer-events-auto relative w-full h-[220px] sm:h-[280px] lg:h-[340px] xl:h-[380px] rounded-xl overflow-hidden bg-black/5 border border-white/40"
      >
        <motion.div layoutId={`artwork-${item.id}`} className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2 pointer-events-none"
          sizes="(min-width: 1280px) 440px, (min-width: 1024px) 400px, (min-width: 640px) 340px, 260px"
          loading={eager ? "eager" : "lazy"}
          priority={eager}
        />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
          <span className="px-3 py-1.5 rounded-full bg-black/60 text-xs font-bold uppercase tracking-wider">
            <FontAwesomeIcon icon={faExpand} className="mr-2" />
            View
          </span>
        </div>
      </div>
    </article>
  );
}
