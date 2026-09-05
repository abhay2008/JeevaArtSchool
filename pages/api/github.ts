import type { NextApiRequest, NextApiResponse } from "next";
import { githubConfigured, githubRepoUrl, latestCommit } from "../../lib/github";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const latest = await latestCommit();
  return res.status(200).json({
    configured: githubConfigured(),
    repoUrl: githubRepoUrl(),
    latest,
  });
}
