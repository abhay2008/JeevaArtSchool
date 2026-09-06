import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import defaultContent from "../content/site.json";
import type { SiteContent, SiteSection, SectionType, ArtworkItem } from "../lib/types";
import { STORAGE_KEY, cloneContent, createEmptySection } from "../lib/site";
import { ensureShowcase } from "../lib/showcaseArtworks";

function hydrateContent(raw: SiteContent): SiteContent {
  const filteredSections = (raw.sections || []).filter(
    (s) => s.id !== "studio-video" && s.type !== "video"
  );
  return {
    ...raw,
    sections: filteredSections,
    showcase: ensureShowcase(raw.showcase),
  };
}

interface EditorState {
  enabled: boolean;
  workspace: "preview" | "studio";
  selectedId: string | null;
  dirty: boolean;
  saving: boolean;
  status: string;
  commitUrl: string;
  repoUrl: string;
}

interface SiteContextValue {
  content: SiteContent;
  editor: EditorState;
  setEditMode: (on: boolean) => void;
  setWorkspace: (workspace: "preview" | "studio") => void;
  selectSection: (id: string | null) => void;
  setContent: (next: SiteContent) => void;
  updateBrand: (patch: Partial<SiteContent["brand"]>) => void;
  updateMeta: (patch: Partial<SiteContent["meta"]>) => void;
  updateSection: (id: string, patch: Partial<SiteSection>) => void;
  addSection: (type: SectionType, afterId?: string) => void;
  removeSection: (id: string) => void;
  moveSection: (id: string, direction: "up" | "down") => void;
  appendArtwork: (sectionId: string, item: ArtworkItem) => void;
  updateArtwork: (sectionId: string, itemId: string, patch: Partial<ArtworkItem>) => void;
  removeArtwork: (sectionId: string, itemId: string) => void;
  appendShowcase: (item: ArtworkItem) => void;
  updateShowcaseItem: (itemId: string, patch: Partial<ArtworkItem>) => void;
  removeShowcaseItem: (itemId: string) => void;
  save: (overrideContent?: SiteContent) => Promise<void>;
  reset: () => void;
  uploadFile: (file: File) => Promise<string>;
  resolveImageUrl?: (url: string) => string;
  unresolveImageUrl?: (url: string) => string;
  previewMap?: Record<string, string>;
}

const defaultContextValue: SiteContextValue = {
  content: defaultContent as SiteContent,
  editor: {
    enabled: false,
    workspace: "preview",
    selectedId: null,
    dirty: false,
    saving: false,
    status: "",
    commitUrl: "",
    repoUrl: "",
  },
  setEditMode: () => {},
  setWorkspace: () => {},
  selectSection: () => {},
  setContent: () => {},
  updateBrand: () => {},
  updateMeta: () => {},
  updateSection: () => {},
  addSection: () => {},
  removeSection: () => {},
  moveSection: () => {},
  appendArtwork: () => {},
  updateArtwork: () => {},
  removeArtwork: () => {},
  appendShowcase: () => {},
  updateShowcaseItem: () => {},
  removeShowcaseItem: () => {},
  save: async () => {},
  reset: () => {},
  uploadFile: async () => "",
  resolveImageUrl: (url: string) => url,
  unresolveImageUrl: (url: string) => url,
  previewMap: {},
};

const SiteContext = createContext<SiteContextValue>(defaultContextValue);

