import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";

export default function TimelinePage() {
  const { theme, setTheme } = useTheme();
  console.log(theme)
  return (
    <>
      <Header theme={theme} />
      <Background theme={theme}>
        
      </Background>
    </>
  );
}
