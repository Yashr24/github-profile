import { useState, useEffect } from "react";
import { fetchRepos } from "../../services/GithubService";
import type { Repository } from "../../types/github";
import RepoCard from "../RepoCard/RepoCard";
import "./PopularRepos.css";

interface PopularReposProps {
  username: string;
}

export default function PopularRepos({ username }: PopularReposProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRepos([]);
    setLoading(true);
    setError(null);

    fetchRepos(username)
      .then((data) => setRepos(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="popular-repos">
        <div className="popular-repos__header">
          <span className="popular-repos__title">Popular repositories</span>
        </div>
        <div className="popular-repos__grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="popular-repos__skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (error || repos.length === 0) {
    return null;
  }

  return (
    <section className="popular-repos">
      <div className="popular-repos__header">
        <h2 className="popular-repos__title">Popular repositories</h2>
        <a className="popular-repos__customize" href="#">
          Customize your pins
        </a>
      </div>

      <div className="popular-repos__grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
