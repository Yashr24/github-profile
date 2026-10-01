import { useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  
  /**
   * Get the active tab from the search params.
   * If no tab is specified, default to "overview".
   */
  const activeTab = searchParams.get("tab") ?? "";

  if (!username) return null;

  return (
    <div className="profile-page">
      <Header username={username} />

      <main className="profile-page__content">
        {activeTab === "" && (
          <div className="profile-page__tab-content">
            <p className="profile-page__placeholder">Overview — coming in next step.</p>
          </div>
        )}
        {activeTab === "repositories" && (
          <div className="profile-page__tab-content">
            <p className="profile-page__placeholder">Repositories tab</p>
          </div>
        )}
        {activeTab === "projects" && (
          <div className="profile-page__tab-content">
            <p className="profile-page__placeholder">Projects tab</p>
          </div>
        )}
        {activeTab === "packages" && (
          <div className="profile-page__tab-content">
            <p className="profile-page__placeholder">Packages tab</p>
          </div>
        )}
        {activeTab === "stars" && (
          <div className="profile-page__tab-content">
            <p className="profile-page__placeholder">Stars tab</p>
          </div>
        )}
      </main>
    </div>
  );
}
