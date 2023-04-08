import Footer from "../Constants/Footer";
import Header from "../Constants/Header";
import PostModal from "../Constants/PostModal";
import { Background } from "../Constants/styles";
import { useTheme } from "../../../Contexts/ThemeContext";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import styled from "styled-components";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";
import { colors } from "../../Assets/colors";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPosts from "../TimelinePage/Components/LoadingPosts";

const PROFILEVIEWS = ["Posts", "Communities"];

export default function ProfilePage({ isModalOpened, setIsModalOpened }) {
  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(0);
  const [usersPosts, setUsersPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userInfo");

    if (!isLoggedIn) {
      navigate("/sign-in");
      return;
    } else {
      const info = JSON.parse(isLoggedIn);
      setUserInfo(info);
    }
  }, []);

  return (
    <>
      {userInfo && (
        <ProfileBackground theme={theme}>
          <ProfileHeader>
            <button>
              <HiArrowNarrowLeft onClick={() => navigate("/timeline")} />
            </button>
            <button>
              <SlOptions />
            </button>
          </ProfileHeader>
          <UsersCover src="https://i.pinimg.com/originals/83/7c/90/837c90d079c6d1fb13d9cfeda0328183.jpg" />
          <UserMainInfoContainer>
            <UserProfilePic src={userInfo.picture} />
            <h1>{userInfo.fullName}</h1>
            <h2>@{userInfo.userName}</h2>
            <UserBiography theme={theme}>
              <strong>-</strong> user's bio
            </UserBiography>
          </UserMainInfoContainer>
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
              <ViewButton isSelected={view === i} onClick={() => setView(i)}>
                {v}
              </ViewButton>
            ))}
          </ViewSelection>
          {loading && <LoadingPosts theme={theme} />}

          <Footer theme={theme} setIsModalOpened={setIsModalOpened} />
          <PostModal
            isModalOpened={isModalOpened}
            setIsModalOpened={setIsModalOpened}
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

const ProfileBackground = styled.div`
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

const ProfileHeader = styled.div`
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

const UsersCover = styled.img`
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

const UserMainInfoContainer = styled.div`
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
    color: ${colors.pink};
    padding: 5px;
  }
  > h3 {
    color: ${(p) => p.theme.fontColor};
  }
`;

const UserProfilePic = styled.img`
  width: 100px;
  border-radius: 50%;
  height: 100px;
  object-fit: cover;
  border: 5px double ${colors.pink};
`;

const UserBiography = styled.h3`
  color: ${(p) => p.theme.fontColor};
  > strong {
    color: ${colors.orange};
  }
`;

const UserStatisticsContainer = styled.div`
  width: 86%;

  height: 70px;
  border-radius: 15px;
  border: 1px solid grey;
  background-color: ${colors.lighterBlack};
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const Statistic = styled.div`
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h1 {
    font-size: 20px;
    color: ${(p) => p.theme.fontColor};
    margin-bottom: 5px;
  }
  > h4 {
    font-size: 14px;
    opacity: 0.7;
    color: ${(p) => p.theme.fontColor};
  }
`;

export const ViewButton = styled.button`
  all: unset;
  width: 50%;
  border: 4px solid ${colors.lighterBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.isSelected ? colors.orange : "none")};
  border-radius: 50px;
  font-size: 17px;
`;

export const ViewSelection = styled.div`
  width: 82%;
  height: 45px;
  background-color: ${colors.lighterBlack};
  border-radius: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;