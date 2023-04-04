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

const postsMocked = [1, 2, 3, 4, 5];

const TIMELINESTYPES = ["My Timeline", "Communities"];

export default function TimelinePage() {
  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();
  const [selectedTimeline, setSelectedTimeline] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  ModalStyle.setAppElement();

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
        .get("/publications/findAll", {
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
            const al = alert("Your session has expired.");
            localStorage.removeItem("userInfo");
            navigate("/sign-in");
          }
          setLoading(false);
        });
      api.get("/");
    }
  }, [loading]);

  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        <FirstSectionTitle>Your Communities</FirstSectionTitle>
        <FirstSection>
          <CommunitiesContainer>
            {postsMocked.map((c) => (
              <Community
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
              isSelected={selectedTimeline === i}
              onClick={() => setSelectedTimeline(i)}
            >
              {t}
            </TimelineButton>
          ))}
        </TimelineSelection>
        {loading ? (
          <>Carregando...</>
        ) : posts.length > 0 ? (
          posts?.map((p, i) => (
            <Post
              key={i}
              fullName={p.users.fullName}
              userName={p.users.userName}
              picture={p.users.picture}
            ></Post>
          ))
        ) : (
          <>NAO TEM POST MEU DEUS DO CEU</>
        )}

        <Footer theme={theme} setIsModalOpened={setIsModalOpened} />
        <ModalStyle
          shouldCloseOnOverlayClick={true}
          onRequestClose={handleCloseModal}
          style={modalStyles}
          isOpen={isModalOpened}
        >
          <NewPostForm
            userInfo={userInfo}
            theme={theme}
            setIsModalOpened={setIsModalOpened}
            loading={loading}
            setLoading={setLoading}
          />
        </ModalStyle>
      </Background>
    </>
  );
}
