import type { User, Repository, Organization } from "../types/github";

const BASE_URL = "https://api.github.com";

// ─── Fetch user profile ───────────────────────────────────────────────────────

export async function fetchUser(username: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${username}`);
  if (!res.ok) {
    throw new Error(`User "${username}" not found (${res.status})`);
  }
  const data = await res.json();
  return data as User;
}

// ─── Fetch pinned / recent repositories ──────────────────────────────────────

export async function fetchRepos(username: string): Promise<Repository[]> {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=pushed&per_page=6`
  );
  if (!res.ok) {
    throw new Error(`Could not fetch repos for "${username}" (${res.status})`);
  }
  const data = await res.json();
  return data as Repository[];
}

// ─── Fetch organizations ──────────────────────────────────────────────────────

export async function fetchOrgs(username: string): Promise<Organization[]> {
  const res = await fetch(`${BASE_URL}/users/${username}/orgs`);
  if (!res.ok) {
    throw new Error(`Could not fetch orgs for "${username}" (${res.status})`);
  }
  const data = await res.json();
  return data as Organization[];
}
