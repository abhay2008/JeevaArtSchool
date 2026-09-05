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
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <p className="uppercase tracking-[0.28em] text-sm font-semibold text-stone-600 text-center mb-3">{section.eyebrow}</p>
      <h3 className="font-serif text-5xl sm:text-6xl font-semibold text-center text-stone-900 dark:text-white mb-4 tracking-tight">{section.title}</h3>
      {section.subtitle ? (
        <p className="text-center text-lg font-medium text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-12">{section.subtitle}</p>
      ) : null}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(section.classes || []).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${accents[item.accent] || accents.acrylic} mb-4`} />
            <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-white mb-2">{item.title}</h4>
            <p className="text-base font-medium text-stone-600 dark:text-stone-400">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
