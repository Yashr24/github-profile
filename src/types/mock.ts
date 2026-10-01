// ─── Mock data shapes ────────────────────────────────────────────────────────

export interface Achievement {
  name: string;
  imageUrl: string;
  multiplier?: number;
}

export interface PullRequestSummary {
  repo: string;
  merged: number;
  open: number;
}

/**
 * Discriminated union — switch on `kind` when rendering:
 *   case "commits"      → show commit count
 *   case "pullRequests" → show PR breakdown per repo
 */
export type ActivityEntry =
  | { kind: "commits"; count: number; repoCount: number }
  | {
      kind: "pullRequests";
      count: number;
      repoCount: number;
      breakdown: PullRequestSummary[];
    };

export interface ActivityMonth {
  /** Display label, e.g. "October 2025" */
  label: string;
  entries: ActivityEntry[];
}

export interface ActivityOverview {
  commits: number;
  pullRequests: number;
  issues: number;
  codeReview: number;
  /** Names of repos contributed to */
  repositories: string[];
}
