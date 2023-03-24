import { useTheme, themes } from "../../Contexts/ThemeContext"
import styled from "styled-components";
import { Switch } from "@mui/material";
import { UserExamples } from "./Components";
import { ThemeProps } from "../../Types";
import { useRef } from "react";

export default function WelcomePage() {
    const { theme, setTheme } = useTheme();
    const something = useRef(null);
    
    function handleInput(e:React.ChangeEvent<HTMLInputElement>){
      console.log(e)
    }

    return (<Background backgroundColor={theme.backgroundColor} fontColor={theme.fontColor}>
      <input onChange={(e) => handleInput(e)} ref={something} type="file"></input>
        <Switch onClick={() => { setTheme(theme === themes.darkTheme ? themes.lightTheme : themes.darkTheme) }} />
    </Background>)
}

const Background = styled.div<ThemeProps>`
  background-color: ${p => p.backgroundColor};
  height: 100%;
  color: ${p => p.fontColor};
`;