import styled from "styled-components";
import { ThemeProps, WelcomeMessageProps, ButtonProps } from "./propsTypes";
import { Link } from "react-router-dom";



export const Background = styled.div<ThemeProps>`
  background-color: ${p => p.backgroundColor};
  height: 100%;
  color: ${p => p.fontColor};
`;

export const Logo = styled.img`
z-index: 0;
opacity: 0.2;
position: absolute;
top: 20vh;
width: 92%;
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
  height: 77%;
  position: relative;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center
`

export const WelcomeMessage = styled.div<WelcomeMessageProps>`
width: 280px;
text-align: center;
font-family: Roboto;

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
  }
`

export const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StartButton = styled(Link) <ButtonProps>`
  all: unset;
  margin: 0 auto;
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
  }

`