import { useState, useEffect } from "react";
import { fetchUser } from "../../services/GithubService";
import type { User } from "../../types/github";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ProfileContainer.css";

interface ProfileContainerProps {
  username: string;
  /** The active tab content to render in the main column */
  children: React.ReactNode;
  /** Called once the user data is loaded — lets the parent show the avatar in the header */
  onUserLoaded?: (user: User) => void;
}

export default function ProfileContainer({ username, children, onUserLoaded }: ProfileContainerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state whenever username changes
    setUser(null);
    setLoading(true);
    setError(null);

    fetchUser(username)
      .then((data) => {
        setUser(data);
        onUserLoaded?.(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div className="profile-container profile-container--loading">
        <div className="profile-container__skeleton-avatar" />
        <div className="profile-container__skeleton-lines">
          <div className="profile-container__skeleton-line profile-container__skeleton-line--wide" />
          <div className="profile-container__skeleton-line profile-container__skeleton-line--medium" />
          <div className="profile-container__skeleton-line profile-container__skeleton-line--narrow" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-container profile-container--error">
        <p className="profile-container__error-msg">
          {error ?? "Could not load this profile."}
        </p>
        <a href="/" className="profile-container__error-link">
          ← Search for another user
        </a>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Left sidebar */}
      <Sidebar user={user} username={username} />

      {/* Main content column (tab-specific content passed as children) */}
      <main className="profile-container__main">
        {children}
      </main>

    </div>
  );
}
