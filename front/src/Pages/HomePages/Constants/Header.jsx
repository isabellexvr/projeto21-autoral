import styled from "styled-components";
import { colors } from "../../../Services/Constants/colors";
import logo from "../../Assets/2.png";

export default function Header() {
  return (
    <HeaderContainer>
      <img src={logo} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  filter: drop-shadow(0px 0px 2px ${colors.orange});
  border-bottom: 1px solid ${colors.orange};
  position: fixed;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  > img {
    width: 50px;
    margin-left: 15px;
  }
`;
