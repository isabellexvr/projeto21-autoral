import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import { themes } from "../../../Contexts/ThemeContext";
import { colors } from "../../../Services/Constants/colors";
import Post from "./Components/Post";
import { useState } from "react";

const postsMocked = [1, 2, 3, 4, 5];

const user = {};

const TIMELINESTYPES = ["My Timeline", "Communities"];

export default function TimelinePage() {
  const { theme, setTheme } = useTheme();
  const [selectedTimeline, setSelectedTimeline] = useState(0);
  console.log(theme);
  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        <FirstSectionTitle>Your Communities</FirstSectionTitle>
        <FirstSection>
          <CommunitiesContainer>
            {postsMocked.map((c) => (
              <Community
                communityPic={
                  "https://www.chess.com/bundles/web/images/offline-play/standardboard.1d6f9426.png"
                }
              >
                <CommunityFooter>
                  <h1>Chess</h1>
                </CommunityFooter>
                <CommunityIcon src="https://www.freeiconspng.com/thumbs/chess-icon/chess-icon-28.png" />
              </Community>
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
        {postsMocked.map((p) => (
          <Post></Post>
        ))}
        <Footer theme={theme} />
      </Background>
    </>
  );
}

const TimelineButton = styled.button`
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

const TimelineSelection = styled.div`
  width: 82%;
  height: 45px;
  background-color: ${colors.lighterBlack};
  border-radius: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const FirstSectionTitle = styled.h1`
  font-size: 19px;
  margin-bottom: 10px;
  width: 82%;
`;

const FirstSection = styled.section`
  height: fit-content;
  width: 82%;
  overflow-x: scroll;
  > h1:first-child {
  }
`;

const CommunitiesContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const Community = styled.div`
  background-image: url(${(p) => p.communityPic});
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
  height: 50px;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommunityIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 21px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
