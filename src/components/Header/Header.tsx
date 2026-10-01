import {
  ThreeBarsIcon,
  MarkGithubIcon,
  SearchIcon,
  BellIcon,
  PlusIcon,
} from "@primer/octicons-react";
import TabBar from "../TabBar/TabBar";
import "./Header.css";

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
  return (
    <header className="header">
      {/* ── Row 1: logo, username, search, icon cluster ── */}
      <div className="header__row1">
        <div className="header__left">
          <button className="header__icon-btn" aria-label="Open navigation menu">
            <ThreeBarsIcon size={16} />
          </button>
          <a href="https://github.com" className="header__logo" aria-label="GitHub homepage">
            <MarkGithubIcon size={32} />
          </a>
          <span className="header__username">{username}</span>
        </div>

        <div className="header__center">
          <div className="header__search">
            <SearchIcon size={16} className="header__search-icon" />
            <span className="header__search-placeholder">
              Type <kbd>/</kbd> to search
            </span>
          </div>
        </div>

        {/* Static icon cluster — decorative, no auth in this clone */}
        <div className="header__right">
          <button className="header__icon-btn" aria-label="Notifications">
            <BellIcon size={16} />
          </button>
          <button className="header__icon-btn" aria-label="Create new">
            <PlusIcon size={16} />
          </button>
          {/* Avatar placeholder */}
          <div className="header__avatar" aria-label="User menu">
            <div className="header__avatar-circle" />
          </div>
        </div>
      </div>

      {/* ── Row 2: tab navigation ── */}
      <TabBar />
    </header>
  );
}
