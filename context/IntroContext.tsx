import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { LayoutGroup } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { lazyWarmImages, preloadImages, splitCriticalAndLazy } from "../lib/preload";

export const PORTRAIT_LAYOUT_ID = "jeeva-hero-portrait";
export const CIRCLES_LAYOUT_ID = "jeeva-hero-circles";

type IntroPhase = "booting" | "loading" | "morphing" | "ready";

interface IntroContextValue {
  phase: IntroPhase;
  progress: number;
  landed: boolean;
  portraitSrc: string;
  skip: boolean;
  isCritical: (src?: string) => boolean;
}

const IntroContext = createContext<IntroContextValue>({
  phase: "ready",
  progress: 1,
  landed: true,
  portraitSrc: "/uploads/mainimage.jpeg",
  skip: true,
  isCritical: () => false,
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children, skip }: { children: ReactNode; skip?: boolean }) {
  const { content } = useSite();
  const [phase, setPhase] = useState<IntroPhase>(skip ? "ready" : "booting");
  const [progress, setProgress] = useState(skip ? 1 : 0);

  const portraitSrc =
    content.sections.find((s) => s.type === "hero")?.profileImage || "/uploads/mainimage.jpeg";

  const { critical, lazy } = useMemo(() => splitCriticalAndLazy(content), [content]);
  const criticalKey = critical.join("|");
  const lazyKey = lazy.join("|");
  const criticalSet = useMemo(() => new Set(critical), [critical]);

  useEffect(() => {
    if (skip) {
      setPhase("ready");
      setProgress(1);
      lazyWarmImages(lazy);
      return;
    }

    let cancelled = false;
    const seen = sessionStorage.getItem("jas-intro-played") === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = Date.now();
    setPhase("loading");

    const safety = window.setTimeout(() => {
      if (!cancelled) setPhase((p) => (p === "loading" || p === "booting" ? "morphing" : p));
    }, 9000);

    preloadImages(critical, (done, total) => {
      if (!cancelled) setProgress(done / total);
    }).then(async () => {
      const minHold = seen || reduce ? 280 : 1400;
      const wait = Math.max(0, minHold - (Date.now() - started));
      await new Promise((r) => window.setTimeout(r, wait));
      if (cancelled) return;
      setProgress(1);
      if (reduce) {
        setPhase("ready");
        sessionStorage.setItem("jas-intro-played", "1");
        return;
      }
      setPhase("morphing");
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, criticalKey]);

  useEffect(() => {
    if (phase !== "morphing") return;
    const t = window.setTimeout(() => {
      setPhase("ready");
      sessionStorage.setItem("jas-intro-played", "1");
    }, 900);
    lazyWarmImages(lazy);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lazyKey]);

  useEffect(() => {
    const lock = phase === "booting" || phase === "loading" || phase === "morphing";
    if (!lock) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [phase]);

  const value: IntroContextValue = {
    phase,
    progress,
    landed: phase === "morphing" || phase === "ready",
    portraitSrc,
    skip: Boolean(skip),
    isCritical: (src) => Boolean(src && criticalSet.has(src)),
  };

  return (
    <IntroContext.Provider value={value}>
      <LayoutGroup>{children}</LayoutGroup>
    </IntroContext.Provider>
  );
}
