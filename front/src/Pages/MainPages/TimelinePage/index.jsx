import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import { themes } from "../../../Contexts/ThemeContext";

export default function TimelinePage() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        <button
          onClick={() => {
            setTheme(themes.darkTheme);
          }}
        >
          aaa
        </button>
        <Footer theme={theme} />
      </Background>
    </>
  );
}
