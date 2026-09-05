import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page not found · Jeeva Art School</title>
      </Head>
      <div className="min-h-[100dvh] bg-[#f4eee4] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">404</p>
          <h1 className="font-serif text-4xl font-semibold text-stone-900 mt-3">This page is not here</h1>
          <p className="mt-3 text-stone-600 font-medium">The address you opened is not part of the public website.</p>
          <Link href="/" className="inline-block mt-8 rounded-full bg-stone-900 text-amber-50 px-5 py-2.5 text-sm font-semibold">
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
