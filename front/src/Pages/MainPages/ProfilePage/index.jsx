import Footer from "../Constants/Footer";
import PostModal from "../Constants/PostModal";
import { useTheme } from "../../../Contexts/ThemeContext";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPosts from "../Constants/LoadingPosts";
import Post from "../Constants/Post/Post";
import api from "../../Services/Api/api.js";
import Community from "./components/Community";
import { handleContent } from "./services";
import {
  ProfileBackground,
  ProfileHeader,
  UsersCover,
  UserMainInfoContainer,
  UserProfilePic,
  UserBiography,
  UserStatisticsContainer,
  Statistic,
  ViewButton,
  ViewSelection,
  FollowButton,
} from "./styles";

const PROFILEVIEWS = ["Posts", "Communities"];

export default function ProfilePage({
  publicationModal,
  setPublicationModal,
  loading,
  setLoading,
}) {
  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();

  const [viewContent, setViewContent] = useState(0);
  const [content, setContent] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  const navigate = useNavigate();
  const { userName } = useParams();

  useEffect(() => {
    if (!userInfo) {
      const isLoggedIn = localStorage.getItem("userInfo");

      if (!isLoggedIn) {
        navigate("/sign-in");
        return;
      } else {
        const info = JSON.parse(isLoggedIn);
        setUserInfo(info);
        setLoading(true);
      }
    }
  }, []);

  useEffect(() => {
    if (userInfo && viewContent === 0) {
      api
        .get(`/publications/profile/${userName}`, {
          headers: { Authorization: "Bearer " + userInfo.token },
        })
        .then((res) => {
          setLoading(false);
          setContent(res.data);
        })
        .catch((err) => console.log(err));

      api
        .get(`/users/info/${userName}`)
        .then((res) => {
          setUserProfileInfo(res.data);
          console.log(res.data)
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [loading, likeLoading]);

  return (
    <>
      {userProfileInfo && (
        <ProfileBackground theme={theme}>
          <ProfileHeader>
            <button>
              <HiArrowNarrowLeft onClick={() => navigate("/timeline")} />
            </button>
            <button>
              <SlOptions />
            </button>
          </ProfileHeader>
          <UsersCover src={userProfileInfo.cover} />
          <UserMainInfoContainer>
            <UserProfilePic src={userProfileInfo.picture} />
            <h1>{userProfileInfo.fullName}</h1>
            <h2>@{userProfileInfo.userName}</h2>
            <UserBiography theme={theme}>
              <strong>-</strong> user's bio
            </UserBiography>
          </UserMainInfoContainer>
          {userInfo.userName !== userProfileInfo.userName && (
            <>
            <FollowButton>Follow</FollowButton>
            </>
          )}
          
          <UserStatisticsContainer>
            <Statistic theme={theme}>
              <h1>100</h1>
              <h4>Posts</h4>
            </Statistic>
            <Statistic>
              <h1>1,2k</h1>
              <h4>Followers</h4>
            </Statistic>
            <Statistic>
              <h1>100</h1>
              <h4>Following</h4>
            </Statistic>
          </UserStatisticsContainer>
          <ViewSelection>
            {PROFILEVIEWS.map((v, i) => (
              <ViewButton
                key={i}
                isSelected={viewContent === i}
                onClick={() => {
                  setViewContent(i);
                  handleContent(i, userInfo, userName, setLoading, setContent);
                }}
              >
                {v}
              </ViewButton>
            ))}
          </ViewSelection>
          {loading && <LoadingPosts theme={theme} />}
          {!loading && content.length > 0 && (
            <>
              {viewContent === 0
                ? content.map((p, i) => (
                    <>
                      <Post
                        key={i}
                        fullName={p.users.fullName}
                        userName={p.users.userName}
                        userPicture={p.users.picture}
                        postMedia={p.media}
                        postDescription={p.description}
                        likesCount={p._count.likes}
                        commentsCount={p._count.comments}
                        time={p.createdAt}
                        postId={p.id}
                        userInfo={userInfo}
                        likeLoading={likeLoading}
                        setLikeLoading={setLikeLoading}
                        likes={p.likes}
                        theme={theme}
                      />
                    </>
                  ))
                : content.map((c, i) => (
                    <Community
                      name={c.name}
                      description={c.description}
                      icon={c.icon}
                      cover={c.cover}
                    />
                  ))}
            </>
          )}

          <Footer theme={theme} setPublicationModal={setPublicationModal} />
          <PostModal
            publicationModal={publicationModal}
            setPublicationModal={setPublicationModal}
            theme={theme}
            loading={loading}
            setLoading={setLoading}
            userInfo={userInfo}
          />
        </ProfileBackground>
      )}
    </>
  );
}
