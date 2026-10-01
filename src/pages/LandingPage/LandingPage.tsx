import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarkGithubIcon } from "@primer/octicons-react";
import "./LandingPage.css";

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) {
      navigate(`/${trimmed}`);
    }
  }

  return (
    <div className="landing">
      <div className="landing__card">
        <MarkGithubIcon size={48} className="landing__logo" />

        <h1 className="landing__title">GitHub Profile Viewer</h1>
        <p className="landing__subtitle">Enter a GitHub username to view their profile</p>

        <form className="landing__form" onSubmit={handleSubmit}>
          <input
            className="landing__input"
            type="text"
            placeholder="e.g. shreeramk"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button className="landing__button" type="submit" disabled={!username.trim()}>
            View Profile
          </button>
        </form>
      </div>
    </div>
  );
}
