import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import Post from "./Components/Post";
import { useEffect, useState } from "react";
import Community from "./Components/Community";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  ModalStyle,
  ModalHeader,
  ModalTitle,
  NewPostContent,
  TimelineButton,
  TimelineSelection,
  FirstSectionTitle,
  FirstSection,
  CommunitiesContainer,
  modalStyles,
  SubmitPostButton,
} from "./TimelineStyles";
import api from "../../Services/Api/api.js";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { useNavigate } from "react-router-dom";

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
  const [form, setForm] = useState({});
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

  function handleCloseModal() {
    setIsModalOpened(false);
  }

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }

  function sendForm(e) {
    e.preventDefault();
    //   setLoading(true)
    console.log(form);
    let finalObj;
    media ? (finalObj = { ...form, media }) : (finalObj = { ...form });

    api
      .post("/publications/new", finalObj, {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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
          if(err.response.status === 403){
            const al = alert("Your session has expired.")
            localStorage.removeItem("userInfo")
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
          posts?.map((p) => (
            <Post
              fullName={userInfo?.fullName}
              userName={userInfo?.userName}
              picture={userInfo?.picture}
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
          <ModalTitle theme={theme}>
            <h1>Create A New Post</h1>
          </ModalTitle>
          <ModalHeader theme={theme}>
            <div className="left-container">
              <img src="https://t4.ftcdn.net/jpg/03/36/26/53/360_F_336265345_U65QKmIeAmmpaPM2C1QaQKhDG7AxoMl9.jpg" />
              <div className="username-select">
                <h1>Nome de Usuário</h1>
                <select>
                  <option>My Timeline</option>
                  <option>Chess Comunity</option>
                </select>
              </div>
            </div>
            <div className="right-container">
              <div className="close-button">
                <RiCloseCircleFill onClick={() => setIsModalOpened(false)} />
              </div>
            </div>
          </ModalHeader>
          <NewPostContent theme={theme}>
            <textarea
              placeholder="What's up?"
              className="description"
              name="description"
              onChange={handleForm}
            ></textarea>
            <input type="file" name="file" id="file" className="media" />
            <label for="file">Add Some Media</label>
          </NewPostContent>
          <SubmitPostButton theme={theme} type="submit" onClick={sendForm}>
            Post
          </SubmitPostButton>
        </ModalStyle>
      </Background>
    </>
  );
}
