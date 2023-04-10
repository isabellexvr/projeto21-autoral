import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import Post from "./Components/Post";
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
import { useNavigate } from "react-router-dom";
import LoadingPosts from "./Components/LoadingPosts";
import NoPostsYet from "./Components/NoPostsYet";
import PostModal from "../Constants/PostModal";
import styled from "styled-components";

const TIMELINESTYPES = ["My Timeline", "Communities"];

export default function TimelinePage({ isModalOpened, setIsModalOpened }) {
  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();
  const [selectedTimeline, setSelectedTimeline] = useState(0);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

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
        .get("/communities/user", {
          headers: { Authorization: "Bearer " + userInfo.token },
        })
        .then((res) => {
          setCommunities(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [loading]);

  function handlePosts(timeline) {
    if(timeline === 1){
      //TO-DO: trazer os posts das comunidades do usuário
    }
  }

  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        <FirstSectionTitle>Your Communities</FirstSectionTitle>
        <FirstSection>
          <CommunitiesContainer>
            {communities.map((c, i) => (
              <Community
                key={i}
                communityCover={""}
                communityIcon={c.icon}
                communityName={c.name}
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
                handlePosts(i);
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
            ></Post>
          ))
        ) : (
          <NoPostsYet />
        )}

        <Footer theme={theme} setIsModalOpened={setIsModalOpened} />
        <PostModal
          isModalOpened={isModalOpened}
          setIsModalOpened={setIsModalOpened}
          theme={theme}
          loading={loading}
          setLoading={setLoading}
          userInfo={userInfo}
        />
      </Background>
    </>
  );
}

const LoadinCommunities = styled.div`
    height: 158px;
    width: 100%;
    background-color: yellow;
`