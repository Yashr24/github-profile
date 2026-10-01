import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { User } from "../../types/github";
import Header from "../../components/Header/Header";
import ProfileContainer from "../../containers/ProfileContainer/ProfileContainer";
import PopularRepos from "../../components/PopularRepos/PopularRepos";
import ReposContainer from "../../containers/ReposContainer/ReposContainer";
import HeatmapContainer from "../../containers/HeatmapContainer/HeatmapContainer";
import ActivityOverview from "../../components/ActivityOverview/ActivityOverview";
import ContributionTimeline from "../../components/ContributionTimeline/ContributionTimeline";
import { MOCK_ACTIVITY_OVERVIEW, MOCK_CONTRIBUTION_TIMELINE } from "../../mock/activity";
import FollowListContainer from "../../containers/FollowListContainer/FollowListContainer";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "";

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [publicRepoCount, setPublicRepoCount] = useState<number | undefined>(
    undefined
  );

  if (!username) return null;

  return (
    <div className="profile-page">
      <Header
        username={username}
        avatarUrl={avatarUrl}
        publicRepoCount={publicRepoCount}
      />

      <div className="profile-page__content">
        <ProfileContainer
          username={username}
          onUserLoaded={(user: User) => {
            setAvatarUrl(user.avatar_url);
            setPublicRepoCount(user.public_repos);
          }}
        >
          {activeTab === "followers" && (
            <div className="profile-page__tab-content">
              <FollowListContainer username={username} kind="followers" />
            </div>
          )}
          {activeTab === "following" && (
            <div className="profile-page__tab-content">
              <FollowListContainer username={username} kind="following" />
            </div>
          )}
          {activeTab === "" && (
            <div className="profile-page__tab-content">
              <PopularRepos username={username} />
              <HeatmapContainer username={username} />
              <ActivityOverview data={MOCK_ACTIVITY_OVERVIEW} />
              <ContributionTimeline months={MOCK_CONTRIBUTION_TIMELINE} />
            </div>
          )}
          {activeTab === "repositories" && (
            <div className="profile-page__tab-content">
              <ReposContainer username={username} />
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
        </ProfileContainer>
      </div>
    </div>
  );
}
