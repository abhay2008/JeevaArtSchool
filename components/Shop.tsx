import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faChevronLeft,
  faChevronRight,
  faExpand,
  faTag,
  faCertificate,
  faPalette,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useSite } from "../context/SiteContext";
import { useArtModal } from "./ArtModal";
import { useToast } from "../context/ToastContext";
import type { SiteSection, ArtworkItem } from "../lib/types";

// Default signature collection if none are tagged yet
const DEFAULT_SALE_ITEMS: ArtworkItem[] = [
  {
    id: "sale-tanjore-ganesha",
    title: "Lord Ganesha",
    headline: "Traditional 22k Gold Tanjore Painting",
    description: "Sacred iconographic painting with 22-carat authentic gold foil, embossed relief gesso work, and fine Jaipur stones on seasoned teakwood.",
    image: "/uploads/tanjoreganesh.jpeg",
    medium: "Tanjore Painting",
    purpose: "sale",
    theme: "tanjore",
    price: "32,000",
  },
  {
    id: "sale-tanjore-krishna",
    title: "Alilai Krishna",
    headline: "22k Gold Embossed Relief",
    description: "Balakrishna resting peacefully on a sacred banyan leaf, rendered with classical south Indian ornamentation and rich gold embellishment.",
    image: "/uploads/tanjorekrish.jpeg",
    medium: "Tanjore Painting",
    purpose: "sale",
    theme: "tanjore",
    price: "28,500",
  },
  {
    id: "sale-acrylic-forest",
    title: "A Forest Scenery",
    headline: "Atmospheric Acrylic on Canvas",
    description: "Lush woodland landscape capturing sunlight dancing through canopies, misty distant mountains, and deep viridian water reflections.",
    image: "/uploads/acrylic.jpeg",
    medium: "Acrylic Painting",
    purpose: "sale",
    theme: "acrylic",
    price: "16,500",
  },
  {
    id: "sale-water-temple",
    title: "A Traditional Temple",
    headline: "Fine Watercolour Wash on Cotton Rag",
    description: "Atmospheric architectural study of ancient temple towers in fluid watercolour washes and subtle chromatic grading.",
    image: "/uploads/templewater.jpeg",
    medium: "Watercolour",
    purpose: "sale",
    theme: "water",
    price: "12,000",
  },
];

function formatRupees(price?: number | string): string {
  if (!price) return "Price on Request";
  const str = String(price).replace(/[^0-9]/g, "");
  if (!str) return String(price);
  const num = parseInt(str, 10);
  if (isNaN(num)) return String(price);
  return "₹" + num.toLocaleString("en-IN");
}

