import type { ActivityOverview, ActivityMonth } from "../types/mock";

/**
 * Mock activity overview — matches the radar-chart section in the screenshot.
 * Values are percentages of total activity.
 */
export const MOCK_ACTIVITY_OVERVIEW: ActivityOverview = {
  commits: 83,
  pullRequests: 17,
  issues: 0,
  codeReview: 0,
  repositories: [
    "UptimeAI/uptime_webapp",
    "UptimeAI/uptime_ml",
    "UptimeAI/uptime_server",
  ],
};

/**
 * Mock contribution activity timeline — matches the "Contribution activity"
 * section in the screenshot (October 2025 entries).
 */
export const MOCK_CONTRIBUTION_TIMELINE: ActivityMonth[] = [
  {
    label: "October 2025",
    entries: [
      {
        kind: "commits",
        count: 56,
        repoCount: 11,
      },
      {
        kind: "pullRequests",
        count: 29,
        repoCount: 5,
        breakdown: [
          { repo: "UptimeAI/uptime_webapp", merged: 16, open: 0 },
          { repo: "UptimeAI/uptime_ml", merged: 8, open: 0 },
          { repo: "UptimeAI/uptime_scripts", merged: 3, open: 0 },
          { repo: "UptimeAI/uptime_engine", merged: 1, open: 0 },
          { repo: "UptimeAI/uptime_ml_encrypted", merged: 1, open: 0 },
        ],
      },
    ],
  },
];
