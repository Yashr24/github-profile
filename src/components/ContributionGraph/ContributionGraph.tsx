/**
 * ContributionGraph
 *
 * Renders the GitHub-style green heatmap calendar using Apache ECharts.
 *
 * HOW ECHARTS WORKS (quick primer):
 * ─────────────────────────────────
 * ECharts is a chart library from Apache. You describe what you want to
 * draw by passing an `option` object to the <ReactECharts> component.
 * The option object has several sections:
 *
 *  • tooltip    – the popup that appears when you hover a cell
 *  • visualMap  – maps a numeric value to a color (we use "piecewise" mode
 *                 so each level 0-4 maps to a specific green shade)
 *  • calendar   – defines the grid layout (weekly calendar, month/day labels)
 *  • series     – the actual data series; type "heatmap" with
 *                 coordinateSystem "calendar" plots each day as a colored cell
 *
 * DATA FORMAT ECharts expects for calendar heatmap:
 *   [ [date, value, extraPayload], ... ]
 *   e.g. [ ["2025-10-01", 1, 2], ... ]
 *         ─────────────  ─  ─
 *            ISO date    │  └── we store the raw count here for the tooltip
 *                        └── contribution level (0–4), used by visualMap
 */

import ReactECharts from "echarts-for-react";
import type { ContributionDay } from "../../types/github";
import "./ContributionGraph.css";

interface ContributionGraphProps {
  /** Flat list of contribution days for the selected year */
  data: ContributionDay[];
  /** The year being displayed, e.g. "2025" */
  year: string;
}

/** GitHub's five contribution greens, matching our CSS variables */
const LEVEL_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export default function ContributionGraph({ data, year }: ContributionGraphProps) {
  /**
   * Transform ContributionDay[] → ECharts data array.
   * Each element is [date, level, count] where:
   *   - date  → "YYYY-MM-DD" string (ECharts calendar understands ISO dates)
   *   - level → 0–4 (used by visualMap to pick the color)
   *   - count → raw number of commits (shown in the tooltip)
   */
  const chartData = data.map((day) => [day.date, day.level, day.count]);

  /**
   * ECharts option object — this is the full chart configuration.
   * Think of it as a "description" of the chart you want ECharts to draw.
   */
  const option = {
    // ── Tooltip ──────────────────────────────────────────────────────────────
    // Shown when the user hovers over a day cell.
    tooltip: {
      trigger: "item",
      formatter: (params: { data: [string, number, number] }) => {
        const [date, , count] = params.data;
        if (count === 0) return `<b>${date}</b><br/>No contributions`;
        return `<b>${date}</b><br/>${count} contribution${count === 1 ? "" : "s"}`;
      },
    },

    // ── Visual Map (piecewise) ────────────────────────────────────────────────
    // Maps the numeric "level" value (0–4) in each data point to a color.
    // "piecewise" = discrete buckets (vs "continuous" which uses a gradient).
    // We hide the legend (show: false) and define our own Less→More below.
    visualMap: {
      show: false,
      type: "piecewise",
      // [date, level, count] — color by level (index 1), not count (index 2).
      dimension: 1,
      pieces: [
        { min: 0, max: 0, color: LEVEL_COLORS[0] }, // no contributions
        { min: 1, max: 1, color: LEVEL_COLORS[1] }, // level 1
        { min: 2, max: 2, color: LEVEL_COLORS[2] }, // level 2
        { min: 3, max: 3, color: LEVEL_COLORS[3] }, // level 3
        { min: 4, max: 4, color: LEVEL_COLORS[4] }, // level 4 (darkest)
      ],
    },

    // ── Calendar ──────────────────────────────────────────────────────────────
    // Defines the "coordinate system" — a weekly grid with month and day labels.
    calendar: {
      // "range" tells ECharts which year (or date range) to render.
      range: year,

      // Each cell is 13x13 pixels (the white border acts as the 3px gap).
      cellSize: [13, 13],

      // No internal grid lines between cells — the border handles spacing.
      splitLine: { show: false },

      // White border creates the visual gap between cells.
      // `color` is the FALLBACK color for days that have no data point at all
      // (e.g. future dates, or days missing from the API response).
      // Without this, those cells render white instead of the light grey.
      itemStyle: {
        borderWidth: 3,
        borderColor: "#fff",
        borderRadius: 2,
        color: "#ebedf0",
      },

      // Month label styling (Jan, Feb, … shown above the grid)
      monthLabel: {
        nameMap: "en",
        fontSize: 12,
        color: "#656d76",
      },

      // Day-of-week labels on the left (Mon, Wed, Fri only — matches GitHub)
      dayLabel: {
        firstDay: 0, // week starts Sunday
        nameMap: ["", "Mon", "", "Wed", "", "Fri", ""],
        fontSize: 12,
        color: "#656d76",
      },

      // Hide the year number drawn inside the chart (we show it in the rail)
      yearLabel: { show: false },

      // Chart position inside the canvas.
      // top: 30 gives enough room for the month labels (Jan, Feb, …) to not be clipped.
      top: 30,
      left: 40,
      right: 10,
      bottom: 10,
    },

    // ── Series ────────────────────────────────────────────────────────────────
    // "heatmap" series with coordinateSystem "calendar" = plot each data point
    // as a colored cell on the calendar grid.
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: chartData,
      },
    ],
  };

  return (
    <div className="contribution-graph">
      <ReactECharts
        option={option}
        style={{ height: "175px", width: "100%" }}
        /**
         * notMerge: true → replace the full option on every re-render
         * instead of merging with the previous option. Important when
         * the year changes — we want a completely fresh chart, not a merge.
         */
        notMerge={true}
      />
    </div>
  );
}