export default function Shop({ section }: { section: SiteSection }) {
  const { content } = useSite();
  const { openArtwork } = useArtModal();
  const { handleCall } = useToast();

  const phoneRaw = content?.brand?.phoneRaw || "919945067101";
  const phoneDisplay = content?.brand?.phoneDisplay || "+91 99450 67101";

  // Gather all items marked for sale across section items, all sections, and showcase
  const saleItems = useMemo(() => {
    const collected: ArtworkItem[] = [];
    const seen = new Set<string>();

    const add = (item?: ArtworkItem) => {
      if (!item || !item.image) return;
      const key = item.id || item.image;
      if (seen.has(key)) return;
      seen.add(key);
      collected.push(item);
    };

    // 1. Explicit items in this shop section
    (section.items || []).forEach(add);

    // 2. Any item marked purpose: "sale" across all sections
    (content.sections || []).forEach((sec) => {
      (sec.items || []).forEach((it) => {
        if (it.purpose === "sale") add(it);
      });
    });

    // 3. Any item marked purpose: "sale" in showcase
    (content.showcase || []).forEach((it) => {
      if (it.purpose === "sale") add(it);
    });

    // Fall back to default signature collection if none are tagged yet
    if (collected.length === 0) {
      DEFAULT_SALE_ITEMS.forEach(add);
    }

    return collected;
  }, [section.items, content.sections, content.showcase]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Clamp current index if items list length changes
  const activeIndex = Math.min(currentIndex, Math.max(0, saleItems.length - 1));
  const current = saleItems[activeIndex] || DEFAULT_SALE_ITEMS[0];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % saleItems.length);
  }, [saleItems.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + saleItems.length) % saleItems.length);
  }, [saleItems.length]);

  // Autoplay timer (5 seconds)
  useEffect(() => {
    if (!isPlaying || isHovered || saleItems.length <= 1) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, nextSlide, saleItems.length]);

  const formattedPrice = formatRupees(current.price);

  const whatsappMessage = encodeURIComponent(
    `Hello Jeeva Art School, I am looking to buy this artwork: ${current.title}${
      current.price ? ` (${formattedPrice})` : ""
    }.`
  );
  const whatsappUrl = `https://wa.me/${phoneRaw}?text=${whatsappMessage}`;
  const callUrl = `tel:+${phoneRaw}`;

  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      scale: 0.98,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  return (
    <section
      id={section.id || "product"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-[0.22em] mb-3">
          <FontAwesomeIcon icon={faTag} className="text-[11px]" />
          <span>{section.eyebrow || "Original Works For Sale"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 dark:text-white tracking-tight leading-tight">
          {section.highlightTitle || section.title || "Take an Original Piece Home"}
        </h2>
        <p className="mt-3.5 text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
          {section.body ||
            "Authentic, hand-painted visual art by master artist Jeeva and studio artists. Each piece is unique, crafted with traditional pigment and seasoned canvas, and includes custom framing and studio authentication."}
        </p>
      </div>

      {/* Main Interactive Carousel Card */}
      <div className="relative rounded-3xl border border-stone-200/80 dark:border-white/10 bg-white/80 dark:bg-[#12161f]/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Ambient atmospheric glow behind the card */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none bg-amber-500/30 dark:bg-amber-400/15" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none bg-emerald-500/30 dark:bg-emerald-400/15" />

        <div className="relative z-10 grid md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Painting Image Stage */}
          <div className="md:col-span-6 lg:col-span-7">
            <div
              onClick={() =>
                openArtwork({
                  title: current.title,
                  description: current.description,
                  image: current.image,
                  medium: current.medium,
                })
              }
              className="group relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-stone-100 dark:bg-stone-900 select-none"
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current.id || current.image}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 55vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Enlarge badge */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-stone-900/80 dark:bg-black/80 text-white text-xs font-medium tracking-wide backdrop-blur-md border border-white/15 opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all flex items-center gap-1.5 pointer-events-none shadow-md">
                <FontAwesomeIcon icon={faExpand} className="text-[10px]" />
                <span>Enlarge</span>
              </div>

              {/* Status pill on image */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-md">
                Available for Purchase
              </div>
            </div>
          </div>

          {/* Curatorial Details & Buying Actions */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div>
              {/* Medium Pill */}
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-amber-700 dark:text-amber-400 mb-2">
                <FontAwesomeIcon icon={faPalette} />
                <span>{current.medium || "Original Artwork"}</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-white font-bold leading-tight tracking-tight">
                {current.title}
              </h3>

              {current.headline && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {current.headline}
                </p>
              )}

              {/* Description */}
              <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                {current.description ||
                  "Original masterpiece created in the studio with artist-grade pigments and traditional technique."}
              </p>

              {/* Authentic Certificate Note */}
              <div className="mt-4 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <FontAwesomeIcon icon={faCertificate} className="text-amber-600 text-sm" />
                <span>Includes custom gallery frame & studio certificate of authenticity</span>
              </div>
            </div>

            {/* Price Tag in Indian Rupees */}
            <div className="pt-4 border-t border-stone-200 dark:border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">
                Studio Price
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">
                  {formattedPrice}
                </span>
                <span className="text-xs font-medium text-stone-500">(INR / All-inclusive)</span>
              </div>
            </div>

            {/* Inquire & Buy Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {/* WhatsApp Message Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                <span>Inquire on WhatsApp</span>
              </a>

              {/* Call Studio Button */}
              <a
                href={callUrl}
                onClick={handleCall}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border border-stone-300 dark:border-white/20 hover:border-stone-900 dark:hover:border-white text-stone-900 dark:text-white font-semibold text-sm transition-all hover:bg-stone-50 dark:hover:bg-white/5 active:scale-[0.98]"
              >
                <FontAwesomeIcon icon={faPhone} className="text-xs text-emerald-600 dark:text-emerald-400" />
                <span>Call {phoneDisplay}</span>
              </a>
            </div>

            {/* Carousel Navigation Bar */}
            <div className="pt-4 flex items-center justify-between border-t border-stone-200/70 dark:border-white/10 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                  className="w-8 h-8 rounded-full border border-stone-300 dark:border-white/15 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300"
                >
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-[10px]" />
                </button>
                <span className="font-mono font-medium">
                  {activeIndex + 1} / {saleItems.length} works
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous artwork"
                  className="w-9 h-9 rounded-full border border-stone-300 dark:border-white/15 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next artwork"
                  className="w-9 h-9 rounded-full border border-stone-300 dark:border-white/15 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip (if 2 or more artworks) */}
        {saleItems.length > 1 && (
          <div className="mt-6 pt-6 border-t border-stone-200/60 dark:border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-3">
              Browse Available Collection
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {saleItems.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id || item.image + idx}
                    type="button"
                    onClick={() => {
                      setDirection(idx > activeIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`group flex items-center gap-3 p-2 rounded-2xl border text-left shrink-0 transition-all ${
                      isActive
                        ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md ring-1 ring-emerald-600"
                        : "border-stone-200 dark:border-white/10 hover:border-stone-400 bg-white/50 dark:bg-white/5"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-900">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="pr-2">
                      <p className="font-serif text-sm font-semibold text-stone-900 dark:text-white line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {formatRupees(item.price)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
