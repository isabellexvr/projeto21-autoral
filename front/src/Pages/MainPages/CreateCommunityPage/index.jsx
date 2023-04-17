import styled from "styled-components";
import Footer from "../Constants/Footer";
import { useTheme } from "../../../Contexts/ThemeContext";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { colors } from "../../Assets/colors";
import NewCommunityForm from "./components/NewCommunityForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LocationForm from "../../HomePages/SignUpPage/components/LocationForm";
import { useState } from "react";

export default function CreateCommunityPage({
  publicationModal,
  setPublicationModal,
  loading,
  setLoading,
}) {
  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();

  const [showLocationForm, setShowLocationForm] = useState(false);

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
    <Background theme={theme}>
        <PageTitle  theme={theme}><h1>Create a New Sphere</h1></PageTitle>
        <NewCommunityForm token={userInfo?.token} theme={theme} navigate={navigate} showLocationForm={showLocationForm} setShowLocationForm={setShowLocationForm} />

      <Footer
          theme={theme}
          setPublicationModal={setPublicationModal}
          userName={userInfo?.userName}
        />
    </Background>
  );
}

const Background = styled.div`
    height: fit-content;
    margin-top: 60px;
    padding-bottom: 120px;
    background-color: ${p => p.theme.backgroundColor};
    color: ${p => p.theme.fontColor};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PageTitle = styled.div`
z-index: 1;
position: fixed;
top: 0;
left: 0;
background-color: ${p => p.theme.backgroundColor};
width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 25px;

    border-bottom: 1px solid ${colors.lighterBlack};
    >h1{
        filter: drop-shadow(1px 1px 12px ${colors.pink});
    }
`

