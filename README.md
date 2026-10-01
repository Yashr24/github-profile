# GitHub Profile Viewer

A responsive clone of the GitHub profile page, built in **React** (the assignment specifies Angular — React was used instead and this difference is intentional).

Live demo shows the profile for any GitHub username at `/:username`.

---

## Tech Stack

- **React 18** + **TypeScript** (via Vite 5)
- **React Router v6** — `/:username` for profile, `?tab=` for tab switching
- **Apache ECharts** (`echarts-for-react`) — contribution heatmap calendar
- **@primer/octicons-react** — GitHub's official icon set
- Plain **CSS** (no Tailwind, Bootstrap, or MUI)

---

## Live vs Mock Data


| Section                                                     | Source                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| Left sidebar (avatar, name, bio, followers, location, etc.) | Live — `api.github.com/users/:username`                 |
| Contribution heatmap                                        | Live — proxy API (see below)                            |
| Year rail (clicking a year refetches the heatmap)           | Live — proxy API                                        |
| Popular repositories (Overview tab)                         | Live — `api.github.com/users/:username/repos`           |
| Repositories tab (full list + search)                       | Live — `api.github.com/users/:username/repos`           |
| Organizations                                               | Live — `api.github.com/users/:username/orgs`            |
| Achievements                                                | Mock — GitHub's achievement API requires authentication |
| Activity overview                                           | Mock                                                    |
| Contribution activity timeline                              | Mock                                                    |
| Header icon cluster (bell, +, avatar)                       | Static — decorative only, no auth                       |


---



## Why the Heatmap Uses a Proxy

GitHub's **REST API has no contributions endpoint** — the green calendar is only available through the **GraphQL API**, which requires a personal access token and cannot be called from a browser (CORS).

This project uses the public proxy at `[github-contributions-api.jogruber.de](https://github-contributions-api.jogruber.de/v4/shreeramk?y=last&format=nested)` which:

- Wraps the GraphQL call server-side
- Returns `{ date, count, level }` per day with `level` pre-bucketed 0–4
- Has CORS open and requires no authentication

Switching years (clicking the year rail) calls the same proxy with `?y={year}`.

---



## Project Structure

```
src/
  types/          # TypeScript interfaces (github.ts, mock.ts)
  services/       # API calls (GithubService.ts, ContributionsService.ts)
  utils/          # Helpers (date.ts)
  mock/           # Static mock data (achievements.ts, activity.ts)
  components/     # Pure UI components (props in → JSX out)
  containers/     # Stateful components that fetch data
  pages/          # Route-level pages (LandingPage, ProfilePage)
```

---



## Routes


| URL                           | Page                                   |
| ----------------------------- | -------------------------------------- |
| `/`                           | Landing page — enter a GitHub username |
| `/:username`                  | Profile overview                       |
| `/:username?tab=repositories` | Full repo list with search             |
| `/:username?tab=projects`     | Projects (empty — no public API)       |
| `/:username?tab=packages`     | Packages (empty — no public API)       |
| `/:username?tab=stars`        | Stars (empty — no public API)          |
| `/:username?tab=followers`    | User Followers List                    |
| `/:username?tab=following`    | User Following List                    |


---



## Running Locally

```bash
npm install
npm start       # starts Vite dev server at http://localhost:5173
```

Visit `http://localhost:5173/shreeramk` to see the reference profile.

---

