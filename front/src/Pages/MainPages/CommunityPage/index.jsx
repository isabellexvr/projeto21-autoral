import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { useState, useEffect } from "react";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import api from "../../Services/Api/api.js";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../Assets/colors";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";
import Post from "../Constants/Post/Post";
import { ThreeDots } from "react-loader-spinner";
import LoadingPosts from "../Constants/LoadingPosts";
import Footer from "../Constants/Footer";
import NoPostsYet from "../Constants/NoPostsYet";
import PostModal from "../Constants/PostModal";

export default function CommunityPage({
  publicationModal,
  setPublicationModal,
  loading,
  setLoading,
}) {
  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();

  const [isParticipant, setIsParticipant] = useState(false);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [communitiesPosts, setCommunitiesPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const { communityName } = useParams();
  console.log(communityName)

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
    if (!communityInfo && userInfo) {
      setLoading(true);
      api
        .get("/communities/info/" + communityName)
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          setCommunityInfo(res.data);
          if (res.data.usersCommunities?.find((e) => e.userId === userInfo.id))
            setIsParticipant(true);
        })
        .catch((err) => console.log(err));
    }
    if (isParticipant && communityInfo) {
      setPostsLoading(true);
      api
        .get("/publications/communities/" + communityInfo.id, {
          headers: { Authorization: "Bearer " + userInfo.token },
        })
        .then((res) => {
          setCommunitiesPosts(res.data);
          setPostsLoading(false);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [loading]);

  return (
    <>
      {loading && (
        <CommunityBackground theme={theme}>
          <CommunityHeader>
            <button>
              <HiArrowNarrowLeft onClick={() => navigate("/timeline")} />
            </button>
            <button>
              <SlOptions />
            </button>
          </CommunityHeader>
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color={theme.fontColor}
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </CommunityBackground>
      )}
      {communityInfo && !loading && (
        <CommunityBackground theme={theme}>
          <CommunityHeader>
            <button>
              <HiArrowNarrowLeft onClick={() => navigate("/timeline")} />
            </button>
            <button>
              <SlOptions />
            </button>
          </CommunityHeader>
          <CommunityMainInfoContainer>
            <CommunityProfilePic src={communityInfo?.icon} />
            <h1>{communityInfo?.name}</h1>
            <h2>
              {communityInfo?.addresses?.city} <strong>-</strong>{" "}
              {communityInfo?.addresses?.state} <strong>-</strong>{" "}
              {communityInfo?.addresses?.country}
            </h2>
            <div className="description">
              <label htmlFor="description">Description:</label>
              <p id="description">{communityInfo?.description}</p>
            </div>
          </CommunityMainInfoContainer>
          <CommunityCover src={communityInfo?.cover} />
          {isParticipant ? (
            <>
              {postsLoading ? (
                <LoadingPosts theme={theme} />
              ) : communitiesPosts.length === 0 ? (
                <NoPostsYet theme={theme} />
              ) : (
                <>
                  {communitiesPosts?.map((p, i) => (
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
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              <JoinCommunityButton theme={theme}>
                Join Community
              </JoinCommunityButton>
            </>
          )}
          <Footer theme={theme} setPublicationModal={setPublicationModal} userName={userInfo?.userName} />
          <PostModal
            publicationModal={publicationModal}
            setPublicationModal={setPublicationModal}
            theme={theme}
            loading={loading}
            setLoading={setLoading}
            userInfo={userInfo}
          />
        </CommunityBackground>
      )}
    </>
  );
}

const CommunityBackground = styled.div`
  background-color: ${(p) => p.theme.backgroundColor};
  z-index: 0;
  height: fit-content;
  padding-bottom: 120px;
  color: ${(p) => p.theme.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const CommunityHeader = styled.div`
  width: 85%;
  margin-top: 25px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    all: unset;
    width: 45px;
    height: 45px;
    background-color: ${colors.lighterBlack};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
      color: grey;
      font-size: 22px;
    }
  }
`;

export const CommunityCover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  filter: brightness(80%);
  width: 100%;
  height: 300px;
  z-index: -1;
  object-fit: cover;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;

export const CommunityMainInfoContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 25px;

  > h1 {
    font-size: 22px;
    font-weight: 600;
    color: ${colors.orange};
    padding: 5px;
  }
  > h2 {
    font-weight: 600;
    > strong {
      color: ${colors.pink};
    }
    padding: 5px;
  }
  > h3 {
    color: ${(p) => p.theme.fontColor};
  }

  > .description {
    > label {
      font-size: 12px;
      color: ${colors.orange};
      font-weight: 600;
    }
    > p {
      border: 2px solid ${colors.orange};
      border-radius: 10px;
      padding: 10px;
      margin-top: 2px;
      font-size: 13px;
    }
    margin-top: 7px;
    width: 70%;
  }
`;

export const CommunityProfilePic = styled.img`
  width: 100px;
  border-radius: 50%;
  height: 100px;
  object-fit: cover;
  border: 5px double ${colors.pink};
`;

const JoinCommunityButton = styled.button`
  all: unset;
  background-color: ${colors.orange};
  height: 40px;
  color: ${(p) => p.theme.backgroundColor};
  width: 150px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-bottom: 10px;
`;
