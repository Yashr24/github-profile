import type { User, Repository, Organization } from "../types/github";

const BASE_URL = "https://api.github.com";

// ─── Fetch user profile ───────────────────────────────────────────────────────

export async function fetchUser(username: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${username}`);
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }
  const data = await res.json();
  return data as User;
}

// ─── Fetch repositories ───────────────────────────────────────────────────────
// perPage=6  → overview "Popular repositories" cards
// perPage=100 → full Repositories tab list

export async function fetchRepos(
  username: string,
  perPage: number = 6
): Promise<Repository[]> {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=pushed&per_page=${perPage}`
  );
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }
  const data = await res.json();
  return data as Repository[];
}

// ─── Fetch organizations ──────────────────────────────────────────────────────

export async function fetchOrgs(username: string): Promise<Organization[]> {
  const res = await fetch(`${BASE_URL}/users/${username}/orgs`);
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }
  const data = await res.json();
  return data as Organization[];
}

// ─── Followers / following lists ─────────────────────────────────────────────

export type FollowListKind = "followers" | "following";

const FOLLOW_PAGE_SIZE = 15;

/** Returns login list from GitHub followers or following endpoint */
export async function fetchFollowLogins(
  username: string,
  kind: FollowListKind
): Promise<string[]> {
  const segment = kind === "followers" ? "followers" : "following";
  const res = await fetch(
    `${BASE_URL}/users/${username}/${segment}?per_page=${FOLLOW_PAGE_SIZE}`
  );
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }
  const data = (await res.json()) as { login: string }[];
  return data.map((u) => u.login);
}
