import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";

export default function TimelinePage() {
    const {theme, setTheme} = useTheme();
    return (
        <Background theme={theme}>

        </Background>
    )
}