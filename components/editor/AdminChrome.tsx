import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPlus,
  faRotateLeft,
  faTrash,
  faArrowUp,
  faArrowDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSite } from "../../context/SiteContext";
import type { ArtworkItem, ClassItem, NavLink, SectionType, SiteSection, SocialLink } from "../../lib/types";
import { uid } from "../../lib/site";

const SECTION_TYPES: { type: SectionType; label: string }[] = [
  { type: "hero", label: "Hero" },
  { type: "about", label: "About" },
  { type: "classes", label: "Classes grid" },
  { type: "gallery", label: "Gallery" },
  { type: "shop", label: "Shop" },
  { type: "exam", label: "Exam" },
  { type: "video", label: "Video" },
  { type: "text", label: "Text" },
  { type: "links", label: "Links" },
];

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block text-left mb-3">
      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-[#faf6f0] dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-[#faf6f0] dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100"
        />
      )}
    </label>
  );
}

function ListEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
        <button
          type="button"
          className="text-xs text-violet-600 font-semibold"
          onClick={() => onChange([...values, ""])}
        >
          Add
        </button>
      </div>
      {values.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            value={item}
            onChange={(e) => {
              const next = [...values];
              next[index] = e.target.value;
              onChange(next);
            }}
            className="flex-1 rounded-lg border border-slate-300 bg-[#faf6f0] px-3 py-1.5 text-sm text-stone-900"
          />
          <button type="button" onClick={() => onChange(values.filter((_, i) => i !== index))} className="text-rose-500">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const { uploadFile, resolveImageUrl, unresolveImageUrl } = useSite();
  const [busy, setBusy] = useState(false);

  const canonical = unresolveImageUrl ? unresolveImageUrl(value) : value;
  const preview = resolveImageUrl ? resolveImageUrl(canonical) : value;

  return (
    <div className="mb-4">
      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">{label}</span>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="" className="h-24 w-full object-cover rounded-lg mb-2 border border-slate-200" />
      ) : null}
      <input
        value={canonical}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm mb-2"
      />
      <label className="inline-flex items-center text-xs font-semibold text-violet-700 cursor-pointer">
        {busy ? "Uploading…" : "Upload image or video"}
        <input
          type="file"
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setBusy(true);
            try {
              const url = await uploadFile(file);
              onChange(url);
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
    </div>
  );
}

