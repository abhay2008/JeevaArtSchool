import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import type { SiteContent } from "../../lib/types";
import { commitTextFile, getRemoteTextFile, githubConfigured } from "../../lib/github";

const contentPath = path.join(process.cwd(), "content", "site.json");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  if (req.method === "GET" || req.method === "HEAD") {
    // On Vercel serverless runtimes, local disk is read-only and reflects the build-time snapshot.
    // When GitHub is configured, fetch the latest committed content first so updates are immediately
    // visible across tabs/refreshes before Vercel completes background redeployment.
    if (githubConfigured()) {
      try {
        const remoteText = await getRemoteTextFile("content/site.json");
        if (remoteText) {
          const parsed = JSON.parse(remoteText) as SiteContent;
          if (parsed && Array.isArray(parsed.sections)) {
            return res.status(200).json(parsed);
          }
        }
      } catch (err) {
        console.warn("Could not fetch remote site.json from GitHub, falling back to local disk:", err);
      }
    }

    try {
      const raw = fs.readFileSync(contentPath, "utf8");
      const data = JSON.parse(raw) as SiteContent;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Could not read site content" });
    }
  }

  if (req.method === "POST") {
    try {
      const body = req.body as SiteContent;
      if (!body || !Array.isArray(body.sections)) {
        return res.status(400).json({ error: "Invalid site content" });
      }
      const serialized = JSON.stringify(body, null, 2) + "\n";
      let localWriteSuccess = false;
      try {
        fs.writeFileSync(contentPath, serialized, "utf8");
        localWriteSuccess = true;
      } catch (fsError) {
        // Safely ignore EROFS / read-only filesystem errors on Vercel
        console.warn("Local content disk write skipped or failed (expected in serverless):", fsError);
      }

      if (!githubConfigured()) {
        if (!localWriteSuccess) {
          return res.status(500).json({
            error: "Cannot persist content: local filesystem is read-only and GitHub is not configured",
          });
        }
        return res.status(200).json({ ok: true, github: null });
      }

      try {
        const github = await commitTextFile(
          "content/site.json",
          serialized,
          "Update school website content from admin"
        );
        return res.status(200).json({ ok: true, github });
      } catch (error) {
        const message = error instanceof Error ? error.message : "GitHub commit failed";
        if (!localWriteSuccess) {
          return res.status(500).json({ error: `Save failed: ${message}` });
        }
        return res.status(200).json({ ok: true, github: null, githubError: message });
      }
    } catch (error) {
      return res.status(500).json({ error: "Could not save site content" });
    }
  }

  res.setHeader("Allow", "GET, HEAD, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
