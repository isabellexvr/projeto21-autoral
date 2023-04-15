import styled from "styled-components";
import Footer from "../Constants/Footer";
import { useTheme } from "../../../Contexts/ThemeContext";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { colors } from "../../Assets/colors";
import NewCommunityForm from "./components/NewCommunityForm";

export default function CreateCommunityPage({
  publicationModal,
  setPublicationModal,
  loading,
  setLoading,
}) {

/*  name: joi.string().required(),
    description: joi.string(),
    icon: joi.string(),
    categoryId: joi.number().required(),
    createdAt: joi.date() */


  const { theme, setTheme } = useTheme();
  const { userInfo, setUserInfo } = useUserInfo();
  return (
    <Background theme={theme}>
        <PageTitle>Create a New Sphere</PageTitle>
        <NewCommunityForm>

        </NewCommunityForm>
      <Footer
          theme={theme}
          setPublicationModal={setPublicationModal}
          userName={userInfo?.userName}
        />
    </Background>
  );
}

const Background = styled.div`
    height: 100vh;
    background-color: ${p => p.theme.backgroundColor};
    color: ${p => p.theme.fontColor};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PageTitle = styled.h1`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 25px;
    filter: drop-shadow(1px 1px 12px ${colors.pink});
    border-bottom: 1px solid ${colors.lighterBlack};
`

