import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import PublicSite from "../../components/PublicSite";
import AdminChrome from "../../components/editor/AdminChrome";
import { useSite } from "../../context/SiteContext";
import { IntroProvider } from "../../context/IntroContext";

const AdminPreviewPage: NextPage = () => {
  const { content, setEditMode, setWorkspace } = useSite();

  useEffect(() => {
    setWorkspace("preview");
    setEditMode(true);
  }, [setEditMode, setWorkspace]);

  return (
    <IntroProvider skip>
      <div className="bg-[#f4eee4] text-stone-800 dark:bg-[#0f1218] dark:text-stone-100 relative h-[100dvh] overflow-hidden flex flex-col md:flex-row selection:bg-violet-500 selection:text-white">
        <Head>
          <title>Preview editor · Admin</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div
          id="site-preview"
          className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden snap-y snap-proximity h-[42vh] md:h-auto"
        >
          <PublicSite liveBadge />
        </div>
        <AdminChrome />
      </div>
    </IntroProvider>
  );
};

export default AdminPreviewPage;
