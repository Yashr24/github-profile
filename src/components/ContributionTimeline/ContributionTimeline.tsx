import { GitCommitIcon, GitPullRequestIcon } from "@primer/octicons-react";
import type { ActivityMonth } from "../../types/mock";
import "./ContributionTimeline.css";

interface ContributionTimelineProps {
  months: ActivityMonth[];
}

export default function ContributionTimeline({ months }: ContributionTimelineProps) {
  return (
    <section className="timeline">
      <h2 className="timeline__title">Contribution activity</h2>

      {months.map((month) => (
        <div key={month.label} className="timeline__month">
          <h3 className="timeline__month-label">{month.label}</h3>

          {month.entries.map((entry, i) => {
            if (entry.kind === "commits") {
              return (
                <div key={i} className="timeline__entry">
                  <div className="timeline__entry-header">
                    <GitCommitIcon size={16} className="timeline__icon" />
                    <span>
                      Created{" "}
                      <strong>{entry.count} commits</strong> in{" "}
                      <strong>{entry.repoCount} repositories</strong>
                    </span>
                  </div>
                </div>
              );
            }

            if (entry.kind === "pullRequests") {
              return (
                <div key={i} className="timeline__entry">
                  <div className="timeline__entry-header">
                    <GitPullRequestIcon size={16} className="timeline__icon" />
                    <span>
                      Opened{" "}
                      <strong>{entry.count} pull requests</strong> in{" "}
                      <strong>{entry.repoCount} repositories</strong>
                    </span>
                  </div>

                  {/* PR breakdown per repo */}
                  <ul className="timeline__pr-list">
                    {entry.breakdown.map((pr) => (
                      <li key={pr.repo} className="timeline__pr-row">
                        <span className="timeline__pr-repo">{pr.repo}</span>
                        <div className="timeline__pr-badges">
                          {pr.merged > 0 && (
                            <span className="timeline__badge timeline__badge--merged">
                              {pr.merged} merged
                            </span>
                          )}
                          {pr.open > 0 && (
                            <span className="timeline__badge timeline__badge--open">
                              {pr.open} open
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            return null;
          })}
        </div>
      ))}

      {/* Show more activity */}
      <div className="timeline__footer">
        <button className="timeline__show-more">Show more activity</button>
      </div>
    </section>
  );
}
