import React from "react";
import Image from "next/image";
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
  suppressOpen,
}: {
  item: ArtworkItem;
  theme: GalleryTheme;
  suppressOpen?: boolean;
}) {
  const { openArtwork } = useArtModal();
  const { isCritical } = useIntro();
  const eager = isCritical(item.image);

  return (
    <article
      onClick={(event) => {
        const stage = (event.currentTarget as HTMLElement).closest("[data-gallery-stage]");
        if (stage?.getAttribute("data-moved") === "1") return;
        if (suppressOpen) return;
        openArtwork({
          title: item.title,
          description: [item.headline, item.description].filter(Boolean).join(" — "),
          image: item.image,
          medium: item.medium,
        });
      }}
      className={`group relative flex flex-col rounded-2xl items-center w-[260px] sm:w-[340px] p-5 border bg-gradient-to-b shadow-[0_20px_50px_-24px_rgba(60,40,20,0.45)] transition-shadow duration-300 cursor-pointer ${themeStyles[theme]}`}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 mb-1">
        {item.medium}
      </span>
      <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1">{item.title}</h2>
      {item.headline ? (
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{item.headline}</p>
      ) : null}
      {item.description ? (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">{item.description}</p>
      ) : (
        <p className="mb-3 h-4" />
      )}
      <div className="relative w-full h-[240px] sm:h-[300px] rounded-xl overflow-hidden bg-black/5 border border-white/40">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2"
          sizes="400px"
          loading={eager ? "eager" : "lazy"}
          priority={eager}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
          <span className="px-3 py-1.5 rounded-full bg-black/60 text-xs font-bold uppercase tracking-wider">
            <FontAwesomeIcon icon={faExpand} className="mr-2" />
            View
          </span>
        </div>
      </div>
    </article>
  );
}
