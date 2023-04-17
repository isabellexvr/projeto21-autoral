import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import Post from "../Constants/Post/Post";
import { useEffect, useState } from "react";
import Community from "./Components/Community";
import {
  TimelineButton,
  TimelineSelection,
  FirstSectionTitle,
  FirstSection,
  CommunitiesContainer,
  NewCommunity,
  NewCommunityFooter,
  NewCommunityIcon,
} from "./TimelineStyles";
import api from "../../Services/Api/api.js";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { useNavigate } from "react-router-dom";
import LoadingPosts from "../Constants/LoadingPosts";
import NoPostsYet from "../Constants/NoPostsYet";
import PostModal from "../Constants/PostModal";
import { handlePosts } from "./services";
import { TiArrowDownThick } from "react-icons/ti";

const TIMELINESTYPES = ["My Timeline", "Communities"];

export default function TimelinePage({
  publicationModal,
  setPublicationModal,
  loading,
  setLoading,
}) {
  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();
  const [selectedTimeline, setSelectedTimeline] = useState(0);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);

  const navigate = useNavigate();

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
    if (userInfo && selectedTimeline === 0 && !posts) {
      api
        .get("/publications/timeline", {
          headers: { Authorization: "Bearer " + userInfo.token },
        })
        .then((res) => {
          setPosts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 403) {
            localStorage.removeItem("userInfo");
            navigate("/sign-in");
          }
          setLoading(false);
        });

      api
        .get(`/communities/user/${userInfo.userName}`)
        .then((res) => {
          setCommunities(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [loading, likeLoading]);

  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        <FirstSectionTitle>Your Communities</FirstSectionTitle>
        <FirstSection>
          <CommunitiesContainer>
            <NewCommunity to="/create-community" theme={theme}>
              <h1>Create Your Own Sphere!</h1>
              <TiArrowDownThick />
              <NewCommunityFooter>
                <h1>New Community</h1>
              </NewCommunityFooter>
              <NewCommunityIcon />
            </NewCommunity>

            {communities.map((c, i) => (
              <Community
                key={i}
                communityCover={c.cover}
                communityIcon={c.icon}
                communityName={c.name}
                categoryName={c.categories.name}
                theme={theme}
              />
            ))}
          </CommunitiesContainer>
        </FirstSection>
        <TimelineSelection>
          {TIMELINESTYPES.map((t, i) => (
            <TimelineButton
              key={i}
              isSelected={selectedTimeline === i}
              onClick={() => {
                setSelectedTimeline(i);
                handlePosts(i, userInfo, setLoading, setPosts);
              }}
            >
              {t}
            </TimelineButton>
          ))}
        </TimelineSelection>
        {loading ? (
          <LoadingPosts theme={theme} />
        ) : posts.length > 0 ? (
          posts?.map((p, i) => (
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
        ) : (
          <NoPostsYet />
        )}

        <Footer
          theme={theme}
          setPublicationModal={setPublicationModal}
          userName={userInfo?.userName}
        />

        <PostModal
          publicationModal={publicationModal}
          setPublicationModal={setPublicationModal}
          theme={theme}
          loading={loading}
          setLoading={setLoading}
          userInfo={userInfo}
          communities={communities}
        />
      </Background>
    </>
  );
}
