import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import { themes } from "../../../Contexts/ThemeContext";
import { colors } from "../../../Services/Constants/colors";
import Post from "./Components/Post";

const postsMocked = [1, 2, 3, 4, 5];

const user = {};

export default function TimelinePage() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        <FirstSectionTitle>Your Communities</FirstSectionTitle>
        <FirstSection>
          <CommunitiesContainer>
            {postsMocked.map((c) => (
              <Community communityPic={"https://www.chess.com/bundles/web/images/offline-play/standardboard.1d6f9426.png"}>
                <CommunityFooter></CommunityFooter>
              </Community>
            ))}
          </CommunitiesContainer>
        </FirstSection>

        {postsMocked.map((p) => (
          <Post></Post>
        ))}
        <Footer theme={theme} />
      </Background>
    </>
  );
}

const FirstSectionTitle = styled.h1`
      font-size: 22px;
    margin-bottom: 10px;
    width: 82%;
`

const FirstSection = styled.section`
  height: 200px;
  width: 82%;
  overflow-x: scroll;
  >h1:first-child{

  }
`;

const CommunitiesContainer = styled.div`
  display: flex;
width: fit-content;
`;

const Community = styled.div`
  background-image: url(${p => p.communityPic});
  background-size: contain;
  background-repeat: no-repeat;
  height: 160px;
  width: 120px;
  margin-right: 15px;
  border-radius: 15px;
  border: 1px solid gray;
  box-sizing: border-box;
  position: relative;
`;

const CommunityFooter = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${colors.lighterBlack};
  -webkit-mask-image: radial-gradient(
    circle at top,
    transparent 15px,
    black 5px
  );
  border-bottom-right-radius: 15px;
border-bottom-left-radius: 15px;
  position: absolute;
  bottom: 0;

`