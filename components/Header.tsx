import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSun,
  faMoon,
  faPalette,
  faBars,
  faXmark,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "../context/SiteContext";

const PRIMARY_NAV = [
  { name: "Classes", href: "#classes" },
  { name: "Exams", href: "#exam" },
];

function socialMeta(network: string) {
  if (network === "youtube") return { icon: faYoutube, label: "YouTube", className: "text-[#b42318]" };
  if (network === "instagram") return { icon: faInstagram, label: "Instagram", className: "text-[#9d3b7a]" };
  if (network === "whatsapp") return { icon: faWhatsapp, label: "WhatsApp", className: "text-[#2f6b4c]" };
  return { icon: faPalette, label: network, className: "text-stone-700" };
}

const iconBtn =
  "inline-flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full text-stone-700 dark:text-amber-50/90 hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors shrink-0";

const drawerLink =
  "block px-3 py-2.5 rounded-xl text-base font-semibold text-stone-800 dark:text-amber-50 hover:bg-black/5 dark:hover:bg-white/10";

export default function Header() {
  const { content } = useSite();
  const social = content.social || [];
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  const classes = useMemo(
    () => content.sections.find((s) => s.type === "classes" && s.enabled !== false),
    [content.sections]
  );
  const galleries = useMemo(
    () => content.sections.filter((s) => s.type === "gallery" && s.enabled !== false),
    [content.sections]
  );
  const about = content.sections.find((s) => s.type === "about" && s.enabled !== false);
  const shop = content.sections.find((s) => s.type === "shop" && s.enabled !== false);
  const exam = content.sections.find((s) => s.type === "exam" && s.enabled !== false);

  useEffect(() => {
    setMounted(true);
    const checkScroll = () => {
      const preview = document.getElementById("site-preview");
      const currentY = preview && preview.scrollTop > 0 ? preview.scrollTop : window.scrollY;
      setIsScrolled(currentY > 80);
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    const preview = document.getElementById("site-preview");
    preview?.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScroll);
      preview?.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    const delay = open ? 180 : 0;
    setOpen(false);
    window.setTimeout(() => {
      const id = href.startsWith("#") ? href.slice(1) : href;
      const target = document.getElementById(id);
      const preview = document.getElementById("site-preview");
      if (target && preview) {
        const previewRect = preview.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        preview.scrollTo({
          top: preview.scrollTop + (targetRect.top - previewRect.top) - 56,
          behavior: "smooth",
        });
        return;
      }
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, delay);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#f4eee4]/92 dark:bg-[#0f1218]/92 backdrop-blur-xl border-b border-amber-900/15 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <Link href="#hero" className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <span className="relative h-7 w-7 sm:h-9 sm:w-9 overflow-hidden rounded-md sm:rounded-lg shadow-md ring-1 ring-black/10 shrink-0">
                <Image
                  src="/jeevalogo.jpg"
                  alt={content.brand.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 28px, 36px"
                  priority
                />
              </span>
              <span className="font-serif text-[15px] sm:text-2xl font-semibold text-stone-900 dark:text-amber-50 tracking-tight whitespace-nowrap">
                {content.brand.name}
              </span>
            </Link>
            <div className="flex items-center shrink-0">
              {social.map((item) => {
                const meta = socialMeta(item.network);
                return (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={meta.label}
                    className={iconBtn}
                  >
                    <FontAwesomeIcon icon={meta.icon} className={`text-sm sm:text-lg ${meta.className} dark:text-amber-50/85`} />
                  </a>
                );
              })}
              <a
                href={content.brand.maps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className={iconBtn}
              >
                <FontAwesomeIcon icon={faLocationDot} className="text-xs sm:text-[15px] text-[#3d6178] dark:text-amber-50/85" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <nav className="hidden sm:flex items-center gap-0.5 text-sm font-semibold tracking-wide text-stone-800 dark:text-amber-50/90">
              {PRIMARY_NAV.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  className="px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                >
                  {link.name}
                </button>
              ))}
            </nav>
            {mounted ? (
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative h-7 w-12 sm:h-9 sm:w-[3.65rem] rounded-full border border-[#d4c7b4] dark:border-[#5c5348] bg-[#efe6d8] dark:bg-[#1a1714] shadow-[inset_0_1px_2px_rgba(60,40,20,0.12)]"
              >
                <span
                  className={`absolute top-[3px] left-[3px] flex h-[22px] w-[22px] sm:h-[30px] sm:w-[30px] items-center justify-center rounded-full bg-[#fbf7f1] dark:bg-[#2a241e] shadow-[0_1px_4px_rgba(40,30,20,0.18)] ring-1 ring-[#cfc3b0]/80 dark:ring-[#6b5e4e]/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isDark ? "translate-x-5 sm:translate-x-[1.55rem]" : "translate-x-0"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={isDark ? faMoon : faSun}
                    className={`text-[9px] sm:text-[11px] ${isDark ? "text-[#e8d5a3]" : "text-[#8a6a32]"}`}
                  />
                </span>
                <span className="sr-only">Theme</span>
              </button>
            ) : (
              <span className="h-7 w-12 sm:h-9 sm:w-[3.65rem]" />
            )}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-base rounded-full border border-[#d4c7b4] dark:border-[#5c5348] bg-[#fbf7f1] dark:bg-[#2a241e] text-stone-800 dark:text-amber-50"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      <div
        {...(open ? { "data-nav-drawer": "true" } : {})}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-stone-950/45"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-[min(100%,24rem)] bg-[#f7f1e8] dark:bg-[#16141f] text-stone-800 dark:text-amber-50 shadow-2xl border-l border-amber-900/10 p-6 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Jeeva Art School</p>
              <p className="font-serif text-2xl font-semibold">Explore</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="px-3 mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">Visit</p>
              <button type="button" onClick={() => go("hero")} className={`${drawerLink} w-full text-left`}>
                Home
              </button>
              {about ? (
                <button type="button" onClick={() => go(about.id)} className={`${drawerLink} w-full text-left`}>
                  About
                </button>
              ) : null}
              {shop ? (
                <button type="button" onClick={() => go(shop.id)} className={`${drawerLink} w-full text-left`}>
                  {shop.title || "Artwork for sale"}
                </button>
              ) : null}
              {exam ? (
                <button type="button" onClick={() => go(exam.id)} className={`${drawerLink} w-full text-left`}>
                  {exam.title || "Exams"}
                </button>
              ) : null}
            </div>

            {classes ? (
              <div>
                <p className="px-3 mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">Classes</p>
                <button type="button" onClick={() => go(classes.id)} className={`${drawerLink} w-full text-left`}>
                  All classes
                </button>
                {(classes.classes || []).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.href.replace("#", ""))}
                    className={`${drawerLink} w-full text-left`}
                  >
                    <span className="block">{item.title}</span>
                    {item.description ? (
                      <span className="block mt-0.5 text-sm font-medium text-stone-500 dark:text-stone-400 line-clamp-2">
                        {item.description}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}

            {galleries.length ? (
              <div>
                <p className="px-3 mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">Mediums & galleries</p>
                {galleries.map((gallery) => (
                  <button
                    key={gallery.id}
                    type="button"
                    onClick={() => go(gallery.id)}
                    className={`${drawerLink} w-full text-left`}
                  >
                    {gallery.title || gallery.id}
                    {gallery.items?.length ? (
                      <span className="ml-2 text-xs font-medium text-stone-500">
                        {gallery.items.length}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="pt-4 border-t border-amber-900/15 space-y-2">
              <p className="px-3 mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">Contact</p>
              <a href={`tel:+${content.brand.phoneRaw}`} className={`${drawerLink} flex items-center gap-3`}>
                <FontAwesomeIcon icon={faPhone} className="text-sm text-stone-500" />
                {content.brand.phoneDisplay}
              </a>
              <a
                href={content.brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`${drawerLink} flex items-center gap-3`}
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg text-[#2f6b4c]" />
                WhatsApp
              </a>
              <a
                href={content.brand.maps}
                target="_blank"
                rel="noopener noreferrer"
                className={`${drawerLink} flex items-center gap-3`}
              >
                <FontAwesomeIcon icon={faLocationDot} className="text-[#3d6178]" />
                Studio on Google Maps
              </a>
              <div className="flex items-center gap-1 px-1 pt-2">
                {social.map((item) => {
                  const meta = socialMeta(item.network);
                  return (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={meta.label}
                      className={iconBtn}
                    >
                      <FontAwesomeIcon icon={meta.icon} className={`text-xl ${meta.className}`} />
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
