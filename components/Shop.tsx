import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import type { SiteSection } from "../lib/types";

export default function Shop({ section }: { section: SiteSection }) {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <p className="uppercase tracking-[0.3em] text-xs text-rose-600 text-center mb-3">{section.eyebrow || section.title}</p>
      <article className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-rose-50 via-amber-50 to-violet-50 dark:from-[#1b1520] dark:to-[#241820] border border-rose-200/60 dark:border-white/10 text-center shadow-xl">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center mb-5">
          <FontAwesomeIcon icon={faPaintBrush} />
        </div>
        <h3 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 dark:text-white mb-2">{section.highlightTitle}</h3>
        {(section.highlightLines || []).map((line, index) => (
          <p key={index} className="uppercase tracking-[0.2em] text-sm font-bold text-violet-700 dark:text-violet-300">
            {line}
          </p>
        ))}
        <p className="mt-6 text-stone-700 dark:text-stone-300 leading-relaxed">{section.body}</p>
        {section.ctaUrl ? (
          <a
            href={section.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-2xl bg-emerald-700 text-white font-bold tracking-widest"
          >
            {section.ctaLabel || "Buy"}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
          </a>
        ) : null}
      </article>
    </section>
  );
}
