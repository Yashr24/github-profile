// ─── Live API response shapes ────────────────────────────────────────────────

export interface User {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export enum RepoVisibility {
  Public = "public",
  Private = "private",
  Internal = "internal",
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  fork: boolean;
  visibility: RepoVisibility;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
}

export interface Organization {
  id: number;
  login: string;
  avatar_url: string;
  description: string | null;
}

// ─── Contribution heatmap shapes (proxy API) ─────────────────────────────────

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** date string, e.g. "2025-10-01" */
  date: string;
  count: number;
  level: ContributionLevel;
}

/** Keyed by day of month: "1" ... "31" */
export type DayMap = Record<string, ContributionDay>;

/** Keyed by month number: "1" ... "12" */
export type MonthMap = Record<string, DayMap>;

/** Keyed by year: "2024", "2025", ... */
export type YearMap = Record<string, MonthMap>;

export interface GithubContributionsResponse {
  /** Total contributions per year, e.g. { "2025": 1753, "lastYear": 2064 } */
  total: Record<string, number>;
  contributions: YearMap;
}
