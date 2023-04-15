import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import Post from "../Constants/Post";
import { useEffect, useState } from "react";
import Community from "./Components/Community";
import {
  TimelineButton,
  TimelineSelection,
  FirstSectionTitle,
  FirstSection,
  CommunitiesContainer,
} from "./TimelineStyles";
import api from "../../Services/Api/api.js";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { Link, useNavigate } from "react-router-dom";
import LoadingPosts from "../Constants/LoadingPosts";
import NoPostsYet from "../Constants/NoPostsYet";
import PostModal from "../Constants/PostModal";
import styled from "styled-components";
import { handlePosts } from "./services";
import { BsPlusLg } from "react-icons/bs";
import { colors } from "../../Assets/colors";
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
    const isLoggedIn = localStorage.getItem("userInfo");
    if (!isLoggedIn) {
      navigate("/sign-in");
      return;
    } else {
      const info = JSON.parse(isLoggedIn);
      setUserInfo(info);
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (userInfo && selectedTimeline === 0) {
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
          console.log(res.data);
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
            {/*           <Community
              communityCover={"https://cdn.pixabay.com/photo/2014/11/07/00/00/volleyball-520093_960_720.jpg"}
              communityIcon={"https://cdn-icons-png.flaticon.com/512/2569/2569195.png"}
              communityName={"New Community"}
              categoryName={"Create a Brand New Sphere"}
              theme={theme}
              onClick={()=>alert('oi')}
              /> */}
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
            ></Post>
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

const NewCommunity = styled(Link)`
  all: unset;
  border: 2px solid ${colors.lighterBlack};
  height: 155px;
  width: 120px;
  margin-right: 15px;
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  > h1 {
    text-align: center;
    line-height: 18px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

const NewCommunityFooter = styled.div`
  width: 102%;
  height: 46px;
  background-color: ${colors.lighterBlack};
  -webkit-mask-image: radial-gradient(
    circle at top,
    transparent 16px,
    black 17px
  );
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  bottom: -23px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h1 {
    font-size: 14px;
  }
`;

const NewCommunityIcon = styled(BsPlusLg)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border: 2px solid ${colors.pink};
  filter: drop-shadow(1px 1px 12px ${colors.pink});
  background-color: ${colors.orange};
  font-size: 5px;
`;
