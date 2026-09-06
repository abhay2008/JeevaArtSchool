import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSite } from "./SiteContext";

interface ToastContextValue {
  showToast: (message: string, durationMs?: number) => void;
  handleCall: (e?: React.MouseEvent) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const { content } = useSite();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string, durationMs = 3200) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToastMessage(message);
    timerRef.current = setTimeout(() => {
      setToastMessage(null);
      timerRef.current = null;
    }, durationMs);
  }, []);

  const handleCall = useCallback(
    (e?: React.MouseEvent) => {
      const phone = content?.brand?.phoneDisplay || "+91 99450 67101";

      // Always copy to clipboard
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(phone).catch(() => {});
      }

      // Check for desktop environment (screen width >= 768px or no touch primary)
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
      if (isDesktop) {
        showToast(`Mobile number copied: ${phone}`);
      }
    },
    [content?.brand?.phoneDisplay, showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, handleCall }}>
      {children}
      {/* Desktop Popup Notification */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-[999999] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-stone-900/95 dark:bg-stone-950/95 text-white shadow-2xl border border-amber-500/40 backdrop-blur-md max-w-md ring-1 ring-black/10"
              role="status"
              aria-live="polite"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                <FontAwesomeIcon icon={faCheck} className="text-sm" />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Copied to Clipboard</p>
                <p className="text-sm font-semibold text-stone-100 truncate">{toastMessage}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

export function useCallStudio() {
  const { handleCall } = useToast();
  return { handleCall };
}
