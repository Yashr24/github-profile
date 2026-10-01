import { useState } from "react";
import { SearchIcon } from "@primer/octicons-react";
import type { Repository } from "../../types/github";
import RepoListItem from "../RepoListItem/RepoListItem";
import "./RepoList.css";

interface RepoListProps {
  repos: Repository[];
}

export default function RepoList({ repos }: RepoListProps) {
  const [query, setQuery] = useState("");

  // Client-side filtering — searches name and description
  const filtered = repos.filter((repo) => {
    const q = query.toLowerCase();
    return (
      repo.name.toLowerCase().includes(q) ||
      (repo.description?.toLowerCase().includes(q) ?? false)
    );
  });

  return (
    <div className="repo-list">
      {/* ── Search bar ── */}
      <div className="repo-list__search-wrap">
        <SearchIcon size={16} className="repo-list__search-icon" />
        <input
          className="repo-list__search"
          type="text"
          placeholder="Find a repository..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search repositories"
        />
      </div>

      {/* ── List ── */}
      {filtered.length === 0 ? (
        <p className="repo-list__empty">
          {query ? `No repositories match "${query}".` : "No repositories found."}
        </p>
      ) : (
        <div className="repo-list__items">
          {filtered.map((repo) => (
            <RepoListItem key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
