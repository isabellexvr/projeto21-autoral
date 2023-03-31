import styled from "styled-components";
import { themes } from "../../../Contexts/ThemeContext";
import { colors } from "../../../Services/Constants/colors";
import { BsPlusLg } from "react-icons/bs";
import { RiHome6Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";

export default function Footer({ theme, setIsModalOpened }) {
  console.log(theme == themes.darkTheme);
  console.log(themes.darkTheme);

  const [selectedIcon, setSelectedIcon] = useState();

  return (
    <FooterContainer>
      <FooterStyle theme={theme}>
        <Container>
          <Button className="home">
            <RiHome6Fill />
          </Button>

          <Button className="profile">
            <FaUserAlt />
          </Button>
        </Container>
      </FooterStyle>
      <NewPostButton onClick={() => setIsModalOpened(true)} theme={theme}>
        <BsPlusLg />
      </NewPostButton>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  height: 80px;
  width: 100%;
  position: relative;
  position: fixed;
  bottom: 0;
  right: 0;
`;

const FooterStyle = styled.div`
  background-color: ${(p) =>
    p.theme == themes.darkTheme ? colors.lighterBlack : "lightgrey"};
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  -webkit-mask-image: radial-gradient(
    circle at top,
    transparent 40px,
    black 42px
  );
`;

const Container = styled.div`
  width: 80%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 0;
`;

const NewPostButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${colors.orange};
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(1px 12px 20px ${colors.orange});
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 20px;
  z-index: 2;
  > svg {
    font-size: 22px;
    color: ${(p) => p.theme.fontColor};
  }
  :hover{
    transition: 1s;
    background-color: ${colors.pink};
  }
`;

const Button = styled.button`
  all: unset;
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: gray;
  opacity: 0.6;
  > svg {
    color: ${(p) => p.theme.fontColor};
    font-size: 20px;
  }
`;
