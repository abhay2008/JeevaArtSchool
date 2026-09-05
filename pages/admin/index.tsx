import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import AdminChooser from "../../components/editor/AdminChooser";
import { useSite } from "../../context/SiteContext";

const AdminHome: NextPage = () => {
  const { setEditMode } = useSite();

  useEffect(() => {
    setEditMode(false);
  }, [setEditMode]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminChooser />
    </>
  );
};

export default AdminHome;
