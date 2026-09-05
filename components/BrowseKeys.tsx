import { useEffect } from "react";
import { useIntro } from "../context/IntroContext";
import {
  currentSectionIndex,
  isEditableTarget,
  pickVisibleCarousel,
  scrollToSiteSection,
  siteSections,
} from "../lib/browseNav";

export default function BrowseKeys() {
  const { phase } = useIntro();

  useEffect(() => {
    if (phase === "booting" || phase === "loading") return;

    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const { key } = event;
      if (key !== "ArrowLeft" && key !== "ArrowRight" && key !== "ArrowUp" && key !== "ArrowDown") return;
      if (isEditableTarget(event.target)) return;
      if (document.querySelector("[data-art-lightbox]")) return;
      if (document.querySelector("[data-nav-drawer]")) return;

      if (key === "ArrowLeft" || key === "ArrowRight") {
        const carousel = pickVisibleCarousel();
        if (!carousel) return;
        event.preventDefault();
        if (key === "ArrowRight") carousel.next();
        else carousel.prev();
        return;
      }

      const sections = siteSections();
      if (!sections.length) return;
      const index = currentSectionIndex(sections);
      const next = key === "ArrowDown" ? Math.min(sections.length - 1, index + 1) : Math.max(0, index - 1);
      if (next === index) return;
      event.preventDefault();
      scrollToSiteSection(sections[next]);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  return null;
}
