import styled from "styled-components";
import { colors } from "../../Assets/colors";
import { Link } from "react-router-dom";


export const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;

  justify-content: space-around;
`;

export const ConfirmButton = styled.button`
  all: unset;
  width: 270px;
  height: 52px;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${colors.orange};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: 500;
  font-size: 17px;
  filter: drop-shadow(0px 0px 2px ${colors.orange});
  border-radius: 8px;
  :hover {
    background-color: ${colors.pink};
    transition: 500ms;
  }
  :disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const LinkToSignUp = styled(Link)`
  all: unset;
  width: 250px;
  cursor: pointer;
  line-height: 20px;
`;