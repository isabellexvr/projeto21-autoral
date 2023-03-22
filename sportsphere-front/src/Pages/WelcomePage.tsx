import { useTheme, themes } from "../Contexts/ThemeContext"
import styled from "styled-components";
import { Switch } from "@mui/material";

type ThemeProps = {
    backgroundColor: string,
    fontColor: string
}

export default function WelcomePage() {

    const { theme, setTheme } = useTheme();
    console.log(theme)

    return (<Background backgroundColor={theme.backgroundColor} fontColor={theme.fontColor}>
        weifwlekfmweve
        <Switch onClick={() => { setTheme(theme === themes.darkTheme ? themes.lightTheme : themes.darkTheme) }} />
    </Background>)
}

const Background = styled.div<ThemeProps>`
  background-color: ${p => p.backgroundColor};
  height: 100%;
  color: ${p => p.fontColor};
`;