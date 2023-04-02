import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import {
  Background,
  SwitchThemesContainer,
} from "../Constants/HomePagesBackground";
import { useTheme, themes } from "../../../Contexts/ThemeContext";
import { WelcomeMessage, StartButton, Logo } from "./styles";
import logo from "./logo.png"
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <Background theme={theme}>
      <SwitchThemesContainer>
        <BsFillSunFill />
        <label className="switch">
          {theme === themes.lightTheme ? (
            <input onClick={() => setTheme(themes.darkTheme)} type="checkbox" />
          ) : (
            <input
              onClick={() => setTheme(themes.lightTheme)}
              checked
              type="checkbox"
            />
          )}
          <span className="slider round"></span>
        </label>
        <BsFillMoonStarsFill />
      </SwitchThemesContainer>
      <Logo src={logo} />
      <WelcomeMessage theme={theme}>
        <h1>
          Find Your Group With <strong>SportSphere</strong>
        </h1>
        <p>
          Connect with fellow sports enthusiasts and fuel your passion with our
          vibrant community of like-minded individuals.
        </p>
        <StartButton onClick={() => navigate("/sign-up")}>Get Started</StartButton>
      </WelcomeMessage>
    </Background>
  );
}
