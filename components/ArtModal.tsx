import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface ArtworkData {
  title: string;
  description?: string;
  image: StaticImageData | string;
  medium?: string;
}

interface ArtModalContextType {
  openArtwork: (artwork: ArtworkData) => void;
  closeArtwork: () => void;
}

const ArtModalContext = createContext<ArtModalContextType | undefined>(undefined);

export function useArtModal() {
  const context = useContext(ArtModalContext);
  if (!context) {
    // Return safe fallback if not wrapped in provider
    return {
      openArtwork: () => {},
      closeArtwork: () => {},
    };
  }
  return context;
}

export function ArtModalProvider({ children }: { children: ReactNode }) {
  const [activeArtwork, setActiveArtwork] = useState<ArtworkData | null>(null);

  const openArtwork = (artwork: ArtworkData) => {
    setActiveArtwork(artwork);
  };

  const closeArtwork = () => {
    setActiveArtwork(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeArtwork();
      }
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
  }, [activeArtwork]);

  return (
    <ArtModalContext.Provider value={{ openArtwork, closeArtwork }}>
      {children}
      <AnimatePresence>
        {activeArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeArtwork}
            className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Top bar with title and close button */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90">
                <div className="flex items-center space-x-2">
                  {activeArtwork.medium && (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                      {activeArtwork.medium}
                    </span>
                  )}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                    {activeArtwork.title}
                  </h3>
                </div>

                <button
                  onClick={closeArtwork}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-sm" />
                </button>
              </div>

              {/* Main Image View */}
              <div className="relative flex-1 min-h-0 bg-slate-950/50 flex items-center justify-center p-3 sm:p-5 overflow-hidden">
                <div className="relative h-[68vh] w-full">
                  <Image
                    src={activeArtwork.image}
                    alt={activeArtwork.title}
                    fill
                    className="object-contain rounded-lg"
                    sizes="90vw"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Bottom bar with description */}
              {activeArtwork.description && (
                <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 text-center sm:text-left">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {activeArtwork.description}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ArtModalContext.Provider>
  );
}
