import React from "react";
import Header from "./Header";
import SiteRenderer from "./SiteRenderer";
import BrowseKeys from "./BrowseKeys";
import { useSite } from "../context/SiteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

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
      <footer className="relative z-10 border-t border-stone-300 dark:border-white/15 bg-[#efe6d8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 py-10 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-base">
          <div>
            <p className="font-serif text-3xl font-semibold text-stone-900 dark:text-white">{content.brand.name}</p>
            <p className="mt-2 text-stone-700 dark:text-stone-300 font-medium">{content.brand.tagline}</p>
            <p className="mt-2 text-stone-600 dark:text-stone-400 font-medium">{content.footer.note}</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs font-bold mb-3 text-stone-500 dark:text-stone-400">Visit</p>
            <a href={content.brand.maps} target="_blank" rel="noopener noreferrer" className="block hover:underline font-semibold text-stone-800 dark:text-stone-200">
              View in Google Maps
            </a>
            <a href={`tel:+${content.brand.phoneRaw}`} className="block mt-1 hover:underline font-semibold text-stone-800 dark:text-stone-200">
              {content.brand.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs font-bold mb-3 text-stone-500 dark:text-stone-400">Links</p>
            {(content.footer?.links || []).map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block hover:underline mb-1 font-semibold text-stone-800 dark:text-stone-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-stone-300/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
          <p>© 2026 {content.brand.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>Developer:</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">Abhay Kashyap</span>
            <span className="text-stone-400 dark:text-stone-600">·</span>
            <a
              href="https://www.linkedin.com/in/abhay-kashyap/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-sm" />
              LinkedIn
            </a>
            <span className="text-stone-400 dark:text-stone-600">·</span>
            <a
              href="https://github.com/abhay2008"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1.5 transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="text-sm" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
