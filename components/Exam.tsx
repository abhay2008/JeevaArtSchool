import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import type { SiteSection } from "../lib/types";

export default function Exam({ section }: { section: SiteSection }) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <article className="rounded-3xl p-6 sm:p-12 bg-gradient-to-br from-indigo-50 to-violet-100 dark:from-[#161427] dark:to-[#22172e] border border-indigo-200/70 dark:border-white/10 text-center shadow-xl">
        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4">
          <FontAwesomeIcon icon={faGraduationCap} />
        </div>
        {section.badge ? (
          <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 mb-3">
            {section.badge}
          </span>
        ) : null}
        <p className="uppercase tracking-[0.22em] sm:tracking-[0.25em] text-xs text-indigo-600 dark:text-indigo-300">{section.eyebrow}</p>
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-900 dark:text-white mt-2 mb-3 sm:mb-4">{section.title}</h3>
        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed mb-6 sm:mb-8">{section.body}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {(section.subjects || []).map((subject, index) => (
            <span
              key={index}
              className="px-3 py-1 sm:py-1.5 rounded-full bg-white/80 dark:bg-white/10 text-xs sm:text-sm font-semibold border border-black/5"
            >
              {subject}
            </span>
          ))}
          {section.ageNote ? (
            <span className="px-3 py-1 sm:py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold">
              {section.ageNote}
            </span>
          ) : null}
        </div>
      </article>
    </section>
  );
}
