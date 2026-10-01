import type { Achievement } from "../types/mock";

/**
 * GitHub achievement badge data for shreeramk.
 * Achievement images are hosted on GitHub's asset CDN.
 * The `multiplier` field shows the "x4" style count on top of the badge.
 */
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Arctic Code Vault Contributor",
    imageUrl:
      "https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png",
  },
  {
    name: "YOLO",
    imageUrl:
      "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png",
  },
  {
    name: "Pull Shark",
    imageUrl:
      "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png",
    multiplier: 4,
  },
];
