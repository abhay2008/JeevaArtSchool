import React from "react";
import { motion } from "framer-motion";
import GalleryCarousel from "./GalleryCarousel";
import type { GalleryTheme, SiteSection } from "../lib/types";

export default function GallerySection({ section }: { section: SiteSection }) {
  const theme = (section.theme || "acrylic") as GalleryTheme;
  const count = section.items?.length || 0;

  return (
    <motion.div initial={false} animate={{ opacity: 1 }} className="py-12 sm:py-16 md:py-20 px-2 sm:px-6 max-w-[90rem] mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-900 dark:text-white tracking-tight leading-tight">
          {section.title}
        </h3>
        {section.subtitle ? (
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg font-medium text-stone-600 dark:text-stone-400">{section.subtitle}</p>
        ) : null}
        <span className="inline-block mt-3 sm:mt-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-amber-900/15 text-stone-700 dark:text-stone-300">
          {count} {count === 1 ? "artwork" : "artworks"}
        </span>
      </div>
      <GalleryCarousel items={section.items || []} theme={theme} />
    </motion.div>
  );
}
