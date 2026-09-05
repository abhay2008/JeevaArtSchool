const GITHUB_API = "https://api.github.com";

function token() {
  return process.env.GITHUB_TOKEN || "";
}

function owner() {
  return process.env.GITHUB_OWNER || "";
}

function repo() {
  return process.env.GITHUB_REPO || "";
}

function branch() {
  return process.env.GITHUB_BRANCH || "main";
}

export function githubConfigured() {
  return Boolean(token() && owner() && repo());
}

export function githubRepoUrl() {
  if (!owner() || !repo()) return "";
  return `https://github.com/${owner()}/${repo()}`;
}

async function githubFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token()}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  });
  return res;
}

export interface GitHubCommitResult {
  sha: string;
  htmlUrl: string;
  commitUrl: string;
}

export async function commitBinaryFile(
  filePath: string,
  buffer: Buffer,
  message: string
): Promise<GitHubCommitResult> {
  if (!githubConfigured()) {
    throw new Error("GitHub is not configured");
  }

  const cleanPath = filePath.replace(/^\/+/, "");
  const encodedPath = cleanPath
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  const contentsUrl = `/repos/${owner()}/${repo()}/contents/${encodedPath}`;

  let sha: string | undefined;
  const existing = await githubFetch(`${contentsUrl}?ref=${encodeURIComponent(branch())}`);
  if (existing.ok) {
    const json = (await existing.json()) as { sha?: string };
    sha = json.sha;
  }

  let put = await githubFetch(contentsUrl, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: buffer.toString("base64"),
      branch: branch(),
      sha,
    }),
  });

  if (put.status === 409) {
    // Retry once if conflict (e.g. concurrent commit or outdated sha)
    const retryExisting = await githubFetch(`${contentsUrl}?ref=${encodeURIComponent(branch())}`);
    if (retryExisting.ok) {
      const retryJson = (await retryExisting.json()) as { sha?: string };
      put = await githubFetch(contentsUrl, {
        method: "PUT",
        body: JSON.stringify({
          message,
          content: buffer.toString("base64"),
          branch: branch(),
          sha: retryJson.sha,
        }),
      });
    }
  }

  if (!put.ok) {
    const err = await put.text();
    throw new Error(`GitHub commit failed (${put.status}): ${err.slice(0, 400)}`);
  }

  const body = (await put.json()) as {
    content?: { sha?: string; html_url?: string };
    commit?: { sha?: string; html_url?: string };
  };

  return {
    sha: body.commit?.sha || body.content?.sha || "",
    htmlUrl: body.content?.html_url || githubRepoUrl(),
    commitUrl: body.commit?.html_url || githubRepoUrl(),
  };
}

export async function commitTextFile(
  filePath: string,
  text: string,
  message: string
): Promise<GitHubCommitResult> {
  return commitBinaryFile(filePath, Buffer.from(text, "utf8"), message);
}

export async function getRemoteTextFile(filePath: string): Promise<string | null> {
  if (!githubConfigured()) return null;
  const cleanPath = filePath.replace(/^\/+/, "");
  const encodedPath = cleanPath
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  const contentsUrl = `/repos/${owner()}/${repo()}/contents/${encodedPath}?ref=${encodeURIComponent(branch())}`;

  try {
    const res = await githubFetch(contentsUrl);
    if (!res.ok) return null;
    const json = (await res.json()) as { content?: string; encoding?: string };
    if (!json.content) return null;
    if (json.encoding === "base64") {
      return Buffer.from(json.content, "base64").toString("utf8");
    }
    return json.content;
  } catch {
    return null;
  }
}

export async function latestCommit() {
  if (!githubConfigured()) return null;
  const res = await githubFetch(
    `/repos/${owner()}/${repo()}/commits?sha=${encodeURIComponent(branch())}&per_page=1`
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;
  const commit = data[0] as {
    html_url: string;
    sha: string;
    commit?: { message?: string };
  };
  return {
    sha: commit.sha,
    htmlUrl: commit.html_url,
    message: commit.commit?.message || "",
    repoUrl: githubRepoUrl(),
  };
}
