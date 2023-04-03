import { useTheme } from "../../../Contexts/ThemeContext";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import {
  Background,
  SwitchThemesContainer,
} from "../Constants/HomePagesBackground";
import { themes } from "../../../Contexts/ThemeContext";
import styled from "styled-components";
import Header from "../Constants/Header";
import SignInForm from "./SignInForm";
import { colors } from "../../Assets/colors";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignInPage({ loading, setLoading }) {
  const { theme, setTheme } = useTheme();
  const { setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userInfo");
    if (isLoggedIn) {
      const userInfo = JSON.parse(isLoggedIn);
      setUserInfo(userInfo);
      navigate("/timeline");
      return;
    }
  }, []);

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
      <Header />
      <Title>
        <h1>Login</h1>
      </Title>
      <SignInForm theme={theme} loading={loading} setLoading={setLoading} />
    </Background>
  );
}

const Title = styled.div`
  margin-top: 29px;
  display: flex;
  justify-content: center;
  > h1 {
    font-size: 30px;
    font-weight: 600;
    color: ${colors.pink};
    filter: drop-shadow(0px 0px 2px ${colors.pink});
  }
`;
