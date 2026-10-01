import { useSearchParams } from "react-router-dom";
import {
  BookIcon,
  RepoIcon,
  ProjectIcon,
  PackageIcon,
  StarIcon,
} from "@primer/octicons-react";
import "./TabBar.css";

export interface TabItem {
  label: string;
  /** Value of the ?tab= query param. Empty string = Overview (no param). */
  tab: string;
  icon: React.ReactNode;
}

const TABS: TabItem[] = [
  { label: "Overview", tab: "", icon: <BookIcon size={16} /> },
  { label: "Repositories", tab: "repositories", icon: <RepoIcon size={16} /> },
  { label: "Projects", tab: "projects", icon: <ProjectIcon size={16} /> },
  { label: "Packages", tab: "packages", icon: <PackageIcon size={16} /> },
  { label: "Stars", tab: "stars", icon: <StarIcon size={16} /> },
];

export default function TabBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "";

  function handleTabClick(tab: string) {
    if (tab === "") {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  }

  return (
    <nav className="tabbar" aria-label="Profile navigation">
      <ul className="tabbar__list">
        {TABS.map((item) => (
          <li key={item.tab} className="tabbar__item">
            <button
              className={`tabbar__button ${activeTab === item.tab ? "tabbar__button--active" : ""}`}
              onClick={() => handleTabClick(item.tab)}
              aria-current={activeTab === item.tab ? "page" : undefined}
            >
              <span className="tabbar__icon">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
