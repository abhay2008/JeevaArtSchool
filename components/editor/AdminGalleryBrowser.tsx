import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faExpand } from "@fortawesome/free-solid-svg-icons";
import { useSite } from "../../context/SiteContext";
import { useArtModal } from "../ArtModal";
import { gallerySections, MEDIUM_OPTIONS } from "../../lib/galleries";
import { ensureShowcase } from "../../lib/showcaseArtworks";
import type { ArtworkItem, SiteSection } from "../../lib/types";

type TabId = "showcase" | string;

export default function AdminGalleryBrowser() {
  const { content, updateArtwork, removeArtwork, updateShowcaseItem, removeShowcaseItem } = useSite();
  const { openArtwork } = useArtModal();
  const galleries = gallerySections(content);
  const showcase = ensureShowcase(content.showcase);
  const [tab, setTab] = useState<TabId>("showcase");

  const activeGallery: SiteSection | undefined = galleries.find((g) => g.id === tab);
  const items: ArtworkItem[] = tab === "showcase" ? showcase : activeGallery?.items || [];

  const tabs = useMemo(
    () => [
      { id: "showcase", label: "Landing carousel" },
      ...galleries.map((g) => ({ id: g.id, label: g.title || g.id })),
    ],
    [galleries]
  );

  const open = (item: ArtworkItem) => {
    openArtwork({
      title: item.title,
      description: [item.headline, item.description].filter(Boolean).join(" — "),
      image: item.image,
      medium: item.medium,
    });
  };

  return (
    <div className="mt-10">
      <h2 className="font-serif text-3xl font-semibold text-stone-900 dark:text-white">Galleries</h2>
      <p className="mt-2 text-base font-medium text-stone-600 dark:text-stone-400 max-w-2xl">
        Click any painting to view it large, the same way visitors do. Edit the name or description underneath, then Save.
      </p>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
              tab === item.id ? "bg-stone-900 text-amber-50" : "bg-white/80 text-stone-700 border border-stone-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "showcase" ? (
        <p className="mt-3 text-sm font-medium text-stone-500">
          These images rotate on the landing page. New uploads can be added here from the form above.
        </p>
      ) : (
        <p className="mt-3 text-sm font-medium text-stone-500">
          {MEDIUM_OPTIONS.find((m) => m.sectionId === tab)?.label || "This gallery"} · {items.length} paintings
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-amber-900/15 bg-white/80 overflow-hidden shadow-sm">
            <button type="button" onClick={() => open(item)} className="relative block w-full aspect-square bg-[#f3eee6] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} className="h-full w-full object-contain p-3" />
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold uppercase tracking-wider">
                  <FontAwesomeIcon icon={faExpand} className="mr-2" />
                  View
                </span>
              </span>
            </button>
            <div className="p-3 space-y-2">
              <input
                value={item.title}
                onChange={(e) =>
                  tab === "showcase"
                    ? updateShowcaseItem(item.id, { title: e.target.value })
                    : updateArtwork(tab, item.id, { title: e.target.value })
                }
                className="w-full rounded-lg border border-stone-300 bg-[#faf6f0] px-2 py-1.5 text-sm font-semibold text-stone-900"
                placeholder="Painting name"
              />
              <input
                value={item.headline || ""}
                onChange={(e) =>
                  tab === "showcase"
                    ? updateShowcaseItem(item.id, { headline: e.target.value })
                    : updateArtwork(tab, item.id, { headline: e.target.value })
                }
                className="w-full rounded-lg border border-stone-300 bg-[#faf6f0] px-2 py-1.5 text-sm text-stone-900"
                placeholder="Headline"
              />
              <textarea
                value={item.description}
                onChange={(e) =>
                  tab === "showcase"
                    ? updateShowcaseItem(item.id, { description: e.target.value })
                    : updateArtwork(tab, item.id, { description: e.target.value })
                }
                rows={2}
                className="w-full rounded-lg border border-stone-300 bg-[#faf6f0] px-2 py-1.5 text-sm text-stone-900"
                placeholder="Short description"
              />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">{item.medium}</p>
              <button
                type="button"
                onClick={() => (tab === "showcase" ? removeShowcaseItem(item.id) : removeArtwork(tab, item.id))}
                className="text-xs font-semibold text-rose-700"
              >
                <FontAwesomeIcon icon={faTrash} className="mr-1" />
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="mt-8 text-stone-500 font-medium">No paintings here yet. Upload some above.</p>
      ) : null}
    </div>
  );
}
