import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faXmark,
  faPalette,
  faBrush,
  faWater,
  faGem,
  faPencil,
  faGraduationCap,
  faCircleCheck,
  faCompass,
  faLayerGroup,
  faClock,
  faUserGroup,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import type { SiteSection } from "../lib/types";
import { useToast } from "../context/ToastContext";

interface MediumApproach {
  key: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  accent: string;
  badgeBg: string;
  philosophy: string;
  pillars: {
    title: string;
    description: string;
    icon: any;
  }[];
  roadmap: {
    step: string;
    phase: string;
    title: string;
    description: string;
  }[];
  takeaways: string[];
  specs: {
    level: string;
    ageGroup: string;
    duration: string;
    attention: string;
  };
  galleryHash: string;
}

const MEDIUM_APPROACHES: Record<string, MediumApproach> = {
  water: {
    key: "water",
    title: "Watercolour Painting",
    subtitle: "Washes, Blending, Landscapes, Florals, Sculptures & Classical Portraits",
    badge: "Luminous Transparency",
    icon: faWater,
    accent: "from-sky-400 to-blue-600",
    badgeBg: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
    philosophy:
      "Watercolour is the poetry of pigment breathing across wet cotton rag. Master Jeeva Kumari trains students from foundational wash and blending techniques to majestic compositions across landscapes, florals, historical monuments, three-dimensional sculptures, and expressive portraits—harnessing the spontaneous beauty of pigment on cold-pressed cotton rag.",
    pillars: [
      {
        title: "Washes & Seamless Blending",
        description:
          "Perfecting flat, graded, variegated, and wet-into-wet washes with precise pigment-to-water ratio intuition.",
        icon: faWater,
      },
      {
        title: "Landscapes, Flora & Architecture",
        description:
          "Painting atmospheric skyscapes, vibrant floral petals, intricate Indian monuments, and stone sculptures.",
        icon: faCompass,
      },
      {
        title: "Classical Portraits & Negative Space",
        description:
          "Preserving glowing paper highlights while sculpting realistic facial tones, delicate features, and organic textures.",
        icon: faBrush,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Groundwork",
        title: "Paper Stretching & Wash Fundamentals",
        description:
          "Pre-soaking heavyweight 300 GSM cotton rag, moisture control (tea to butter consistency), flat washes, and graded wet-on-wet blending.",
      },
      {
        step: "02",
        phase: "Techniques",
        title: "Washes & Blending Mastery",
        description:
          "Executing seamless edge blending, variegated colour transitions, dry brushing, and preserving luminous negative white paper highlights.",
      },
      {
        step: "03",
        phase: "Nature",
        title: "Florals & Natural Landscapes",
        description:
          "Painting vibrant botanical florals, atmospheric mountain vistas, seasonal tree foliage, and tranquil reflective lake waters.",
      },
      {
        step: "04",
        phase: "Heritage",
        title: "Monuments & Classical Sculptures",
        description:
          "Mastering linear perspective, weathered stone monument masonry, ornate temple pillars, and sculptural light-shade relief.",
      },
      {
        step: "05",
        phase: "Mastery",
        title: "Classical Portraits & Conservation",
        description:
          "Modelling lifelike facial features, delicate skin undertone blending, dry-brush details, and archival museum-grade mounting.",
      },
    ],
    takeaways: [
      "Wet-on-wet, graded & variegated washes",
      "Seamless pigment blending techniques",
      "Atmospheric landscape & floral studies",
      "Historic monuments, sculptures & portraits",
    ],
    specs: {
      level: "Beginner to Advanced",
      ageGroup: "Ages 8 to Adults",
      duration: "Flexible 2-hr sessions",
      attention: "Individual 1-on-1 guidance",
    },
    galleryHash: "#water",
  },
  acrylic: {
    key: "acrylic",
    title: "Acrylic Painting",
    subtitle: "Blending Techniques, Landscapes, Still Life, Foliage & Bird Studies",
    badge: "Contemporary & Vibrant",
    icon: faPalette,
    accent: "from-orange-500 to-rose-500",
    badgeBg: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    philosophy:
      "Acrylic offers unmatched versatility, luminous body, and expressive tactile freedom. Master Jeeva Kumari trains students in modern blending techniques and layering—moving from foundational color mixing to picturesque landscapes, luminous still life, rich forest foliage, and realistic bird studies with palette-knife textures.",
    pillars: [
      {
        title: "Advanced Blending Techniques",
        description:
          "Controlling wet-edge blending, feathered gradients, glazing glazes, and smooth value transitions without muddying.",
        icon: faPalette,
      },
      {
        title: "Landscapes & Foliage Dynamics",
        description:
          "Sculpting organic leaf canopies, forest lighting, textured tree barks, and atmospheric mountain horizons.",
        icon: faLayerGroup,
      },
      {
        title: "Still Life & Avian Studies",
        description:
          "Balancing light sources across reflective still life arrangements and capturing iridescent plumage on birds.",
        icon: faBrush,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Foundation",
        title: "Underpainting & Blending Mechanics",
        description:
          "Value mapping with fluid acrylic washes, practicing slow-drying mediums, and perfecting wet-into-wet blending.",
      },
      {
        step: "02",
        phase: "Form",
        title: "Still Life & Light Logic",
        description:
          "Painting pottery, fruits, glassware, and drapery with accurate cast shadows, core shadows, and specular reflections.",
      },
      {
        step: "03",
        phase: "Environment",
        title: "Scenic Landscapes & Horizon Depth",
        description:
          "Building atmospheric perspective, cloud formations, water ripples, and layered distant mountain ridges.",
      },
      {
        step: "04",
        phase: "Organic Life",
        title: "Foliage Texturing & Forest Studies",
        description:
          "Dappled sunlight through dense botanical foliage, negative leaf painting, and organic brush stroke rhythms.",
      },
      {
        step: "05",
        phase: "Realism",
        title: "Realistic Birds & Impasto Finishing",
        description:
          "Rendering delicate feather barbs, glistening bird eyes, textural palette knife accents, and protective UV varnishing.",
      },
    ],
    takeaways: [
      "Smooth & wet-into-wet blending techniques",
      "Scenic landscapes & atmospheric perspective",
      "Lush botanical foliage & forest light",
      "Lifelike birds, still life & impasto finishes",
    ],
    specs: {
      level: "Beginner to Advanced",
      ageGroup: "Ages 7 to Adults",
      duration: "Flexible 2-hr sessions",
      attention: "Individual 1-on-1 guidance",
    },
    galleryHash: "#acrylic",
  },
  pencil: {
    key: "pencil",
    title: "Pencil Shading & Charcoal Paintings",
    subtitle: "Blending Techniques, Landscapes, Birds, Animals, Monuments, Sculptures, Still Life & Portraits",
    badge: "The Foundation of Art",
    icon: faPencil,
    accent: "from-stone-500 to-zinc-800",
    badgeBg: "bg-stone-500/10 text-stone-700 dark:text-stone-300 border-stone-500/20",
    philosophy:
      "Drawing and tonal shading are the fundamental grammar of all visual art. Students master graphite grades (2H to 8B) and rich willow/compressed charcoal, developing flawless blending techniques across diverse subjects: still life, scenic landscapes, birds, wildlife animals, historic monuments, classical sculptures, and realistic portraits.",
    pillars: [
      {
        title: "Blending Techniques & Value Spectrum",
        description:
          "Seamless tortillon stump, tissue, and brush blending across the complete 9-step tonal scale from pure highlights to pitch blacks.",
        icon: faPencil,
      },
      {
        title: "Still Life, Monuments & Sculptures",
        description:
          "Constructing 3D volume, perspective lines on monumental architecture, and chiselled marble sculpture contours.",
        icon: faCompass,
      },
      {
        title: "Wildlife, Birds & Expressive Portraits",
        description:
          "Rendering fine animal coats, soft feather textures, and anatomical facial proportions with lifelike realism.",
        icon: faLayerGroup,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Calibration",
        title: "Graphite Calibration & Blending",
        description:
          "Exploring pencil grades (2H–8B), stump blending, cross-hatching, pressure control, and charcoal burnishing.",
      },
      {
        step: "02",
        phase: "Structure",
        title: "Still Life & Geometric Volume",
        description:
          "Shading spheres, cylinders, glass vessels, and draped fabrics with accurate core shadows and reflected light.",
      },
      {
        step: "03",
        phase: "Heritage",
        title: "Landscapes & Historic Monuments",
        description:
          "Architectural perspective, temple arches, stone monument textures, and dramatic atmospheric sky shading.",
      },
      {
        step: "04",
        phase: "Living Form",
        title: "Birds & Wildlife Animals",
        description:
          "Texturing soft avian feathers, animal fur, whiskers, and realistic animal eyes using fine mono-zero precision erasers.",
      },
      {
        step: "05",
        phase: "Academic Art",
        title: "Sculptures & Human Portraits",
        description:
          "Shading classical stone sculptures, facial bone structure, lip/eye anatomy, and sealing with archival spray fixative.",
      },
    ],
    takeaways: [
      "Tortillon, tissue & brush blending techniques",
      "Still life, drapery & geometric volume",
      "Historic monuments & classical sculptures",
      "Detailed birds, wildlife animals & portraits",
    ],
    specs: {
      level: "All Levels (Kids to Adults)",
      ageGroup: "Ages 6 to Adults",
      duration: "Flexible 2-hr sessions",
      attention: "Individual 1-on-1 guidance",
    },
    galleryHash: "#pencil",
  },
  pastel: {
    key: "pastel",
    title: "Oil Pastel & Colour Pencil Paintings",
    subtitle: "Rich Pigment Blending, Layering, Burnishing & Vibrant Realistic Studies",
    badge: "Vibrant Pigments",
    icon: faBrush,
    accent: "from-rose-400 to-pink-600",
    badgeBg: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    philosophy:
      "Oil pastels and professional coloured pencils provide rich pigment density, tactile vibrancy, and immediate painterly control without brushes. Students learn professional pigment layering, solvent underwashes, burnishing, sgraffito, and seamless color blending to create breathtakingly realistic still life, florals, landscapes, and wildlife studies.",
    pillars: [
      {
        title: "Pigment Blending & Temperature Harmony",
        description:
          "Blending oil pastels with blending stumps and mineral oils for smooth, buttery transitions and saturated hues.",
        icon: faBrush,
      },
      {
        title: "Layering & Burnishing Techniques",
        description:
          "Stacking light-to-dark colored pencil layers on heavy-tooth paper, finishing with colorless blender burnishing.",
        icon: faLayerGroup,
      },
      {
        title: "Realistic Textures & Sgraffito",
        description:
          "Etching fine details, animal whiskers, crisp floral petals, and reflective glass surfaces.",
        icon: faPalette,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Fundamentals",
        title: "Paper Tooth & Pigment Properties",
        description:
          "Swatching oil pastels and wax/oil colour pencils on sanded and heavyweight papers to test tooth capacity.",
      },
      {
        step: "02",
        phase: "Layering",
        title: "Multi-Layering & Tonal Gradients",
        description:
          "Laying down gentle base tones, cross-hatching, and feathering colored pencil gradients without wax bloom.",
      },
      {
        step: "03",
        phase: "Blending",
        title: "Oil Pastel Blending & Solvent Washes",
        description:
          "Applying opaque pastels, blending with light baby oil/mineral spirits, and achieving paint-like smoothness.",
      },
      {
        step: "04",
        phase: "Detail",
        title: "Sgraffito & Fine Detailing",
        description:
          "Scratching into thick pigment layers to expose bright under-layers for highlights, feathers, and botanical veins.",
      },
      {
        step: "05",
        phase: "Mastery",
        title: "Burnishing & Archival Preservation",
        description:
          "Polishing surfaces with heavy burnishing for glassy depth, applying protective fixative, and matting.",
      },
    ],
    takeaways: [
      "Rich oil pastel blending & solvent smoothing",
      "Colour pencil multi-layering & burnishing",
      "Vibrant realistic still life & floral studies",
      "Sgraffito texturing & archival protection",
    ],
    specs: {
      level: "Beginner to Advanced",
      ageGroup: "Ages 6 to Adults",
      duration: "Flexible 2-hr sessions",
      attention: "Individual 1-on-1 guidance",
    },
    galleryHash: "#classes",
  },
  tanjore: {
    key: "tanjore",
    title: "Tanjore, Folk & Fabric Art",
    subtitle: "22k Gold Tanjore, Madhubani, Warli & Fabric Art on Sarees, Blouses, Dupattas & Kurtas",
    badge: "Centuries-Old Heritage",
    icon: faGem,
    accent: "from-amber-400 to-yellow-600",
    badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    philosophy:
      "A rich immersion into India's sacred and folk art heritage. Master Jeeva Kumari trains students in classical 22k gold foil Tanjore painting on teak boards, authentic Madhubani folk art, Warli tribal motifs, and beautiful fabric painting on blouses, sarees, dupattas, and kurtas—preserving traditional relief techniques, gem setting, and durable textile artistry.",
    pillars: [
      {
        title: "Traditional 22k Gold Tanjore",
        description:
          "Crafting authentic teakwood boards, limestone relief muck-work, Jaipur gemstone setting, and 22-carat gold foil gilding.",
        icon: faGem,
      },
      {
        title: "Folk Heritage (Madhubani & Warli)",
        description:
          "Traditional line work of Mithila Madhubani and sacred rhythmic geometric circles of Maharashtra's Warli art.",
        icon: faCompass,
      },
      {
        title: "Wearable Fabric Art on Apparel",
        description:
          "Hand-painting traditional motifs on blouses, sarees, dupattas, and kurtas with colorfast, wash-resistant pigments.",
        icon: faBrush,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Plank & Line Base",
        title: "Plank Mounting & Folk Line Fundamentals",
        description:
          "Preparing teakwood with cotton fabric and gesso, alongside Madhubani borders and Warli stick figures.",
      },
      {
        step: "02",
        phase: "Relief Work",
        title: "Relief Muck-work & Gem Setting",
        description:
          "Coning traditional limestone relief paste for intricate crowns, arches, and pillars; inlaying sparkling Jaipur stones.",
      },
      {
        step: "03",
        phase: "Gilding",
        title: "22k Gold Leaf Gilding",
        description:
          "Sizing and applying genuine 22-carat gold foil over relief work, burnishing smooth surfaces for brilliant temple shine.",
      },
      {
        step: "04",
        phase: "Deity Painting",
        title: "Icon Painting & Divine Expressions",
        description:
          "Painting classical deities with serene eyes, luminous skin tones, and rich silk garments using fine brushes.",
      },
      {
        step: "05",
        phase: "Wearable Art",
        title: "Fabric Painting on Apparel",
        description:
          "Transferring designs onto blouses, sarees, dupattas, and kurtas; blending fabric acrylics and heat-curing for washability.",
      },
    ],
    takeaways: [
      "Authentic 22k gold foil Tanjore painting",
      "Limestone relief muck-work & Jaipur stones",
      "Traditional Madhubani & Warli folk art",
      "Fabric painting on blouses, sarees, dupattas & kurtas",
    ],
    specs: {
      level: "Zero prior experience needed",
      ageGroup: "Teens & Adults",
      duration: "Comprehensive module",
      attention: "Master-led hands-on guidance",
    },
    galleryHash: "#tanjore",
  },
  oil: {
    key: "oil",
    title: "Oil Painting",
    subtitle: "Luminous Glazes, Chiaroscuro & Classical Realism",
    badge: "Old Masters Medium",
    icon: faBrush,
    accent: "from-emerald-400 to-green-700",
    badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    philosophy:
      "The medium of Leonardo, Rembrandt, and Raja Ravi Varma. In our studio, students learn oil painting through the timeless 'fat-over-lean' rule, luminous multi-layer glazing, and seamless edge softening that gives lifelike depth and atmosphere to portraits and landscapes.",
    pillars: [
      {
        title: "Medium Dynamics & Chemistry",
        description:
          "Balancing linseed oil, odorless mineral spirits, and drying mediums for smooth blending and permanent adhesion.",
        icon: faCompass,
      },
      {
        title: "Edge Control & Softening",
        description:
          "Creating lost, soft, and crisp hard edges with filbert and fan brushes for striking 3D optical realism.",
        icon: faBrush,
      },
      {
        title: "Glazing & Optical Color Mixing",
        description:
          "Achieving glowing luminosity by floating transparent glazes over cured grisaille underpaintings.",
        icon: faLayerGroup,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Toning",
        title: "Imprimatura & Sight-Size Layout",
        description:
          "Toning canvas with transparent raw umber and establishing proportion using the sight-size measurement method.",
      },
      {
        step: "02",
        phase: "Value Study",
        title: "Monochromatic Grisaille",
        description:
          "Sculpting 3D light and shadow using single-pigment value studies before introducing color.",
      },
      {
        step: "03",
        phase: "Lean Base",
        title: "Lean Block-in & Color Matching",
        description:
          "Blocking mass shapes with low-oil pigment diluted with mineral spirits for fast, solid adhesion.",
      },
      {
        step: "04",
        phase: "Fat Layers",
        title: "Fat Layering & Edge Softening",
        description:
          "Increasing oil content in upper layers, blending portrait skin tones and clouds with buttery textures.",
      },
      {
        step: "05",
        phase: "Finishing",
        title: "Impasto Highlights & Damar Varnish",
        description:
          "Placing crisp specular highlights and applying archival protective varnish after thorough curing.",
      },
    ],
    takeaways: [
      "The 'Fat-over-lean' structural rule",
      "Optical multi-layer glazing & chiaroscuro",
      "Lifelike portraiture & landscape depth",
      "Archival linen canvas conservation",
    ],
    specs: {
      level: "Intermediate to Advanced",
      ageGroup: "Teens & Adults",
      duration: "Flexible 2-hr sessions",
      attention: "Individual 1-on-1 guidance",
    },
    galleryHash: "#oil",
  },
  exam: {
    key: "exam",
    title: "Karnataka Board Drawing Exam Coaching",
    subtitle: "Coaching for Lower & Higher Grade Drawing Exams Conducted by Karnataka Secondary Board",
    badge: "100% Pass Rate Track Record",
    icon: faGraduationCap,
    accent: "from-indigo-500 to-violet-700",
    badgeBg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
    philosophy:
      "Jeeva Art School is an accredited, highly acclaimed coaching institution for the official Lower and Higher Grade Drawing Examinations conducted by the Karnataka Secondary Education Examination Board (KSEEB). Maintaining a proven 100% first-class pass track record, our 6-month intensive programme thoroughly trains students through all 6 official papers with rigorous timed mock exams.",
    pillars: [
      {
        title: "Complete 6-Paper Syllabus Coverage",
        description:
          "In-depth coaching for Object Drawing, Memory Drawing, Nature Study, Geometrical Drawing, and Applied Design.",
        icon: faBookOpen,
      },
      {
        title: "Timed Mock Exam Drills",
        description:
          "Full-length simulated exam sessions adhering to official board timing, paper dimensions, and grading criteria.",
        icon: faClock,
      },
      {
        title: "Government-Recognized Credential",
        description:
          "State-certified qualification valuable for fine arts degree/diploma admissions, teaching posts, and credentials.",
        icon: faGraduationCap,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Paper 1",
        title: "Object & Model Drawing",
        description:
          "Freehand drawing of daily objects, brass pots, and drapery in accurate perspective and value shading.",
      },
      {
        step: "02",
        phase: "Paper 2",
        title: "Memory Drawing & Composition",
        description:
          "Visualizing Indian daily life scenes (marketplaces, village festivals, sports) with proper multi-figure proportions.",
      },
      {
        step: "03",
        phase: "Paper 3",
        title: "Nature & Botanical Study",
        description:
          "Detailed observational rendering of foliage, flower anatomy, and plants with translucent watercolour washes.",
      },
      {
        step: "04",
        phase: "Paper 4",
        title: "Geometrical & Scale Drawing",
        description:
          "Instrumental geometry, scale reductions, angles, tangents, elevations, and sectional architectural views.",
      },
      {
        step: "05",
        phase: "Papers 5 & 6",
        title: "Applied Design & 3 Full Mock Exams",
        description:
          "Decorative patterns, colour harmony, border designs, followed by 3 evaluated mock exam simulations.",
      },
    ],
    takeaways: [
      "Karnataka Board Lower & Higher Grade Certification",
      "100% first-class student pass track record",
      "Complete 6-paper syllabus mastery & timed mocks",
      "Government-recognized credential for arts careers",
    ],
    specs: {
      level: "Students aged 10+ and Adults",
      ageGroup: "School students, Teens & Adults",
      duration: "6-Month Structured Cohort",
      attention: "Individual mock evaluations & scoring",
    },
    galleryHash: "#exam",
  },
};

