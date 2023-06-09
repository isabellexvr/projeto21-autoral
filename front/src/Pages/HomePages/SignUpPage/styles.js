import styled from "styled-components";
import { colors } from "../../Assets/colors";
import { Link } from "react-router-dom";
import Select from "react-select";

export const FormContainer = styled.div``;

export const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  justify-content: space-around;
`;

export const UploadButton = styled.button`
  all: unset;
  width: 270px;
  margin-bottom: 10px;
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
  height: 35px;
  object-fit: cover;
  border-radius: 5px;
`;

export const LinkToSignIn = styled(Link)`
  all: unset;
  width: 250px;
  cursor: pointer;
  line-height: 23px;
  margin-top: 10px;
  text-decoration: underline;
  margin-bottom: 50px;
`;

export const Title = styled.div`
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

export const SelectContainer = styled.div`
  height: fit-content;
  border: 2px solid ${colors.pink};
  border-radius: 15px;
  padding: 14px;
  margin-bottom: 15px;
  filter: drop-shadow(0px 0px 2px ${colors.pink});
`;

export const StyledSelect = styled(Select)`
  width: 270px;
  height: 52px;
  color: ${colors.pink};
  font-weight: 500;
  margin-top: 5px;
  z-index: 5;
  opacity: ${(p) => p.opacity};
  > option {
    z-index: 100;
  }
`;

export const SelectLabel = styled.label`
  opacity: ${(p) => p.opacity};
  color: ${colors.pink};
  width: 270px;
`;
