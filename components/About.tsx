import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import type { SiteSection } from "../lib/types";
import { useSite } from "../context/SiteContext";
import { useIntro } from "../context/IntroContext";

export default function About({ section }: { section: SiteSection }) {
  const { content } = useSite();
  const { isCritical } = useIntro();
  const [copySuccess, setCopySuccess] = useState(false);
  const aboutSrc = section.image || "/uploads/pallete.png";

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="py-20 px-6 max-w-6xl mx-auto"
    >
      <p className="uppercase tracking-[0.28em] text-sm font-semibold text-stone-600 text-center mb-3">{section.eyebrow || "About"}</p>
      <h3 className="font-serif text-5xl sm:text-6xl font-semibold text-center text-stone-900 dark:text-white mb-12 tracking-tight">
        {section.title}
      </h3>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square max-w-md mx-auto w-full rounded-3xl bg-gradient-to-br from-violet-500/10 to-amber-500/10 border border-white/40 p-6">
          <Image
            key={aboutSrc}
            src={aboutSrc}
            alt={section.imageAlt || "Palette"}
            fill
            className="object-contain p-6"
            loading={isCritical(aboutSrc) ? "eager" : "lazy"}
            priority={isCritical(aboutSrc)}
          />
        </div>
        <div className="space-y-6">
          <p className="text-lg sm:text-xl leading-relaxed text-stone-700 dark:text-stone-300 font-medium">{section.body}</p>
          {section.quote ? (
            <blockquote className="border-l-4 border-amber-500 pl-5 py-2 italic text-lg text-amber-800 dark:text-amber-200">
              {section.quote}
            </blockquote>
          ) : null}
          <div>
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-400 mb-2">
              {section.contactLabel || "Contact"}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(content.brand.phoneDisplay);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
              }}
              className="inline-flex items-center gap-2 text-lg font-semibold text-violet-800 dark:text-violet-300 underline"
            >
              {content.brand.phoneDisplay}
              <FontAwesomeIcon icon={copySuccess ? faCheck : faCopy} className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
