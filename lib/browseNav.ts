export type CarouselHandle = {
  el: HTMLElement;
  next: () => void;
  prev: () => void;
};

const carousels = new Set<CarouselHandle>();

export function registerBrowseCarousel(handle: CarouselHandle) {
  carousels.add(handle);
  return () => {
    carousels.delete(handle);
  };
}

export function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
}

function viewport() {
  const preview = document.getElementById("site-preview");
  if (preview) return preview.getBoundingClientRect();
  return { top: 0, bottom: window.innerHeight, height: window.innerHeight };
}

function overlapY(el: HTMLElement) {
  const vp = viewport();
  const r = el.getBoundingClientRect();
  return Math.max(0, Math.min(r.bottom, vp.bottom) - Math.max(r.top, vp.top));
}

export function pickVisibleCarousel(): CarouselHandle | null {
  let best: CarouselHandle | null = null;
  let bestScore = 0;
  carousels.forEach((item) => {
    if (!item.el.isConnected) return;
    const score = overlapY(item.el);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  });
  if (bestScore < 80) return null;
  return best;
}

export function siteSections(): HTMLElement[] {
  const scope = document.getElementById("site-preview") || document;
  const sections = Array.from(scope.querySelectorAll("main > section[id]")) as HTMLElement[];
  const footer = scope.querySelector("footer");
  if (footer instanceof HTMLElement) sections.push(footer);
  return sections.filter((el) => el.getClientRects().length > 0);
}

export function scrollToSiteSection(el: HTMLElement) {
  const preview = document.getElementById("site-preview");
  if (preview && preview.contains(el)) {
    const previewRect = preview.getBoundingClientRect();
    const targetRect = el.getBoundingClientRect();
    preview.scrollTo({
      top: preview.scrollTop + (targetRect.top - previewRect.top) - 72,
      behavior: "smooth",
    });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function currentSectionIndex(sections: HTMLElement[]) {
  const vp = viewport();
  const line = vp.top + Math.min(96, vp.height * 0.2);
  let best = 0;
  let bestDist = Infinity;
  sections.forEach((el, i) => {
    const dist = Math.abs(el.getBoundingClientRect().top - line);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  return best;
}
