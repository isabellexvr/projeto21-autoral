import styled from "styled-components";
import { themes } from "../../../Contexts/ThemeContext";
import { colors } from "../../../Services/Constants/colors";
import { BsPlusLg } from "react-icons/bs";
import { RiHome6Fill } from "react-icons/ri";
import {FaUserAlt} from "react-icons/fa"
import { useState } from "react";

export default function Footer({ theme }) {
  console.log(theme == themes.darkTheme);
  console.log(themes.darkTheme);

  const [selectedIcon, setSelectedIcon] = useState()

  return (
    <FooterStyle theme={theme}>
      <Container>
        <NewPostButton theme={theme}>
          <BsPlusLg />
        </NewPostButton>
        <Button className="home">
          <RiHome6Fill />
        </Button>
        <Button className="profile">
            <FaUserAlt/>
        </Button>
      </Container>
    </FooterStyle>
  );
}

const FooterStyle = styled.div`
  background-color: ${(p) =>
    p.theme == themes.darkTheme ? colors.lighterBlack : "lightgrey"};
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const Container = styled.div`
  width: 80%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewPostButton = styled.button`
  all: unset;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${colors.orange};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -35%;
  right: 37.5%;
  border: 6px solid ${(p) => p.theme.backgroundColor};
  > svg {
    font-size: 22px;
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
  > svg {
    color: ${(p) => p.theme.fontColor};
    font-size: 20px;
  }
`;
