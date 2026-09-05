import type { ArtworkItem, GalleryTheme } from "./types";

export interface ShowcaseArtwork {
  id: string;
  title: string;
  medium: string;
  category: "acrylic" | "watercolour" | "tanjore" | "oil" | "pencil" | "charcoal" | "student";
  image: string;
  description: string;
  href: string;
}

// All 30 artwork images from public/uploads beautifully interleaved across mediums
export const BASE_ARTWORKS: ShowcaseArtwork[] = [
  {
    id: "tanjore-lakshmi",
    title: "Goddess Lakshmi",
    medium: "Tanjore painting",
    category: "tanjore",
    image: "/uploads/tanjore.jpeg",
    description: "Classical Thanjavur iconography adorned with 22k embossed gold foil and semi-precious stones.",
    href: "#tanjore",
  },
  {
    id: "acrylic-forest",
    title: "A Forest Scenery",
    medium: "Acrylic painting",
    category: "acrylic",
    image: "/uploads/acrylic.jpeg",
    description: "Lush green trees and winding sunlit forest path on textured canvas.",
    href: "#acrylic",
  },
  {
    id: "water-peonies",
    title: "Peonies in Bloom",
    medium: "Watercolour",
    category: "watercolour",
    image: "/uploads/water.jpeg",
    description: "Layered wet-on-wet washes capturing gentle botanical transparency.",
    href: "#water",
  },
  {
    id: "oil-mountains",
    title: "Smooth Mountains",
    medium: "Oil painting",
    category: "oil",
    image: "/uploads/oil1.jpeg",
    description: "Misty mountain ridges blended with rich oil glazes and subtle atmospheric depth.",
    href: "#oil",
  },
  {
    id: "charcoal-marilyn",
    title: "Marilyn Monroe",
    medium: "Charcoal shading",
    category: "charcoal",
    image: "/uploads/charcoal2.jpeg",
    description: "Dramatic cinematic portrait created with compressed and vine charcoal tonal gradation.",
    href: "#pencil",
  },
  {
    id: "student-vasanth",
    title: "Vasanth",
    medium: "Emerging artist",
    category: "student",
    image: "/uploads/studentvasant.jpeg",
    description: "Original student work developed with individualized studio guidance.",
    href: "#students",
  },
  {
    id: "pencil-elephant",
    title: "An Elephant",
    medium: "Pencil shading",
    category: "pencil",
    image: "/uploads/pencil1.jpeg",
    description: "Hyper-detailed graphite study with realistic skin texture and light modeling.",
    href: "#pencil",
  },
  {
    id: "acrylic-boat",
    title: "An Ocean View",
    medium: "Acrylic painting",
    category: "acrylic",
    image: "/uploads/acrylicboat.jpeg",
    description: "Calm sea waters and coastal boat rendered with expressive acrylic palette.",
    href: "#acrylic",
  },
  {
    id: "tanjore-krish",
    title: "Alilai Krishna",
    medium: "Tanjore painting",
    category: "tanjore",
    image: "/uploads/tanjorekrish.jpeg",
    description: "Balakrishna resting on a banyan leaf with 22k embossed relief work.",
    href: "#tanjore",
  },
  {
    id: "water-temple",
    title: "A Traditional Temple",
    medium: "Watercolour",
    category: "watercolour",
    image: "/uploads/templewater.jpeg",
    description: "Atmospheric architectural study of ancient temple towers in watercolour wash.",
    href: "#water",
  },
  {
    id: "oil-alpine",
    title: "Alpine Scenery",
    medium: "Oil painting",
    category: "oil",
    image: "/uploads/oil2.jpeg",
    description: "Snow-covered peaks and evergreen forest executed in rich oil impasto.",
    href: "#oil",
  },
  {
    id: "student-abhay2",
    title: "Abhay",
    medium: "Emerging artist",
    category: "student",
    image: "/uploads/studentabhay2.jpeg",
    description: "Advanced foundation coursework demonstrating mastery of line and tone.",
    href: "#students",
  },
  {
    id: "pencil-oldman",
    title: "An Old Man",
    medium: "Pencil shading",
    category: "pencil",
    image: "/uploads/pencil2.jpeg",
    description: "Empathetic aged character portrait emphasizing cross-hatching and contour depth.",
    href: "#pencil",
  },
  {
    id: "tanjore-ganesha",
    title: "Lord Ganesha",
    medium: "Tanjore painting",
    category: "tanjore",
    image: "/uploads/tanjoreganesh.jpeg",
    description: "Sacred iconographic painting with 22-carat gold leaves and traditional embellishments.",
    href: "#tanjore",
  },
  {
    id: "acrylic-horse",
    title: "A Noble Horse",
    medium: "Acrylic painting",
    category: "acrylic",
    image: "/uploads/horse.jpeg",
    description: "Dynamic equine study capturing grace, muscle tone, and fiery spirit.",
    href: "#acrylic",
  },
  {
    id: "water-coconut",
    title: "A Coconut Village",
    medium: "Watercolour",
    category: "watercolour",
    image: "/uploads/coconut.jpeg",
    description: "Peaceful South Indian coastal village with swaying palms in warm morning hues.",
    href: "#water",
  },
  {
    id: "oil-river",
    title: "Serene River",
    medium: "Oil painting",
    category: "oil",
    image: "/uploads/oil3.jpeg",
    description: "Reflections of evening light skimming across tranquil slow-moving waters.",
    href: "#oil",
  },
  {
    id: "charcoal-portrait",
    title: "Charcoal Portrait",
    medium: "Charcoal shading",
    category: "charcoal",
    image: "/uploads/charcoal.jpeg",
    description: "Intense chiaroscuro lighting exploring expressive facial features.",
    href: "#pencil",
  },
  {
    id: "student-abhinav",
    title: "Abhinav",
    medium: "Emerging artist",
    category: "student",
    image: "/uploads/studentabhinav.jpeg",
    description: "Dedicated studio practice developing acute observational drawing skills.",
    href: "#students",
  },
  {
    id: "pencil-youngwoman",
    title: "A Young Woman",
    medium: "Pencil shading",
    category: "pencil",
    image: "/uploads/pencil4.jpeg",
    description: "Delicate tonal transitions and fine graphite pencil feathering.",
    href: "#pencil",
  },
  {
    id: "tanjore-krishna",
    title: "Lord Krishna",
    medium: "Tanjore painting",
    category: "tanjore",
    image: "/uploads/tanjorekrishna.jpeg",
    description: "Devotional painting with gold filigree patterns and hand-carved gesso work.",
    href: "#tanjore",
  },
  {
    id: "oil-contrast",
    title: "Colourful Contrast",
    medium: "Oil painting",
    category: "oil",
    image: "/uploads/oil4.jpeg",
    description: "Expressive palette knife work and vibrant pigment contrast on canvas.",
    href: "#oil",
  },
  {
    id: "acrylic-vase",
    title: "A Flower Vase",
    medium: "Acrylic painting",
    category: "acrylic",
    image: "/uploads/arcylicvase.jpeg",
    description: "Rich still life capturing textures of ceramic glaze and layered petals.",
    href: "#acrylic",
  },
  {
    id: "charcoal-shading",
    title: "Shading Portrait",
    medium: "Charcoal shading",
    category: "charcoal",
    image: "/uploads/charcoal3.jpeg",
    description: "Smudged and erased highlights creating sculptural cheekbone contours.",
    href: "#pencil",
  },
  {
    id: "student-sinchana",
    title: "Sinchana",
    medium: "Emerging artist",
    category: "student",
    image: "/uploads/studentsinchana.jpeg",
    description: "Expressive color study highlighting confident personal voice.",
    href: "#students",
  },
  {
    id: "pencil-oldwoman",
    title: "An Old Woman",
    medium: "Pencil shading",
    category: "pencil",
    image: "/uploads/pencil3.jpeg",
    description: "Tender portraiture with sensitive shading around eyes and silver hair.",
    href: "#pencil",
  },
  {
    id: "student-charu",
    title: "Charu",
    medium: "Emerging artist",
    category: "student",
    image: "/uploads/studentcharu.jpeg",
    description: "Exam-ready portfolio submission demonstrating mastery of composition.",
    href: "#students",
  },
  {
    id: "water-portrait",
    title: "A Portrait",
    medium: "Watercolour",
    category: "watercolour",
    image: "/uploads/loafwater.jpeg",
    description: "Subtle skin tones and spontaneous fluid edges on cold-press paper.",
    href: "#water",
  },
  {
    id: "student-abhay-acrylic",
    title: "Abhay (Acrylic)",
    medium: "Emerging artist",
    category: "student",
    image: "/uploads/studentabhay.jpeg",
    description: "Vibrant acrylic experimentation with layered glazes and textural strokes.",
    href: "#students",
  },
  {
    id: "student-abhay-landscape",
    title: "Abhay (Landscape)",
    medium: "Emerging artist",
    category: "student",
    image: "/uploads/studentabhay3.jpeg",
    description: "Atmospheric landscape balancing perspective, value structure, and chromatic harmony.",
    href: "#students",
  },
];

