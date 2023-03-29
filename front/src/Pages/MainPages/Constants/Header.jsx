import styled from "styled-components";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import {HiMenu} from "react-icons/hi"

export default function Header({theme}) {
    console.log(theme);
  return (
    <HeaderStyle theme={theme}>
      <IconsContainer>
        <LogoName theme={theme}>
          <strong>S</strong>PORT<strong>S</strong>PHERE
        </LogoName>
        <ButtonsContainer>
          <Button theme={theme}>
            <BsFillChatSquareTextFill />
          </Button>
          <Button theme={theme}>
            <HiMenu/>
          </Button>
        </ButtonsContainer>
      </IconsContainer>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
  background-color: ${(p) => p.theme.backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 70%;
`;

const LogoName = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
  font-family: "Audiowide", cursive;
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.fontColor};
  > strong {
    font-size: 30px;
    font-family: "Audiowide", cursive;
  }
`;

const ButtonsContainer = styled.div`
display: flex;

`;

const Button = styled.button`
  all: unset;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  background-color: grey;
  opacity: 0.5;
  >svg{
    color: ${(p) => p.theme.fontColor};
  }
`;
