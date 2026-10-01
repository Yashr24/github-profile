import { useState, useEffect } from "react";
import { fetchContributions, flattenContributions } from "../../services/ContributionsService";
import type { ContributionDay } from "../../types/github";
import ContributionGraph from "../../components/ContributionGraph/ContributionGraph";
import YearRail from "../../components/YearRail/YearRail";
import "./HeatmapContainer.css";

interface HeatmapContainerProps {
  username: string;
}

/** Generate a list of years from current year down to 2013 */
function buildYearRange(): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let y = currentYear; y >= 2013; y--) {
    years.push(String(y));
  }
  return years;
}

const YEARS = buildYearRange();

export default function HeatmapContainer({ username }: HeatmapContainerProps) {
  // Default to the current year so the chart shows immediately with recent data
  const [selectedYear, setSelectedYear] = useState<string>(YEARS[0]);
  const [data, setData] = useState<ContributionDay[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchContributions(username, selectedYear)
      .then((res) => {
        // flattenContributions extracts ContributionDay[] from the nested YearMap
        // for the requested year, and sorts them chronologically
        const days = flattenContributions(res.contributions, selectedYear);
        setData(days);

        // Total for the selected year (the API includes per-year totals in res.total)
        setTotalCount(res.total[selectedYear] ?? 0);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username, selectedYear]); // re-fetch whenever username OR year changes

  return (
    <section className="heatmap-container">
      {/* ── Heading row ── */}
      <div className="heatmap-container__heading">
        {loading ? (
          <span className="heatmap-container__heading-skeleton" />
        ) : (
          <h2 className="heatmap-container__title">
            {totalCount.toLocaleString()} contributions in {selectedYear}
          </h2>
        )}
      </div>

      {/* ── Graph + Year rail side by side ── */}
      <div className="heatmap-container__body">
        <div className="heatmap-container__graph-wrap">
          {error ? (
            <p className="heatmap-container__error">Could not load contributions.</p>
          ) : loading ? (
            <div className="heatmap-container__skeleton" />
          ) : (
            <ContributionGraph data={data} year={selectedYear} />
          )}

          {/* ── Less → More legend ── */}
          {!loading && !error && (
            <div className="heatmap-container__legend">
              <span className="heatmap-container__legend-label">Less</span>
              {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map((color) => (
                <span
                  key={color}
                  className="heatmap-container__legend-cell"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span className="heatmap-container__legend-label">More</span>
            </div>
          )}
        </div>

        {/* Year rail — clicking a year triggers a new fetch via useEffect */}
        <YearRail
          years={YEARS}
          selectedYear={selectedYear}
          onYearSelect={setSelectedYear}
        />
      </div>
    </section>
  );
}
