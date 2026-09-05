import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import MassUploadStudio from "../../components/editor/MassUploadStudio";
import AdminChrome from "../../components/editor/AdminChrome";
import { useSite } from "../../context/SiteContext";

const AdminStudioPage: NextPage = () => {
  const { setEditMode, setWorkspace, content } = useSite();

  useEffect(() => {
    setWorkspace("studio");
    setEditMode(true);
  }, [setEditMode, setWorkspace]);

  return (
    <>
      <Head>
        <title>Studio · {content.meta.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-[100dvh] bg-[#f4eee4]">
        <MassUploadStudio />
        <AdminChrome />
      </div>
    </>
  );
};

export default AdminStudioPage;
