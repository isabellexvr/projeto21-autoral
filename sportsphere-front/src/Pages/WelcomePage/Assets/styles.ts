import styled from "styled-components";
import { ThemeProps, WelcomeMessageProps, ButtonProps } from "./propsTypes";
import { Link } from "react-router-dom";
import { colors } from "../../../assets/colors";

export const Background = styled.div<ThemeProps>`
  background-color: ${p => p.backgroundColor};
  height: 100%;
  color: ${p => p.fontColor};
`;

export const Logo = styled.img`
z-index: 0;
opacity: 0.25;
position: absolute;
top: 20vh;
width: 92%;

filter: drop-shadow(0px 0px 10px ${colors.orange});
@media only screen and (min-width: 600px) {
  width: 430px;
  top: 10vh;
}
`

export const SwitchThemes = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  position: absolute;
  right: 20px;
  top: 15px;
`;

export const TopContainer = styled.div`
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;

`

export const WelcomeMessage = styled.div<WelcomeMessageProps>`
margin-top: 170px;
width: 280px;
text-align: center;
font-family: Roboto;
cursor: default;
  >h1{
    font-weight: 500;
    font-size: 35px;
    filter: drop-shadow(0px 0px 2px ${p => p.theme});
    line-height: 40px;
    >strong{
          color: ${p => p.mainName};
          filter: none;
    }
  }
  >h3{
    font-size: 13px;
    margin-top: 25px;
    font-weight: 500;
  }
`

export const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 230px;
`

export const StartButton = styled(Link) <ButtonProps>`
  all: unset;
  margin: 0 auto;
  cursor: pointer;
  >button{
    all: unset;
    background-color: ${props => props.backgroundColor};
    height: 50px;
    width: 145px;
    border-radius: 25px;
    color: white;
    font-family: Roboto;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(1px 1px 12px ${props => props.backgroundColor});
    >h1{
      filter: drop-shadow(1px 0px 2.5px white)
    }
    :hover{
      background-color: ${colors.pink};
      transition: all 1s ease-out;
    }
  }

`