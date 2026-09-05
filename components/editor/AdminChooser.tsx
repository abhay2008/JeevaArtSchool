import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useSite } from "../../context/SiteContext";

export default function AdminChooser() {
  const router = useRouter();
  const { setEditMode, setWorkspace } = useSite();

  return (
    <>
      <Head>
        <title>Admin portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-[100dvh] bg-[#ebe4d8] text-stone-800 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Studio console</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-2">Admin portal</h1>
          <p className="mt-3 text-lg font-medium text-stone-600 max-w-2xl">
            This console is separate from the public website. Open it only from this address.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            <button
              type="button"
              onClick={() => {
                setWorkspace("preview");
                setEditMode(true);
                void router.push("/admin/preview");
              }}
              className="text-left rounded-3xl border border-emerald-800/15 bg-white p-7 shadow-lg hover:border-emerald-700/40 hover:shadow-xl transition-all"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-white">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <h2 className="font-serif text-3xl mt-5">Show preview while editing</h2>
              <p className="mt-3 text-base font-medium text-stone-600 leading-relaxed">
                See a live preview beside the editor. Changes appear immediately. This stays inside the admin console.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setWorkspace("studio");
                setEditMode(true);
                void router.push("/admin/studio");
              }}
              className="text-left rounded-3xl border border-amber-800/15 bg-white p-7 shadow-lg hover:border-amber-700/40 hover:shadow-xl transition-all"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-800 text-amber-50">
                <FontAwesomeIcon icon={faCloudArrowUp} />
              </span>
              <h2 className="font-serif text-3xl mt-5">Do not show the preview</h2>
              <p className="mt-3 text-base font-medium text-stone-600 leading-relaxed">
                Mass-upload paintings, name each one, set the medium, and publish into the galleries and landing carousel.
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