const accents: Record<string, string> = {
  water: "from-sky-400 to-blue-600",
  acrylic: "from-orange-400 to-rose-500",
  pencil: "from-stone-400 to-zinc-700",
  pastel: "from-rose-400 to-pink-600",
  tanjore: "from-amber-400 to-yellow-600",
  oil: "from-emerald-400 to-green-700",
  exam: "from-indigo-400 to-violet-700",
};

const iconMap: Record<string, any> = {
  water: faWater,
  acrylic: faPalette,
  pencil: faPencil,
  pastel: faBrush,
  tanjore: faGem,
  oil: faBrush,
  exam: faGraduationCap,
};

export default function ClassesGrid({ section }: { section: SiteSection }) {
  const [selectedMediumKey, setSelectedMediumKey] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { handleCall } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMediumKey(null);
      }
    };
    if (selectedMediumKey) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedMediumKey]);

  // Determine current active medium details
  const activeMedium: MediumApproach | null = selectedMediumKey
    ? MEDIUM_APPROACHES[selectedMediumKey] || null
    : null;

  return (
    <section id="classes" className="py-10 sm:py-16 md:py-20 px-3 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
        <p className="uppercase tracking-[0.22em] sm:tracking-[0.28em] text-[11px] sm:text-xs font-bold text-stone-600 dark:text-stone-400 mb-2">
          {section.eyebrow || "Curriculum"}
        </p>
        <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-stone-900 dark:text-white mb-2 sm:mb-3 tracking-tight">
          {section.title}
        </h3>
        {section.subtitle ? (
          <p className="text-xs sm:text-sm md:text-base font-medium text-stone-600 dark:text-stone-400 leading-relaxed px-2">
            {section.subtitle}
          </p>
        ) : null}
        <p className="mt-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Tap any medium to explore our studio approach & roadmap
        </p>
      </div>

      {/* Responsive Two-Column Grid on Mobile, Three-Column on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
        {(section.classes || []).map((item) => {
          const key = item.accent || item.id?.replace("c-", "") || "acrylic";
          const Icon = iconMap[key] || faPalette;
          const accentGradient = accents[key] || accents.acrylic;

          return (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMediumKey(key)}
              className="group text-left rounded-xl sm:rounded-2xl border border-stone-200/90 dark:border-white/10 bg-white/80 dark:bg-white/5 p-3 sm:p-5 hover:border-stone-400 dark:hover:border-white/25 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <div className={`h-1 sm:h-1.5 w-6 sm:w-10 rounded-full bg-gradient-to-r ${accentGradient}`} />
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-stone-100 dark:bg-white/10 flex items-center justify-center text-stone-700 dark:text-stone-300 text-xs sm:text-sm group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={Icon} />
                  </span>
                </div>

                <h4 className="font-serif text-sm sm:text-lg lg:text-xl font-semibold text-stone-900 dark:text-white mb-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs md:text-sm font-medium text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-white/5 flex items-center justify-between text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                <span>View Roadmap</span>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Enlarged Studio Approach & Roadmap Modal via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeMedium && (
              <div
                className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-start sm:items-center justify-center pt-20 sm:pt-6 pb-6 px-3 sm:px-6 overflow-y-auto"
                onClick={() => setSelectedMediumKey(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/15 shadow-2xl p-4 sm:p-7 md:p-8 scrollbar-thin"
                >
                  {/* Sticky Top Header Bar with Dedicated Close Button */}
                  <div className="sticky top-0 z-20 -mx-4 -mt-4 sm:-mx-7 sm:-mt-7 md:-mx-8 md:-mt-8 px-4 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-white/10 flex items-center justify-between gap-3 mb-5 sm:mb-6 rounded-t-2xl sm:rounded-t-3xl shadow-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${activeMedium.badgeBg}`}
                      >
                        <FontAwesomeIcon icon={activeMedium.icon} className="text-[10px]" />
                        {activeMedium.badge}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 truncate hidden xs:inline">
                        Studio Curriculum
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedMediumKey(null)}
                      aria-label="Close details"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20 text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white text-xs font-bold shadow-sm transition-all active:scale-95 shrink-0"
                    >
                      <span>Close</span>
                      <FontAwesomeIcon icon={faXmark} className="text-xs sm:text-sm" />
                    </button>
                  </div>

                  {/* Title & Overview */}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-900 dark:text-white tracking-tight leading-tight">
                      {activeMedium.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400 mt-1">
                      {activeMedium.subtitle}
                    </p>
                  </div>

                  {/* Studio Approach Philosophy Card */}
                  <div className="rounded-xl sm:rounded-2xl p-3.5 sm:p-5 bg-stone-50 dark:bg-white/5 border border-stone-200/80 dark:border-white/10 mb-5 sm:mb-6">
                    <div className="flex items-center gap-2 mb-1.5">
                      <FontAwesomeIcon icon={faCompass} className="text-xs text-amber-600 dark:text-amber-400" />
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                        Our Studio Teaching Approach
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm font-normal text-stone-700 dark:text-stone-300 leading-relaxed">
                      {activeMedium.philosophy}
                    </p>
                  </div>

                  {/* 3 Core Method Pillars */}
                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400 mb-3">
                      Core Pedagogical Pillars
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      {activeMedium.pillars.map((pillar, idx) => (
                        <div
                          key={idx}
                          className="p-3 sm:p-4 rounded-xl border border-stone-200/70 dark:border-white/10 bg-white dark:bg-stone-800/60 flex flex-col justify-start"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs mb-2">
                            <FontAwesomeIcon icon={pillar.icon} />
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-white mb-1 leading-snug">
                            {pillar.title}
                          </p>
                          <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5-Step Curriculum & Mastery Roadmap */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400">
                        Step-by-Step Mastery Roadmap
                      </h4>
                      <span className="text-[10px] font-mono text-stone-600 dark:text-stone-400">5 Progression Phases</span>
                    </div>
                    <div className="space-y-2 sm:space-y-2.5">
                      {activeMedium.roadmap.map((step) => (
                        <div
                          key={step.step}
                          className="flex items-start gap-3 p-2.5 sm:p-3.5 rounded-xl border border-stone-200/70 dark:border-white/10 bg-stone-50/60 dark:bg-white/5 hover:bg-stone-100/70 dark:hover:bg-white/10 transition-colors"
                        >
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center text-xs font-bold font-mono">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-stone-200/80 dark:bg-white/10 text-stone-700 dark:text-stone-300">
                                {step.phase}
                              </span>
                              <h5 className="font-serif text-xs sm:text-sm md:text-base font-semibold text-stone-900 dark:text-white">
                                {step.title}
                              </h5>
                            </div>
                            <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Class Specs Grid & Takeaways */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6 pt-2 border-t border-stone-200/60 dark:border-white/10">
                    <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/10">
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400 mb-2">
                        Class Format & Logistics
                      </h5>
                      <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                        <li className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCompass} className="text-stone-600 text-[10px]" />
                          <span><strong>Skill Level:</strong> {activeMedium.specs.level}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faUserGroup} className="text-stone-600 text-[10px]" />
                          <span><strong>Ages:</strong> {activeMedium.specs.ageGroup}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faClock} className="text-stone-600 text-[10px]" />
                          <span><strong>Sessions:</strong> {activeMedium.specs.duration}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faBookOpen} className="text-stone-600 text-[10px]" />
                          <span><strong>Instruction:</strong> {activeMedium.specs.attention}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/10">
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400 mb-2">
                        Key Mastery Takeaways
                      </h5>
                      <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                        {activeMedium.takeaways.map((takeaway, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-600 text-xs mt-0.5 shrink-0" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-stone-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                      <a
                        href={`https://wa.me/919945067101?text=${encodeURIComponent(
                          `Hello Jeeva Art School, I am interested in learning ${activeMedium.title}. Could you share the class schedule, batches, and enrollment details?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
                      >
                        <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
                        <span>Inquire via WhatsApp</span>
                      </a>
                      <a
                        href="tel:+919945067101"
                        onClick={handleCall}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-white/20 hover:bg-stone-100 dark:hover:bg-white/10 text-stone-800 dark:text-stone-200 font-semibold text-xs sm:text-sm transition-all"
                      >
                        <FontAwesomeIcon icon={faPhone} className="text-xs text-stone-500" />
                        <span>Call Studio</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSelectedMediumKey(null)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-white/15 hover:bg-stone-100 dark:hover:bg-white/10 text-stone-600 dark:text-stone-300 font-semibold text-xs sm:text-sm transition-all"
                      >
                        <FontAwesomeIcon icon={faXmark} className="text-xs text-stone-400" />
                        <span>Close</span>
                      </button>
                    </div>

                    <a
                      href={activeMedium.galleryHash}
                      onClick={() => setSelectedMediumKey(null)}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white underline underline-offset-4 transition-colors"
                    >
                      View paintings in this gallery &rarr;
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}

