import type { SiteContent } from "./types";
import { SHOWCASE_IMAGE_URLS } from "./showcaseImageUrls";

export function collectImageUrls(content: SiteContent): string[] {
  const urls: string[] = [];
  const push = (src?: string) => {
    if (src && !urls.includes(src)) urls.push(src);
  };

  content.sections?.forEach((section) => {
    if (section.type === "hero") {
      push(section.profileImage);
    }
    if (section.type === "about") {
      push(section.image);
    }
    if (section.type === "gallery") {
      (section.items || []).forEach((item) => push(item.image));
    }
  });
  SHOWCASE_IMAGE_URLS.forEach((src) => push(src));

  return urls;
}

/** First ~70%: portrait, about, two from each gallery, then fill. Rest are lazy. */
export function splitCriticalAndLazy(content: SiteContent): { critical: string[]; lazy: string[] } {
  const all = collectImageUrls(content);
  const critical: string[] = [];
  const seen = new Set<string>();

  const take = (src?: string) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    critical.push(src);
  };

  const hero = content.sections?.find((s) => s.type === "hero");
  const about = content.sections?.find((s) => s.type === "about");
  take(hero?.profileImage || "/uploads/mainimage.jpeg");
  take(about?.image || "/uploads/pallete.png");
  SHOWCASE_IMAGE_URLS.slice(0, 8).forEach((src) => take(src));

  (content.sections || [])
    .filter((s) => s.type === "gallery")
    .forEach((gallery) => {
      (gallery.items || []).slice(0, 2).forEach((item) => take(item.image));
    });

  const target = Math.max(critical.length, Math.ceil(all.length * 0.7));
  for (const src of all) {
    if (critical.length >= target) break;
    take(src);
  }

  const lazy = all.filter((src) => !seen.has(src));
  return { critical, lazy };
}

export function preloadImages(urls: string[], onProgress?: (done: number, total: number) => void): Promise<void> {
  if (urls.length === 0) return Promise.resolve();
  let done = 0;
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          const finish = () => {
            done += 1;
            onProgress?.(done, urls.length);
            resolve();
          };
          img.onload = finish;
          img.onerror = finish;
          img.src = src;
        })
    )
  ).then(() => undefined);
}

export function lazyWarmImages(urls: string[]) {
  if (typeof window === "undefined" || urls.length === 0) return;
  const run = () => {
    urls.forEach((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    });
  };
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 2500 });
  } else {
    window.setTimeout(run, 600);
  }
}
