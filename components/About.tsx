import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faPhone,
  faChevronDown,
  faChevronUp,
  faGraduationCap,
  faPaintBrush,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import type { SiteSection } from "../lib/types";
import { useSite } from "../context/SiteContext";
import { useIntro } from "../context/IntroContext";
import { useToast } from "../context/ToastContext";

export default function About({ section }: { section: SiteSection }) {
  const { content } = useSite();
  const { isCritical } = useIntro();
  const { handleCall } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const aboutSrc = section.image || "/uploads/jeeva.png";
  const phoneDisplay = content?.brand?.phoneDisplay || "+91 99450 67101";

  const onCopyPhone = (e?: React.MouseEvent) => {
    handleCall(e);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2200);
  };

  return (
    <motion.section
      id={section.id || "about"}
      initial={false}
      animate={{ opacity: 1 }}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <div className="text-center mb-8 sm:mb-12">
        <p className="uppercase tracking-[0.22em] sm:tracking-[0.28em] text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">
          {section.eyebrow || "About the teacher"}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 dark:text-white tracking-tight">
          {section.title || "Jeeva Kumari"}
        </h2>
        {section.subtitle ? (
          <p className="mt-2 text-sm sm:text-base font-medium text-stone-600 dark:text-stone-400">
            {section.subtitle}
          </p>
        ) : null}
      </div>

      <div className="rounded-3xl bg-white/70 dark:bg-stone-900/70 border border-amber-900/15 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10">
          {/* Portrait Photo: Compact across all screen sizes */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden shadow-xl border-2 border-amber-500/40 ring-4 ring-amber-500/10 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-stone-800 dark:to-stone-900">
              <Image
                key={aboutSrc}
                src={aboutSrc}
                alt={section.imageAlt || "Jeeva Kumari, art teacher"}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 208px"
                loading={isCritical(aboutSrc) ? "eager" : "lazy"}
                priority={isCritical(aboutSrc)}
              />
            </div>
            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30">
                <FontAwesomeIcon icon={faAward} className="text-amber-600 dark:text-amber-400" />
                Since 2005
              </span>
            </div>
          </div>

          {/* Teacher Biography and Details */}
          <div className="flex-1 min-w-0 space-y-4 text-left">
            {/* Primary Bio Excerpt */}
            <p className="text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium">
              {section.body}
            </p>

            {/* Read More / Read Less Collapsible Content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="extended-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden space-y-4 pt-2"
                >
                  {section.extendedBody ? (
                    <p className="text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium">
                      {section.extendedBody}
                    </p>
                  ) : null}

                  {/* Highlights Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-900/10 dark:border-white/10">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
                        <FontAwesomeIcon icon={faGraduationCap} />
                        <span>Background & Credentials</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-snug">
                        Graduate in Commerce with lifelong artistic dedication. Certified in Higher Grade Drawing by KSEEB Karnataka.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-900/10 dark:border-white/10">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
                        <FontAwesomeIcon icon={faPaintBrush} />
                        <span>Professional Mediums</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-snug">
                        Professional Watercolour, Acrylic, Classic Oil, Tanjore Gold Foil, Pencil Shading & Charcoal.
                      </p>
                    </div>
                  </div>

                  {section.quote ? (
                    <blockquote className="border-l-4 border-amber-500 pl-4 py-2 italic text-sm sm:text-base text-amber-900 dark:text-amber-200 bg-amber-500/5 rounded-r-xl">
                      &ldquo;{section.quote}&rdquo;
                    </blockquote>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Read More / Read Less Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 hover:underline transition-colors py-1 focus:outline-none"
              >
                <span>{isExpanded ? "Show less" : "Read full background & specialties"}</span>
                <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="text-xs" />
              </button>
            </div>

            {/* Contact & Enquiry Action */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {section.contactLabel || "For classes and enquiries"}:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={`tel:+${content.brand.phoneRaw}`}
                  onClick={onCopyPhone}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 hover:bg-amber-200 transition-colors"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-xs text-amber-700 dark:text-amber-400" />
                  <span>{phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={onCopyPhone}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 transition-colors"
                  title="Copy mobile number"
                >
                  <FontAwesomeIcon icon={copySuccess ? faCheck : faCopy} className={`text-xs ${copySuccess ? "text-emerald-600 dark:text-emerald-400" : ""}`} />
                  <span>{copySuccess ? "Copied!" : "Copy"}</span>
                </button>
                <a
                  href={content.brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#e7f1ea] text-[#1e4a36] border border-[#b7cfc2] hover:bg-[#dcebe2] transition-colors"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-sm text-[#2f6b4c]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
