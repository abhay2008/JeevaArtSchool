import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { commitBinaryFile, githubConfigured, type GitHubCommitResult } from "../../lib/github";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "16mb",
    },
  },
};

const mimeToExt: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { filename, data } = req.body as { filename?: string; data?: string };
    if (!data || typeof data !== "string" || !data.startsWith("data:")) {
      return res.status(400).json({ error: "Expected a data URL" });
    }

    const match = data.match(/^data:([^;,]+)(?:;[^,]+)*;base64,(.+)$/s);
    if (!match) {
      return res.status(400).json({ error: "Invalid data URL" });
    }

    const mime = match[1].trim().toLowerCase();
    const rawExt = (filename?.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
    const ext = mimeToExt[mime] || rawExt || "bin";
    const buffer = Buffer.from(match[2].trim(), "base64");
    const safeBase =
      (filename || "upload")
        .replace(/[^a-zA-Z0-9._-]/g, "-")
        .replace(/\.[^.]+$/, "")
        .slice(0, 40) || "upload";
    const unique = `${Date.now()}-${safeBase}.${ext}`;

    // Safely attempt local disk write for local development mode only.
    // On Vercel / serverless runtimes, the filesystem is read-only (EROFS) and ephemeral.
    let localWriteSuccess = false;
    try {
      const dir = path.join(process.cwd(), "public", "uploads");
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, unique), buffer);
      localWriteSuccess = true;
    } catch (fsError) {
      console.warn("Local disk write skipped or failed (expected in serverless):", fsError);
    }

    let commitResult: GitHubCommitResult | null = null;
    if (githubConfigured()) {
      commitResult = await commitBinaryFile(
        `public/uploads/${unique}`,
        buffer,
        `Upload asset ${unique}`
      );
    } else if (!localWriteSuccess) {
      return res.status(500).json({
        error: "Upload failed: local filesystem is read-only and GitHub is not configured",
      });
    }

    return res.status(200).json({
      url: `/uploads/${unique}`,
      github: commitResult,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return res.status(500).json({ error: message });
  }
}
