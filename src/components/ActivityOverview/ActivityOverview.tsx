import type { ActivityOverview as ActivityOverviewType } from "../../types/mock";
import "./ActivityOverview.css";

interface ActivityOverviewProps {
  data: ActivityOverviewType;
}

/**
 * CrossAxisChart — GitHub-style 4-axis activity chart (plain SVG).
 *
 * • Only two cross lines (no square grid)
 * • Labels sit inside a padded viewBox so nothing gets clipped
 * • When only Commits + Pull requests have values, the fill is a triangle
 *   from center → left point → bottom point (matches real GitHub)
 */
function CrossAxisChart({ data }: { data: ActivityOverviewType }) {
  const W = 240;
  const H = 200;
  const Cx = 120;
  const Cy = 100;
  const R = 58;
  const axisColor = "#2da44e";

  const center = { x: Cx, y: Cy };
  const commits = { x: Cx - (data.commits / 100) * R, y: Cy };
  const issues = { x: Cx + (data.issues / 100) * R, y: Cy };
  const codeReview = { x: Cx, y: Cy - (data.codeReview / 100) * R };
  const pullReqs = { x: Cx, y: Cy + (data.pullRequests / 100) * R };

  const activePoints = [commits, issues, codeReview, pullReqs].filter(
    (p) => p.x !== center.x || p.y !== center.y
  );

  // Triangle through center when two axes dominate; otherwise connect all active + center
  let fillPoints: string;
  if (activePoints.length === 2) {
    fillPoints = `${center.x},${center.y} ${activePoints[0].x},${activePoints[0].y} ${activePoints[1].x},${activePoints[1].y}`;
  } else if (activePoints.length >= 3) {
    fillPoints = [center, ...activePoints]
      .map((p) => `${p.x},${p.y}`)
      .join(" ");
  } else if (activePoints.length === 1) {
    fillPoints = `${center.x},${center.y} ${activePoints[0].x},${activePoints[0].y}`;
  } else {
    fillPoints = "";
  }

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="cross-axis-chart"
      aria-label="Activity overview chart"
      overflow="visible"
    >
      {/* ── 4-axis cross only (no square rings) ── */}
      <line
        x1={Cx - R}
        y1={Cy}
        x2={Cx + R}
        y2={Cy}
        stroke={axisColor}
        strokeWidth={1.5}
      />
      <line
        x1={Cx}
        y1={Cy - R}
        x2={Cx}
        y2={Cy + R}
        stroke={axisColor}
        strokeWidth={1.5}
      />

      {fillPoints && (
        <polygon
          points={fillPoints}
          fill="rgba(46, 160, 67, 0.2)"
          stroke={axisColor}
          strokeWidth={1.5}
        />
      )}

      {/* Dots on non-center data points (GitHub: white fill, green ring) */}
      {activePoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="#fff"
          stroke={axisColor}
          strokeWidth={2}
        />
      ))}

      {/* ── Axis labels (padded inside viewBox) ── */}
      <text x={28} y={Cy - 6} textAnchor="start" fontSize={11} fill="#1f2328" fontWeight="600">
        {data.commits}%
      </text>
      <text x={28} y={Cy + 10} textAnchor="start" fontSize={11} fill="#656d76">
        Commits
      </text>

      <text x={Cx} y={22} textAnchor="middle" fontSize={11} fill="#656d76">
        Code review
      </text>

      <text x={W - 28} y={Cy + 4} textAnchor="end" fontSize={11} fill="#656d76">
        Issues
      </text>

      <text x={Cx} y={H - 28} textAnchor="middle" fontSize={11} fill="#1f2328" fontWeight="600">
        {data.pullRequests}%
      </text>
      <text x={Cx} y={H - 14} textAnchor="middle" fontSize={11} fill="#656d76">
        Pull requests
      </text>
    </svg>
  );
}

export default function ActivityOverview({ data }: ActivityOverviewProps) {
  const otherRepoCount = Math.max(
    0,
    data.commits + data.pullRequests - data.repositories.length
  );

  return (
    <section className="activity-overview">
      <div className="activity-overview__body">
        {/* ── Left: title + prose ── */}
        <div className="activity-overview__prose">
          <h2 className="activity-overview__title">Activity overview</h2>
          <p>
            Contributed to{" "}
            {data.repositories.map((repo, i) => (
              <span key={repo}>
                <a
                  href={`https://github.com/${repo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {repo}
                </a>
                {i < data.repositories.length - 1 ? ", " : ""}
              </span>
            ))}
            {otherRepoCount > 0 && (
              <span> and {otherRepoCount} other repositories</span>
            )}
            .
          </p>

          <div className="activity-overview__stats">
            {data.commits > 0 && (
              <div className="activity-overview__stat">
                <span
                  className="activity-overview__stat-dot"
                  style={{ backgroundColor: "#0969da" }}
                />
                <strong>{data.commits}%</strong>
                <span className="activity-overview__stat-label">Commits</span>
              </div>
            )}
            {data.pullRequests > 0 && (
              <div className="activity-overview__stat">
                <span
                  className="activity-overview__stat-dot"
                  style={{ backgroundColor: "#8250df" }}
                />
                <strong>{data.pullRequests}%</strong>
                <span className="activity-overview__stat-label">Pull requests</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: chart (separated by vertical rule) ── */}
        <div className="activity-overview__chart">
          <CrossAxisChart data={data} />
        </div>
      </div>
    </section>
  );
}
