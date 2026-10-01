import type { Achievement } from "../../types/mock";
import "./AchievementBadge.css";

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <div className="achievement-badge" title={achievement.name}>
      <img
        className="achievement-badge__img"
        src={achievement.imageUrl}
        alt={achievement.name}
        /* Fallback: if GitHub CDN image fails to load, show a coloured circle */
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      {achievement.multiplier && (
        <span className="achievement-badge__multiplier">
          x{achievement.multiplier}
        </span>
      )}
    </div>
  );
}
