import React from "react";
import type { SiteSection } from "../lib/types";
import { youtubeEmbed } from "../lib/site";

export default function VideoSection({ section }: { section: SiteSection }) {
  const media = youtubeEmbed(section.videoUrl || "");
  const isFile = /\.(mp4|webm)(\?|$)/i.test(section.videoUrl || "") || (section.videoUrl || "").startsWith("/uploads/");

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-center">
      <p className="uppercase tracking-[0.3em] text-xs text-stone-500 mb-3">{section.eyebrow}</p>
      <h3 className="font-serif text-4xl text-stone-900 dark:text-white mb-3">{section.title}</h3>
      {section.body ? <p className="text-stone-600 dark:text-stone-400 mb-8">{section.body}</p> : null}
      {isFile && section.videoUrl ? (
        <video src={section.videoUrl} controls className="w-full rounded-2xl shadow-xl bg-black" />
      ) : media?.kind === "embed" ? (
        <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-black">
          <iframe
            src={media.src}
            title={section.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : media?.kind === "link" ? (
        <a
          href={media.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-2xl border border-stone-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-8 py-6 font-semibold hover:shadow-lg"
        >
          Open video channel
        </a>
      ) : null}
    </section>
  );
}
