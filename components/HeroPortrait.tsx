import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PORTRAIT_LAYOUT_ID, useIntro } from "../context/IntroContext";
import { useSite } from "../context/SiteContext";

export default function HeroPortrait({ size }: { size: "loader" | "hero" }) {
  const { portraitSrc } = useIntro();
  const { content } = useSite();
  const dim = size === "loader" ? "h-36 w-36 sm:h-44 sm:w-44" : "h-24 w-24 sm:h-28 sm:w-28";

  return (
    <motion.div
      layoutId={PORTRAIT_LAYOUT_ID}
      transition={{ type: "spring", stiffness: 70, damping: 16, mass: 0.9 }}
      className={`relative ${dim} shrink-0 rounded-full`}
      style={{ zIndex: 5 }}
    >
      <div className="absolute inset-0 p-[3px] rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-600 shadow-[0_12px_40px_-12px_rgba(180,80,40,0.55)]">
        <div className="relative h-full w-full rounded-full overflow-hidden bg-stone-200">
          <Image
            src={portraitSrc}
            alt={content.brand.name}
            fill
            className="object-cover"
            priority
            sizes="176px"
          />
        </div>
      </div>
    </motion.div>
  );
}
