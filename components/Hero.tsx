import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import type { SiteSection } from "../lib/types";
import { useSite } from "../context/SiteContext";
import { useIntro } from "../context/IntroContext";
import HeroArtworkShowcase from "./HeroArtworkShowcase";
import HeroPortrait from "./HeroPortrait";

export default function Hero({ section }: { section: SiteSection }) {
  const { content } = useSite();
  const { landed, skip } = useIntro();
    const words = section.words?.filter(Boolean).length
      ? section.words
      : [section.title || content.brand.name || "Jeeva Art School"];
  const [text] = useTypewriter({
    words,
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="pt-1 sm:pt-2 md:pt-3 min-h-[calc(100vh-57px)] flex flex-col items-center justify-center text-center overflow-x-clip relative px-4 pb-4 sm:pb-6">
      <div className="relative mb-1.5 sm:mb-2 flex items-center justify-center pt-1 sm:pt-2 min-h-[6rem] sm:min-h-[7rem]">
        {landed || skip ? (
          <>
            <BackgroundCircles layoutMorph={!skip} />
            <div className="relative z-10">
              <HeroPortrait size="hero" />
            </div>
          </>
        ) : (
          <div className="h-24 w-24 sm:h-28 sm:w-28" aria-hidden />
        )}
      </div>

      <div className="z-10 max-w-3xl space-y-1 sm:space-y-1">
        <p className="uppercase tracking-[0.28em] text-sm font-semibold text-stone-700 dark:text-amber-100">
          {section.title}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-stone-900 dark:text-white min-h-[3rem] flex items-center justify-center tracking-tight">
          <span className="mr-2">{text}</span>
          <Cursor cursorColor="#c2410c" />
        </h1>
        {section.subtitle ? (
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-sm">{section.subtitle}</p>
        ) : null}
        {section.body ? (
          <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-md mx-auto leading-normal hidden sm:block">
            {section.body}
          </p>
        ) : null}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-xs text-stone-600 dark:text-stone-300">
          <div>
            <div className="font-serif text-lg sm:text-lg text-stone-900 dark:text-white">{content.brand.since}</div>
            <div className="uppercase tracking-widest text-[10px] sm:text-[10px]">Teaching since</div>
          </div>
          <div className="h-5 w-px bg-stone-300 dark:bg-stone-700" />
          <div>
            <div className="font-serif text-lg sm:text-lg text-stone-900 dark:text-white">All ages</div>
            <div className="uppercase tracking-widest text-[10px] sm:text-[10px]">Beginner to exam</div>
          </div>
          <div className="h-5 w-px bg-stone-300 dark:bg-stone-700" />
          <div>
            <div className="font-serif text-lg sm:text-lg text-stone-900 dark:text-white">{content.brand.locationLabel}</div>
            <div className="uppercase tracking-widest text-[10px] sm:text-[10px]">Studio</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 pt-4 max-w-full px-1">
          <a
            href={content.brand.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold tracking-wide bg-[#e7f1ea] text-[#1e4a36] border border-[#b7cfc2] hover:bg-[#dcebe2] transition-colors"
          >
            <span>Message on</span>
            <FontAwesomeIcon icon={faWhatsapp} className="text-base text-[#2f6b4c]" />
            <span>WhatsApp</span>
          </a>
          <motion.a
            href={`tel:+${content.brand.phoneRaw}`}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold tracking-wide bg-[#ebe6df] text-[#3d3832] border border-[#c9c1b4] hover:bg-[#e3dcd3] transition-colors"
          >
            <FontAwesomeIcon icon={faPhone} className="text-xs text-[#5c564e]" />
            <span>Call</span>
          </motion.a>
          <Link
            href="#product"
            className="px-4 py-2 rounded-full text-sm font-semibold tracking-wide text-[#5c3534] border border-[#d4b8b4] bg-[#f1e6e3] hover:bg-[#eadad6] transition-colors"
          >
            View artworks for sale
          </Link>
          <a
            href={content.brand.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold tracking-wide text-[#2a4556] border border-[#b7c7d2] bg-[#e6eef3] hover:bg-[#dce7ee] transition-colors"
          >
            <FontAwesomeIcon icon={faLocationDot} className="text-xs text-[#3d6178]" />
            <span>View on maps</span>
          </a>
        </div>
      </div>

      {/* Dynamic artwork gallery showcase */}
      <div className="z-10 w-full pt-2 sm:pt-3 max-w-5xl mx-auto">
        <HeroArtworkShowcase />
      </div>
    </div>
  );
}
