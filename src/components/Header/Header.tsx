import {
  ThreeBarsIcon,
  MarkGithubIcon,
  SearchIcon,
  PlusIcon,
  CopilotIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  ProjectIcon,
  InboxIcon,
} from "@primer/octicons-react";
import TabBar from "../TabBar/TabBar";
import "./Header.css";

interface HeaderProps {
  username: string;
  /** User avatar URL — populated once the profile API responds */
  avatarUrl?: string;
  /** public_repos from profile API — shown on Repositories tab */
  publicRepoCount?: number;
}

export default function Header({
  username,
  avatarUrl,
  publicRepoCount,
}: HeaderProps) {
  return (
    <header className="header">
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

        <div className="header__right">
          <div className="header__search">
            <SearchIcon size={14} className="header__search-icon" />
            <span className="header__search-placeholder">
              Type <kbd>/</kbd> to search
            </span>
          </div>

          <button
            className="header__icon-btn header__icon-btn--bordered header__icon-btn--split"
            aria-label="Copilot"
            type="button"
          >
            <CopilotIcon size={16} />
            <span className="header__caret">▾</span>
          </button>

          <span className="header__divider" aria-hidden="true" />

          <button
            className="header__icon-btn header__icon-btn--bordered header__icon-btn--split"
            aria-label="Create new"
            type="button"
          >
            <PlusIcon size={16} />
            <span className="header__caret">▾</span>
          </button>
          <button
            className="header__icon-btn header__icon-btn--bordered"
            aria-label="Issues"
            type="button"
          >
            <IssueOpenedIcon size={16} />
          </button>
          <button
            className="header__icon-btn header__icon-btn--bordered"
            aria-label="Pull requests"
            type="button"
          >
            <GitPullRequestIcon size={16} />
          </button>
          <button
            className="header__icon-btn header__icon-btn--bordered"
            aria-label="Projects"
            type="button"
          >
            <ProjectIcon size={16} />
          </button>
          <button
            className="header__icon-btn header__icon-btn--bordered"
            aria-label="Inbox"
            type="button"
          >
            <InboxIcon size={16} />
          </button>

          <div className="header__avatar-wrap" aria-label="User menu">
            {avatarUrl ? (
              <img
                className="header__avatar-img"
                src={avatarUrl}
                alt={username}
                width={20}
                height={20}
              />
            ) : (
              <div className="header__avatar-placeholder" />
            )}
          </div>
        </div>
      </div>

      <TabBar publicRepoCount={publicRepoCount} />
    </header>
  );
}
