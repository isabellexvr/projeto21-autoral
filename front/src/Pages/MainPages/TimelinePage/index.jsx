import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import { themes } from "../../../Contexts/ThemeContext";

const postsMocked = [1, 2, 3, 4, 5];

export default function TimelinePage() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        {postsMocked.map((p) => (
          <Post></Post>
        ))}
        <Footer theme={theme} />
      </Background>
    </>
  );
}

const Post = styled.div`
  width: 80%;
  height: 100px;
  margin-bottom: 20px;
  background-color: yellow;
`;
