import {
  Background,
  SwitchThemesContainer
} from "../Constants/HomePagesBackground";
import { themes } from "../../../Contexts/ThemeContext";
import { useTheme } from "../../../Contexts/ThemeContext";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import Header from "../Constants/Header";
import SignUpForm from "./SignUpForm";
import { Title } from "./styles";

export default function SignUpPage({ loading, setLoading }) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Background theme={theme}>
        <SwitchThemesContainer>
          <BsFillSunFill />
          <label className="switch">
            {theme === themes.lightTheme ? (
              <input
                onClick={() => setTheme(themes.darkTheme)}
                type="checkbox"
              />
            ) : (
              <input
                onClick={() => setTheme(themes.lightTheme)}
                defaultChecked
                type="checkbox"
              />
            )}
            <span className="slider round"></span>
          </label>
          <BsFillMoonStarsFill />
        </SwitchThemesContainer>
        <Header />
        <Title>
          <h1>Registration</h1>
        </Title>
        <SignUpForm theme={theme} loading={loading} setLoading={setLoading} />
      </Background>
    </>
  );
}
