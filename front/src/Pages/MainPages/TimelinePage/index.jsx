import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import { themes } from "../../../Contexts/ThemeContext";
import { colors } from "../../../Services/Constants/colors";
import Post from "./Components/Post";

const postsMocked = [1, 2, 3, 4, 5];

const user = {

}

export default function TimelinePage() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
    
      <Background theme={theme}>
        <Header theme={theme} />
        {postsMocked.map((p) => (
          <Post>

          </Post>
        ))}
        <Footer theme={theme} />
      </Background>
    </>
  );
}
