export type SectionType =
  | "hero"
  | "about"
  | "gallery"
  | "shop"
  | "exam"
  | "video"
  | "text"
  | "links"
  | "classes";

export type GalleryTheme = "acrylic" | "water" | "tanjore" | "oil" | "pencil" | "student";

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  network: string;
  url: string;
  color?: string;
}

export interface ArtworkItem {
  id: string;
  title: string;
  headline?: string;
  description: string;
  image: string;
  medium: string;
  purpose?: "gallery" | "sale" | "student" | "class";
  theme?: GalleryTheme;
  price?: number | string;
  isStudentWork?: boolean;
  studentName?: string;
  showInMediumGallery?: boolean;
  showInEmergingArtists?: boolean;
}

export interface HeroButton {
  label: string;
  href: string;
  style: string;
}

export interface ClassItem {
  id: string;
  title: string;
  description: string;
  href: string;
  accent: string;
}

export interface SiteSection {
  id: string;
  type: SectionType;
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  body?: string;
  extendedBody?: string;
  quote?: string;
  image?: string;
  imageAlt?: string;
  theme?: GalleryTheme;
  items?: ArtworkItem[];
  buttons?: HeroButton[];
  words?: string[];
  profileImage?: string;
  profileAlt?: string;
  highlightTitle?: string;
  highlightLines?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  badge?: string;
  subjects?: string[];
  ageNote?: string;
  videoUrl?: string;
  links?: NavLink[];
  classes?: ClassItem[];
  contactLabel?: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    favicon: string;
  };
  brand: {
    name: string;
    tagline: string;
    phoneDisplay: string;
    phoneRaw: string;
    whatsapp: string;
    maps: string;
    locationLabel: string;
    since: string;
  };
  social: SocialLink[];
  nav: NavLink[];
  footer: {
    note: string;
    links: NavLink[];
  };
  sections: SiteSection[];
  /** Landing-page rotating artwork shower */
  showcase?: ArtworkItem[];
}
