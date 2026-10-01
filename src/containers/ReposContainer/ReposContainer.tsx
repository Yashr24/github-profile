import { useState, useEffect } from "react";
import { fetchRepos } from "../../services/GithubService";
import type { Repository } from "../../types/github";
import RepoList from "../../components/RepoList/RepoList";
import "./ReposContainer.css";

interface ReposContainerProps {
  username: string;
}

export default function ReposContainer({ username }: ReposContainerProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRepos([]);
    setLoading(true);
    setError(null);

    // Fetch up to 100 repos for the full Repositories tab list
    fetchRepos(username, 100)
      .then(setRepos)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="repos-container__loading">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="repos-container__skeleton" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="repos-container__error">
        Could not load repositories: {error}
      </p>
    );
  }

  return <RepoList repos={repos} />;
}
