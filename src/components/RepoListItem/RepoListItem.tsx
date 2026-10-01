import type { Repository } from "../../types/github";
import { RepoVisibility } from "../../types/github";
import { formatRelativeDate } from "../../utils/date";
import "./RepoListItem.css";

interface RepoListItemProps {
  repo: Repository;
}

export default function RepoListItem({ repo }: RepoListItemProps) {
  const isPublic = repo.visibility === RepoVisibility.Public;

  return (
    <div className="repo-list-item">
      {/* ── Name + visibility pill ── */}
      <div className="repo-list-item__header">
        <span className="repo-list-item__name">{repo.name}</span>
        <span className={`repo-list-item__pill ${isPublic ? "repo-list-item__pill--public" : "repo-list-item__pill--private"}`}>
          {isPublic ? "Public" : "Private"}
        </span>
      </div>

      {/* ── Description ── */}
      {repo.description && (
        <p className="repo-list-item__description">{repo.description}</p>
      )}

      {/* ── Footer: license · last updated ── */}
      <div className="repo-list-item__footer">
        {repo.license && (
          <>
            <span className="repo-list-item__license">{repo.license.name}</span>
            <span className="repo-list-item__dot">·</span>
          </>
        )}
        <span className="repo-list-item__updated">
          {formatRelativeDate(repo.updated_at)}
        </span>
      </div>
    </div>
  );
}
