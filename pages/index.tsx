import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import PublicSite from "../components/PublicSite";
import { useSite } from "../context/SiteContext";
import { IntroProvider } from "../context/IntroContext";
import IntroLoader from "../components/IntroLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
  const { content, setEditMode } = useSite();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [setEditMode]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <IntroProvider skip={false}>
      <IntroLoader />
      <div className="bg-[#f4eee4] text-stone-800 dark:bg-[#0f1218] dark:text-stone-100 relative min-h-screen overflow-x-clip selection:bg-violet-500 selection:text-white">
        <Head>
          <title>{content.meta.title}</title>
          <meta name="description" content={content.meta.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
          <link rel="icon" href={content.meta.favicon} />
        </Head>

        <PublicSite />

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll back to top"
            className="fixed bottom-8 left-5 z-40 w-11 h-11 rounded-full bg-stone-900 text-white dark:bg-amber-100 dark:text-stone-900 shadow-2xl"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}
      </div>
    </IntroProvider>
  );
};

export default Home;
