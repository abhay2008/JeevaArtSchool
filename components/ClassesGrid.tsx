import React from "react";
import Link from "next/link";
import type { SiteSection } from "../lib/types";

const accents: Record<string, string> = {
  acrylic: "from-orange-400 to-rose-500",
  water: "from-sky-400 to-blue-600",
  tanjore: "from-amber-400 to-yellow-600",
  oil: "from-emerald-400 to-green-700",
  pencil: "from-violet-400 to-purple-700",
  exam: "from-indigo-400 to-violet-700",
};

export default function ClassesGrid({ section }: { section: SiteSection }) {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <p className="uppercase tracking-[0.22em] sm:tracking-[0.28em] text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 text-center mb-2 sm:mb-3">{section.eyebrow}</p>
      <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-stone-900 dark:text-white mb-3 sm:mb-4 tracking-tight leading-tight">{section.title}</h3>
      {section.subtitle ? (
        <p className="text-center text-sm sm:text-base md:text-lg font-medium text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-6 sm:mb-10 md:mb-12 px-2 leading-relaxed">{section.subtitle}</p>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {(section.classes || []).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group rounded-xl sm:rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 sm:p-6 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-lg sm:hover:shadow-xl active:scale-[0.99] transition-all flex flex-col justify-start"
          >
            <div className={`h-1 sm:h-1.5 w-8 sm:w-12 rounded-full bg-gradient-to-r ${accents[item.accent] || accents.acrylic} mb-2.5 sm:mb-4`} />
            <h4 className="font-serif text-lg sm:text-2xl lg:text-3xl font-semibold text-stone-900 dark:text-white mb-1 sm:mb-2 leading-snug">{item.title}</h4>
            <p className="text-xs sm:text-sm md:text-base font-medium text-stone-600 dark:text-stone-400 leading-snug sm:leading-normal">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
