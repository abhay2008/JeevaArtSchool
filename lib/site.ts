import type { SiteContent, SiteSection, SectionType } from "./types";

export const STORAGE_KEY = "jeeva-admin-site-content";

export function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

export function uid(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createEmptySection(type: SectionType): SiteSection {
  const id = uid(type);
  switch (type) {
    case "hero":
      return {
        id,
        type,
        enabled: true,
        title: "New hero",
        subtitle: "Add a short line about the school",
        body: "Welcome students and families.",
        profileImage: "/uploads/mainimage.jpeg",
        profileAlt: "Portrait",
        words: ["Learn art", "Paint", "Draw"],
        buttons: [{ label: "Explore", href: "#about", style: "heroButton" }],
      };
    case "about":
      return {
        id,
        type,
        enabled: true,
        eyebrow: "About",
        title: "About this section",
        body: "Write a short biography or studio story.",
        quote: "A line that students remember.",
        image: "/uploads/pallete.png",
        imageAlt: "Studio",
        contactLabel: "Contact",
      };
    case "classes":
      return {
        id,
        type,
        enabled: true,
        eyebrow: "Classes",
        title: "What we teach",
        subtitle: "Describe your programmes.",
        classes: [
          {
            id: uid("class"),
            title: "New class",
            description: "A short description.",
            href: "#hero",
            accent: "acrylic",
          },
        ],
      };
    case "gallery":
      return {
        id,
        type,
        enabled: true,
        title: "New gallery",
        subtitle: "",
        theme: "acrylic",
        items: [],
      };
    case "shop":
      return {
        id,
        type,
        enabled: true,
        eyebrow: "Shop",
        title: "Artwork for sale",
        highlightTitle: "Original work",
        highlightLines: ["Available to collect"],
        body: "Describe the collection and how to buy.",
        ctaLabel: "Enquire",
        ctaUrl: "https://wa.me/919945067101",
      };
    case "exam":
      return {
        id,
        type,
        enabled: true,
        eyebrow: "Exams",
        title: "Exam coaching",
        body: "Describe the syllabus and who it is for.",
        badge: "Programme",
        subjects: ["Subject one"],
        ageNote: "Age details",
      };
    case "video":
      return {
        id,
        type,
        enabled: true,
        eyebrow: "Video",
        title: "Watch a lesson",
        body: "Paste a YouTube or Vimeo link.",
        videoUrl: "https://www.youtube.com/@jeevakumari3640",
      };
    case "text":
      return {
        id,
        type,
        enabled: true,
        eyebrow: "Note",
        title: "New text section",
        body: "Write anything you want visitors to read.",
      };
    case "links":
      return {
        id,
        type,
        enabled: true,
        eyebrow: "Links",
        title: "Useful links",
        body: "Maps, forms, social pages or class schedules.",
        links: [{ name: "WhatsApp", href: "https://wa.me/919945067101" }],
      };
    default:
      return { id, type: "text", enabled: true, title: "Section", body: "" };
  }
}

export function youtubeEmbed(url: string): { kind: "embed"; src: string } | { kind: "link"; href: string } | null {
  if (!url) return null;
  const trimmed = url.trim();

  const watch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (watch) {
    return { kind: "embed", src: `https://www.youtube.com/embed/${watch[1]}` };
  }

  const shorts = trimmed.match(/youtube\.com\/shorts\/([\w-]{6,})/);
  if (shorts) {
    return { kind: "embed", src: `https://www.youtube.com/embed/${shorts[1]}` };
  }

  const vimeo = trimmed.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return { kind: "embed", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  }

  if (/youtube\.com\/(channel|@|c\/)/.test(trimmed)) {
    return { kind: "link", href: trimmed };
  }

  if (/\.(mp4|webm)(\?|$)/i.test(trimmed) || trimmed.startsWith("/uploads/")) {
    return { kind: "embed", src: trimmed };
  }

  return { kind: "link", href: trimmed };
}
