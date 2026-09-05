import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSun,
  faMoon,
  faPalette,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "../context/SiteContext";

const PRIMARY_NAV = [
  { name: "About", href: "#about" },
  { name: "Classes", href: "#classes" },
  { name: "Artworks", href: "#acrylic" },
  { name: "Shop", href: "#product" },
  { name: "Exams", href: "#exam" },
];

function socialMeta(network: string) {
  if (network === "youtube") return { icon: faYoutube, label: "YouTube", className: "text-red-600" };
  if (network === "instagram") return { icon: faInstagram, label: "Instagram", className: "text-fuchsia-600" };
  if (network === "whatsapp") return { icon: faWhatsapp, label: "WhatsApp", className: "text-emerald-600" };
  return { icon: faPalette, label: network, className: "text-stone-700" };
}

export default function Header() {
  const { content } = useSite();
  const social = content.social || [];
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#f4eee4]/92 dark:bg-[#0f1218]/92 backdrop-blur-xl border-b border-amber-900/15 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link href="#hero" className="flex items-center gap-2.5 shrink-0">
              <span className="relative h-9 w-9 overflow-hidden rounded-lg shadow-md ring-1 ring-black/10">
                <Image
                  src="/jeevalogo.jpg"
                  alt={content.brand.name}
                  fill
                  className="object-cover"
                  sizes="36px"
                  priority
                />
              </span>
              <span className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-amber-50 tracking-tight">
                {content.brand.name}
              </span>
            </Link>
            <div className="flex items-center gap-0.5 sm:gap-1">
              {social.map((item) => {
                const meta = socialMeta(item.network);
                const shortLabel =
                  item.network === "instagram" ? "Insta" : meta.label;
                return (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={meta.label}
                    className="inline-flex items-center gap-1.5 px-1.5 sm:px-2 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <FontAwesomeIcon icon={meta.icon} className={`text-lg sm:text-xl opacity-90 ${meta.className}`} />
                    <span className="hidden sm:inline text-sm font-semibold opacity-90 text-stone-800 dark:text-stone-100">
                      {shortLabel}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-stone-800/90 dark:text-stone-100/90">
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={content.brand.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900/90 text-amber-50 text-sm font-semibold tracking-wide hover:bg-stone-800"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="opacity-90" />
              View in Google Maps
            </a>
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="w-10 h-10 rounded-full border border-stone-300/80 dark:border-stone-600 bg-white/80 dark:bg-stone-800"
              >
                <FontAwesomeIcon icon={resolvedTheme === "dark" ? faSun : faMoon} className="text-amber-500" />
              </button>
            )}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="w-10 h-10 rounded-full border border-stone-300/80 dark:border-stone-600 bg-white/80 dark:bg-stone-800"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      <div
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
          className={`absolute top-0 right-0 h-full w-[min(100%,22rem)] bg-[#f7f1e8] dark:bg-[#16141f] shadow-2xl border-l border-amber-900/10 p-6 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <p className="font-serif text-2xl font-semibold">Menu</p>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 text-lg font-semibold">
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-amber-900/15 space-y-3">
            {social.map((item) => {
              const meta = socialMeta(item.network);
              return (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 text-stone-800 dark:text-stone-100"
                >
                  <FontAwesomeIcon icon={meta.icon} className={`text-xl opacity-90 ${meta.className}`} />
                  <span className="text-base font-semibold opacity-90">{meta.label}</span>
                </a>
              );
            })}
            <a
              href={content.brand.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-3 rounded-xl bg-stone-900 text-amber-50 font-semibold"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="opacity-90" />
              <span className="opacity-95">View in Google Maps</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
