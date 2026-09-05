import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSite } from "../../context/SiteContext";
import { MEDIUM_OPTIONS, PURPOSE_OPTIONS } from "../../lib/galleries";
import { uid, cloneContent } from "../../lib/site";
import { ensureShowcase } from "../../lib/showcaseArtworks";
import type { ArtworkItem, GalleryTheme } from "../../lib/types";
import AdminGalleryBrowser from "./AdminGalleryBrowser";

interface Draft {
  id: string;
  file: File;
  preview: string;
  title: string;
  headline: string;
  description: string;
  theme: GalleryTheme;
  purpose: "gallery" | "sale" | "student" | "class";
  includeInShowcase: boolean;
  done: boolean;
}

export default function MassUploadStudio() {
  const { content, uploadFile, appendArtwork, appendShowcase, save, editor } = useSite();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [current, setCurrent] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const remaining = drafts.filter((d) => !d.done).length;
  const active = drafts[current];

  const galleryLabel = useMemo(() => {
    return MEDIUM_OPTIONS.find((m) => m.id === active?.theme)?.label || "";
  }, [active?.theme]);

  const onFiles = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const next: Draft[] = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: uid("up"),
        file,
        preview: URL.createObjectURL(file),
        title: "",
        headline: "",
        description: "",
        theme: "acrylic" as GalleryTheme,
        purpose: "gallery" as const,
        includeInShowcase: true,
        done: false,
      }));
    setDrafts((prev) => {
      prev.forEach((d) => URL.revokeObjectURL(d.preview));
      return next;
    });
    setCurrent(0);
    setMessage(`${next.length} images ready. Fill in each painting while looking at the photo, then publish.`);
  };

  const patch = (partial: Partial<Draft>) => {
    setDrafts((list) => list.map((item, i) => (i === current ? { ...item, ...partial } : item)));
  };

  const markDoneAndNext = () => {
    if (active && !active.title.trim()) {
      setMessage("Please enter a painting name before continuing.");
      return;
    }
    setDrafts((list) => list.map((item, i) => (i === current ? { ...item, done: true } : item)));
    const nextIndex = drafts.findIndex((item, i) => i !== current && !item.done);
    if (nextIndex >= 0) setCurrent(nextIndex);
    setMessage("");
  };

  const publish = async () => {
    const unnamed = drafts.find((d) => !d.title.trim());
    if (unnamed) {
      setMessage("Every painting needs a name before you publish.");
      return;
    }
    setPublishing(true);
    setMessage("Uploading and adding paintings to the galleries…");
    try {
      let updatedContent = cloneContent(content);

      for (let i = 0; i < drafts.length; i++) {
        const draft = drafts[i];
        setMessage(`Uploading painting ${i + 1} of ${drafts.length}: ${draft.title || "Untitled"}…`);
        const url = await uploadFile(draft.file);
        const mapped = MEDIUM_OPTIONS.find((m) => m.id === draft.theme);
        const sectionId = draft.purpose === "student" ? "students" : mapped?.sectionId || "acrylic";
        const item: ArtworkItem = {
          id: uid("art"),
          title: draft.title.trim() || "Untitled",
          headline: draft.headline.trim(),
          description: draft.description.trim(),
          image: url,
          medium: mapped?.defaultMedium || "Artwork",
          purpose: draft.purpose,
          theme: draft.theme,
        };

        updatedContent = {
          ...updatedContent,
          sections: updatedContent.sections.map((sec) =>
            sec.id === sectionId ? { ...sec, items: [...(sec.items || []), item] } : sec
          ),
          showcase: draft.includeInShowcase
            ? [...ensureShowcase(updatedContent.showcase), item]
            : updatedContent.showcase,
        };

        appendArtwork(sectionId, item);
        if (draft.includeInShowcase) appendShowcase(item);
      }

      setMessage("Saving content and committing to GitHub…");
      await save(updatedContent);
      setMessage("Published! The cards and landing carousel now include these paintings. Save again if you edit galleries below.");
      drafts.forEach((d) => URL.revokeObjectURL(d.preview));
      setDrafts([]);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Something failed while publishing";
      setMessage(`${errMsg}. Try again.`);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f4eee4] dark:bg-[#0f1218] px-4 py-8 md:px-10 pb-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-800/80 dark:text-amber-200/80">Studio</p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-stone-900 dark:text-white mt-2">
          Upload paintings
        </h1>
        <p className="mt-3 text-lg font-medium text-stone-600 dark:text-stone-400 max-w-2xl">
          Drop many photos at once. For each image you will see the painting and enter its name, headline, medium, and a short description. That updates the matching gallery cards automatically.
        </p>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onFiles(e.dataTransfer.files);
          }}
          className={`mt-8 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-14 cursor-pointer transition-colors ${
            dragOver ? "border-amber-700 bg-amber-50/80" : "border-amber-900/25 bg-white/50 dark:bg-white/5 hover:border-amber-700/40"
          }`}
        >
          <FontAwesomeIcon icon={faCloudArrowUp} className="text-3xl text-amber-800/70 mb-3" />
          <span className="text-lg font-semibold text-stone-800 dark:text-stone-100">Choose or drop images</span>
          <span className="text-sm font-medium text-stone-500 mt-1">JPEG, PNG, WebP — many files at once</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />
        </label>

        {message ? <p className="mt-4 text-sm font-semibold text-emerald-800 dark:text-emerald-300">{message}</p> : null}

        {drafts.length > 0 && active ? (
          <div className="mt-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div className="rounded-3xl overflow-hidden border border-amber-900/15 bg-stone-900/5 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.preview} alt={active.title || "Painting to describe"} className="w-full max-h-[520px] object-contain bg-[#1a1612]" />
              <div className="px-4 py-3 text-sm font-medium text-stone-600">
                Image {current + 1} of {drafts.length}
                {remaining ? ` · ${remaining} still need details` : " · all described"}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-900/15 bg-white/70 dark:bg-stone-950/60 p-5 shadow-xl space-y-4">
              <p className="text-sm font-medium text-stone-500">Look at the painting on the left, then fill this in.</p>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Painting name</span>
                <input
                  value={active.title}
                  onChange={(e) => patch({ title: e.target.value, done: false })}
                  placeholder="e.g. Peonies in bloom"
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-[#faf6f0] px-3 py-2.5 text-base font-semibold text-stone-900"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Headline</span>
                <input
                  value={active.headline}
                  onChange={(e) => patch({ headline: e.target.value, done: false })}
                  placeholder="A short line on the card"
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-[#faf6f0] px-3 py-2.5 text-base font-medium text-stone-900"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Small description</span>
                <textarea
                  value={active.description}
                  onChange={(e) => patch({ description: e.target.value, done: false })}
                  rows={3}
                  placeholder="What is this painting about?"
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-[#faf6f0] px-3 py-2.5 text-base font-medium text-stone-900"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Medium — which gallery?</span>
                <select
                  value={active.theme}
                  onChange={(e) => patch({ theme: e.target.value as GalleryTheme, done: false })}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-[#faf6f0] px-3 py-2.5 text-base font-semibold text-stone-900"
                >
                  {MEDIUM_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="block mt-1 text-sm text-stone-500">Goes into {galleryLabel} cards</span>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">What is this for?</span>
                <select
                  value={active.purpose}
                  onChange={(e) => patch({ purpose: e.target.value as Draft["purpose"], done: false })}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-[#faf6f0] px-3 py-2.5 text-base font-semibold text-stone-900"
                >
                  {PURPOSE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3 text-sm font-semibold text-stone-700">
                <input
                  type="checkbox"
                  checked={active.includeInShowcase}
                  onChange={(e) => patch({ includeInShowcase: e.target.checked, done: false })}
                  className="h-4 w-4"
                />
                Also add to the landing-page random image shower
              </label>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={markDoneAndNext}
                  className="px-4 py-2 rounded-full bg-emerald-700 text-white text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Save details, next image
                </button>
                <button
                  type="button"
                  onClick={() => setCurrent(Math.max(0, current - 1))}
                  className="px-4 py-2 rounded-full border text-sm font-semibold"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(active.preview);
                    setDrafts((list) => {
                      const next = list.filter((_, i) => i !== current);
                      setCurrent(0);
                      return next;
                    });
                  }}
                  className="px-4 py-2 rounded-full text-rose-700 text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {drafts.length > 0 ? (
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {drafts.map((draft, i) => (
              <button
                key={draft.id}
                type="button"
                onClick={() => setCurrent(i)}
                className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 shrink-0 ${
                  i === current ? "border-amber-600" : "border-transparent"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={draft.preview} alt="" className="h-full w-full object-cover" />
                {draft.done ? (
                  <span className="absolute inset-0 bg-emerald-700/50 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}

        {drafts.length > 0 ? (
          <button
            type="button"
            disabled={publishing}
            onClick={publish}
            className="mt-8 px-8 py-3 rounded-full bg-stone-900 text-amber-50 text-base font-semibold tracking-wide disabled:opacity-60"
          >
            {publishing ? "Publishing…" : `Publish ${drafts.length} paintings to the website`}
          </button>
        ) : null}

        {editor.status ? <p className="mt-3 text-sm text-stone-500">{editor.status}</p> : null}

        <AdminGalleryBrowser />
      </div>
    </div>
  );
}
