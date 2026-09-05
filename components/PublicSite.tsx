import React from "react";
import Header from "./Header";
import SiteRenderer from "./SiteRenderer";
import BrowseKeys from "./BrowseKeys";
import { useSite } from "../context/SiteContext";

export default function PublicSite({ liveBadge }: { liveBadge?: boolean }) {
  const { content } = useSite();

  return (
    <>
      <BrowseKeys />
      {liveBadge ? (
        <div className="sticky top-0 z-40 flex items-center justify-center pointer-events-none py-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-700 text-emerald-50 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Live preview
          </span>
        </div>
      ) : null}
      <Header />
      <SiteRenderer />
      <footer className="relative z-10 border-t border-stone-300/50 dark:border-white/10 bg-[#efe6d8]/80 dark:bg-black/20 py-10 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-base">
          <div>
            <p className="font-serif text-3xl font-semibold text-stone-900 dark:text-white">{content.brand.name}</p>
            <p className="mt-2 text-stone-600 dark:text-stone-400 font-medium">{content.brand.tagline}</p>
            <p className="mt-2 text-stone-500 font-medium">{content.footer.note}</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs font-bold mb-3">Visit</p>
            <a href={content.brand.maps} target="_blank" rel="noopener noreferrer" className="block hover:underline font-semibold">
              View in Google Maps
            </a>
            <a href={`tel:+${content.brand.phoneRaw}`} className="block mt-1 hover:underline font-semibold">
              {content.brand.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs font-bold mb-3">Links</p>
            {(content.footer?.links || []).map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block hover:underline mb-1 font-semibold"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