export function useSite() {
  const ctx = useContext(SiteContext);
  return ctx || defaultContextValue;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [canonicalContent, setCanonicalContent] = useState<SiteContent>(() =>
    hydrateContent(defaultContent as SiteContent)
  );
  const canonicalContentRef = useRef<SiteContent>(canonicalContent);
  useEffect(() => {
    canonicalContentRef.current = canonicalContent;
  }, [canonicalContent]);

  const [previewMap, setPreviewMap] = useState<Record<string, string>>({});
  const reverseMapRef = useRef<Record<string, string>>({});

  const [editor, setEditor] = useState<EditorState>({
    enabled: false,
    workspace: "preview",
    selectedId: null,
    dirty: false,
    saving: false,
    status: "",
    commitUrl: "",
    repoUrl: "",
  });

  const unresolveImageUrl = useCallback(
    (url?: string) => {
      if (!url) return url || "";
      const rev = reverseMapRef.current;
      if (rev[url]) return rev[url];
      if (url.startsWith("blob:")) {
        const match = Object.entries(previewMap).find(([_, p]) => p === url);
        if (match) return match[0];
      }
      return url;
    },
    [previewMap]
  );

  const cleanArtwork = useCallback((item: ArtworkItem): ArtworkItem => {
    const rev = reverseMapRef.current;
    if (item.image && rev[item.image]) {
      return { ...item, image: rev[item.image] };
    }
    if (item.image && item.image.startsWith("blob:")) {
      const match = Object.entries(previewMap).find(([_, p]) => p === item.image);
      if (match) {
        return { ...item, image: match[0] };
      }
    }
    return item;
  }, [previewMap]);

  const cleanSection = useCallback(
    (section: SiteSection): SiteSection => {
      const unresolve = (src?: string) => {
        if (!src) return src;
        const rev = reverseMapRef.current;
        if (rev[src]) return rev[src];
        if (src.startsWith("blob:")) {
          const match = Object.entries(previewMap).find(([_, p]) => p === src);
          if (match) return match[0];
        }
        return src;
      };
      return {
        ...section,
        image: unresolve(section.image),
        profileImage: unresolve(section.profileImage),
        items: section.items?.map(cleanArtwork),
      };
    },
    [cleanArtwork, previewMap]
  );

  const cleanContent = useCallback(
    (raw: SiteContent): SiteContent => {
      const unresolve = (src?: string) => {
        if (!src) return src;
        const rev = reverseMapRef.current;
        if (rev[src]) return rev[src];
        if (src.startsWith("blob:")) {
          const match = Object.entries(previewMap).find(([_, p]) => p === src);
          if (match) return match[0];
        }
        return src;
      };
      return {
        ...raw,
        meta: {
          ...raw.meta,
          favicon: unresolve(raw.meta?.favicon) || raw.meta?.favicon,
        },
        sections: raw.sections.map(cleanSection),
        showcase: raw.showcase?.map(cleanArtwork),
      };
    },
    [cleanSection, cleanArtwork, previewMap]
  );

  const displayContent = useMemo<SiteContent>(() => {
    if (Object.keys(previewMap).length === 0) return canonicalContent;

    const resolveImg = (src?: string) => {
      if (!src) return src;
      return previewMap[src] || src;
    };

    return {
      ...canonicalContent,
      meta: {
        ...canonicalContent.meta,
        favicon: resolveImg(canonicalContent.meta?.favicon) || canonicalContent.meta?.favicon,
      },
      sections: canonicalContent.sections.map((section) => ({
        ...section,
        image: resolveImg(section.image),
        profileImage: resolveImg(section.profileImage),
        items: section.items?.map((item) => ({
          ...item,
          image: resolveImg(item.image) || item.image,
        })),
      })),
      showcase: canonicalContent.showcase?.map((item) => ({
        ...item,
        image: resolveImg(item.image) || item.image,
      })),
    };
  }, [canonicalContent, previewMap]);

  const resolveImageUrl = useCallback(
    (url: string) => {
      if (!url) return url;
      return previewMap[url] || url;
    },
    [previewMap]
  );

  const persist = useCallback((_next: SiteContent) => {
    /* Public site is read-only. Content is published from the separate admin app. */
  }, []);

  const setContent = useCallback(
    (next: SiteContent) => {
      const clean = cleanContent(next);
      persist(clean);
      setCanonicalContent(clean);
      setEditor((e) => ({ ...e, dirty: true, status: "Live preview — unsaved" }));
    },
    [persist, cleanContent]
  );

  const updateBrand = useCallback((patch: Partial<SiteContent["brand"]>) => {
    setCanonicalContent((prev) => {
      const next = { ...prev, brand: { ...prev.brand, ...patch } };
      persist(next);
      return next;
    });
    setEditor((e) => ({ ...e, dirty: true, status: "Live preview — unsaved" }));
  }, [persist]);

  const updateMeta = useCallback((patch: Partial<SiteContent["meta"]>) => {
    setCanonicalContent((prev) => {
      const next = { ...prev, meta: { ...prev.meta, ...patch } };
      persist(next);
      return next;
    });
    setEditor((e) => ({ ...e, dirty: true, status: "Live preview — unsaved" }));
  }, [persist]);

  const updateSection = useCallback(
    (id: string, patch: Partial<SiteSection>) => {
      setCanonicalContent((prev) => {
        const next = {
          ...prev,
          sections: prev.sections.map((section) =>
            section.id === id ? cleanSection({ ...section, ...patch }) : section
          ),
        };
        persist(cleanContent(next));
        return next;
      });
      setEditor((e) => ({ ...e, dirty: true, status: "Live preview — unsaved" }));
    },
    [persist, cleanContent, cleanSection]
  );

  const addSection = useCallback(
    (type: SectionType, afterId?: string) => {
      const nextSection = createEmptySection(type);
      setCanonicalContent((prev) => {
        const sections = [...prev.sections];
        const index = afterId ? sections.findIndex((s) => s.id === afterId) : sections.length - 1;
        sections.splice(index >= 0 ? index + 1 : sections.length, 0, nextSection);
        const next = { ...prev, sections };
        persist(next);
        return next;
      });
      setEditor((e) => ({ ...e, selectedId: nextSection.id, enabled: true, dirty: true, status: "Live preview — unsaved" }));
    },
    [persist]
  );

  const removeSection = useCallback(
    (id: string) => {
      setCanonicalContent((prev) => {
        const next = { ...prev, sections: prev.sections.filter((s) => s.id !== id) };
        persist(next);
        return next;
      });
      setEditor((e) => ({
        ...e,
        selectedId: e.selectedId === id ? null : e.selectedId,
        dirty: true,
        status: "Live preview — unsaved",
      }));
    },
    [persist]
  );

  const moveSection = useCallback(
    (id: string, direction: "up" | "down") => {
      setCanonicalContent((prev) => {
        const sections = [...prev.sections];
        const index = sections.findIndex((s) => s.id === id);
        if (index < 0) return prev;
        const target = direction === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= sections.length) return prev;
        const [item] = sections.splice(index, 1);
        sections.splice(target, 0, item);
        const next = { ...prev, sections };
        persist(next);
        return next;
      });
      setEditor((e) => ({ ...e, dirty: true, status: "Live preview — unsaved" }));
    },
    [persist]
  );

  const appendArtwork = useCallback(
    (sectionId: string, item: ArtworkItem) => {
      setCanonicalContent((prev) => {
        const next = {
          ...prev,
          sections: prev.sections.map((section) =>
            section.id === sectionId ? { ...section, items: [...(section.items || []), cleanArtwork(item)] } : section
          ),
        };
        persist(cleanContent(next));
        return next;
      });
      setEditor((e) => ({ ...e, dirty: true, status: "Live preview — unsaved" }));
    },
    [persist, cleanArtwork, cleanContent]
  );

  const updateArtwork = useCallback(
    (sectionId: string, itemId: string, patch: Partial<ArtworkItem>) => {
      setCanonicalContent((prev) => {
        const next = {
          ...prev,
          sections: prev.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  items: (section.items || []).map((item) =>
                    item.id === itemId ? cleanArtwork({ ...item, ...patch }) : item
                  ),
                }
              : section
          ),
        };
        persist(cleanContent(next));
        return next;
      });
      setEditor((e) => ({ ...e, dirty: true, status: "Unsaved changes" }));
    },
    [persist, cleanArtwork, cleanContent]
  );

  const removeArtwork = useCallback(
    (sectionId: string, itemId: string) => {
      setCanonicalContent((prev) => {
        const next = {
          ...prev,
          sections: prev.sections.map((section) =>
            section.id === sectionId
              ? { ...section, items: (section.items || []).filter((item) => item.id !== itemId) }
              : section
          ),
        };
        persist(next);
        return next;
      });
      setEditor((e) => ({ ...e, dirty: true, status: "Unsaved changes" }));
    },
    [persist]
  );

  const appendShowcase = useCallback(
    (item: ArtworkItem) => {
      setCanonicalContent((prev) => {
        const next = { ...prev, showcase: [...ensureShowcase(prev.showcase), cleanArtwork(item)] };
        persist(cleanContent(next));
        return next;
      });
      setEditor((e) => ({ ...e, dirty: true, status: "Unsaved changes" }));
    },
    [persist, cleanArtwork, cleanContent]
  );

  const updateShowcaseItem = useCallback(
    (itemId: string, patch: Partial<ArtworkItem>) => {
      setCanonicalContent((prev) => {
        const next = {
          ...prev,
          showcase: ensureShowcase(prev.showcase).map((item) =>
            item.id === itemId ? cleanArtwork({ ...item, ...patch }) : item
          ),
        };
        persist(cleanContent(next));
        return next;
      });
      setEditor((e) => ({ ...e, dirty: true, status: "Unsaved changes" }));
    },
    [persist, cleanArtwork, cleanContent]
  );

  const removeShowcaseItem = useCallback(
    (itemId: string) => {
      setCanonicalContent((prev) => {
        const next = {
          ...prev,
          showcase: ensureShowcase(prev.showcase).filter((item) => item.id !== itemId),
        };
        persist(next);
        return next;
      });
      setEditor((e) => ({ ...e, dirty: true, status: "Unsaved changes" }));
    },
    [persist]
  );

  const save = useCallback(
    async (overrideContent?: SiteContent) => {
      setEditor((e) => ({ ...e, saving: true, status: "Saving…" }));
      try {
        const target = overrideContent || canonicalContentRef.current;
        const payload = cleanContent(target);
        const res = await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(errData.error || "Save failed");
        }
        const json = (await res.json()) as {
          github?: { commitUrl?: string; htmlUrl?: string };
          githubError?: string;
        };
        persist(payload);
        if (json.github?.commitUrl) {
          setEditor((e) => ({
            ...e,
            saving: false,
            dirty: false,
            status: "Saved and committed to GitHub",
            commitUrl: json.github?.commitUrl || "",
          }));
        } else if (json.githubError) {
          setEditor((e) => ({
            ...e,
            saving: false,
            dirty: false,
            status: `Saved locally. GitHub: ${json.githubError}`,
          }));
        } else {
          setEditor((e) => ({ ...e, saving: false, dirty: false, status: "Saved to content/site.json" }));
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "API write failed";
        setEditor((e) => ({
          ...e,
          saving: false,
          status: `Save failed: ${msg}`,
        }));
      }
    },
    [cleanContent, persist]
  );

  const reset = useCallback(() => {
    const fresh = cloneContent(defaultContent as SiteContent);
    setCanonicalContent(fresh);
    setPreviewMap({});
    reverseMapRef.current = {};
    localStorage.removeItem(STORAGE_KEY);
    setEditor((e) => ({ ...e, dirty: true, selectedId: null, status: "Reset to original copy" }));
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    let previewUrl = "";
    if (typeof window !== "undefined" && typeof URL !== "undefined" && typeof URL.createObjectURL === "function") {
      try {
        previewUrl = URL.createObjectURL(file);
      } catch {
        /* fallback to data url below */
      }
    }

    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

    if (!previewUrl) {
      previewUrl = data;
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, data }),
    });

    if (!res.ok) {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch {
          /* ignore */
        }
      }
      throw new Error("Upload failed");
    }

    const json = (await res.json()) as { url: string; github?: unknown };
    const serverUrl = json.url;

    reverseMapRef.current[previewUrl] = serverUrl;
    setPreviewMap((prev) => ({
      ...prev,
      [serverUrl]: previewUrl,
    }));

    return serverUrl;
  }, []);

  const setEditMode = useCallback((on: boolean) => {
    setEditor((e) => ({
      ...e,
      enabled: on,
      selectedId: on ? e.selectedId : null,
      workspace: on ? e.workspace : "preview",
    }));
  }, []);

  const setWorkspace = useCallback((workspace: "preview" | "studio") => {
    setEditor((e) => ({ ...e, enabled: true, workspace, selectedId: workspace === "studio" ? null : e.selectedId }));
  }, []);

  const selectSection = useCallback((id: string | null) => {
    setEditor((e) => ({ ...e, selectedId: id, enabled: true, workspace: "preview" }));
  }, []);

  const value = useMemo<SiteContextValue>(
    () => ({
      content: displayContent,
      editor,
      setEditMode,
      setWorkspace,
      selectSection,
      setContent,
      updateBrand,
      updateMeta,
      updateSection,
      addSection,
      removeSection,
      moveSection,
      appendArtwork,
      updateArtwork,
      removeArtwork,
      appendShowcase,
      updateShowcaseItem,
      removeShowcaseItem,
      save,
      reset,
      uploadFile,
      resolveImageUrl,
      unresolveImageUrl,
      previewMap,
    }),
    [
      displayContent,
      editor,
      setEditMode,
      setWorkspace,
      selectSection,
      setContent,
      updateBrand,
      updateMeta,
      updateSection,
      addSection,
      removeSection,
      moveSection,
      appendArtwork,
      updateArtwork,
      removeArtwork,
      appendShowcase,
      updateShowcaseItem,
      removeShowcaseItem,
      save,
      reset,
      uploadFile,
      resolveImageUrl,
      unresolveImageUrl,
      previewMap,
    ]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
