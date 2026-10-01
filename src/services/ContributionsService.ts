import type { GithubContributionsResponse, ContributionDay, YearMap } from "../types/github";

const PROXY_BASE_URL = "https://github-contributions-api.jogruber.de/v4";

// ─── Fetch contribution heatmap data ─────────────────────────────────────────

export async function fetchContributions(
  username: string,
  year: string | "last"
): Promise<GithubContributionsResponse> {
  const res = await fetch(
    `${PROXY_BASE_URL}/${username}?y=${year}&format=nested`
  );
  if (!res.ok) {
    throw new Error(
      `Could not fetch contributions for "${username}" (${res.status})`
    );
  }
  const data = await res.json();
  return data as GithubContributionsResponse;
}

// ─── Flatten nested YearMap into a ContributionDay array for ECharts ─────────

export function flattenContributions(
  yearMap: YearMap,
  year: string
): ContributionDay[] {
  const monthMap = yearMap[year];
  if (!monthMap) return [];

  const days: ContributionDay[] = [];

  for (const month of Object.values(monthMap)) {
    for (const day of Object.values(month)) {
      days.push(day);
    }
  }

  // Sort chronologically
  days.sort((a, b) => a.date.localeCompare(b.date));

  return days;
}
