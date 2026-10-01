import "./YearRail.css";

interface YearRailProps {
  /** List of years to show, e.g. ["2026", "2025", ..., "2013"] */
  years: string[];
  /** The currently selected year */
  selectedYear: string;
  /** Called when the user clicks a year button */
  onYearSelect: (year: string) => void;
}

export default function YearRail({ years, selectedYear, onYearSelect }: YearRailProps) {
  return (
    <nav className="year-rail" aria-label="Select contribution year">
      <ul className="year-rail__list">
        {years.map((year) => (
          <li key={year}>
            <button
              className={`year-rail__btn ${selectedYear === year ? "year-rail__btn--active" : ""}`}
              onClick={() => onYearSelect(year)}
              aria-current={selectedYear === year ? "true" : undefined}
            >
              {year}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