const CATEGORY_THEME: Record<ShowcaseArtwork["category"], GalleryTheme> = {
  acrylic: "acrylic",
  watercolour: "water",
  tanjore: "tanjore",
  oil: "oil",
  pencil: "pencil",
  charcoal: "pencil",
  student: "student",
};

export function defaultShowcaseItems(): ArtworkItem[] {
  return BASE_ARTWORKS.map((art) => ({
    id: art.id,
    title: art.title,
    headline: art.medium,
    description: art.description,
    image: art.image,
    medium: art.medium,
    purpose: art.category === "student" ? "student" : "gallery",
    theme: CATEGORY_THEME[art.category],
  }));
}

export function showcaseCategoryFromItem(item: ArtworkItem): ShowcaseArtwork["category"] {
  const medium = (item.medium || "").toLowerCase();
  if (medium.includes("tanjore")) return "tanjore";
  if (medium.includes("water")) return "watercolour";
  if (medium.includes("oil")) return "oil";
  if (medium.includes("charcoal")) return "charcoal";
  if (medium.includes("pencil")) return "pencil";
  if (medium.includes("student") || medium.includes("emerging") || item.purpose === "student") return "student";
  if (item.theme === "water") return "watercolour";
  if (item.theme === "tanjore") return "tanjore";
  if (item.theme === "oil") return "oil";
  if (item.theme === "pencil") return "pencil";
  if (item.theme === "student") return "student";
  return "acrylic";
}

export function itemsToShowcase(items: ArtworkItem[]): ShowcaseArtwork[] {
  return items.map((item) => {
    const category = showcaseCategoryFromItem(item);
    const href =
      category === "watercolour" ? "#water" :
      category === "charcoal" || category === "pencil" ? "#pencil" :
      category === "student" ? "#students" :
      `#${category}`;
    return {
      id: item.id,
      title: item.title,
      medium: item.medium,
      category,
      image: item.image,
      description: item.description,
      href,
    };
  });
}

export function ensureShowcase(contentShowcase?: ArtworkItem[] | null): ArtworkItem[] {
  if (contentShowcase && contentShowcase.length) return contentShowcase;
  return defaultShowcaseItems();
}
