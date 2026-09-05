import type { GalleryTheme, SiteContent, SiteSection } from "./types";

export const MEDIUM_OPTIONS: { id: GalleryTheme; label: string; sectionId: string; defaultMedium: string }[] = [
  { id: "acrylic", label: "Acrylic painting", sectionId: "acrylic", defaultMedium: "Acrylic painting" },
  { id: "water", label: "Watercolour", sectionId: "water", defaultMedium: "Watercolour" },
  { id: "tanjore", label: "Tanjore painting", sectionId: "tanjore", defaultMedium: "Tanjore painting" },
  { id: "oil", label: "Oil painting", sectionId: "oil", defaultMedium: "Oil painting" },
  { id: "pencil", label: "Pencil & charcoal", sectionId: "pencil", defaultMedium: "Pencil shading" },
  { id: "student", label: "Emerging artists / students", sectionId: "students", defaultMedium: "Emerging artist" },
];

export const PURPOSE_OPTIONS = [
  { id: "gallery" as const, label: "Gallery — show in this medium’s section" },
  { id: "sale" as const, label: "For sale — original artwork to collect" },
  { id: "student" as const, label: "Student work" },
  { id: "class" as const, label: "Class demonstration / teaching piece" },
];

export function gallerySectionForTheme(content: SiteContent, theme: GalleryTheme): SiteSection | undefined {
  const mapped = MEDIUM_OPTIONS.find((item) => item.id === theme);
  return content.sections.find((section) => section.id === mapped?.sectionId && section.type === "gallery");
}

export function gallerySections(content: SiteContent): SiteSection[] {
  return content.sections.filter((section) => section.type === "gallery" && section.enabled !== false);
}
