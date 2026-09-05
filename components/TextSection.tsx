import React from "react";
import type { SiteSection } from "../lib/types";

export default function TextSection({ section }: { section: SiteSection }) {
  return (
    <section className="py-16 px-6 max-w-3xl mx-auto text-center">
      {section.eyebrow ? (
        <p className="uppercase tracking-[0.3em] text-xs text-stone-500 mb-3">{section.eyebrow}</p>
      ) : null}
      <h3 className="font-serif text-4xl text-stone-900 dark:text-white mb-4">{section.title}</h3>
      <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300 whitespace-pre-wrap">{section.body}</p>
    </section>
  );
}
