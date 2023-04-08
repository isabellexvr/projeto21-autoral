import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import Post from "./Components/Post";
import { useEffect, useState } from "react";
import Community from "./Components/Community";
import {
  ModalStyle,
  TimelineButton,
  TimelineSelection,
  FirstSectionTitle,
  FirstSection,
  CommunitiesContainer,
  modalStyles,
} from "./TimelineStyles";
import api from "../../Services/Api/api.js";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { useNavigate } from "react-router-dom";
import NewPostForm from "./Components/NewPostForm";
import LoadingPosts from "./Components/LoadingPosts";
import NoPostsYet from "./Components/NoPostsYet";
import PostModal from "../Constants/PostModal";

const postsMocked = [1, 2, 3, 4, 5];

const TIMELINESTYPES = ["My Timeline", "Communities"];

export default function TimelinePage({ isModalOpened, setIsModalOpened }) {
  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();
  const [selectedTimeline, setSelectedTimeline] = useState(0);

  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  ModalStyle.setAppElement();
  console.log(userInfo)

  function handleCloseModal() {
    setIsModalOpened(false);
  }

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
    if (userInfo) {
      api
        .get("/publications/findById", {
          headers: { Authorization: "Bearer " + userInfo.token },
        })
        .then((res) => {
          setPosts(res.data);
          console.log(res.data);
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
    }
  }, [loading]);

  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        <FirstSectionTitle>Your Communities</FirstSectionTitle>
        <FirstSection>
          <CommunitiesContainer>
            {postsMocked.map((c, i) => (
              <Community
                key={i}
                communityCover={
                  "https://yt3.googleusercontent.com/UhRgYwlAnZMwGH_SHPSSdaxP-7wc1eEPB9ye_5vJnWNna-RYvetlnxjOMGD3Lr6P2xPvLldDnA=s900-c-k-c0x00ffffff-no-rj"
                }
                communityIcon={""}
              />
            ))}
          </CommunitiesContainer>
        </FirstSection>
        <TimelineSelection>
          {TIMELINESTYPES.map((t, i) => (
            <TimelineButton
              key={i}
              isSelected={selectedTimeline === i}
              onClick={() => setSelectedTimeline(i)}
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
