import { useState, useEffect } from "react";
import {
  fetchFollowLogins,
  fetchUser,
  type FollowListKind,
} from "../../services/GithubService";
import type { User } from "../../types/github";
import FollowList from "../../components/FollowList/FollowList";
import "./FollowListContainer.css";

interface FollowListContainerProps {
  username: string;
  kind: FollowListKind;
}

export default function FollowListContainer({
  username,
  kind,
}: FollowListContainerProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUsers([]);
    setLoading(true);
    setError(null);

    fetchFollowLogins(username, kind)
      .then(async (logins) => {
        if (logins.length === 0) {
          setUsers([]);
          return;
        }

        const results = await Promise.allSettled(
          logins.map((login) => fetchUser(login))
        );

        const enriched: User[] = [];
        for (const result of results) {
          if (result.status === "fulfilled") {
            enriched.push(result.value);
          }
        }
        setUsers(enriched);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username, kind]);

  if (loading) {
    return (
      <div className="follow-list-container__loading">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="follow-list-container__skeleton" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="follow-list-container__error">{error}</p>;
  }

  if (users.length === 0) {
    const emptyMsg =
      kind === "followers" ? "No followers yet." : "Not following anyone.";
    return <p className="follow-list-container__empty">{emptyMsg}</p>;
  }

  return <FollowList kind={kind} users={users} />;
}
