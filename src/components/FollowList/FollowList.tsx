import type { User } from "../../types/github";
import type { FollowListKind } from "../../services/GithubService";
import FollowUserCard from "../FollowUserCard/FollowUserCard";
import "./FollowList.css";

interface FollowListProps {
  kind: FollowListKind;
  users: User[];
}

export default function FollowList({ kind, users }: FollowListProps) {
  const title = kind === "followers" ? "Followers" : "Following";

  return (
    <div className="follow-list">
      <h2 className="follow-list__title">{title}</h2>
      <div className="follow-list__items">
        {users.map((user) => (
          <FollowUserCard key={user.login} user={user} />
        ))}
      </div>
    </div>
  );
}
