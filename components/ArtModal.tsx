import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface ArtworkData {
  id?: string;
  title: string;
  description?: string;
  image: string;
  medium?: string;
}

interface ArtModalContextType {
  openArtwork: (artwork: ArtworkData) => void;
  closeArtwork: () => void;
  prefetchArtwork: (src?: string) => void;
}

const ArtModalContext = createContext<ArtModalContextType | undefined>(undefined);

const warmed = new Set<string>();
const warming = new Set<string>();

export function prefetchArtwork(src?: string) {
  if (!src || typeof window === "undefined" || warmed.has(src) || warming.has(src)) return;
  warming.add(src);
  const img = new window.Image();
  img.decoding = "async";
  img.onload = () => {
    warmed.add(src);
    warming.delete(src);
  };
  img.onerror = () => warming.delete(src);
  img.src = src;
  if (img.complete && img.naturalWidth > 0) {
    warmed.add(src);
    warming.delete(src);
  }
}

export function useArtModal() {
  const context = useContext(ArtModalContext);
  if (!context) {
    return {
      openArtwork: () => {},
      closeArtwork: () => {},
      prefetchArtwork,
    };
  }
  return context;
}

export function ArtModalProvider({ children }: { children: ReactNode }) {
  const [activeArtwork, setActiveArtwork] = useState<ArtworkData | null>(null);
  const [ready, setReady] = useState(false);

  const openArtwork = useCallback((artwork: ArtworkData) => {
    prefetchArtwork(artwork.image);
    setReady(warmed.has(artwork.image));
    setActiveArtwork(artwork);
  }, []);

  const closeArtwork = useCallback(() => {
    setActiveArtwork(null);
    setReady(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeArtwork();
    };
    if (activeArtwork) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeArtwork, closeArtwork]);

  useEffect(() => {
    if (!activeArtwork?.image) return;
    let cancelled = false;
    const src = activeArtwork.image;
    const finish = () => {
      if (cancelled) return;
      warmed.add(src);
      setReady(true);
    };
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };
    img.onerror = finish;
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      if (typeof img.decode === "function") {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    }
    return () => {
      cancelled = true;
    };
  }, [activeArtwork]);

  return (
    <ArtModalContext.Provider value={{ openArtwork, closeArtwork, prefetchArtwork }}>
      <LayoutGroup>
      {children}
      <AnimatePresence>
        {activeArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={closeArtwork}
            data-art-lightbox="true"
            className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-[#1a1410]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#f7f1e8] dark:bg-[#16141f] rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden flex flex-col max-h-[92vh]"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-amber-900/10">
                <div className="flex items-center gap-2 min-w-0">
                  {activeArtwork.medium && (
                    <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/80">
                      {activeArtwork.medium}
                    </span>
                  )}
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-stone-900 dark:text-amber-50 truncate">
                    {activeArtwork.title}
                  </h3>
                </div>
                <button
                  onClick={closeArtwork}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-200/80 dark:bg-white/10 text-stone-700 dark:text-amber-50"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-sm" />
                </button>
              </div>

              <div className="relative flex-1 min-h-0 bg-[#1c1814] flex items-center justify-center p-3 sm:p-5 overflow-hidden">
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  animate={{
                    background: [
                      "radial-gradient(ellipse at 30% 40%, rgba(245,158,11,0.28), transparent 55%)",
                      "radial-gradient(ellipse at 70% 55%, rgba(244,63,94,0.22), transparent 55%)",
                      "radial-gradient(ellipse at 30% 40%, rgba(245,158,11,0.28), transparent 55%)",
                    ],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {!ready ? (
                  <motion.div
                    className="absolute h-24 w-24 rounded-full border-2 border-amber-200/30 border-t-amber-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  />
                ) : null}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={activeArtwork.image}
                  layoutId={activeArtwork.id ? `artwork-${activeArtwork.id}` : undefined}
                  src={activeArtwork.image}
                  alt={activeArtwork.title}
                  initial={activeArtwork.id ? { opacity: 1 } : { opacity: 0, scale: 1.04, filter: "blur(16px)" }}
                  animate={
                    ready
                      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0.35, scale: 1.03, filter: "blur(12px)" }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onLoad={() => setReady(true)}
                  className="relative z-10 max-h-[68vh] max-w-full object-contain rounded-lg shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)]"
                />
              </div>

              {activeArtwork.description ? (
                <div className="px-5 py-3 border-t border-amber-900/10 text-center sm:text-left">
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{activeArtwork.description}</p>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </LayoutGroup>
    </ArtModalContext.Provider>
  );
}
