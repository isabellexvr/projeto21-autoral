import styled from "styled-components";
import { colors } from "../../Services/Constants/colors";
import { Link } from "react-router-dom";

export const FormContainer = styled.div``;

export const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;

  justify-content: space-around;
`;

export const UploadButton = styled.button`
  all: unset;
  width: 270px;
  height: 52px;
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid;
  border-color: ${colors.orange};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  filter: drop-shadow(0px 0px 2px ${colors.orange});
  font-weight: 500;
  font-size: 17px;
  position: relative;
  > input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
  > svg {
    font-size: 25px;
  }
  :hover {
    background-color: ${colors.orange};
    transition: 500ms;
  }
  :disabled {
    cursor: default;
    opacity: 0.6;
  }
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

export const PicPreview = styled.img`
  width: 35px;
  object-fit: cover;
  border-radius: 5px;
`;

export const LinkToSignIn = styled(Link)`
  all: unset;
  width: 250px;
  cursor: pointer;
  line-height: 20px;
`;
