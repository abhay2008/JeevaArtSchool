import React from "react";
import { motion } from "framer-motion";
import GalleryCarousel from "./GalleryCarousel";
import type { GalleryTheme, SiteSection } from "../lib/types";
import { useSite } from "../context/SiteContext";
import { uid } from "../lib/site";

export default function GallerySection({ section }: { section: SiteSection }) {
  const { editor, updateSection, selectSection } = useSite();
  const theme = (section.theme || "acrylic") as GalleryTheme;
  const count = section.items?.length || 0;
  const editing = editor.enabled && editor.workspace !== "studio";

  const addCard = () => {
    selectSection(section.id);
    updateSection(section.id, {
      items: [
        ...(section.items || []),
        {
          id: uid("art"),
          title: "Untitled painting",
          description: "Add a short description in the editor.",
          image: "/uploads/acrylic.jpeg",
          medium: section.title || "Artwork",
          purpose: "gallery",
        },
      ],
    });
  };

  return (
    <motion.div initial={false} animate={{ opacity: 1 }} className="py-20 px-2 sm:px-6 max-w-[90rem] mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-900 dark:text-white tracking-tight">
          {section.title}
        </h3>
        {section.subtitle ? (
          <p className="mt-3 text-lg font-medium text-stone-600 dark:text-stone-400">{section.subtitle}</p>
        ) : null}
        <span className="inline-block mt-4 text-xs font-semibold uppercase tracking-[0.22em] px-4 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-amber-900/15 text-stone-700 dark:text-stone-300">
          {count} {count === 1 ? "artwork" : "artworks"}
        </span>
      </div>
      <GalleryCarousel items={section.items || []} theme={theme} editing={editing} onAdd={addCard} />
    </motion.div>
  );
}
