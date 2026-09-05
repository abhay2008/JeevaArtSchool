import React from "react";
import type { SiteSection } from "../lib/types";

export default function LinksSection({ section }: { section: SiteSection }) {
  return (
    <section className="py-16 px-6 max-w-3xl mx-auto text-center">
      {section.eyebrow ? (
        <p className="uppercase tracking-[0.3em] text-xs text-stone-500 mb-3">{section.eyebrow}</p>
      ) : null}
      <h3 className="font-serif text-4xl text-stone-900 dark:text-white mb-4">{section.title}</h3>
      {section.body ? <p className="text-stone-600 dark:text-stone-400 mb-8">{section.body}</p> : null}
      <div className="flex flex-wrap justify-center gap-3">
        {(section.links || []).map((link) => (
          <a
            key={link.name + link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-stone-300 dark:border-white/15 bg-white/70 dark:bg-white/5 font-semibold"
          >
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
}
