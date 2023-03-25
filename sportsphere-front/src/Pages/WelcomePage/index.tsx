import { useTheme, themes } from "../../Contexts/ThemeContext"
import { Fade, Tooltip, Button } from "@mui/material";
import Switch from '@mui/material/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import logo from "./Assets/logo.png";
import { colors } from "../../assets/colors";
import { TopContainer, Background, SwitchThemes, Logo, WelcomeMessage, BottomContainer, StartButton } from "./Assets/styles";

export default function WelcomePage() {
  const { theme, setTheme } = useTheme();

  return (<Background backgroundColor={theme.backgroundColor} fontColor={theme.fontColor}>

    <TopContainer>
      <Tooltip title="Switch Theme" TransitionComponent={Fade} enterDelay={300} leaveDelay={300} arrow>
        <SwitchThemes>
          <WbSunnyIcon />
          <Switch color="warning" onClick={() => { setTheme(theme === themes.darkTheme ? themes.lightTheme : themes.darkTheme) }} />
          <ModeNightIcon />
        </SwitchThemes>
      </Tooltip>
      <Logo src={logo}/>
      <WelcomeMessage mainName={colors.pink} theme={theme.fontColor}>
        <h1>Find Your Group
          <br />
          With <strong>SportSphere</strong>
        </h1>
        <h3>
        Connect with fellow sports enthusiasts and fuel your passion with our vibrant community of like-minded individuals.
        </h3>
      </WelcomeMessage>
    </TopContainer>
    <BottomContainer>
      <StartButton backgroundColor={colors.orange} to="/sign-up">
        <button>Get Started</button>
      </StartButton>
    </BottomContainer>

  </Background>)
}