function SectionFields({ section }: { section: SiteSection }) {
  const { updateSection } = useSite();
  const patch = (partial: Partial<SiteSection>) => updateSection(section.id, partial);

  return (
    <div>
      <Field label="Title" value={section.title || ""} onChange={(title) => patch({ title })} />
      {section.type !== "gallery" && (
        <Field label="Eyebrow / small heading" value={section.eyebrow || ""} onChange={(eyebrow) => patch({ eyebrow })} />
      )}
      <Field label="Subtitle" value={section.subtitle || ""} onChange={(subtitle) => patch({ subtitle })} />
      <Field label="Body" value={section.body || ""} onChange={(body) => patch({ body })} multiline />

      {section.type === "hero" && (
        <>
          <ImageField label="Portrait" value={section.profileImage || ""} onChange={(profileImage) => patch({ profileImage })} />
          <Field label="Portrait alt text" value={section.profileAlt || ""} onChange={(profileAlt) => patch({ profileAlt })} />
          <ListEditor label="Rotating phrases" values={section.words || []} onChange={(words) => patch({ words })} />
          <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Hero buttons</div>
          {(section.buttons || []).map((button, index) => (
            <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-2 mb-2">
              <input
                className="w-full mb-1 rounded border px-2 py-1 text-sm"
                value={button.label}
                onChange={(e) => {
                  const buttons = [...(section.buttons || [])];
                  buttons[index] = { ...button, label: e.target.value };
                  patch({ buttons });
                }}
              />
              <input
                className="w-full rounded border px-2 py-1 text-sm"
                value={button.href}
                onChange={(e) => {
                  const buttons = [...(section.buttons || [])];
                  buttons[index] = { ...button, href: e.target.value };
                  patch({ buttons });
                }}
              />
            </div>
          ))}
        </>
      )}

      {section.type === "about" && (
        <>
          <Field label="Quote" value={section.quote || ""} onChange={(quote) => patch({ quote })} multiline />
          <ImageField label="Side image" value={section.image || ""} onChange={(image) => patch({ image })} />
          <Field label="Contact label" value={section.contactLabel || ""} onChange={(contactLabel) => patch({ contactLabel })} />
        </>
      )}

      {section.type === "shop" && (
        <>
          <Field label="Highlight title" value={section.highlightTitle || ""} onChange={(highlightTitle) => patch({ highlightTitle })} />
          <ListEditor
            label="Highlight lines"
            values={section.highlightLines || []}
            onChange={(highlightLines) => patch({ highlightLines })}
          />
          <Field label="Button label" value={section.ctaLabel || ""} onChange={(ctaLabel) => patch({ ctaLabel })} />
          <Field label="Button URL" value={section.ctaUrl || ""} onChange={(ctaUrl) => patch({ ctaUrl })} />
        </>
      )}

      {section.type === "exam" && (
        <>
          <Field label="Badge" value={section.badge || ""} onChange={(badge) => patch({ badge })} />
          <ListEditor label="Subjects" values={section.subjects || []} onChange={(subjects) => patch({ subjects })} />
          <Field label="Age note" value={section.ageNote || ""} onChange={(ageNote) => patch({ ageNote })} />
        </>
      )}

      {section.type === "video" && (
        <Field label="YouTube / Vimeo / file URL" value={section.videoUrl || ""} onChange={(videoUrl) => patch({ videoUrl })} />
      )}

      {section.type === "gallery" && (
        <>
          <label className="block mb-3 text-sm">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Theme</span>
            <select
              value={section.theme || "acrylic"}
              onChange={(e) => patch({ theme: e.target.value as SiteSection["theme"] })}
              className="w-full rounded-lg border px-2 py-2 bg-white dark:bg-slate-900"
            >
              {["acrylic", "water", "tanjore", "oil", "pencil", "student"].map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Artworks</span>
            <button
              type="button"
              className="text-xs font-semibold text-violet-600"
              onClick={() => {
                const item: ArtworkItem = {
                  id: uid("art"),
                  title: "New artwork",
                  description: "",
                  image: "/uploads/acrylic.jpeg",
                  medium: section.title || "Artwork",
                };
                patch({ items: [...(section.items || []), item] });
              }}
            >
              Add artwork
            </button>
          </div>
          {(section.items || []).map((item, index) => (
            <div key={item.id} className="border rounded-lg p-2 mb-2">
              <ImageField
                label="Image"
                value={item.image}
                onChange={(image) => {
                  const items = [...(section.items || [])];
                  items[index] = { ...item, image };
                  patch({ items });
                }}
              />
              <input
                className="w-full mb-1 rounded border px-2 py-1 text-sm"
                value={item.title}
                onChange={(e) => {
                  const items = [...(section.items || [])];
                  items[index] = { ...item, title: e.target.value };
                  patch({ items });
                }}
              />
              <input
                className="w-full mb-1 rounded border px-2 py-1 text-sm"
                placeholder="Headline"
                value={item.headline || ""}
                onChange={(e) => {
                  const items = [...(section.items || [])];
                  items[index] = { ...item, headline: e.target.value };
                  patch({ items });
                }}
              />
              <input
                className="w-full mb-1 rounded border px-2 py-1 text-sm"
                value={item.description}
                onChange={(e) => {
                  const items = [...(section.items || [])];
                  items[index] = { ...item, description: e.target.value };
                  patch({ items });
                }}
              />
              <input
                className="w-full mb-1 rounded border px-2 py-1 text-sm"
                value={item.medium}
                onChange={(e) => {
                  const items = [...(section.items || [])];
                  items[index] = { ...item, medium: e.target.value };
                  patch({ items });
                }}
              />
              <button
                type="button"
                className="text-xs text-rose-600"
                onClick={() => patch({ items: (section.items || []).filter((art) => art.id !== item.id) })}
              >
                Remove artwork
              </button>
            </div>
          ))}
        </>
      )}

      {section.type === "classes" && (
        <>
          {(section.classes || []).map((item, index) => (
            <div key={item.id} className="border rounded-lg p-2 mb-2">
              <input
                className="w-full mb-1 rounded border px-2 py-1 text-sm"
                value={item.title}
                onChange={(e) => {
                  const classes = [...(section.classes || [])] as ClassItem[];
                  classes[index] = { ...item, title: e.target.value };
                  patch({ classes });
                }}
              />
              <textarea
                className="w-full mb-1 rounded border px-2 py-1 text-sm"
                value={item.description}
                onChange={(e) => {
                  const classes = [...(section.classes || [])];
                  classes[index] = { ...item, description: e.target.value };
                  patch({ classes });
                }}
              />
              <input
                className="w-full rounded border px-2 py-1 text-sm"
                value={item.href}
                onChange={(e) => {
                  const classes = [...(section.classes || [])];
                  classes[index] = { ...item, href: e.target.value };
                  patch({ classes });
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-semibold text-violet-600"
            onClick={() =>
              patch({
                classes: [
                  ...(section.classes || []),
                  { id: uid("class"), title: "New class", description: "", href: "#hero", accent: "acrylic" },
                ],
              })
            }
          >
            Add class card
          </button>
        </>
      )}

      {section.type === "links" && (
        <>
          {(section.links || []).map((link, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                className="flex-1 rounded border px-2 py-1 text-sm"
                value={link.name}
                onChange={(e) => {
                  const links = [...(section.links || [])];
                  links[index] = { ...link, name: e.target.value };
                  patch({ links });
                }}
              />
              <input
                className="flex-1 rounded border px-2 py-1 text-sm"
                value={link.href}
                onChange={(e) => {
                  const links = [...(section.links || [])];
                  links[index] = { ...link, href: e.target.value };
                  patch({ links });
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="text-xs font-semibold text-violet-600"
            onClick={() => patch({ links: [...(section.links || []), { name: "New link", href: "https://" }] })}
          >
            Add link
          </button>
        </>
      )}
    </div>
  );
}

function SiteWideFields() {
  const { content, setContent, updateBrand, updateMeta } = useSite();

  const setNav = (nav: NavLink[]) => setContent({ ...content, nav });
  const setSocial = (social: SocialLink[]) => setContent({ ...content, social });
  const setFooterLinks = (links: NavLink[]) =>
    setContent({ ...content, footer: { ...content.footer, links } });

  return (
    <div>
      <Field label="Browser title" value={content.meta.title} onChange={(title) => updateMeta({ title })} />
      <Field
        label="SEO description"
        value={content.meta.description}
        onChange={(description) => updateMeta({ description })}
        multiline
      />
      <Field label="School name" value={content.brand.name} onChange={(name) => updateBrand({ name })} />
      <Field label="Tagline" value={content.brand.tagline} onChange={(tagline) => updateBrand({ tagline })} />
      <Field
        label="Phone display"
        value={content.brand.phoneDisplay}
        onChange={(phoneDisplay) => updateBrand({ phoneDisplay })}
      />
      <Field label="WhatsApp URL" value={content.brand.whatsapp} onChange={(whatsapp) => updateBrand({ whatsapp })} />
      <Field label="Maps URL" value={content.brand.maps} onChange={(maps) => updateBrand({ maps })} />
      <Field
        label="Location label"
        value={content.brand.locationLabel}
        onChange={(locationLabel) => updateBrand({ locationLabel })}
      />
      <Field
        label="Footer note"
        value={content.footer.note}
        onChange={(note) => setContent({ ...content, footer: { ...content.footer, note } })}
      />

      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-4 mb-2">Navigation</div>
      {content.nav.map((link, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            className="flex-1 rounded border px-2 py-1 text-sm"
            value={link.name}
            onChange={(e) => {
              const nav = [...content.nav];
              nav[index] = { ...link, name: e.target.value };
              setNav(nav);
            }}
          />
          <input
            className="flex-1 rounded border px-2 py-1 text-sm"
            value={link.href}
            onChange={(e) => {
              const nav = [...content.nav];
              nav[index] = { ...link, href: e.target.value };
              setNav(nav);
            }}
          />
        </div>
      ))}

      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-4 mb-2">Social</div>
      {content.social.map((item, index) => (
        <div key={index} className="mb-2">
          <input
            className="w-full rounded border px-2 py-1 text-sm"
            value={item.url}
            onChange={(e) => {
              const social = [...content.social];
              social[index] = { ...item, url: e.target.value };
              setSocial(social);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function AdminChrome() {
  const router = useRouter();
  const { content, editor, setEditMode, setWorkspace, save, reset, addSection, removeSection, moveSection } =
    useSite();
  const [tab, setTab] = useState<"section" | "site">("section");
  const [adding, setAdding] = useState(false);
  const selected = content.sections.find((s) => s.id === editor.selectedId);
  const onStudioPage = router.pathname === "/admin/studio";
  const onPreviewPage = router.pathname === "/admin/preview";

  return (
    <>
      <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 rounded-full bg-slate-950 text-white px-3 py-2 shadow-2xl border border-white/10 ${
        onPreviewPage ? "md:left-[calc((100vw-26rem)/2)]" : ""
      }`}>
        <button
          type="button"
          onClick={() => {
            setEditMode(false);
            void router.push("/admin");
          }}
          className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/10"
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => {
            setWorkspace("preview");
            void router.push("/admin/preview");
          }}
          className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
            onPreviewPage ? "bg-emerald-600" : "bg-white/10"
          }`}
        >
          Preview on
        </button>
        <button
          type="button"
          onClick={() => {
            setWorkspace("studio");
            void router.push("/admin/studio");
          }}
          className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
            onStudioPage ? "bg-amber-600" : "bg-white/10"
          }`}
        >
          Preview off
        </button>
        <button
          type="button"
          onClick={() => save()}
          disabled={editor.saving}
          className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500"
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
          Save
        </button>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/10"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Section
        </button>
        {editor.status ? <span className="hidden sm:inline text-[11px] text-slate-300 px-2 max-w-[220px] truncate">{editor.status}</span> : null}
        {editor.commitUrl ? (
          <a
            href={editor.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20"
          >
            View commit
          </a>
        ) : editor.repoUrl ? (
          <a
            href={editor.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/10"
          >
            GitHub
          </a>
        ) : null}
      </div>

      {onPreviewPage && (
        <aside className="relative z-40 w-full md:w-[26rem] md:shrink-0 h-[58vh] md:h-full overflow-y-auto p-5 bg-white dark:bg-slate-950 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-serif text-2xl">Editor</h2>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">Changes show live on the left</p>
            </div>
            <button type="button" onClick={() => void router.push("/admin")} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Type here and watch the website update immediately. Save when you want it written to disk and GitHub.
          </p>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setTab("section")}
              className={`flex-1 rounded-lg py-2 text-xs font-bold uppercase ${tab === "section" ? "bg-violet-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}
            >
              Section
            </button>
            <button
              type="button"
              onClick={() => setTab("site")}
              className={`flex-1 rounded-lg py-2 text-xs font-bold uppercase ${tab === "site" ? "bg-violet-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}
            >
              Site-wide
            </button>
          </div>

          {tab === "site" ? (
            <>
              <SiteWideFields />
              <button type="button" onClick={reset} className="mt-4 text-xs text-slate-500">
                <FontAwesomeIcon icon={faRotateLeft} className="mr-1" /> Reset to original
              </button>
            </>
          ) : selected ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <button type="button" onClick={() => moveSection(selected.id, "up")} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button type="button" onClick={() => moveSection(selected.id, "down")} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <button
                  type="button"
                  onClick={() => removeSection(selected.id)}
                  className="ml-auto text-rose-600 text-xs font-bold"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete section
                </button>
              </div>
              <SectionFields section={selected} />
            </>
          ) : (
            <p className="text-sm text-slate-500">Select a section on the page to edit it.</p>
          )}
        </aside>
      )}

      {adding && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4" onClick={() => setAdding(false)}>
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl mb-3">Add a section</h3>
            <div className="grid grid-cols-2 gap-2">
              {SECTION_TYPES.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-3 text-sm font-semibold hover:bg-violet-50 dark:hover:bg-violet-950"
                  onClick={() => {
                    addSection(item.type, editor.selectedId || undefined);
                    setAdding(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
