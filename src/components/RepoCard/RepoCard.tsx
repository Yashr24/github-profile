import { RepoForkedIcon, StarIcon } from "@primer/octicons-react";
import type { Repository } from "../../types/github";
import { RepoVisibility } from "../../types/github";
import "./RepoCard.css";

interface RepoCardProps {
  repo: Repository;
}

/** Map of common language names to their GitHub dot colors */
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  "Jupyter Notebook": "#DA5B0B",
  EJS: "#a91e50",
};

export default function RepoCard({ repo }: RepoCardProps) {
  const isPublic = repo.visibility === RepoVisibility.Public;
  console.log(repo.language);
  const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? "#8b949e") : null;

  return (
    <div className="repo-card">
      <div className="repo-card__header">
        <a
          className="repo-card__name"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          {repo.name}
        </a>
        {isPublic && <span className="repo-card__visibility">Public</span>}
      </div>

      {repo.fork && (
        <p className="repo-card__forked">
          <RepoForkedIcon size={12} />
          <span>Forked repository</span>
        </p>
      )}

      {repo.description && (
        <p className="repo-card__description">{repo.description}</p>
      )}

      <div className="repo-card__footer">
        {repo.language && langColor && (
          <span className="repo-card__lang">
            <span
              className="repo-card__lang-dot"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="repo-card__stars">
            <StarIcon size={14} />
            {repo.stargazers_count}
          </span>
        )}
      </div>
    </div>
  );
}
