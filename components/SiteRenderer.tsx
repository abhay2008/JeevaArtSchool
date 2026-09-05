import React, { useEffect } from "react";
import { useSite } from "../context/SiteContext";
import EditableSection from "./editor/EditableSection";
import Hero from "./Hero";
import About from "./About";
import ClassesGrid from "./ClassesGrid";
import GallerySection from "./GallerySection";
import Shop from "./Shop";
import Exam from "./Exam";
import VideoSection from "./VideoSection";
import TextSection from "./TextSection";
import LinksSection from "./LinksSection";
import type { SiteSection } from "../lib/types";

function RenderSection({ section }: { section: SiteSection }) {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "about":
      return <About section={section} />;
    case "classes":
      return <ClassesGrid section={section} />;
    case "gallery":
      return <GallerySection section={section} />;
    case "shop":
      return <Shop section={section} />;
    case "exam":
      return <Exam section={section} />;
    case "video":
      return <VideoSection section={section} />;
    case "text":
      return <TextSection section={section} />;
    case "links":
      return <LinksSection section={section} />;
    default:
      return null;
  }
}

export default function SiteRenderer() {
  const { content, editor } = useSite();

  useEffect(() => {
    if (!editor.enabled || !editor.selectedId) return;
    const preview = document.getElementById("site-preview");
    const target = document.getElementById(editor.selectedId);
    if (!preview || !target) return;
    const previewRect = preview.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    preview.scrollTo({
      top: preview.scrollTop + (targetRect.top - previewRect.top) - 56,
      behavior: "smooth",
    });
  }, [editor.enabled, editor.selectedId]);

  return (
    <main className="relative z-10 snap-y snap-proximity">
      {(content.sections || [])
        .filter((section) => section.enabled !== false)
        .map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20 snap-start">
            <EditableSection id={section.id}>
              <RenderSection section={section} />
            </EditableSection>
          </section>
        ))}
    </main>
  );
}
