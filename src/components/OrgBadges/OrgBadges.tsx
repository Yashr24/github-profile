import { useState, useEffect } from "react";
import { fetchOrgs } from "../../services/GithubService";
import type { Organization } from "../../types/github";
import "./OrgBadges.css";

interface OrgBadgesProps {
  username: string;
}

export default function OrgBadges({ username }: OrgBadgesProps) {
  const [orgs, setOrgs] = useState<Organization[]>([]);

  useEffect(() => {
    fetchOrgs(username)
      .then(setOrgs)
      .catch(() => {
        // Silently fail — orgs section just won't render
      });
  }, [username]);

  if (orgs.length === 0) return null;

  return (
    <div className="org-badges">
      <h3 className="org-badges__title">Organizations</h3>
      <div className="org-badges__list">
        {orgs.map((org) => (
          <a
            key={org.id}
            href={`https://github.com/${org.login}`}
            target="_blank"
            rel="noreferrer"
            title={org.login}
            className="org-badges__link"
          >
            <img
              className="org-badges__avatar"
              src={org.avatar_url}
              alt={org.login}
              width={32}
              height={32}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
