import { Link } from "react-router-dom";
import { LocationIcon, OrganizationIcon } from "@primer/octicons-react";
import type { User } from "../../types/github";
import "./FollowUserCard.css";

interface FollowUserCardProps {
  user: User;
}

export default function FollowUserCard({ user }: FollowUserCardProps) {
  const profilePath = `/${user.login}`;

  return (
    <article className="follow-user-card">
      <Link to={profilePath} className="follow-user-card__avatar-link">
        <img
          className="follow-user-card__avatar"
          src={user.avatar_url}
          alt=""
          width={48}
          height={48}
        />
      </Link>

      <div className="follow-user-card__body">
        <div className="follow-user-card__names">
          <Link to={profilePath} className="follow-user-card__name">
            {user.name ?? user.login}
          </Link>
          <Link to={profilePath} className="follow-user-card__login">
            {user.login}
          </Link>
        </div>

        {user.bio && <p className="follow-user-card__bio">{user.bio}</p>}

        {(user.company || user.location) && (
          <div className="follow-user-card__meta">
            {user.company && (
              <span className="follow-user-card__meta-item">
                <OrganizationIcon size={16} className="follow-user-card__meta-icon" />
                {user.company}
              </span>
            )}
            {user.location && (
              <span className="follow-user-card__meta-item">
                <LocationIcon size={16} className="follow-user-card__meta-icon" />
                {user.location}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
