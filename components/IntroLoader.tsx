import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntro } from "../context/IntroContext";
import HeroPortrait from "./HeroPortrait";
import BackgroundCircles from "./BackgroundCircles";

export default function IntroLoader() {
  const { phase, progress, skip } = useIntro();
  const visible = !skip && (phase === "booting" || phase === "loading" || phase === "morphing");
  const showStage = phase !== "morphing";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #f7f1e8 0%, #f4eee4 45%, #efe6d8 100%)" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "morphing" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-50"
            animate={{ scale: [0.92, 1.06, 0.92], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(244,63,94,0.12) 42%, transparent 70%)",
            }}
          />

          <div className="relative flex h-[240px] w-[240px] items-center justify-center sm:h-[280px] sm:w-[280px]">
            {showStage ? (
              <>
                <motion.div
                  className="absolute inset-6 rounded-full border border-dashed border-amber-700/25"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-12 rounded-full border border-rose-400/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />
                <BackgroundCircles layoutMorph />
                <div className="relative z-10">
                  <HeroPortrait size="loader" />
                </div>
              </>
            ) : null}
          </div>

          <motion.div
            className="relative z-10 mt-10 px-6 text-center"
            animate={{ opacity: phase === "morphing" ? 0 : 1, y: phase === "morphing" ? -12 : 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              Jeeva Art School
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-stone-500">
              Atelier · Bengaluru
            </p>
            <div className="mx-auto mt-6 h-[2px] w-44 overflow-hidden rounded-full bg-stone-300/70">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-rose-400 to-violet-500"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <p className="mt-3 text-xs font-medium tracking-wide text-stone-500">
              Preparing the atelier
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
