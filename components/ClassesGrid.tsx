import React, { useState, useEffect } from "react";
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
  acrylic: {
    key: "acrylic",
    title: "Acrylic Painting",
    subtitle: "Dynamic Textures, Color Harmony & Modern Expression",
    badge: "Contemporary & Expressive",
    icon: faPalette,
    accent: "from-orange-500 to-rose-500",
    badgeBg: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    philosophy:
      "Acrylic is loved for its vibrant brilliance and rapid drying time, making it ideal for both luminous glazing and sculptural palette-knife impasto. Master Jeeva Kumari guides students through tonal control, brush dynamics, and color temperature, liberating each student to translate imagination onto canvas without the fear of mistakes.",
    pillars: [
      {
        title: "Palette Dynamics & Tonal Values",
        description: "Mastering warm vs cool bias, color mixing without muddying, and establishing light-to-dark value hierarchy.",
        icon: faPalette,
      },
      {
        title: "Knife & Brush Dynamics",
        description: "Executing smooth gradients, wet-into-wet blending, dry brushing, and tactile palette knife impasto textures.",
        icon: faBrush,
      },
      {
        title: "Signature Composition",
        description: "Moving from photo reference studies to personal storytelling, atmospheric depth, and focal-point harmony.",
        icon: faLayerGroup,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Groundwork",
        title: "Canvas Preparation & Tonal Layout",
        description: "Stretching canvas, applying gesso grounds, and establishing geometric proportions with neutral burnt umber washes.",
      },
      {
        step: "02",
        phase: "Structure",
        title: "Underpainting & Value Block-in",
        description: "Mapping core shadows and midtones with fluid acrylic washes to lock in value hierarchy before color application.",
      },
      {
        step: "03",
        phase: "Color Body",
        title: "Chromatic Layering & Modulation",
        description: "Applying opaque body colors, atmospheric gradients, and wet-into-wet blending for luminous depth.",
      },
      {
        step: "04",
        phase: "Tactile Finish",
        title: "Impasto & Palette Knife Accents",
        description: "Sculpting tactile highlights, floral petals, architectural stonework, and dynamic water reflections.",
      },
      {
        step: "05",
        phase: "Preservation",
        title: "Archival Isolation & UV Varnishing",
        description: "Protecting the completed canvas with a clear isolation coat and satin UV varnish for museum-grade permanence.",
      },
    ],
    takeaways: [
      "Impasto & palette knife techniques",
      "Color temperature & chromatic harmony",
      "Speed & wet-edge blending control",
      "Canvas preservation & varnishing",
    ],
    specs: {
      level: "Beginner to Advanced",
      ageGroup: "Ages 7 to Adults",
      duration: "Flexible 2-hr sessions",
      attention: "Individual 1-on-1 guidance",
    },
    galleryHash: "#acrylic",
  },
  water: {
    key: "water",
    title: "Watercolour Painting",
    subtitle: "Luminous Washes, Flow & Chromatic Transparency",
    badge: "Classical Fluidity",
    icon: faWater,
    accent: "from-sky-400 to-blue-600",
    badgeBg: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
    philosophy:
      "Watercolour is the poetry of pigment breathing across wet cotton rag. Our studio approach teaches patience, pigment-to-water ratio intuition, and negative painting—transforming the unpredictability of water into deliberate, luminous grace.",
    pillars: [
      {
        title: "Water Intuition & Paper Control",
        description: "Mastering moisture states (tea, milk, cream, butter) and preparing 300 GSM 100% cold-pressed cotton paper.",
        icon: faWater,
      },
      {
        title: "Negative Space Preservation",
        description: "Preserving the pristine white of the paper for brilliant natural radiance rather than relying on opaque white paint.",
        icon: faCompass,
      },
      {
        title: "Edge Control & Transparency",
        description: "Navigating lost-and-found edges, seamless variegated washes, and granulating pigment textures.",
        icon: faBrush,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Preparation",
        title: "Paper Stretching & Wetting",
        description: "Pre-soaking heavyweight cotton sheets and taping to eliminate paper buckling during wet-on-wet washes.",
      },
      {
        step: "02",
        phase: "Foundation",
        title: "Wash Mastery & Value Scales",
        description: "Executing flat, graded, and wet-on-wet atmospheric washes with squirrel and mop brushes.",
      },
      {
        step: "03",
        phase: "Glazing",
        title: "Form Building & Transparency",
        description: "Applying transparent chromatic glazes while keeping earlier layers crisp, clean, and un-disturbed.",
      },
      {
        step: "04",
        phase: "Detailing",
        title: "Dry-brushing & Organic Textures",
        description: "Rendering tree bark, water ripples, delicate petals, and architecture with dry synthetic rounds.",
      },
      {
        step: "05",
        phase: "Final Polish",
        title: "Lifting Highlights & Matting",
        description: "Scraping, lifting pigment highlights, and mounting with acid-free archival museum board.",
      },
    ],
    takeaways: [
      "Pigment-to-water ratio intuition",
      "Wet-on-wet & dry-brush dexterity",
      "Preserving radiant negative whites",
      "Botanical, landscape & portrait washes",
    ],
    specs: {
      level: "Beginner to Advanced",
      ageGroup: "Ages 8 to Adults",
      duration: "Flexible 2-hr sessions",
      attention: "Individual 1-on-1 guidance",
    },
    galleryHash: "#water",
  },
  tanjore: {
    key: "tanjore",
    title: "Tanjore Painting",
    subtitle: "Traditional 22k Gold Foil & Sacred Relief Art",
    badge: "Centuries-Old Heritage",
    icon: faGem,
    accent: "from-amber-400 to-yellow-600",
    badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    philosophy:
      "One of South India's greatest classical sacred art traditions. Master Jeeva passes down generations of authentic Thanjavur pedagogy using seasoned teakwood boards, limestone relief muck-work, pure 22-carat gold foil, and semi-precious Jaipur gemstones.",
    pillars: [
      {
        title: "Authentic Substrate Crafting",
        description: "Preparing the traditional wooden plank with fine unbleached cotton, chalk paste, and natural Arabic gum binder.",
        icon: faLayerGroup,
      },
      {
        title: "Embossed Relief Gesso (Muck-work)",
        description: "Sculpting pillars, ornate arches, crowns, and jewelry using traditional limestone paste piped through cones.",
        icon: faGem,
      },
      {
        title: "22k Gold Foil Gilding & Inlay",
        description: "Gilding pure 22-carat gold leaf over relief contours, burnishing to an opulent temple glow.",
        icon: faBrush,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Plank Base",
        title: "Teak Board & Cloth Mounting",
        description: "Seasoning the teakwood board, adhering fine cotton cloth, and applying multiple sanded chalk gesso layers.",
      },
      {
        step: "02",
        phase: "Iconography",
        title: "Sacred Proportions & Drawing",
        description: "Tracing classical iconographic proportions (dhyana shlokas) for deities, thrones, and sacred motifs.",
      },
      {
        step: "03",
        phase: "Relief Work",
        title: "Muck-work & Gem Setting",
        description: "Squeezing raised relief paste for crowns and ornamentation, and setting sparkling Jaipur stones.",
      },
      {
        step: "04",
        phase: "Gilding",
        title: "22-Carat Gold Foil Application",
        description: "Delicately placing authentic 22k gold leaf, pressing into intricate grooves, and burnishing smooth surfaces.",
      },
      {
        step: "05",
        phase: "Icon Painting",
        title: "Sacred Deities & Facial Features",
        description: "Rendering the serene expressions, luminous skin tones, and rich silk drapery with opaque pigments.",
      },
    ],
    takeaways: [
      "Authentic 22k gold leaf gilding",
      "Traditional limestone relief muck-work",
      "Semi-precious Jaipur stone setting",
      "Classical South Indian iconography",
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
        description: "Balancing linseed oil, odorless mineral spirits, and drying mediums for smooth blending and permanent adhesion.",
        icon: faCompass,
      },
      {
        title: "Edge Control & Softening",
        description: "Creating lost, soft, and crisp hard edges with filbert and fan brushes for striking 3D optical realism.",
        icon: faBrush,
      },
      {
        title: "Glazing & Optical Color Mixing",
        description: "Achieving glowing luminosity by floating transparent glazes over cured grisaille underpaintings.",
        icon: faLayerGroup,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Toning",
        title: "Imprimatura & Sight-Size Layout",
        description: "Toning canvas with transparent raw umber and establishing proportion using the sight-size measurement method.",
      },
      {
        step: "02",
        phase: "Value Study",
        title: "Monochromatic Grisaille",
        description: "Sculpting 3D light and shadow using single-pigment value studies before introducing color.",
      },
      {
        step: "03",
        phase: "Lean Base",
        title: "Lean Block-in & Color Matching",
        description: "Blocking mass shapes with low-oil pigment diluted with mineral spirits for fast, solid adhesion.",
      },
      {
        step: "04",
        phase: "Fat Layers",
        title: "Fat Layering & Edge Softening",
        description: "Increasing oil content in upper layers, blending portrait skin tones and clouds with buttery textures.",
      },
      {
        step: "05",
        phase: "Finishing",
        title: "Impasto Highlights & Damar Varnish",
        description: "Placing crisp specular highlights and applying archival protective varnish after thorough curing.",
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
  pencil: {
    key: "pencil",
    title: "Pencil & Charcoal Sketching",
    subtitle: "Tonal Depth, Academic Anatomy & Value Control",
    badge: "The Foundation of Art",
    icon: faPencil,
    accent: "from-stone-500 to-zinc-800",
    badgeBg: "bg-stone-500/10 text-stone-700 dark:text-stone-300 border-stone-500/20",
    philosophy:
      "Drawing is the essential spine of all visual art. We train students to observe like a master artist—dissecting light direction, core shadows, reflected light, and anatomical proportion through graphite grades (2H to 8B) and deep willow charcoal.",
    pillars: [
      {
        title: "Seeing Value & Light Spheres",
        description: "Mapping the 9-step value scale from pure white highlights to deep velvety 8B graphite blacks.",
        icon: faCompass,
      },
      {
        title: "Academic Shading Techniques",
        description: "Mastering cross-hatching, directional contour strokes, tortillon stump blending, and kneaded eraser sculpting.",
        icon: faPencil,
      },
      {
        title: "Proportion, Perspective & Anatomy",
        description: "Sight-size measurement, facial feature placement, still life ellipses, and multi-point vanishing perspective.",
        icon: faLayerGroup,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Calibration",
        title: "Pencil Holding & Line Weight",
        description: "Overhand vs tripod grips, varying line pressure, and hand-eye coordination calibration exercises.",
      },
      {
        step: "02",
        phase: "Volume",
        title: "Geometric Solids & Light Theory",
        description: "Rendering spheres, cylinders, and cubes to master light source, terminator lines, and cast shadows.",
      },
      {
        step: "03",
        phase: "Texture",
        title: "Still Life & Textural Shading",
        description: "Capturing glass transparency, drapery folds, metal sheen, and wood grain through controlled hatching.",
      },
      {
        step: "04",
        phase: "Anatomy",
        title: "Charcoal & Portrait Anatomy",
        description: "Using willow charcoal, compressed charcoal, and white pastel on toned paper for dramatic portraits.",
      },
      {
        step: "05",
        phase: "Finalization",
        title: "Specular Highlights & Fixative",
        description: "Carving razor-sharp highlights with mono-zero erasers and sealing sheets with archival spray fixative.",
      },
    ],
    takeaways: [
      "The full 9-step tonal value scale",
      "Full graphite range (2H to 8B)",
      "Portrait anatomy & still life perspective",
      "Willow charcoal & archival fixatives",
    ],
    specs: {
      level: "All Levels (Kids to Adults)",
      ageGroup: "Ages 6 to Adults",
      duration: "Flexible 2-hr sessions",
      attention: "Individual 1-on-1 guidance",
    },
    galleryHash: "#pencil",
  },
  exam: {
    key: "exam",
    title: "Board Exam Coaching",
    subtitle: "Karnataka Secondary Education Board Drawing Examinations",
    badge: "100% Pass Rate Track Record",
    icon: faGraduationCap,
    accent: "from-indigo-500 to-violet-700",
    badgeBg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
    philosophy:
      "Jeeva Art School is an accredited, highly respected training centre with a stellar track record of 100% first-class pass rates in Karnataka Lower & Higher Drawing Examinations. Our structured 6-month programme prepares students for official government-recognized certification.",
    pillars: [
      {
        title: "Comprehensive Syllabus Coverage",
        description: "Complete preparation for Object Drawing, Memory Drawing, Nature Study, Geometric & Scale Drawing, and Design.",
        icon: faBookOpen,
      },
      {
        title: "Timed Mock Exam Drills",
        description: "Rigorous simulated exam sessions adhering to official board timing, paper dimensions, and scoring criteria.",
        icon: faClock,
      },
      {
        title: "Government-Recognized Credential",
        description: "State board certification recognized across India for fine arts college admissions and teacher appointments.",
        icon: faGraduationCap,
      },
    ],
    roadmap: [
      {
        step: "01",
        phase: "Paper 1",
        title: "Object & Model Drawing",
        description: "Freehand drawing of daily objects, brass pots, and fabric drapery in accurate perspective and light-shade.",
      },
      {
        step: "02",
        phase: "Paper 2",
        title: "Memory Drawing & Composition",
        description: "Visualizing everyday Indian scenes—busy markets, temple fairs, sports—with multi-figure proportions.",
      },
      {
        step: "03",
        phase: "Paper 3",
        title: "Nature & Botanical Study",
        description: "Scientific and artistic rendering of plants, leaves, and flowers with fluid watercolour washes.",
      },
      {
        step: "04",
        phase: "Paper 4",
        title: "Geometric & Scale Drawing",
        description: "Scale construction, geometric elevations, sectional views, and isometric projection using precision instruments.",
      },
      {
        step: "05",
        phase: "Paper 5 & 6",
        title: "Applied Design & 3 Full Mocks",
        description: "Decorative repeat patterns, color harmony, border designs, followed by 3 comprehensive evaluated mock exams.",
      },
    ],
    takeaways: [
      "Karnataka Board Lower & Higher Certification",
      "100% first-class student pass record",
      "Complete mock exam drills under board timing",
      "Government-recognized arts credential",
    ],
    specs: {
      level: "Students aged 10+",
      ageGroup: "School students, Teens & Adults",
      duration: "6-Month Structured Cohort",
      attention: "Rigorous evaluation & mock tests",
    },
    galleryHash: "#exam",
  },
};

const accents: Record<string, string> = {
  acrylic: "from-orange-400 to-rose-500",
  water: "from-sky-400 to-blue-600",
  tanjore: "from-amber-400 to-yellow-600",
  oil: "from-emerald-400 to-green-700",
  pencil: "from-stone-400 to-zinc-700",
  exam: "from-indigo-400 to-violet-700",
};

const iconMap: Record<string, any> = {
  acrylic: faPalette,
  water: faWater,
  tanjore: faGem,
  oil: faBrush,
  pencil: faPencil,
  exam: faGraduationCap,
};

export default function ClassesGrid({ section }: { section: SiteSection }) {
  const [selectedMediumKey, setSelectedMediumKey] = useState<string | null>(null);

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

      {/* Enlarged Studio Approach & Roadmap Modal */}
      <AnimatePresence>
        {activeMedium && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
            onClick={() => setSelectedMediumKey(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/15 shadow-2xl p-4 sm:p-7 md:p-8 scrollbar-thin"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMediumKey(null)}
                aria-label="Close details"
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm sm:text-base" />
              </button>

              {/* Header */}
              <div className="pr-8 mb-5 sm:mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${activeMedium.badgeBg}`}
                  >
                    <FontAwesomeIcon icon={activeMedium.icon} className="text-[10px]" />
                    {activeMedium.badge}
                  </span>
                  <span className="text-[11px] font-mono text-stone-600 dark:text-stone-400">
                    Jeeva Art Studio Curriculum
                  </span>
                </div>
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
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-white/20 hover:bg-stone-100 dark:hover:bg-white/10 text-stone-800 dark:text-stone-200 font-semibold text-xs sm:text-sm transition-all"
                  >
                    <FontAwesomeIcon icon={faPhone} className="text-xs text-stone-500" />
                    <span>Call Studio</span>
                  </a>
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
      </AnimatePresence>
    </section>
  );
}

