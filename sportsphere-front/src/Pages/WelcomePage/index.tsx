import { useTheme, themes } from "../../Contexts/ThemeContext"
import styled from "styled-components";
import { Switch } from "@mui/material";
import { UserExamples } from "./Components";
import { ThemeProps } from "../../Types";

export default function WelcomePage() {
    const { theme, setTheme } = useTheme();

    return (<Background backgroundColor={theme.backgroundColor} fontColor={theme.fontColor}>
        <UserExamples/>
        <Switch onClick={() => { setTheme(theme === themes.darkTheme ? themes.lightTheme : themes.darkTheme) }} />
    </Background>)
}

const Background = styled.div<ThemeProps>`
  background-color: ${p => p.backgroundColor};
  height: 100%;
  color: ${p => p.fontColor};
`;