import {
  LocationIcon,
  MailIcon,
  LinkIcon,
  OrganizationIcon,
  PeopleIcon,
  XIcon
} from "@primer/octicons-react";
import { Link } from "react-router-dom";
import type { User } from "../../types/github";
import AchievementBadge from "../AchievementBadge/AchievementBadge";
import OrgBadges from "../OrgBadges/OrgBadges";
import { MOCK_ACHIEVEMENTS } from "../../mock/achievements";
import "./Sidebar.css";

interface SidebarProps {
  user: User;
  username: string;
}

export default function Sidebar({ user, username }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* ── Avatar ── */}
      <div className="sidebar__avatar-wrap">
        <img
          className="sidebar__avatar"
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={296}
          height={296}
        />
      </div>

      {/* ── Name & username ── */}
      <div className="sidebar__names">
        <h1 className="sidebar__name">{user.name ?? user.login}</h1>
        <p className="sidebar__login">{user.login}</p>
      </div>

      {/* ── Bio ── */}
      {user.bio && <p className="sidebar__bio">{user.bio}</p>}

      {/* ── Edit profile (static — no auth in this clone) ── */}
      <button className="sidebar__edit-btn">Edit profile</button>

      {/* ── Followers / Following ── */}
      <div className="sidebar__follow">
        <PeopleIcon size={16} className="sidebar__follow-icon" />
        <Link
          to={`/${username}?tab=followers`}
          className="sidebar__follow-link"
        >
          <strong>{formatCount(user.followers)}</strong>
          <span className="sidebar__follow-label"> followers</span>
        </Link>
        <span className="sidebar__follow-dot">·</span>
        <Link
          to={`/${username}?tab=following`}
          className="sidebar__follow-link"
        >
          <strong>{formatCount(user.following)}</strong>
          <span className="sidebar__follow-label"> following</span>
        </Link>
      </div>

      {/* ── Details list ── */}
      <ul className="sidebar__details">
        {user.company && (
          <li className="sidebar__detail">
            <OrganizationIcon size={16} className="sidebar__detail-icon" />
            <span>{user.company}</span>
          </li>
        )}
        {user.location && (
          <li className="sidebar__detail">
            <LocationIcon size={16} className="sidebar__detail-icon" />
            <span>{user.location}</span>
          </li>
        )}
        {user.email && (
          <li className="sidebar__detail">
            <MailIcon size={16} className="sidebar__detail-icon" />
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </li>
        )}
        {user.blog && (
          <li className="sidebar__detail">
            <LinkIcon size={16} className="sidebar__detail-icon" />
            <a href={user.blog} target="_blank" rel="noreferrer">
              {user.blog.replace(/^https?:\/\//, "")}
            </a>
          </li>
        )}
        {user.twitter_username && (
          <li className="sidebar__detail">
            <XIcon size={16} className="sidebar__detail-icon" />
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noreferrer"
            >
              {user.twitter_username}
            </a>
          </li>
        )}
      </ul>

      {/* ── Achievements (mock) ── */}
      <div className="sidebar__achievements">
        <h3 className="sidebar__section-title">Achievements</h3>
        <div className="sidebar__achievement-list">
          {MOCK_ACHIEVEMENTS.map((a) => (
            <AchievementBadge key={a.name} achievement={a} />
          ))}
        </div>
      </div>

      {/* ── Organizations (live API — bonus) ── */}
      <OrgBadges username={username} />
    </aside>
  );
}

/** Formats large numbers: 1200 → "1.2k" */
function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
